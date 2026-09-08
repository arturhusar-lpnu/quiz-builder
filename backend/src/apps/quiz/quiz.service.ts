import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateQuizDto, QuizDto } from './dtos';
import { QuizRepository } from './repo';
import { PaginationResponse } from '../shared/pagination/pagination';
import { BaseQuery } from '../shared/query';
import { RemoveQuestionDto } from '../questions/dtos';

@Injectable()
export class QuizService {
  constructor(private readonly quizRepository: QuizRepository) {}

  async create(dto: CreateQuizDto): Promise<QuizDto> {
    return this.quizRepository.create(dto);
  }

  async findById(id: number): Promise<QuizDto> {
    const quiz = await this.quizRepository.findById(id);

    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }

    return quiz;
  }

  async findMany(query?: BaseQuery): Promise<PaginationResponse<QuizDto>> {
    return this.quizRepository.findMany(query);
  }

  async delete(dto: RemoveQuestionDto): Promise<null> {
    await this.findById(dto.id);

    await this.quizRepository.delete(dto.id);

    return null;
  }
}
