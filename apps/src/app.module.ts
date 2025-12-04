import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AgentsModule } from './agents/agents.module';
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    AgentsModule,
    OpportunitiesModule,
  ],
})
export class AppModule {}
