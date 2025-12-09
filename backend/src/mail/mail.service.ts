import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import {
    generateVerificationEmailHtml,
    generateVerificationEmailText,
    getVerificationEmailSubject
} from './templates/verification-email.template';
import {
    generateWelcomeEmailHtml,
    generateWelcomeEmailText,
    getWelcomeEmailSubject
} from './templates/welcome-email.template';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);

    constructor() {
        // Initialize SendGrid with API key
        const apiKey = process.env.SENDGRID_API_KEY;
        if (apiKey) {
            sgMail.setApiKey(apiKey);
            this.logger.log('SendGrid initialized successfully');
        } else {
            this.logger.warn('SENDGRID_API_KEY not found - emails will only be logged');
        }
    }

    async sendVerificationEmail(email: string, token: string, language: string = 'en'): Promise<void> {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const verificationUrl = `${frontendUrl}/verify-email?token=${token}`;

        const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@yourdomain.com';

        const msg: any = {
            to: email,
            from: {
                email: fromEmail,
                name: 'TechStore'
            },
            subject: getVerificationEmailSubject(language),
            headers: {
                'X-Priority': '1',
                'X-MSMail-Priority': 'High',
                'Importance': 'high'
            },
            categories: ['email-verification', 'transactional'],
            html: generateVerificationEmailHtml({ verificationUrl, language }),
            text: generateVerificationEmailText({ verificationUrl, language }),
        };

        // Only add replyTo if we have a valid email
        if (fromEmail !== 'noreply@yourdomain.com') {
            msg.replyTo = fromEmail;
        }

        if (process.env.SENDGRID_API_KEY) {
            try {
                await sgMail.send(msg);
                this.logger.log(`Verification email sent to: ${email} (language: ${language})`);
            } catch (error) {
                this.logger.error(`Failed to send verification email to ${email}:`, error);
                throw error;
            }
        } else {
            // Fallback to logging if SendGrid is not configured
            this.logger.log(`
========================================
Email Verification for: ${email}
Language: ${language}
========================================
Verification URL: ${verificationUrl}
========================================
            `);
        }
    }

    async sendWelcomeEmail(email: string, firstName: string, language: string = 'en'): Promise<void> {
        const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@yourdomain.com';

        const msg: any = {
            to: email,
            from: {
                email: fromEmail,
                name: 'TechStore'
            },
            subject: getWelcomeEmailSubject(firstName, language),
            categories: ['welcome', 'transactional'],
            html: generateWelcomeEmailHtml({ firstName, language }),
            text: generateWelcomeEmailText({ firstName, language }),
        };

        // Only add replyTo if we have a valid email
        if (fromEmail !== 'noreply@yourdomain.com') {
            msg.replyTo = fromEmail;
        }

        try {
            if (process.env.SENDGRID_API_KEY) {
                await sgMail.send(msg);
                this.logger.log(`Welcome email sent to: ${email} (language: ${language})`);
            } else {
                this.logger.log(`Welcome email would be sent to: ${email} (${firstName}, language: ${language})`);
            }
        } catch (error) {
            this.logger.error(`Failed to send welcome email to ${email}:`, error);
            // Don't throw error for welcome email, just log it
        }
    }
}
