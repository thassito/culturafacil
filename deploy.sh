#!/bin/bash

# deploy.sh - Script para fazer o build e deploy do frontend do Cultura Fácil (versão Bash)

# Cores para o output
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "\n${CYAN}Iniciando o processo de deploy para produção (culturafacil.com.br)...${NC}"

# --- Passo 1: Build do Projeto Frontend ---
echo -e "\n${YELLOW}Passo 1: Fazendo o build do projeto (npm run build)...${NC}"
pushd "./frontend" > /dev/null # Navega para a pasta do frontend, suprime a saída

# Executa o build
npm run build

# Verifica se o build foi bem-sucedido
if [ $? -ne 0 ]; then
    echo -e "\n${RED}ERRO: O build do projeto falhou! Abortando o deploy.${NC}"
    popd > /dev/null
    exit 1
fi

popd > /dev/null # Retorna ao diretório raiz
echo -e "${GREEN}Build concluído com sucesso!${NC}"

# --- Passo 2: Envio dos Arquivos para a VPS ---
vpsUser="root"
vpsHost="195.35.16.32"
sourceDir="./frontend/dist/*"
targetDir="/var/www/culturafacil.com.br"

echo -e "\n${YELLOW}Passo 2: Enviando arquivos para a VPS ($vpsHost)...${NC}"
echo "Origem: $sourceDir"
echo "Destino: $targetDir"

# Comando SCP para copiar os arquivos de forma recursiva
# Usamos "-o StrictHostKeyChecking=no" para evitar prompts de confirmação de host
scp -r -o StrictHostKeyChecking=no $sourceDir "$vpsUser@$vpsHost:$targetDir"

# Verifica se o envio foi bem-sucedido
if [ $? -ne 0 ]; then
    echo -e "\n${RED}ERRO: O envio dos arquivos via SCP falhou. Verifique sua conexão, credenciais e se o diretório de destino existe.${NC}"
    exit 1
fi

echo -e "\n${GREEN}--------------------------------------------------------${NC}"
echo -e "${GREEN}Deploy do frontend finalizado com sucesso!${NC}"
echo -e "${GREEN}O site foi publicado no diretório $targetDir da sua VPS.${NC}"
echo -e "${GREEN}--------------------------------------------------------${NC}"
