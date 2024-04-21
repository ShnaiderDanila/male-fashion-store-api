import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Product } from 'src/products/products.model';
import { UserProducts } from 'src/userProducts/user-products-model';
import { AuthModule } from 'src/auth/auth.module';
import { Order } from 'src/orders/orders.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Product, UserProducts, Order]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
