import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async checkEmailExists(email: string) {
        // Normalize email to lowercase
        const normalizedEmail = email.toLowerCase();

        const existingUser = await this.prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        return { exists: !!existingUser };
    }

    async register(registerDto: RegisterDto) {
        const { email, password, firstName, lastName, phonePrefix, phoneNumber, deliveryAddress, deliveryCity, deliveryPostalCode, deliveryCountry, billingAddress, billingCity, billingPostalCode, billingCountry } = registerDto;

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

        // Create user
        const user = await this.prisma.user.create({
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
            },
        });

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
        return this.jwtService.sign(payload, { expiresIn: '7d' });
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
}
