import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';


@Module({
    imports: [ProductsModule, OrdersModule, AuthModule],
    providers: [PrismaService],
})
export class AppModule {}