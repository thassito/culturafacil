import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('opportunities')
export class OpportunitiesController {
  constructor(private oppService: OpportunitiesService) {}

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.oppService.findAll(
      status,
      limit ? parseInt(limit, 10) : 20,
      offset ? parseInt(offset, 10) : 0,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oppService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: any, @Request() req: any) {
    return this.oppService.create(dto, req.user.id);
  }
}
