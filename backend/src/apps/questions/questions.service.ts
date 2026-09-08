import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GetQuestionsQuery } from './dtos/query.dto';
import { AddQuestionDto, RemoveQuestionDto } from './dtos';
import { QuestionRepository } from './repo';

@Injectable()
export class QuestionsService {
  constructor(private readonly repo: QuestionRepository) {}

  async findMany(query?: GetQuestionsQuery) {
    return this.repo.findMany(query);
  }

  async create(dto: AddQuestionDto) {
    const question = await this.repo.findOne({
      title: dto.title,
      quizId: dto.quizId,
    });

    if (question) {
      throw new ConflictException(`This question already exists`);
    }

    return this.repo.create(dto);
  }

  async remove(dto: RemoveQuestionDto) {
    const question = await this.repo.findById(dto.id);

    if (!question) {
      throw new NotFoundException(`Question with id ${dto.id} not found`);
    }

    return this.repo.delete(dto.id);
  }
}
