import { Controller, Post, Body, UseGuards, Get, Request, Response, Query } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('check-email')
    @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 requests per minute
    async checkEmail(@Body() body: { email: string }) {
        return this.authService.checkEmailExists(body.email);
    }

    @Post('register')
    @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 attempts per minute
    async register(@Body() registerDto: RegisterDto, @Response() res: ExpressResponse) {
        const result = await this.authService.register(registerDto);

        // Don't set tokens - user must verify email first
        // No auto-login during registration

        // Return success message only
        return res.json({
            message: 'Registration successful. Please check your email to verify your account.',
            user: {
                email: result.user.email,
                firstName: result.user.firstName,
                lastName: result.user.lastName
            }
        });
    }

    @Post('login')
    @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 attempts per minute
    async login(@Body() loginDto: LoginDto, @Response() res: ExpressResponse) {
        const result = await this.authService.login(loginDto);

        // Set JWT tokens in HttpOnly cookies
        res.cookie('access_token', result.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.cookie('refresh_token', result.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });

        // Return user data without token
        return res.json({ user: result.user });
    }

    @Post('refresh')
    async refresh(@Request() req, @Response() res: ExpressResponse) {
        const refreshToken = req.cookies?.refresh_token;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token not found' });
        }

        const result = await this.authService.refreshTokens(refreshToken);

        // Set new tokens in HttpOnly cookies
        res.cookie('access_token', result.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.cookie('refresh_token', result.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });

        return res.json({ message: 'Tokens refreshed successfully' });
    }

    @Post('logout')
    async logout(@Response() res: ExpressResponse) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return res.json({ message: 'Logged out successfully' });
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return req.user;
    }

    @Post('verify-email')
    @Throttle({ default: { limit: 5, ttl: 60000 } })
    async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
        return this.authService.verifyEmail(verifyEmailDto.token);
    }

    @Post('resend-verification')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    async resendVerification(@Body() resendDto: ResendVerificationDto) {
        return this.authService.resendVerificationEmail(resendDto.email);
    }
}
