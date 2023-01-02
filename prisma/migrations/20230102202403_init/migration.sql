-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "ratings" DECIMAL(3,1) NOT NULL,
    "year" INTEGER NOT NULL,
    "director" TEXT NOT NULL,
    "starring" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
