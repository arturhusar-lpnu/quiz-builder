/*
  Warnings:

  - You are about to drop the `BooleanQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CheckboxOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CheckboxQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InputQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BooleanQuestion" DROP CONSTRAINT "BooleanQuestion_questionId_fkey";

-- DropForeignKey
ALTER TABLE "CheckboxOption" DROP CONSTRAINT "CheckboxOption_checkboxQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "CheckboxQuestion" DROP CONSTRAINT "CheckboxQuestion_questionId_fkey";

-- DropForeignKey
ALTER TABLE "InputQuestion" DROP CONSTRAINT "InputQuestion_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizId_fkey";

-- DropTable
DROP TABLE "BooleanQuestion";

-- DropTable
DROP TABLE "CheckboxOption";

-- DropTable
DROP TABLE "CheckboxQuestion";

-- DropTable
DROP TABLE "InputQuestion";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "Quiz";

-- CreateTable
CREATE TABLE "questions" (
    "id" SERIAL NOT NULL,
    "quizId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boolean_questions" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answer" BOOLEAN NOT NULL,

    CONSTRAINT "boolean_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "input_questions" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "input_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkbox_questions" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "checkbox_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkbox_options" (
    "id" SERIAL NOT NULL,
    "option" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "checkboxQuestionId" INTEGER NOT NULL,

    CONSTRAINT "checkbox_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boolean_questions_questionId_key" ON "boolean_questions"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "input_questions_questionId_key" ON "input_questions"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "checkbox_questions_questionId_key" ON "checkbox_questions"("questionId");

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boolean_questions" ADD CONSTRAINT "boolean_questions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "input_questions" ADD CONSTRAINT "input_questions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkbox_questions" ADD CONSTRAINT "checkbox_questions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkbox_options" ADD CONSTRAINT "checkbox_options_checkboxQuestionId_fkey" FOREIGN KEY ("checkboxQuestionId") REFERENCES "checkbox_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
