import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { BaseQuery } from '../shared/query';
import { CreateQuizDto, RemoveQuizDto } from './dtos';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async get(@Query() query?: BaseQuery) {
    return this.quizService.findMany(query);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.quizService.findById(id);
  }

  @Post('create')
  async create(@Body() dto: CreateQuizDto) {
    return this.quizService.create(dto);
  }

  @Delete('remove')
  async remove(@Body() dto: RemoveQuizDto) {
    return this.quizService.delete(dto);
  }
}
