# Etapa 1: Construir a aplicação React
FROM node:18-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de definição de pacotes
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Executa o build da aplicação
RUN npm run build

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:1.23-alpine

# Copia os arquivos gerados no build da etapa anterior para a pasta padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80 (padrão do Nginx)
EXPOSE 80

# Inicia o Nginx em modo foreground
CMD ["nginx", "-g", "daemon off;"]
