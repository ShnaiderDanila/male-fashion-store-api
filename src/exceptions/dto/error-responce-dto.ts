import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponceDto {
  @ApiProperty({
    description: 'Текст ошибки',
  })
  message: string;

  @ApiProperty({
    description: 'Тип ошибки',
  })
  error: string;

  @ApiProperty({
    description: 'Статус код ошибки',
  })
  statusCode: number;
}
