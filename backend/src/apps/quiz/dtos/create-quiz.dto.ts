import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({
    description: 'Title of the quiz',
    example: 'General Knowledge Quiz',
  })
  @IsString()
  title: string;
}
