import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: '6385f806-2a15-400b-b422-1d68c0f382ef.webp',
    description: 'Имя файла картинки',
  })
  image: string;

  @IsString({ message: 'Заголовок поста должен быть строкой' })
  @MinLength(1, { message: 'Минимальная длина заголовка поста - 1 символ' })
  @ApiProperty({
    example: 'KLEMAN: мануфактура с богатым наследием',
    description: 'Заголовок поста',
  })
  title: string;

  @IsString({ message: 'Подзаголовок поста должен быть строкой' })
  @MinLength(1, { message: 'Минимальная длина подзаголовка поста - 1 символ' })
  @ApiProperty({
    example: 'Обувь, созданная вручную по высоким стандартам качества...',
    description: 'Подзаголовок поста',
  })
  subTitle: string;

  @IsString({ message: 'Описание поста должно быть строкой' })
  @MinLength(1, { message: 'Минимальная длина описания поста - 1 символ' })
  @ApiProperty({
    example:
      'Когда дело доходит до выбора надежной, износостойкой и в то же время превосходно выглядящей обуви...',
    description: 'Описание поста',
  })
  description: string;
}
