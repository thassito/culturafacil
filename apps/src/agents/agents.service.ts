import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Injectable()
export class AgentsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const agent = await this.prisma.agent.findUnique({
      where: { id },
      include: { user: { select: { email: true } } },
    });

    if (!agent) {
      throw new NotFoundException('Agente não encontrado');
    }

    return agent;
  }

  async findByUserId(userId: string) {
    return this.prisma.agent.findUnique({
      where: { userId },
    });
  }

  async update(id: string, dto: UpdateAgentDto) {
    const agent = await this.prisma.agent.findUnique({ where: { id } });

    if (!agent) {
      throw new NotFoundException('Agente não encontrado');
    }

    return this.prisma.agent.update({
      where: { id },
      data: dto,
    });
  }

  async findAll(limit = 20, offset = 0) {
    const [data, total] = await Promise.all([
      this.prisma.agent.findMany({
        where: { deletedAt: null },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.agent.count({ where: { deletedAt: null } }),
    ]);

    return { data, pagination: { total, limit, offset } };
  }
}
