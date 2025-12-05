import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { OrdersModule } from './orders/orders.module';


@Module({
    imports: [ProductsModule, OrdersModule],
    providers: [PrismaService],
})
export class AppModule {}