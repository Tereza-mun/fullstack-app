import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
    @IsEmail({}, { message: 'Please enter a valid email address' })
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, {
        message: 'Password must contain at least 1 uppercase letter, 1 number, and 1 special character'
    })
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\+\d+$/, { message: 'Phone prefix must start with + followed by digits' })
    phonePrefix: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\d+$/, { message: 'Phone number can only contain digits' })
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    deliveryAddress: string;

    @IsString()
    @IsNotEmpty()
    deliveryCity: string;

    @IsString()
    @IsNotEmpty()
    deliveryPostalCode: string;

    @IsString()
    @IsNotEmpty()
    deliveryCountry: string;

    @IsString()
    @IsOptional()
    billingAddress?: string;

    @IsString()
    @IsOptional()
    billingCity?: string;

    @IsString()
    @IsOptional()
    billingPostalCode?: string;

    @IsString()
    @IsOptional()
    billingCountry?: string;

    @IsString()
    @IsOptional()
    language?: string;
}
