import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.product.findMany();
  }

  getById(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }
}
