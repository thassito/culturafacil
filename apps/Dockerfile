FROM node:20-slim AS builder

WORKDIR /app

# Instalar dependências de sistema (openssl incluido)
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Instalar dependências Node
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

# Gerar Prisma Client
RUN npx prisma generate

# Copiar código e buildar
COPY . .
RUN npm run build

# ============================
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Instalar openssl na imagem final
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copiar apenas o necessário
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# Script de inicialização com retry para migrations
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
