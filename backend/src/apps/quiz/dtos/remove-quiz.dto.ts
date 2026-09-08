import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveQuizDto {
  @ApiProperty({
    description: 'ID of the quiz to remove',
    example: 1,
  })
  @IsNumber()
  id: number;
}
