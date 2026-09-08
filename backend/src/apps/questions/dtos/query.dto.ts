import { BaseQuery } from '@/apps/shared/query';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, Min } from 'class-validator';

export class GetQuestionsQuery extends BaseQuery {
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @Min(1)
  quizId: number;
}
