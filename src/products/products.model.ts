import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserProducts } from 'src/userProducts/user-products-model';
import { User } from 'src/users/users.model';

interface ProductsCreationAttrs {
  type: string;
  name: string;
  brand: string;
  price: string;
  availableSize: string[];
  color: string;
  description: string;
  image: string;
  productCode: string;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductsCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Одежда', description: 'Тип товара' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @ApiProperty({ example: 'Футболка', description: 'Наименование' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'Lacoste', description: 'Бренд' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  brand: string;

  @ApiProperty({ example: '5000', description: 'Цена (руб.)' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  price: string;

  @ApiProperty({
    example: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Доступные размеры',
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  availableSize: string[];

  @ApiProperty({ example: 'Черный', description: 'Цвет' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @ApiProperty({
    example: 'Материал: 100% хлопок',
    description: 'Описание',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: 'a8c4d840-a8e5-4361-8586-fe7cfc7ca655.webp',
    description: 'Название файла-изображения',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  image: string;

  @ApiProperty({
    example: '481924',
    description: 'Артикул',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  productCode: string;

  @BelongsToMany(() => User, () => UserProducts)
  users: User[];
}
