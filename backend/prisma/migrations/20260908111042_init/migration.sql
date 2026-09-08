-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('boolean', 'input', 'checkbox');

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "quizId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BooleanQuestion" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answer" BOOLEAN NOT NULL,

    CONSTRAINT "BooleanQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InputQuestion" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "InputQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckboxQuestion" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "CheckboxQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckboxOption" (
    "id" SERIAL NOT NULL,
    "option" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "checkboxQuestionId" INTEGER NOT NULL,

    CONSTRAINT "CheckboxOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BooleanQuestion_questionId_key" ON "BooleanQuestion"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "InputQuestion_questionId_key" ON "InputQuestion"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "CheckboxQuestion_questionId_key" ON "CheckboxQuestion"("questionId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BooleanQuestion" ADD CONSTRAINT "BooleanQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InputQuestion" ADD CONSTRAINT "InputQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckboxQuestion" ADD CONSTRAINT "CheckboxQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckboxOption" ADD CONSTRAINT "CheckboxOption_checkboxQuestionId_fkey" FOREIGN KEY ("checkboxQuestionId") REFERENCES "CheckboxQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
