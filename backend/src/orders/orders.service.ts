import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(orderData: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: {
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        phone: orderData.phone,
        address: orderData.address,
        city: orderData.city,
        postalCode: orderData.postalCode,
        country: orderData.country,
        notes: orderData.notes,
        deliveryMethod: orderData.deliveryMethod || 'delivery',
        paymentMethod: orderData.paymentMethod || 'cash',
        totalPrice: orderData.totalPrice,
        items: {
          create: orderData.items.map(item => ({
            productId: item.productId,
            productName: item.productName,
            productPrice: item.productPrice,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return order;
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
  }
}
