import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Prefixo global /api/v1
  app.setGlobalPrefix('api/v1');
  
  // CORS - permitir frontend
  app.enableCors({
    origin: [
      'https://culturafacil.com.br',
      'https://www.culturafacil.com.br',
      'http://localhost:5173',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  // Validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  const port = process.env.API_PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Cultura Fácil API rodando em http://localhost:${port}`);
  console.log(`📚 Endpoints disponíveis em /api/v1`);
  console.log(`✅ CORS ativado para frontend`);
}

bootstrap();
