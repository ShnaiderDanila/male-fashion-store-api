import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

export interface OrderedProduct {
  id: number;
  type: string;
  name: string;
  brand: string;
  price: number;
  size: string;
  color: string;
  description: string;
  image: string;
  productCode: number;
  count: number;
}

interface OrdersCreationAttrs {
  products: OrderedProduct[];
  totalPrice: number;
  address: string;
  deliveryMethod: string;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrdersCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: [
      {
        image: 'Название файла картинки в БД',
        name: 'Мужской пуховик Amsterdam',
        brand: 'Weekend Offender',
        price: 15540,
        size: 'M',
        count: 1,
        productCode: 451189,
      },
    ],
    description: 'Заказанные продукты',
  })
  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  products: OrderedProduct[];

  @ApiProperty({
    example: 'улица Линейная, 47, Новосибирск, Россия',
    description: 'Адрес доставки',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  totalPrice: number;

  @ApiProperty({
    example: 'улица Линейная, 47, Новосибирск, Россия',
    description: 'Адрес доставки',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @ApiProperty({
    example: 'Почта России',
    description: 'Способ доставки',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  deliveryMethod: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  buyer: User;
}
