-- CreateTable
CREATE TABLE "page_content" (
    "id" TEXT NOT NULL,
    "page_slug" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "page_content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "page_content_page_slug_key" ON "page_content"("page_slug");
