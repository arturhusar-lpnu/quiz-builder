import { Module } from '@nestjs/common';
import { QuizModule } from './apps/quiz/quiz.module';
import { QuestionsModule } from './apps/questions/questions.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    QuizModule,
    QuestionsModule,
  ],
})
export class AppModule {}
