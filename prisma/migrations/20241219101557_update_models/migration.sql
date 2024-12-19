-- CreateEnum
CREATE TYPE "Styles" AS ENUM ('dark', 'light');

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "style" "Styles" NOT NULL DEFAULT 'light';

-- CreateTable
CREATE TABLE "Formdata" (
    "id" SERIAL NOT NULL,
    "formBy" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Formdata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Formdata_formBy_idx" ON "Formdata"("formBy");
