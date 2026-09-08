import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { QuestionRepository } from './repo';

@Module({
  imports: [PrismaModule],
  providers: [QuestionsService, QuestionRepository],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
