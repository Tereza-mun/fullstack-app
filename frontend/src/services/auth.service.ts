import { fetchWithRefresh } from '../utils/fetchWithRefresh';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phonePrefix?: string;
    phoneNumber?: string;
    deliveryAddress?: string;
    deliveryCity?: string;
    deliveryPostalCode?: string;
    deliveryCountry?: string;
    billingAddress?: string;
    billingCity?: string;
    billingPostalCode?: string;
    billingCountry?: string;
}

export interface AuthResponse {
    access_token: string;
    user: {
        id: number;
        email: string;
        firstName?: string;
        lastName?: string;
        phonePrefix?: string;
        phoneNumber?: string;
        deliveryAddress?: string;
        deliveryCity?: string;
        deliveryPostalCode?: string;
        deliveryCountry?: string;
    };
}

class AuthService {
    async checkEmailExists(email: string): Promise<boolean> {
        const response = await fetch(`${API_URL}/auth/check-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error('Failed to check email');
        }

        const data = await response.json();
        return data.exists;
    }

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Important: send cookies with request
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            // Handle rate limiting
            if (response.status === 429) {
                throw new Error('TOO_MANY_REQUESTS');
            }
            const error = await response.json().catch(() => ({ message: 'Login failed' }));
            throw new Error(error.message || 'Login failed');
        }

        const data = await response.json();

        // Store user data (token is now in HttpOnly cookie)
        this.setUser(data.user);

        return { user: data.user, access_token: '' };
    }

    async register(registerData: RegisterData): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Important: send cookies with request
            body: JSON.stringify(registerData),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Registration failed' }));
            throw new Error(error.message || 'Registration failed');
        }

        const data = await response.json();

        // Don't store user data - no auto-login during registration
        // User must verify email first before logging in

        return { user: data.user, access_token: '' };
    }

    async refreshToken(): Promise<boolean> {
        try {
            const response = await fetch(`${API_URL}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
            });

            return response.ok;
        } catch (error) {
            return false;
        }
    }

    async getProfile() {
        const response = await fetchWithRefresh(`${API_URL}/auth/profile`);

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        return response.json();
    }

    async logout() {
        await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include', // Important: send cookies with request
        });

        localStorage.removeItem('user');
    }

    getUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    isAuthenticated(): boolean {
        return !!this.getUser();
    }

    private setUser(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
    }
}

export const authService = new AuthService();
