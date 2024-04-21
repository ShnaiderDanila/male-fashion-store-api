import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @MinLength(1, { message: 'Минимальная длина имени пользователя - 1 символ' })
  readonly firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @IsString({ message: 'Фамилия пользователя должна быть строкой' })
  @MinLength(1, {
    message: 'Минимальная длина фамилии пользователя - 1 символ',
  })
  readonly lastName: string;

  @ApiProperty({ example: '79999999999', description: 'Номер телефона' })
  @IsString({ message: 'Номер телефона должен быть строкой' })
  @Length(11, 11, { message: 'Номер телефона должен состоять из 11 цифр' })
  readonly phoneNumber: string;

  @ApiProperty({
    example: 'example@mail.ru',
    description: 'E-mail',
  })
  @IsString({ message: 'Email должен быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: 'Test123!', description: 'Пароль' })
  @IsString({ message: 'Пароль должен быть строкой' })
  @Length(6, 30, {
    message: 'Длина пароля должна составлять от 6 до 30 символов',
  })
  readonly password: string;
}
