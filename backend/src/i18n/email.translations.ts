export const emailTranslations = {
    en: {
        verification: {
            subject: 'Please verify your TechStore account',
            title: 'Verify Your Email Address',
            greeting: 'Thank you for registering with TechStore!',
            message: 'To complete your registration and start shopping, please verify your email address.',
            button: 'Verify Email Address',
            orCopy: 'Or copy and paste this link into your browser:',
            expiresIn: 'This verification link will expire in',
            hours: '24 hours',
            securityNote: 'This is an automated security email. If you didn\'t create an account, you can safely ignore this message.',
            footer: {
                copyright: 'All rights reserved.',
                disclaimer: 'This is a transactional email. You received this because you registered on our platform.'
            }
        },
        welcome: {
            subject: 'Welcome to TechStore, {firstName}!',
            title: 'Welcome, {firstName}!',
            verified: 'Your email has been successfully verified.',
            access: 'You can now access all features of your account.',
            thanks: 'Thank you for joining us!',
            footer: {
                copyright: 'All rights reserved.',
                disclaimer: 'This is a transactional email. You received this because you verified your email on our platform.'
            }
        }
    },
    cs: {
        verification: {
            subject: 'Prosím ověřte svůj TechStore účet',
            title: 'Ověřte Vaši Emailovou Adresu',
            greeting: 'Děkujeme za registraci v TechStore!',
            message: 'Pro dokončení registrace a zahájení nakupování prosím ověřte svou emailovou adresu.',
            button: 'Ověřit Emailovou Adresu',
            orCopy: 'Nebo zkopírujte a vložte tento odkaz do prohlížeče:',
            expiresIn: 'Tento ověřovací odkaz vyprší za',
            hours: '24 hodin',
            securityNote: 'Toto je automatický bezpečnostní email. Pokud jste účet nevytvořili, můžete tuto zprávu ignorovat.',
            footer: {
                copyright: 'Všechna práva vyhrazena.',
                disclaimer: 'Toto je transakční email. Obdrželi jste ho, protože jste se zaregistrovali na naší platformě.'
            }
        },
        welcome: {
            subject: 'Vítejte v TechStore, {firstName}!',
            title: 'Vítejte, {firstName}!',
            verified: 'Váš email byl úspěšně ověřen.',
            access: 'Nyní máte přístup ke všem funkcím vašeho účtu.',
            thanks: 'Děkujeme, že jste se k nám připojili!',
            footer: {
                copyright: 'Všechna práva vyhrazena.',
                disclaimer: 'Toto je transakční email. Obdrželi jste ho, protože jste ověřili svůj email na naší platformě.'
            }
        }
    }
};

export type SupportedLanguage = keyof typeof emailTranslations;

export function getTranslation(lang: string, key: string): any {
    const supportedLang = (lang === 'cs' ? 'cs' : 'en') as SupportedLanguage;
    const keys = key.split('.');
    let value: any = emailTranslations[supportedLang];

    for (const k of keys) {
        value = value?.[k];
    }

    return value || key;
}

export function replaceVariables(text: string, variables: Record<string, string | number>): string {
    return text.replace(/\{(\w+)\}/g, (match, key) => {
        return variables[key]?.toString() || match;
    });
}
