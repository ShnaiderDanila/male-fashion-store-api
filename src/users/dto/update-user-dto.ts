import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @IsOptional()
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @MinLength(1, { message: 'Минимальная длина имени пользователя - 1 символ' })
  readonly firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @IsOptional()
  @IsString({ message: 'Фамилия пользователя должна быть строкой' })
  @MinLength(1, {
    message: 'Минимальная длина фамилии пользователя - 1 символ',
  })
  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  readonly lastName: string;

  @ApiProperty({ example: '79999999999', description: 'Номер телефона' })
  @IsOptional()
  @IsString({ message: 'Номер телефона должен быть строкой' })
  @Length(11, 11, { message: 'Номер телефона должен состоять из 11 цифр' })
  @ApiProperty({ example: '79999999999', description: 'Номер телефона' })
  readonly phoneNumber: string;

  @ApiProperty({
    example: 'example@mail.ru',
    description: 'E-mail',
  })
  @IsOptional()
  @IsString({ message: 'Email должен быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({
    example: 'улица Линейная, 47, Новосибирск, Россия',
    description: 'Адрес',
  })
  @IsOptional()
  @IsString({ message: 'Адрес должен быть строкой' })
  readonly address: string;
}
