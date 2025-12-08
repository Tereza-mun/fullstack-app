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
            from: {
                email: process.env.SENDGRID_FROM_EMAIL || 'noreply@yourdomain.com',
                name: 'TechStore'
            },
            replyTo: process.env.SENDGRID_FROM_EMAIL,
            subject: 'Please verify your TechStore account',
            // Important headers for better deliverability
            headers: {
                'X-Priority': '1',
                'X-MSMail-Priority': 'High',
                'Importance': 'high'
            },
            // Categories help with tracking and deliverability
            categories: ['email-verification', 'transactional'],
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                    <!-- Header -->
                                    <tr>
                                        <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
                                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">TechStore</h1>
                                        </td>
                                    </tr>
                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 40px 30px;">
                                            <h2 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 24px;">Verify Your Email Address</h2>
                                            <p style="font-size: 16px; color: #555; margin: 0 0 20px 0;">Thank you for registering with TechStore! To complete your registration and start shopping, please verify your email address.</p>
                                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                                <tr>
                                                    <td align="center">
                                                        <a href="${verificationUrl}" style="display: inline-block; background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(52, 152, 219, 0.3);">
                                                            Verify Email Address
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                            <p style="font-size: 14px; color: #777; margin: 20px 0 10px 0;">Or copy and paste this link into your browser:</p>
                                            <p style="font-size: 13px; color: #3498db; word-break: break-all; background-color: #f8f9fa; padding: 12px; border-radius: 4px; border-left: 3px solid #3498db;">${verificationUrl}</p>
                                            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                                                <p style="font-size: 13px; color: #999; margin: 0 0 10px 0;">⏱️ This verification link will expire in <strong>24 hours</strong>.</p>
                                                <p style="font-size: 13px; color: #999; margin: 0;">🔒 This is an automated security email. If you didn't create an account, you can safely ignore this message.</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- Footer -->
                                    <tr>
                                        <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                                            <p style="font-size: 12px; color: #999; margin: 0 0 5px 0;">© ${new Date().getFullYear()} TechStore. All rights reserved.</p>
                                            <p style="font-size: 11px; color: #bbb; margin: 0;">This is a transactional email. You received this because you registered on our platform.</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
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
            from: {
                email: process.env.SENDGRID_FROM_EMAIL || 'noreply@yourdomain.com',
                name: 'TechStore'
            },
            replyTo: process.env.SENDGRID_FROM_EMAIL,
            subject: `Welcome to TechStore, ${firstName}!`,
            categories: ['welcome', 'transactional'],
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
