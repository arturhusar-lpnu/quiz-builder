import { Prisma } from '@prisma/client';
import { QuizDto } from '../dtos';

type QuizWithQuestionCount = Prisma.QuizGetPayload<{
  include: {
    _count: {
      select: {
        questions: true;
      };
    };
  };
}>;

export class QuizMapper {
  static toDomain(quiz: QuizWithQuestionCount): QuizDto {
    return {
      id: quiz.id,
      title: quiz.title,
      questionsCount: quiz._count.questions,
    };
  }
}
