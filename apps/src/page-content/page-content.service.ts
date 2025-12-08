import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePageContentDto } from './dto/update-page-content.dto';

@Injectable()
export class PageContentService {
  constructor(private prisma: PrismaService) {}

  async findOne(pageSlug: string) {
    const pageContent = await this.prisma.pageContent.findUnique({
      where: { pageSlug },
    });
    return pageContent;
  }

  async update(pageSlug: string, updatePageContentDto: UpdatePageContentDto) {
    const { content } = updatePageContentDto;

    return this.prisma.pageContent.upsert({
      where: { pageSlug },
      update: {
        content,
      },
      create: {
        pageSlug,
        content,
      },
    });
  }
}
