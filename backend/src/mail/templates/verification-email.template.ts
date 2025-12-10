import { EmailTemplateBuilder } from './email-template.builder';
import { getTranslation, replaceVariables } from '../../i18n/email.translations';

export interface VerificationEmailData {
    verificationUrl: string;
    language: string;
}

export function generateVerificationEmailHtml(data: VerificationEmailData): string {
    const { verificationUrl, language } = data;
    const t = (key: string, vars?: Record<string, any>) => {
        const translation = getTranslation(language, `verification.${key}`);
        return vars ? replaceVariables(translation, vars) : translation;
    };

    const content = `
        <h2 style="color: #ffffff !important; margin: 0 0 20px 0; font-size: 24px;">${t('title')}</h2>
        <p style="font-size: 16px; color: #ffffff !important; margin: 0 0 20px 0;">${t('greeting')}</p>
        <p style="font-size: 16px; color: #ffffff !important; margin: 0 0 20px 0;">${t('message')}</p>
        ${EmailTemplateBuilder.buildButton(verificationUrl, t('button'))}
        ${EmailTemplateBuilder.buildLinkBox(verificationUrl, t('orCopy'))}
        ${EmailTemplateBuilder.buildInfoBox([
            `⏱️ ${t('expiresIn')} <strong>${t('hours')}</strong>.`,
            `🔒 ${t('securityNote')}`
        ])}
    `;

    return EmailTemplateBuilder.buildBaseTemplate({
        title: t('footer.copyright'),
        content,
        footerText: t('footer.disclaimer')
    });
}

export function generateVerificationEmailText(data: VerificationEmailData): string {
    const { verificationUrl, language } = data;
    const t = (key: string) => getTranslation(language, `verification.${key}`);

    return `
${t('greeting')}

${t('message')}

${t('button')}: ${verificationUrl}

${t('expiresIn')} ${t('hours')}.

${t('securityNote')}
    `.trim();
}

export function getVerificationEmailSubject(language: string): string {
    return getTranslation(language, 'verification.subject');
}
