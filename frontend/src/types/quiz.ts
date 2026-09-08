export interface QuizDto {
  id: number;
  title: string;
  questionsCount: number;
}

export interface CreateQuizDto {
  title: string;
}

export interface RemoveQuizDto {
  id: number;
}
