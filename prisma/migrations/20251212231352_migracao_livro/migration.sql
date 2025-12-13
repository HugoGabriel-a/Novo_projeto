-- CreateTable
CREATE TABLE "livro" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "livro_pkey" PRIMARY KEY ("id")
);
