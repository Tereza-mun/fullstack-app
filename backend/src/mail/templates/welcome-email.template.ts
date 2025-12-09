import { EmailTemplateBuilder } from './email-template.builder';
import { getTranslation, replaceVariables } from '../../i18n/email.translations';

export interface WelcomeEmailData {
    firstName: string;
    language: string;
}

export function generateWelcomeEmailHtml(data: WelcomeEmailData): string {
    const { firstName, language } = data;
    const t = (key: string, vars?: Record<string, any>) => {
        const translation = getTranslation(language, `welcome.${key}`);
        return vars ? replaceVariables(translation, vars) : translation;
    };

    const content = `
        <h2 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 24px;">${t('title', { firstName })} 🎉</h2>
        <p style="font-size: 16px; color: #555; margin: 0 0 20px 0;">${t('verified')}</p>
        <p style="font-size: 16px; color: #555; margin: 0 0 20px 0;">${t('access')}</p>
        <p style="font-size: 14px; color: #666; margin-top: 30px;">${t('thanks')}</p>
    `;

    return EmailTemplateBuilder.buildBaseTemplate({
        title: t('footer.copyright'),
        content,
        footerText: t('footer.disclaimer')
    });
}

export function generateWelcomeEmailText(data: WelcomeEmailData): string {
    const { firstName, language } = data;
    const t = (key: string, vars?: Record<string, any>) => {
        const translation = getTranslation(language, `welcome.${key}`);
        return vars ? replaceVariables(translation, vars) : translation;
    };

    return `
${t('title', { firstName })}

${t('verified')}

${t('access')}

${t('thanks')}
    `.trim();
}

export function getWelcomeEmailSubject(firstName: string, language: string): string {
    const subject = getTranslation(language, 'welcome.subject');
    return replaceVariables(subject, { firstName });
}
