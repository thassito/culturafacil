import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Verificar se email já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // Criar usuário + agente
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        agent: {
          create: {
            name: dto.name || null,
          },
        },
      },
      include: {
        agent: true,
      },
    });

    // Gerar token
    const token = this.generateToken(user.id, user.email);

    return {
      id: user.id,
      email: user.email,
      agent: user.agent,
      token,
    };
  }

  async login(dto: LoginDto) {
    // Buscar usuário
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { agent: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gerar token
    const token = this.generateToken(user.id, user.email);

    return {
      token,
      expiresIn: 86400,
      agent: user.agent,
    };
  }

  private generateToken(userId: string, email: string): string {
    return this.jwtService.sign({
      sub: userId,
      email,
    });
  }
}
