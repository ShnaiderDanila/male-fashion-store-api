import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateUserPasswordDto {
  @ApiProperty({ example: 'Test123!', description: 'Пароль' })
  @IsString({ message: 'Пароль должен быть строкой' })
  @Length(6, 30, {
    message: 'Длина пароля должна составлять от 6 до 30 символов',
  })
  readonly password: string;
}
