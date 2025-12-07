import { Controller, Post, Body, UseGuards, Get, Request, Response } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
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

        // Set JWT token in HttpOnly cookie
        res.cookie('access_token', result.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });

        // Return user data without token
        return res.json({ user: result.user });
    }

    @Post('login')
    @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 attempts per minute
    async login(@Body() loginDto: LoginDto, @Response() res: ExpressResponse) {
        const result = await this.authService.login(loginDto);

        // Set JWT token in HttpOnly cookie
        res.cookie('access_token', result.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });

        // Return user data without token
        return res.json({ user: result.user });
    }

    @Post('logout')
    async logout(@Response() res: ExpressResponse) {
        res.clearCookie('access_token');
        return res.json({ message: 'Logged out successfully' });
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return req.user;
    }
}
