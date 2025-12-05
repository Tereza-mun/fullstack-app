export default {
    common: {
        selectOption: 'Select an option'
    },
    header: {
        title: 'TechStore',
        cart: 'Go to cart',
        switchLanguage: 'Switch to {language}'
    },
    products: {
        title: 'Our Products',
        loading: 'Loading products...',
        addToCart: 'Add to Cart',
        removeFromCart: 'Remove from Cart',
        addToCartAria: 'Click to add {product} to cart',
        removeFromCartAria: 'Click to remove {product} from cart',
        addedToCart: 'Added to cart:',
        removedFromCart: 'Removed from cart:',
    },
    productDetail: {
        backToProducts: 'Back to Products',
        notFound: 'Product not found',
        description: 'Description',
        specifications: 'Technical Specifications',
    },
    cart: {
        title: 'Shopping Cart',
        empty: 'Your cart is empty',
        continueShopping: 'Continue Shopping',
        subtotal: 'Subtotal',
        clearCart: 'Clear Cart',
        continue: 'Continue',
        checkout: 'Proceed to Checkout',
        checkoutAlert: 'Checkout functionality coming soon!',
        removeItem: 'Remove item',
        increaseQuantity: 'Increase quantity to',
        decreaseQuantity: 'Decrease quantity to',
        clearedCart: 'Cart was cleared',
        steps: {
            cart: 'Cart',
            deliveryInformation: 'Delivery and Payment',
            summary: 'Order Summary and Submission',
            confirmation: 'Order Confirmation'
        }
    },
    filters: {
        category: 'Category',
        sortBy: 'Sort By',
        search: 'Search',
        searchPlaceholder: 'Search products...',
        minPrice: 'Min Price (€)',
        maxPrice: 'Max Price (€)',
        minPricePlaceholder: '0.00',
        maxPricePlaceholder: '999.99',
        resetFilters: 'Reset Filters',
        resetFiltersLabel: 'click to reset all filters',
        openFilters: 'Filters',
        applyFilters: 'Apply Filters',
        categories: {
            all: 'All Categories',
            audio: 'Audio',
            keyboardsAndMice: 'Keyboards & Mice',
            monitors: 'Monitors & Displays',
            accessories: 'Accessories',
            storage: 'Storage',
            cables: 'Cables & Adapters'
        },
        sort: {
            default: 'Default',
            priceAsc: 'Price: Low to High',
            priceDesc: 'Price: High to Low',
            nameAsc: 'Name: A to Z',
            nameDesc: 'Name: Z to A'
        }
    },
    pagination: {
        previous: 'Previous',
        next: 'Next',
        page: 'Page {current} of {total}'
    },
    validation: {
        invalidEmail: 'Please enter a valid email address',
        invalidPhone: 'Phone number can only contain digits and the + character'
    },
    deliveryInfo: {
        title: 'Delivery Information',
        emptyCart: 'Your cart is empty. Add items to proceed with checkout.',
        customerInfo: 'Customer Information',
        addressInfo: 'Delivery Address',
        name: 'Full Name',
        namePlaceholder: 'John Doe',
        email: 'Email',
        emailPlaceholder: "john.doe{'@'}example.com",
        phone: 'Phone Number',
        phonePlaceholder: '+1 (555) 123-4567',
        address: 'Street Address',
        addressPlaceholder: '123 Main Street',
        city: 'City',
        cityPlaceholder: 'New York',
        postalCode: 'Postal Code',
        postalCodePlaceholder: '10001',
        country: 'Country',
        countryPlaceholder: 'United States',
        notes: 'Order Notes (Optional)',
        notesTitle: 'Additional Notes',
        notesPlaceholder: 'Any special instructions or comments...',
        orderSummary: 'Order Summary',
        subtotal: 'Subtotal',
        deliveryCost: 'Delivery',
        free: 'Free',
        total: 'Total',
        itemsCount: '{count} item | {count} items',
        back: 'Back',
        placeOrder: 'Submit Order',
        processing: 'Processing...',
        success: 'Order placed successfully! Order ID: #{orderId}',
        error: 'Failed to place order. Please try again.',
        orderError: 'Order Submission Failed',
        deliveryMethod: 'Delivery Method',
        delivery: 'Delivery - 10€',
        deliveryDescription: 'Have your order delivered to your address',
        pickup: 'Pick Up - free',
        pickupDescription: 'Collect your order from our store',
        paymentMethod: 'Payment Method',
        cash: 'Cash',
        cashDescription: 'Pay with cash upon delivery or pickup',
        bankTransfer: 'Bank Transfer',
        bankTransferDescription: 'Pay by bank transfer before delivery'
    },
    confirmation: {
        title: 'Order Placed!',
        thankYou: 'Thank you for your order',
        orderNumber: 'Order Number',
        demoNotice: 'This is a demo e-shop',
        demoMessage: 'Please note that this is a demonstration project. No real items will be shipped and no payment is required. Your order has been recorded in our demo database for testing purposes only.',
        backToShopping: 'Back to Products'
    }
}
