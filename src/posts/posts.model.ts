import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model } from 'sequelize-typescript';

interface PostsCreationAttrs {
  image: string;
  title: string;
  subTitle: string;
  description: string;
}

@Table({ tableName: 'posts' })
export class PostModel extends Model<PostModel, PostsCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '6385f806-2a15-400b-b422-1d68c0f382ef.webp',
    description: 'Имя файла картинки',
  })
  @Column({
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
  })
  image: string;

  @ApiProperty({
    example: 'KLEMAN: мануфактура с богатым наследием',
    description: 'Заголовок поста',
  })
  @Column({
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'Обувь, созданная вручную по высоким стандартам качества...',
    description: 'Подзаголовок поста',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  subTitle: string;

  @ApiProperty({
    example:
      'Когда дело доходит до выбора надежной, износостойкой и в то же время превосходно выглядящей обуви...',
    description: 'Описание поста',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;
}
