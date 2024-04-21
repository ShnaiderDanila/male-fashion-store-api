import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'example@mail.ru',
    description: 'E-mail',
  })
  @IsString({ message: 'Email должен быть строкой' })
  readonly email: string;

  @ApiProperty({ example: 'Test123!', description: 'Пароль' })
  @IsString({ message: 'Пароль должен быть строкой' })
  readonly password: string;
}
