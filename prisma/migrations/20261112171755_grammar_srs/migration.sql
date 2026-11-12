-- CreateTable
CREATE TABLE "GrammarCardState" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cardKey" TEXT NOT NULL,
    "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 0,
    "repetitions" INTEGER NOT NULL DEFAULT 0,
    "lapses" INTEGER NOT NULL DEFAULT 0,
    "dueAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrammarCardState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrammarReviewLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cardKey" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "correct" BOOLEAN NOT NULL,
    "responseTime" INTEGER,
    "scheduledBefore" TIMESTAMP(3) NOT NULL,
    "scheduledAfter" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GrammarReviewLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GrammarCardState_userId_dueAt_idx" ON "GrammarCardState"("userId", "dueAt");

-- CreateIndex
CREATE UNIQUE INDEX "GrammarCardState_userId_cardKey_key" ON "GrammarCardState"("userId", "cardKey");

-- CreateIndex
CREATE INDEX "GrammarReviewLog_userId_createdAt_idx" ON "GrammarReviewLog"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "GrammarCardState" ADD CONSTRAINT "GrammarCardState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrammarReviewLog" ADD CONSTRAINT "GrammarReviewLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
