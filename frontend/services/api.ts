import axios, { type AxiosInstance } from "axios";

interface OrderItem {
  productId: number;
  productName: any;
  productPrice: number;
  quantity: number;
}

interface CartItemInput {
  id: number;
  name: { en: string; cs: string };
  price: number;
  quantity: number;
}

interface CreateOrderDto {
  firstName: string;
  lastName: string;
  customerEmail: string;
  phonePrefix: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes: string;
  deliveryMethod: 'delivery' | 'pickup';
  paymentMethod: 'cash' | 'bank_transfer';
  totalPrice: number;
  items: OrderItem[];
}

interface Order {
  id: number;
  firstName: string;
  lastName: string;
  customerEmail: string;
  phonePrefix?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  notes?: string;
  deliveryMethod: string;
  paymentMethod: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

class ApiService {
  private api: AxiosInstance;

  constructor() {
    const config = useRuntimeConfig();
    const baseURL = process.client
      ? (config.public.apiUrl || '/api')
      : (config.public.apiUrl || 'http://localhost:3002');

    this.api = axios.create({
      baseURL,
      withCredentials: true,
    });
  }

  get<T>(url: string) {
    return this.api.get<T>(url).then(res => res.data);
  }

  post<T>(url: string, data: unknown) {
    return this.api.post<T>(url, data).then(res => res.data);
  }

  put<T>(url: string, data: unknown) {
    return this.api.put<T>(url, data).then(res => res.data);
  }

  delete<T>(url: string) {
    return this.api.delete<T>(url).then(res => res.data);
  }

  // Orders
  createOrder(orderData: Omit<CreateOrderDto, 'items'> & { items: CartItemInput[] }) {
    // Transform cart items to order items
    const transformedData: CreateOrderDto = {
      ...orderData,
      items: orderData.items.map(item => ({
        productId: item.id,
        productName: item.name,
        productPrice: item.price,
        quantity: item.quantity
      }))
    };
    return this.post<Order>('/orders', transformedData);
  }

  getOrders() {
    return this.get<Order[]>('/orders');
  }

  getOrder(id: number) {
    return this.get<Order>(`/orders/${id}`);
  }
}

export const api = new ApiService();
