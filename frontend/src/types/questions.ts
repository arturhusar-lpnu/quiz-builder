import type { BaseQuery } from "./query";

interface BaseQuestion {
  id: number;
  quizId: number;
  title: string;
}

//Question types
export interface BooleanQuestion extends BaseQuestion {
  type: "boolean";
  answer: boolean;
}

export interface InputQuestion extends BaseQuestion {
  type: "input";
  answer: string;
}

interface QuestionOption {
  id: number;
  option: string;
}

export interface CheckboxQuestion extends BaseQuestion {
  type: "checkbox";
  options: QuestionOption[];
  answers: number[];
}

export type Question = BooleanQuestion | InputQuestion | CheckboxQuestion;

// Get Question
export interface GetQuestionsQuery extends BaseQuery {
  quizId: number;
}

//Add Question
interface BaseAddQuestionDto {
  quizId: number;
  title: string;
}

interface AddBooleanQuestionDto extends BaseAddQuestionDto {
  type: "boolean";
  answer: boolean;
}

interface AddInputQuestionDto extends BaseAddQuestionDto {
  type: "input";
  answer: string;
}

interface AddCheckboxQuestionDto extends BaseAddQuestionDto {
  type: "checkbox";
  options: {
    option: string;
  }[];
  answers: number[];
}

export type AddQuestionDto =
  | AddBooleanQuestionDto
  | AddInputQuestionDto
  | AddCheckboxQuestionDto;

// Remove Question
export interface RemoveQuestionDto {
  id: number;
}
