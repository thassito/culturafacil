import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OpportunitiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(status?: string, limit = 20, offset = 0) {
    const where: any = { deletedAt: null };
    if (status) {
      where.status = status;
    }

    const [data, total] = await Promise.all([
      this.prisma.opportunity.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.opportunity.count({ where }),
    ]);

    return { data, pagination: { total, limit, offset } };
  }

  async findOne(id: string) {
    const opportunity = await this.prisma.opportunity.findUnique({
      where: { id },
    });

    if (!opportunity) {
      throw new NotFoundException('Oportunidade não encontrada');
    }

    return opportunity;
  }

  async create(data: any, userId: string) {
    return this.prisma.opportunity.create({
      data: {
        ...data,
        createdById: userId,
      },
    });
  }
}
