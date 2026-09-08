class BaseQuestion {
  id: number;
  quizId: number;
  title: string;
}

export class BooleanQuestion extends BaseQuestion {
  type: 'boolean';
  answer: boolean;
}

export class InputQuestion extends BaseQuestion {
  type: 'input';
  answer: string;
}

export class QuestionOption {
  id: number;
  questionId: number;
  option: string;
}

export class CheckboxQuestion extends BaseQuestion {
  type: 'checkbox';
  options: QuestionOption[];
  answers: number[];
}

export type QuestionDto = BooleanQuestion | InputQuestion | CheckboxQuestion;
