import { PrismaService } from '@/apps/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateQuizDto, QuizDto } from '../dtos';
import { QuizMapper } from './quiz.mapper';
import { PaginationResponse } from '@/apps/shared/pagination/pagination';
import { BaseQuery } from '@/apps/shared/query';

@Injectable()
export class QuizRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateQuizDto): Promise<QuizDto> {
    const quiz = await this.prisma.quiz.create({
      data: {
        title: dto.title,
      },
      include: {
        _count: {
          select: {
            questions: true,
          },
        },
      },
    });

    return QuizMapper.toDomain(quiz);
  }

  async findById(id: number): Promise<QuizDto | null> {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            questions: true,
          },
        },
      },
    });

    if (!quiz) {
      return null;
    }

    return QuizMapper.toDomain(quiz);
  }

  async findMany(query?: BaseQuery): Promise<PaginationResponse<QuizDto>> {
    const page = query?.page ?? 1;
    const limit = query?.limit ?? 10;

    const where = this.buildWhere(query);

    const [quizzes, total] = await this.prisma.$transaction([
      this.prisma.quiz.findMany({
        where,
        include: {
          _count: {
            select: {
              questions: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.quiz.count({
        where,
      }),
    ]);

    return {
      items: quizzes.map((quiz) => QuizMapper.toDomain(quiz)),
      meta: {
        total,
        totalPages: Math.ceil(total / limit),
        page,
        limit,
      },
    };
  }

  async delete(id: number): Promise<void> {
    await this.prisma.quiz.delete({
      where: {
        id,
      },
    });
  }

  private buildWhere(query?: BaseQuery): {
    title?: {
      contains: string;
      mode: 'insensitive';
    };
  } {
    if (!query?.search) {
      return {};
    }

    return {
      title: {
        contains: query.search,
        mode: 'insensitive',
      },
    };
  }
}
