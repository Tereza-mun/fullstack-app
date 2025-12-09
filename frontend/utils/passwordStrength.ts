export interface PasswordStrength {
    score: number; // 0-4 (0: very weak, 1: weak, 2: fair, 3: good, 4: strong)
    level: 'very-weak' | 'weak' | 'fair' | 'good' | 'strong';
    feedback: string[];
    checks: {
        length: boolean;
        uppercase: boolean;
        lowercase: boolean;
        number: boolean;
        special: boolean;
    };
}

export function calculatePasswordStrength(password: string): PasswordStrength {
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    // Calculate score based on checks
    let score = 0;

    // Length contributes more to score
    if (password.length >= 12) score += 1.5;
    else if (password.length >= 8) score += 1;

    // Each character type adds to score
    if (checks.uppercase) score += 0.5;
    if (checks.lowercase) score += 0.5;
    if (checks.number) score += 0.5;
    if (checks.special) score += 0.5;

    // Additional length bonus
    if (password.length >= 16) score += 0.5;

    // Cap score at 4
    score = Math.min(4, score);

    // Determine level
    let level: PasswordStrength['level'];
    if (score < 1.5) level = 'very-weak';
    else if (score < 2.5) level = 'weak';
    else if (score < 3.5) level = 'fair';
    else if (score < 4) level = 'good';
    else level = 'strong';

    // Generate feedback
    const feedback: string[] = [];
    if (!checks.length) feedback.push('passwordFeedback.minLength');
    if (!checks.uppercase) feedback.push('passwordFeedback.uppercase');
    if (!checks.lowercase) feedback.push('passwordFeedback.lowercase');
    if (!checks.number) feedback.push('passwordFeedback.number');
    if (!checks.special) feedback.push('passwordFeedback.special');
    if (password.length < 12) feedback.push('passwordFeedback.longer');

    return {
        score,
        level,
        feedback,
        checks,
    };
}
