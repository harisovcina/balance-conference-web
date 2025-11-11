-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "emailVerified" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Speaker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "location" TEXT,
    "image" TEXT,
    "shortDescription" TEXT,
    "bio" TEXT,
    "quote" TEXT,
    "motto" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "instagram" TEXT,
    "website" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Conference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT,
    "date" DATETIME,
    "description" TEXT,
    "eyebrow" TEXT,
    "howTitle" TEXT,
    "howDescription" TEXT,
    "nextChapterText" TEXT,
    "participants" INTEGER NOT NULL DEFAULT 0,
    "speakersCount" INTEGER NOT NULL DEFAULT 0,
    "mediaOutlets" INTEGER NOT NULL DEFAULT 0,
    "influencers" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ConferenceSpeaker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conferenceId" TEXT NOT NULL,
    "speakerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ConferenceSpeaker_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "Conference" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ConferenceSpeaker_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "Speaker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Speaker_slug_key" ON "Speaker"("slug");

-- CreateIndex
CREATE INDEX "Speaker_slug_idx" ON "Speaker"("slug");

-- CreateIndex
CREATE INDEX "Speaker_published_idx" ON "Speaker"("published");

-- CreateIndex
CREATE UNIQUE INDEX "Conference_slug_key" ON "Conference"("slug");

-- CreateIndex
CREATE INDEX "Conference_slug_idx" ON "Conference"("slug");

-- CreateIndex
CREATE INDEX "Conference_published_idx" ON "Conference"("published");

-- CreateIndex
CREATE INDEX "Conference_featured_idx" ON "Conference"("featured");

-- CreateIndex
CREATE INDEX "Conference_date_idx" ON "Conference"("date");

-- CreateIndex
CREATE INDEX "ConferenceSpeaker_conferenceId_idx" ON "ConferenceSpeaker"("conferenceId");

-- CreateIndex
CREATE INDEX "ConferenceSpeaker_speakerId_idx" ON "ConferenceSpeaker"("speakerId");

-- CreateIndex
CREATE UNIQUE INDEX "ConferenceSpeaker_conferenceId_speakerId_key" ON "ConferenceSpeaker"("conferenceId", "speakerId");
