-- CreateTable
CREATE TABLE "User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roomId" INTEGER NOT NULL,
    "socketId" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "canPlayPouse" BOOLEAN NOT NULL,
    "canSeek" BOOLEAN NOT NULL,
    "canSelectMovie" BOOLEAN NOT NULL,
    CONSTRAINT "User_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("roomId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Room" (
    "roomId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "socketRoomId" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Room_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Room_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("movieId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Movie" (
    "movieId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ytMovieId" TEXT NOT NULL,
    "isPlaying" BOOLEAN NOT NULL,
    "currentProggres" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_ownerId_key" ON "Room"("ownerId");
