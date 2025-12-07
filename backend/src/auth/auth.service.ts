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

    async register(registerDto: RegisterDto) {
        const { email, password, firstName, lastName, phonePrefix, phoneNumber, deliveryAddress, deliveryCity, deliveryPostalCode, deliveryCountry, billingAddress, billingCity, billingPostalCode, billingCountry } = registerDto;

        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        // Hash password with bcrypt (salt rounds: 12 for strong security)
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await this.prisma.user.create({
            data: {
                email,
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

        // Generate JWT token
        const token = this.generateToken(user.id, user.email);

        return {
            access_token: token,
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
            },
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // Find user by email
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Verify password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate JWT token
        const token = this.generateToken(user.id, user.email);

        return {
            access_token: token,
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

    private generateToken(userId: number, email: string): string {
        const payload = { sub: userId, email };
        return this.jwtService.sign(payload);
    }
}
