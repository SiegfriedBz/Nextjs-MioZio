-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "page" TEXT,
    "contentTitle" TEXT,
    "img" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
