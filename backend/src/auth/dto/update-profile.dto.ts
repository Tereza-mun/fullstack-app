import { IsOptional, IsString, Matches } from 'class-validator';

export class UpdateProfileDto {
    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    @Matches(/^\+\d+$/, { message: 'Phone prefix must start with + followed by digits' })
    phonePrefix?: string;

    @IsString()
    @IsOptional()
    @Matches(/^\d+$/, { message: 'Phone number can only contain digits' })
    phoneNumber?: string;

    @IsString()
    @IsOptional()
    deliveryAddress?: string;

    @IsString()
    @IsOptional()
    deliveryCity?: string;

    @IsString()
    @IsOptional()
    deliveryPostalCode?: string;

    @IsString()
    @IsOptional()
    deliveryCountry?: string;

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
}
