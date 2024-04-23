import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { Product } from './products/products.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import * as path from 'path';
import { User } from './users/users.model';
import { UserProducts } from './userProducts/user-products-model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PostModel } from './posts/posts.model';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/orders.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve('./uploads'),
      serveRoot: '/api',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Product, User, UserProducts, PostModel, Order],
      autoLoadModels: true,
    }),
    ProductsModule,
    FilesModule,
    UsersModule,
    AuthModule,
    PostsModule,
    OrdersModule,
  ],
})
export class AppModule {}
