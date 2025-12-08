import { IsEmail, IsNotEmpty, IsString, IsNumber, IsOptional, IsArray, ValidateNested, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  productName: any;

  @IsNumber()
  @IsNotEmpty()
  productPrice: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+\d+$/, {
    message: 'Phone prefix must start with + followed by digits',
  })
  phonePrefix?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d+$/, {
    message: 'Phone number can only contain digits',
  })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  deliveryMethod?: string;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
