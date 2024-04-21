import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products.model';
import { FilesModule } from '../files/files.module';
import { User } from 'src/users/users.model';
import { UserProducts } from 'src/userProducts/user-products-model';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([Product, User, UserProducts]),
    UsersModule,
    FilesModule,
    AuthModule,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
