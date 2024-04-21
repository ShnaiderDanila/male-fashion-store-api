import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Одежда', description: 'Тип товара' })
  @IsString({ message: 'Тип товара должен быть строкой' })
  @MinLength(1, { message: 'Минимальная длина типа товара - 1 символ' })
  type: string;

  @ApiProperty({ example: 'Футболка', description: 'Наименование' })
  @IsString({ message: 'Наименование товара должно быть строкой' })
  @MinLength(1, { message: 'Минимальная длина наименования товара - 1 символ' })
  name: string;

  @ApiProperty({ example: 'Lacoste', description: 'Бренд' })
  @IsString({ message: 'Бренд товара должен быть строкой' })
  @MinLength(1, { message: 'Минимальная длина бренда товара - 1 символ' })
  brand: string;

  @ApiProperty({ example: '5000', description: 'Цена (руб.)' })
  @IsString({ message: 'Цена товара должна быть строкой' })
  price: string;

  @ApiProperty({
    example: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Доступные размеры',
  })
  @IsArray({ message: 'Доступные размеры товара должны быть массивом строк' })
  availableSize: string[];

  @ApiProperty({ example: 'Черный', description: 'Цвет' })
  @IsString({ message: 'Цвет товара должен быть строкой' })
  @MinLength(1, { message: 'Минимальная длина цвета товара - 1 символ' })
  color: string;

  @ApiProperty({
    example: 'Материал: 100% хлопок',
    description: 'Описание',
  })
  @IsString({ message: 'Описание товара должно быть строкой' })
  @MinLength(1, { message: 'Минимальная длина описания товара - 1 символ' })
  description: string;

  @ApiProperty({
    example: 'a8c4d840-a8e5-4361-8586-fe7cfc7ca655.webp',
    description: 'Название файла-изображения',
  })
  image: string;

  @ApiProperty({
    example: '481924',
    description: 'Артикул',
  })
  @IsString({ message: 'Код товара товара должен быть строкой' })
  @MinLength(1, { message: 'Минимальная длина кода товара - 1 символ' })
  productCode: string;
}
