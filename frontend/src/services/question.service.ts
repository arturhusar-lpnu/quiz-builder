import type { PaginatedResponse } from "../types/pagination";
import type {
  AddQuestionDto,
  GetQuestionsQuery,
  Question,
  RemoveQuestionDto,
} from "../types/questions";
import { api } from "./axios";

export const questionService = {
  async getAll(
    query?: GetQuestionsQuery,
  ): Promise<PaginatedResponse<Question>> {
    const response = await api.get("/questions", {
      params: query,
    });

    return response.data;
  },

  async create(data: AddQuestionDto): Promise<Question> {
    const response = await api.post(`/questions/${data.type}`, data);

    return response.data;
  },

  async remove(dto: RemoveQuestionDto): Promise<null> {
    const response = await api.delete<null>(`/questions/remove`, {
      data: dto,
    });

    return response.data;
  },
};
