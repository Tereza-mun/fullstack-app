export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
    if (!email) {
        return { isValid: false, error: 'Email is required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }

    return { isValid: true };
};

export const validatePhone = (phone: string, required: boolean = false): ValidationResult => {
    if (!phone) {
        if (required) {
            return { isValid: false, error: 'Phone number is required' };
        }
        return { isValid: true };
    }

    // Allow digits, spaces, +, -, and parentheses
    const phoneRegex = /^[+\d\s()-]+$/;
    if (!phoneRegex.test(phone)) {
        return { isValid: false, error: 'Phone number can only contain digits, spaces, +, -, and parentheses' };
    }

    // Check if it has at least 10 digits (minimum for most phone numbers)
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
        return { isValid: false, error: 'Phone number must contain at least 10 digits' };
    }

    return { isValid: true };
};

export const validatePhoneNumber = (phoneNumber: string, required: boolean = false): ValidationResult => {
    if (!phoneNumber) {
        if (required) {
            return { isValid: false, error: 'Phone number is required' };
        }
        return { isValid: true };
    }

    // Allow only digits
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phoneNumber)) {
        return { isValid: false, error: 'Phone number can only contain digits' };
    }

    // Check if it has between 6 and 15 digits
    if (phoneNumber.length < 6) {
        return { isValid: false, error: 'Phone number must contain at least 6 digits' };
    }
    if (phoneNumber.length > 15) {
        return { isValid: false, error: 'Phone number cannot exceed 15 digits' };
    }

    return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
    if (!password) {
        return { isValid: false, error: 'Password is required' };
    }

    if (password.length < 8) {
        return { isValid: false, error: 'Password must be at least 8 characters long' };
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return { isValid: false, error: 'Password must contain at least 1 uppercase letter' };
    }

    // Check for at least one number
    if (!/\d/.test(password)) {
        return { isValid: false, error: 'Password must contain at least 1 number' };
    }

    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return { isValid: false, error: 'Password must contain at least 1 special character (!@#$%^&*...)' };
    }

    return { isValid: true };
};

export const getPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong'; score: number } => {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

    if (score <= 2) return { strength: 'weak', score };
    if (score <= 4) return { strength: 'medium', score };
    return { strength: 'strong', score };
};
