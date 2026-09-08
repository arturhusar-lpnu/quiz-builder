import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { GetQuestionsQuery } from './dtos/query.dto';
import {
  AddBooleanQuestionDto,
  AddCheckboxQuestionDto,
  AddInputQuestionDto,
  RemoveQuestionDto,
} from './dtos';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async get(@Query() query?: GetQuestionsQuery) {
    return this.questionsService.findMany(query);
  }

  @Post('boolean')
  async createBoolean(@Body() dto: AddBooleanQuestionDto) {
    return this.questionsService.create(dto);
  }

  @Post('input')
  async createInput(@Body() dto: AddInputQuestionDto) {
    return this.questionsService.create(dto);
  }

  @Post('checkbox')
  async createCheckbox(@Body() dto: AddCheckboxQuestionDto) {
    return this.questionsService.create(dto);
  }

  @Delete('remove')
  async remove(@Body() dto: RemoveQuestionDto) {
    return this.questionsService.remove(dto);
  }
}
