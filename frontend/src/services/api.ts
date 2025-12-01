import axios, { type AxiosInstance } from "axios";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
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
}

export const api = new ApiService();