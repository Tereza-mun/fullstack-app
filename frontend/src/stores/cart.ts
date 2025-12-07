import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../services/api'

export interface ItemName {
    en: string
    cs: string
}

export interface CartItem {
    id: number
    name: ItemName
    price: number
    category: string
    imageUrl?: string
    quantity: number
}

export interface OrderFormData {
    firstName: string
    lastName: string
    customerEmail: string
    phonePrefix: string
    phoneNumber: string
    address: string
    city: string
    postalCode: string
    country: string
    notes: string
    deliveryMethod: 'delivery' | 'pickup'
    paymentMethod: 'cash' | 'bank_transfer'
}

export interface CompleteOrderData {
    firstName: string
    lastName: string
    customerEmail: string
    phonePrefix: string
    phoneNumber: string
    address: string
    city: string
    postalCode: string
    country: string
    notes: string
    deliveryMethod: 'delivery' | 'pickup'
    paymentMethod: 'cash' | 'bank_transfer'
    totalPrice: number
    items: CartItem[]
}

export const useCartStore = defineStore('cart', () => {
    const items = ref<CartItem[]>([])

    const formData = ref<OrderFormData>({
        firstName: '',
        lastName: '',
        customerEmail: '',
        phonePrefix: '+420',
        phoneNumber: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        notes: '',
        deliveryMethod: 'delivery',
        paymentMethod: 'cash'
    })

    const totalItems = computed(() => {
        return items.value.reduce((total, item) => total + item.quantity, 0)
    })

    const subtotalPrice = computed(() => {
        return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    })

    const deliveryCost = computed(() => {
        return formData.value.deliveryMethod === 'delivery' ? 10 : 0
    })

    const totalPrice = computed(() => {
        return subtotalPrice.value + deliveryCost.value
    })

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePhoneNumber = (phoneNumber: string): boolean => {
        // Phone number should contain only digits and be between 6-15 digits
        const phoneRegex = /^\d+$/
        if (!phoneRegex.test(phoneNumber)) return false
        return phoneNumber.length >= 6 && phoneNumber.length <= 15
    }

    const isFormValid = computed(() => {
        return (
            formData.value.firstName.trim() !== '' &&
            formData.value.lastName.trim() !== '' &&
            formData.value.customerEmail.trim() !== '' &&
            validateEmail(formData.value.customerEmail) &&
            formData.value.phonePrefix.trim() !== '' &&
            formData.value.phoneNumber.trim() !== '' &&
            validatePhoneNumber(formData.value.phoneNumber) &&
            formData.value.address.trim() !== '' &&
            formData.value.city.trim() !== '' &&
            formData.value.postalCode.trim() !== '' &&
            formData.value.country.trim() !== ''
        )
    })

    const addToCart = (product: { id: number; name: ItemName; price: number; category: string; imageUrl?: string }) => {
        const existingItem = items.value.find(item => item.id === product.id)

        if (existingItem) {
            existingItem.quantity++
        } else {
            items.value.push({
                ...product,
                quantity: 1
            })
        }
    }

    const removeFromCart = (itemId: number) => {
        const index = items.value.findIndex(item => item.id === itemId)
        if (index !== -1) {
            items.value.splice(index, 1)
        }
    }

    const increaseQuantity = (itemId: number) => {
        const item = items.value.find(i => i.id === itemId)
        if (item) {
            item.quantity++
        }
    }

    const decreaseQuantity = (itemId: number) => {
        const item = items.value.find(i => i.id === itemId)
        if (item) {
            if (item.quantity > 1) {
                item.quantity--
            } else {
                removeFromCart(itemId)
            }
        }
    }

    const clearCart = () => {
        items.value = []
    }

    const updateFormData = (data: Partial<OrderFormData>) => {
        formData.value = { ...formData.value, ...data }
    }

    const resetFormData = () => {
        formData.value = {
            firstName: '',
            lastName: '',
            customerEmail: '',
            phonePrefix: '+420',
            phoneNumber: '',
            address: '',
            city: '',
            postalCode: '',
            country: '',
            notes: '',
            deliveryMethod: 'delivery',
            paymentMethod: 'cash'
        }
    }

    const getCompleteOrderData = (): CompleteOrderData => {
        return {
            ...formData.value,
            totalPrice: totalPrice.value,
            items: items.value
        }
    }

    const submitOrder = async () => {
        if (items.value.length === 0) {
            throw new Error('Cart is empty')
        }

        const completeOrderData = getCompleteOrderData()
        const order = await api.createOrder(completeOrderData)

        // Clear cart and form after successful order
        clearCart()
        resetFormData()

        return order
    }

    return {
        items,
        totalItems,
        subtotalPrice,
        deliveryCost,
        totalPrice,
        formData,
        isFormValid,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        updateFormData,
        resetFormData,
        getCompleteOrderData,
        submitOrder
    }
}, {
    persist: true
})
