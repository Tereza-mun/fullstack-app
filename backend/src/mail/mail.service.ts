import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

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

    async sendVerificationEmail(email: string, token: string): Promise<void> {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const verificationUrl = `${frontendUrl}/verify-email?token=${token}`;

        const msg = {
            to: email,
            from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yourdomain.com', // Use your verified sender
            subject: 'Verify your email address',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px;">
                        <h1 style="color: #2c3e50; margin-bottom: 20px;">Email Verification</h1>
                        <p style="font-size: 16px; margin-bottom: 20px;">Thank you for registering! Please verify your email address by clicking the button below:</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${verificationUrl}"
                               style="background-color: #3498db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                                Verify Email Address
                            </a>
                        </div>
                        <p style="font-size: 14px; color: #666; margin-top: 20px;">Or copy and paste this link into your browser:</p>
                        <p style="font-size: 12px; color: #999; word-break: break-all;">${verificationUrl}</p>
                        <p style="font-size: 14px; color: #666; margin-top: 30px;">This link will expire in 24 hours.</p>
                        <p style="font-size: 12px; color: #999; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
                            If you didn't request this verification, please ignore this email.
                        </p>
                    </div>
                </body>
                </html>
            `,
            text: `Please verify your email address by visiting: ${verificationUrl}\n\nThis link will expire in 24 hours.`,
        };

        try {
            if (process.env.SENDGRID_API_KEY) {
                await sgMail.send(msg);
                this.logger.log(`Verification email sent to: ${email}`);
            } else {
                // Fallback to logging if SendGrid is not configured
                this.logger.log(`
========================================
Email Verification for: ${email}
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

    async sendWelcomeEmail(email: string, firstName: string): Promise<void> {
        const msg = {
            to: email,
            from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yourdomain.com',
            subject: 'Welcome to our platform!',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px;">
                        <h1 style="color: #2c3e50; margin-bottom: 20px;">Welcome, ${firstName}! 🎉</h1>
                        <p style="font-size: 16px; margin-bottom: 20px;">Your email has been successfully verified.</p>
                        <p style="font-size: 16px; margin-bottom: 20px;">You can now access all features of your account.</p>
                        <p style="font-size: 14px; color: #666; margin-top: 30px;">Thank you for joining us!</p>
                    </div>
                </body>
                </html>
            `,
            text: `Welcome, ${firstName}!\n\nYour email has been successfully verified. You can now access all features of your account.\n\nThank you for joining us!`,
        };

        try {
            if (process.env.SENDGRID_API_KEY) {
                await sgMail.send(msg);
                this.logger.log(`Welcome email sent to: ${email}`);
            } else {
                this.logger.log(`Welcome email would be sent to: ${email} (${firstName})`);
            }
        } catch (error) {
            this.logger.error(`Failed to send welcome email to ${email}:`, error);
            // Don't throw error for welcome email, just log it
        }
    }
}
