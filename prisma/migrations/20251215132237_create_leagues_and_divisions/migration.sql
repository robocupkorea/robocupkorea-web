-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('ko', 'en');

-- CreateTable
CREATE TABLE "League" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeagueDivision" (
    "id" SERIAL NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "locale" "Locale" NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "cmsPageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeagueDivision_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "League_slug_key" ON "League"("slug");

-- CreateIndex
CREATE INDEX "LeagueDivision_locale_idx" ON "LeagueDivision"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "LeagueDivision_leagueId_slug_locale_key" ON "LeagueDivision"("leagueId", "slug", "locale");

-- AddForeignKey
ALTER TABLE "LeagueDivision" ADD CONSTRAINT "LeagueDivision_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;
