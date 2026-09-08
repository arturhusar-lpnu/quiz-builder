/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Prisma } from '@prisma/client';
import {
  BooleanQuestion,
  CheckboxQuestion,
  InputQuestion,
  QuestionDto,
  QuestionOption,
} from '../dtos';

export const questionInclude = {
  booleanQuestion: true,
  inputQuestion: true,
  checkboxQuestion: {
    include: {
      options: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  },
} satisfies Prisma.QuestionInclude;

export type QuestionWithDetails = Prisma.QuestionGetPayload<{
  include: typeof questionInclude;
}>;

export class QuestionMapper {
  static toDomain(question: QuestionWithDetails): QuestionDto {
    let options: QuestionOption[] = [];

    switch (question.type) {
      case 'boolean':
        if (!question.booleanQuestion) {
          throw new Error(
            `Boolean question data missing for question ${question.id}`,
          );
        }

        return {
          id: question.id,
          quizId: question.quizId,
          title: question.title,
          type: 'boolean',
          answer: question.booleanQuestion.answer,
        } satisfies BooleanQuestion;

      case 'input':
        if (!question.inputQuestion) {
          throw new Error(
            `Input question data missing for question ${question.id}`,
          );
        }

        return {
          id: question.id,
          quizId: question.quizId,
          title: question.title,
          type: 'input',
          answer: question.inputQuestion.answer,
        } satisfies InputQuestion;

      case 'checkbox':
        if (!question.checkboxQuestion) {
          throw new Error(
            `Checkbox question data missing for question ${question.id}`,
          );
        }

        options = question.checkboxQuestion.options.map((option) => ({
          id: option.id,
          questionId: question.id,
          option: option.option,
        }));

        return {
          id: question.id,
          quizId: question.quizId,
          title: question.title,
          type: 'checkbox',
          options,
          answers: question.checkboxQuestion.options
            .filter((option) => option.isCorrect)
            .map((option) => option.order),
        } satisfies CheckboxQuestion;

      default: {
        const _exhaustive: never = question.type;
        throw new Error(`Unsupported question type: ${_exhaustive}`);
      }
    }
  }
}
