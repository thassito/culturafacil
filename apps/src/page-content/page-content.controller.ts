import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { PageContentService } from './page-content.service';
import { UpdatePageContentDto } from './dto/update-page-content.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('page-content')
export class PageContentController {
  constructor(private readonly pageContentService: PageContentService) {}

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.pageContentService.findOne(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() updatePageContentDto: UpdatePageContentDto) {
    return this.pageContentService.update(slug, updatePageContentDto);
  }
}
