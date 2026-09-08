import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsString,
  IsArray,
  ValidateNested,
  IsIn,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

abstract class BaseAddQuestionDto {
  @ApiProperty({
    description: 'ID of the quiz this question belongs to',
    example: 1,
  })
  @IsNumber()
  quizId: number;

  @ApiProperty({
    description: 'Title of the question',
    example: 'What is 2 + 2?',
  })
  @IsString()
  title: string;
}

export class AddBooleanQuestionDto extends BaseAddQuestionDto {
  @ApiProperty({
    description: 'Type of question',
    example: 'boolean',
    enum: ['boolean'],
  })
  @IsIn(['boolean'])
  type: 'boolean';

  @ApiProperty({
    description: 'Correct answer for boolean question',
    example: true,
  })
  @IsBoolean()
  answer: boolean;
}

export class AddInputQuestionDto extends BaseAddQuestionDto {
  @ApiProperty({
    description: 'Type of question',
    example: 'input',
    enum: ['input'],
  })
  @IsIn(['input'])
  type: 'input';

  @ApiProperty({
    description: 'Correct answer for input question',
    example: 'Paris',
  })
  @IsString()
  answer: string;
}

class CheckboxOptionDto {
  @ApiProperty({
    description: 'Option text',
    example: 'Option A',
  })
  @IsString()
  option: string;
}

export class AddCheckboxQuestionDto extends BaseAddQuestionDto {
  @ApiProperty({
    description: 'Type of question',
    example: 'checkbox',
    enum: ['checkbox'],
  })
  @IsIn(['checkbox'])
  type: 'checkbox';

  @ApiProperty({
    description: 'Array of checkbox options',
    type: [CheckboxOptionDto],
    example: [{ option: 'Option A' }, { option: 'Option B' }],
  })
  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => CheckboxOptionDto)
  options: CheckboxOptionDto[];

  @ApiProperty({
    description: 'Array of correct answer indices',
    type: [Number],
    example: [0, 1],
  })
  @IsArray()
  @IsInt({ each: true })
  answers: number[];
}

export type AddQuestionDto =
  AddBooleanQuestionDto | AddInputQuestionDto | AddCheckboxQuestionDto;
