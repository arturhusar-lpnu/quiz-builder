import type { PaginatedResponse } from "../types/pagination";
import type { BaseQuery } from "../types/query";
import type { RemoveQuestionDto } from "../types/questions";
import type { CreateQuizDto, QuizDto } from "../types/quiz";
import { api } from "./axios";

export const quizService = {
  async getAll(query?: BaseQuery): Promise<PaginatedResponse<QuizDto>> {
    const response = await api.get("/quiz", {
      params: query,
    });

    return response.data;
  },

  async getById(id: number): Promise<QuizDto> {
    const response = await api.get<QuizDto>(`/quiz/${id}`);

    return response.data;
  },

  async create(data: CreateQuizDto): Promise<{ id: number }> {
    const response = await api.post<{ id: number }>("/quiz/create", data);

    return response.data;
  },

  async remove(dto: RemoveQuestionDto): Promise<null> {
    const response = await api.delete<null>(`/quiz/remove`, {
      data: dto,
    });

    return response.data;
  },
};
