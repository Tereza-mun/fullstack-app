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

        const msg = {
            to: email,
            from: {
                email: process.env.SENDGRID_FROM_EMAIL || 'noreply@yourdomain.com',
                name: 'TechStore'
            },
            replyTo: process.env.SENDGRID_FROM_EMAIL,
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

        try {
            if (process.env.SENDGRID_API_KEY) {
                await sgMail.send(msg);
                this.logger.log(`Verification email sent to: ${email} (language: ${language})`);
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
        } catch (error) {
            this.logger.error(`Failed to send verification email to ${email}:`, error);
            throw error;
        }
    }

    async sendWelcomeEmail(email: string, firstName: string, language: string = 'en'): Promise<void> {
        const msg = {
            to: email,
            from: {
                email: process.env.SENDGRID_FROM_EMAIL || 'noreply@yourdomain.com',
                name: 'TechStore'
            },
            replyTo: process.env.SENDGRID_FROM_EMAIL,
            subject: getWelcomeEmailSubject(firstName, language),
            categories: ['welcome', 'transactional'],
            html: generateWelcomeEmailHtml({ firstName, language }),
            text: generateWelcomeEmailText({ firstName, language }),
        };

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
