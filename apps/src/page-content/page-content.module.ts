import { Module } from '@nestjs/common';
import { PageContentService } from './page-content.service';
import { PageContentController } from './page-content.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PageContentController],
  providers: [PageContentService],
})
export class PageContentModule {}
