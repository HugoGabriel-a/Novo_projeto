-- CreateTable
CREATE TABLE "Livro" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "UserId" TEXT,

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
