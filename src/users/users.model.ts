import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Order } from 'src/orders/orders.model';
import { Product } from 'src/products/products.model';
import { UserProducts } from 'src/userProducts/user-products-model';

interface UsersCreationAttrs {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UsersCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({ example: '79999999999', description: 'Номер телефона' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phoneNumber: string;

  @ApiProperty({
    example: 'улица Линейная, 47, Новосибирск, Россия',
    description: 'Адрес',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address: string;

  @ApiProperty({
    example: 'example@mail.ru',
    description: 'E-mail',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: 'Test123!', description: 'Пароль' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: [],
    description: 'Список избранных товаров',
  })
  @BelongsToMany(() => Product, () => UserProducts)
  wishlist: Product[];

  @ApiProperty({
    example: [],
    description: 'Список заказов',
  })
  @HasMany(() => Order)
  orders: Order[];
}

export class Token {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzExODg2MzYyLCJleHAiOjE3MTE5NzI3NjJ9.CeCJ6NznX6Je-nMto6O-QA52yEo1RNa3iJthTLH88a4',
    description: 'JWT токен',
  })
  @Column({
    type: DataType.STRING,
  })
  token: string;
}
