# Este script é um exemplo para aplicar migrações e reiniciar os serviços Docker na sua VPS.
# Certifique-se de que o docker e o docker-compose estejam instalados e configurados na sua VPS.
# Execute este script NA SUA VPS.

echo "Iniciando processo de atualização da aplicação na VPS..."

# 1. Navegar até o diretório do projeto
# Substitua /caminho/para/seu/projeto se o projeto não estiver na raiz
cd /d/projetos/culturafacil || { echo "Erro: Diretório do projeto não encontrado. Verifique o caminho."; exit 1; }

# 2. Parar os serviços Docker existentes
echo "Parando serviços Docker existentes..."
docker-compose down

# 3. Puxar as últimas alterações do repositório Git
echo "Puxando as últimas alterações do Git..."
git pull

# 4. Reconstruir as imagens Docker (necessário para novas dependências ou mudanças no Dockerfile)
echo "Reconstruindo imagens Docker..."
docker-compose build

# 5. Rodar as migrações do banco de dados (específico para o serviço 'apps' usando Prisma)
echo "Aplicando migrações do banco de dados..."
# Este comando acessa o container do backend ('apps') e executa o comando 'npx prisma migrate deploy'
# Certifique-se de que seu serviço 'apps' esteja configurado para instalar as dependências do prisma
docker-compose run --rm apps npx prisma migrate deploy

# 6. Subir os serviços Docker novamente
echo "Subindo os serviços Docker..."
docker-compose up -d

echo "Processo de atualização concluído. Verifique o status dos seus serviços com 'docker-compose ps'."
