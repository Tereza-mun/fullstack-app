import { Injectable, UnauthorizedException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { verifyRecaptcha } from '../utils/recaptcha';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private mailService: MailService,
    ) {}

    async checkEmailExists(email: string) {
        // Normalize email to lowercase
        const normalizedEmail = email.toLowerCase();

        const existingUser = await this.prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        // Add artificial delay to prevent timing attacks
        // This makes the response time consistent regardless of whether the email exists
        const delay = Math.floor(Math.random() * 50) + 50; // 50-100ms random delay
        await new Promise(resolve => setTimeout(resolve, delay));

        // For security, we return a generic message instead of revealing if email exists
        // This prevents email enumeration attacks
        return { exists: !!existingUser };
    }

    async register(registerDto: RegisterDto) {
        const { email, password, firstName, lastName, phonePrefix, phoneNumber, deliveryAddress, deliveryCity, deliveryPostalCode, deliveryCountry, billingAddress, billingCity, billingPostalCode, billingCountry, language, recaptchaToken } = registerDto;

        // Verify reCAPTCHA token
        if (recaptchaToken) {
            const isValidCaptcha = await verifyRecaptcha(recaptchaToken);
            if (!isValidCaptcha) {
                throw new BadRequestException('reCAPTCHA verification failed. Please try again.');
            }
        }

        // Normalize email to lowercase
        const normalizedEmail = email.toLowerCase();

        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        // Hash password with bcrypt (salt rounds: 12 for strong security)
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate email verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationExpires = new Date();
        verificationExpires.setHours(verificationExpires.getHours() + 24); // 24 hours

        let user;

        try {
            this.logger.log('Creating user...');
            // Create user
            user = await this.prisma.user.create({
                data: {
                    email: normalizedEmail,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    phonePrefix,
                    phoneNumber,
                    deliveryAddress,
                    deliveryCity,
                    deliveryPostalCode,
                    deliveryCountry,
                    billingAddress,
                    billingCity,
                    billingPostalCode,
                    billingCountry,
                    isEmailVerified: false,
                    emailVerificationToken: verificationToken,
                    emailVerificationExpires: verificationExpires,
                    language: language || 'en',
                },
            });

            this.logger.log(`User created successfully: ${user.email}`);

            // Send verification email - CRITICAL: If this fails, rollback user creation
            this.logger.log('Sending verification email...');
            await this.mailService.sendVerificationEmail(user.email, verificationToken, language || 'en');
            this.logger.log('Verification email sent successfully from auth.service');
        } catch (error) {
            this.logger.error('Error in try block:', error);
            // If email sending failed and user was created, delete the user
            if (user) {
                this.logger.log('Rolling back user creation...');
                await this.prisma.user.delete({
                    where: { id: user.id },
                }).catch(() => {
                    // Log but don't throw - already in error state
                    this.logger.error('Failed to rollback user creation after email error');
                });
            }

            // Re-throw the error
            throw new Error('Failed to send verification email. Please try again or contact support.');
        }

        // Don't generate tokens - user must verify email first
        // No auto-login during registration

        return {
            access_token: '', // No token until email verified
            refresh_token: '', // No token until email verified
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phonePrefix: user.phonePrefix,
                phoneNumber: user.phoneNumber,
                deliveryAddress: user.deliveryAddress,
                deliveryCity: user.deliveryCity,
                deliveryPostalCode: user.deliveryPostalCode,
                deliveryCountry: user.deliveryCountry,
                billingAddress: user.billingAddress,
                billingCity: user.billingCity,
                billingPostalCode: user.billingPostalCode,
                billingCountry: user.billingCountry,
            },
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // Normalize email to lowercase
        const normalizedEmail = email.toLowerCase();

        // Find user by email
        const user = await this.prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Verify password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Check if email is verified
        if (!user.isEmailVerified) {
            throw new UnauthorizedException('Please verify your email address before logging in. Check your inbox for the verification link.');
        }

        // Generate JWT tokens
        const accessToken = this.generateAccessToken(user.id, user.email);
        const refreshToken = this.generateRefreshToken(user.id, user.email);

        // Store refresh token in database
        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken },
        });

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phonePrefix: user.phonePrefix,
                phoneNumber: user.phoneNumber,
                deliveryAddress: user.deliveryAddress,
                deliveryCity: user.deliveryCity,
                deliveryPostalCode: user.deliveryPostalCode,
                deliveryCountry: user.deliveryCountry,
                billingAddress: user.billingAddress,
                billingCity: user.billingCity,
                billingPostalCode: user.billingPostalCode,
                billingCountry: user.billingCountry,
            },
        };
    }

    async validateUser(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phonePrefix: user.phonePrefix,
            phoneNumber: user.phoneNumber,
            deliveryAddress: user.deliveryAddress,
            deliveryCity: user.deliveryCity,
            deliveryPostalCode: user.deliveryPostalCode,
            deliveryCountry: user.deliveryCountry,
        };
    }

    private generateAccessToken(userId: number, email: string): string {
        const payload = { sub: userId, email };
        return this.jwtService.sign(payload, { expiresIn: '15m' });
    }

    private generateRefreshToken(userId: number, email: string): string {
        const payload = { sub: userId, email, type: 'refresh' };
        return this.jwtService.sign(payload, { expiresIn: '24h' });
    }

    async refreshTokens(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken);

            if (payload.type !== 'refresh') {
                throw new UnauthorizedException('Invalid token type');
            }

            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
            });

            if (!user || user.refreshToken !== refreshToken) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            // Generate new tokens
            const newAccessToken = this.generateAccessToken(user.id, user.email);
            const newRefreshToken = this.generateRefreshToken(user.id, user.email);

            // Update refresh token in database
            await this.prisma.user.update({
                where: { id: user.id },
                data: { refreshToken: newRefreshToken },
            });

            return {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
    }

    async verifyEmail(token: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                emailVerificationToken: token,
                emailVerificationExpires: {
                    gte: new Date(),
                },
            },
        });

        if (!user) {
            throw new BadRequestException('Invalid or expired verification token');
        }

        // Update user to verified
        const updatedUser = await this.prisma.user.update({
            where: { id: user.id },
            data: {
                isEmailVerified: true,
                emailVerificationToken: null,
                emailVerificationExpires: null,
            },
        });

        // Send welcome email in user's language
        await this.mailService.sendWelcomeEmail(updatedUser.email, updatedUser.firstName, updatedUser.language);

        return { message: 'Email verified successfully' };
    }

    async resendVerificationEmail(email: string) {
        const normalizedEmail = email.toLowerCase();

        const user = await this.prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (!user) {
            // Don't reveal if user exists
            return { message: 'If the email exists, a verification link has been sent' };
        }

        if (user.isEmailVerified) {
            throw new BadRequestException('Email is already verified');
        }

        // Generate new verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationExpires = new Date();
        verificationExpires.setHours(verificationExpires.getHours() + 24);

        // Update user with new token
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerificationToken: verificationToken,
                emailVerificationExpires: verificationExpires,
            },
        });

        // Send verification email in user's language
        await this.mailService.sendVerificationEmail(user.email, verificationToken, user.language);

        return { message: 'Verification email sent' };
    }

    async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: updateProfileDto,
        });

        return {
            id: updatedUser.id,
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            phonePrefix: updatedUser.phonePrefix,
            phoneNumber: updatedUser.phoneNumber,
            deliveryAddress: updatedUser.deliveryAddress,
            deliveryCity: updatedUser.deliveryCity,
            deliveryPostalCode: updatedUser.deliveryPostalCode,
            deliveryCountry: updatedUser.deliveryCountry,
            billingAddress: updatedUser.billingAddress,
            billingCity: updatedUser.billingCity,
            billingPostalCode: updatedUser.billingPostalCode,
            billingCountry: updatedUser.billingCountry,
        };
    }
}
