import { PrismaService } from '@/apps/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AddQuestionDto, QuestionDto } from '../dtos';
import { questionInclude, QuestionMapper } from './question.mapper';
import { GetQuestionsQuery } from '../dtos/query.dto';
import { PaginationResponse } from '@/apps/shared/pagination/pagination';

@Injectable()
export class QuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: AddQuestionDto): Promise<QuestionDto> {
    const question = await this.prisma.question.create({
      data: {
        quizId: dto.quizId,
        title: dto.title,
        type: dto.type,

        ...(dto.type === 'boolean' && {
          booleanQuestion: {
            create: {
              answer: dto.answer,
            },
          },
        }),

        ...(dto.type === 'input' && {
          inputQuestion: {
            create: {
              answer: dto.answer,
            },
          },
        }),

        ...(dto.type === 'checkbox' && {
          checkboxQuestion: {
            create: {
              options: {
                create: dto.options.map((option, index) => ({
                  option: option.option,
                  order: index,
                  isCorrect: dto.answers.includes(index),
                })),
              },
            },
          },
        }),
      },

      include: questionInclude,
    });

    return QuestionMapper.toDomain(question);
  }

  async findById(id: number): Promise<QuestionDto | null> {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: questionInclude,
    });

    if (!question) {
      return null;
    }

    return QuestionMapper.toDomain(question);
  }

  async findOne(params: {
    title: string;
    quizId: number;
  }): Promise<QuestionDto | null> {
    const question = await this.prisma.question.findFirst({
      where: {
        title: params.title,
        quizId: params.quizId,
      },
      include: questionInclude,
    });

    if (!question) {
      return null;
    }

    return QuestionMapper.toDomain(question);
  }

  async delete(id: number): Promise<null> {
    await this.prisma.$transaction([
      this.prisma.checkboxOption.deleteMany({
        where: {
          checkboxQuestionId: id,
        },
      }),

      this.prisma.question.delete({
        where: {
          id,
        },
      }),
    ]);

    return null;
  }

  async findMany(
    query?: GetQuestionsQuery,
  ): Promise<PaginationResponse<QuestionDto>> {
    const page = query?.page ?? 1;
    const limit = query?.limit ?? 10;

    const where = query?.quizId ? { quizId: query.quizId } : {};

    const [questions, total] = await this.prisma.$transaction([
      this.prisma.question.findMany({
        where,
        include: questionInclude,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'asc',
        },
      }),

      this.prisma.question.count({
        where,
      }),
    ]);

    return {
      items: questions.map((question) => QuestionMapper.toDomain(question)),
      meta: {
        total,
        totalPages: Math.ceil(total / limit),
        page,
        limit,
      },
    };
  }
}
