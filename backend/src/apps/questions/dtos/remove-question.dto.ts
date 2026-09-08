import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveQuestionDto {
  @ApiProperty({
    description: 'ID of the question to remove',
    example: 1,
  })
  @IsNumber()
  id: number;
}
