import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsArray } from 'class-validator';

import { OrderedProduct } from '../orders.model';

export class CreateOrderDto {
  @IsArray({ message: 'Продукты в заказе должны быть массивом' })
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
  products: OrderedProduct[];

  @IsString({ message: 'Адрес должен быть строкой' })
  @MinLength(1, { message: 'Минимальная длина адреса доставки - 1 символ' })
  @ApiProperty({
    example: 'улица Линейная, 47, Новосибирск, Россия',
    description: 'Адрес доставки',
  })
  address: string;

  @IsString({ message: 'Способ доставки должен быть строкой' })
  @MinLength(1, { message: 'Минимальная длина способа доставки - 1 символ' })
  @ApiProperty({
    example: 'Почта России',
    description: 'Способ доставки',
  })
  deliveryMethod: string;
}
