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
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Login failed' }));
            throw new Error(error.message || 'Login failed');
        }

        const data: AuthResponse = await response.json();

        // Store token and user data
        this.setToken(data.access_token);
        this.setUser(data.user);

        return data;
    }

    async register(registerData: RegisterData): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Registration failed' }));
            throw new Error(error.message || 'Registration failed');
        }

        const data: AuthResponse = await response.json();

        // Store token and user data
        // this.setToken(data.access_token);
        // this.setUser(data.user);

        return data;
    }

    async getProfile() {
        const token = this.getToken();

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URL}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        return response.json();
    }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
    }

    getToken(): string | null {
        return localStorage.getItem('auth_token');
    }

    getUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    private setToken(token: string) {
        localStorage.setItem('auth_token', token);
    }

    private setUser(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
    }
}

export const authService = new AuthService();
