import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { QuizRepository } from './repo';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';

@Module({
  imports: [PrismaModule],
  providers: [QuizRepository, QuizService],
  controllers: [QuizController],
})
export class QuizModule {}
