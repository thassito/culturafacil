# 🌟 Cultura Fácil 🌟

## Plataforma SaaS de Gestão Cultural

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange.svg)](https://github.com/thassito/culturafacil)

## 🚀 Visão Geral do Projeto

O **Cultura Fácil** é uma plataforma SaaS (Software as a Service) independente e inovadora, desenvolvida para simplificar e democratizar o acesso a oportunidades culturais no Ceará. Nossa missão é conectar agentes culturais, produtores, artistas e espaços a editais, projetos e redes de colaboração, desburocratizando o processo e fomentando o ecossistema cultural da região.

Este projeto nasce da necessidade de uma ferramenta intuitiva, acessível e responsiva, que permita a qualquer agente cultural, independentemente de seus recursos tecnológicos, participar ativamente da gestão cultural do estado.

## ✨ Principais Funcionalidades (Frontend)

*   **Homepage Dinâmica e Intuitiva:** Apresentação clara da missão e dos benefícios da plataforma.
*   **Listagem de Eventos:** Visualização e busca de eventos culturais, com placeholder para mapa interativo.
*   **Listagem de Espaços:** Descoberta e detalhes de espaços culturais.
*   **Listagem de Agentes:** Perfil e contatos de agentes culturais.
*   **Listagem de Projetos:** Visibilidade para projetos culturais em andamento.
*   **Listagem de Oportunidades:** Centralização de editais e chamadas públicas para fomento.
*   **Autenticação de Agentes:** Páginas de Login e Cadastro (simuladas).
*   **Painel Administrativo:** Área protegida para gestão e configuração do SaaS (com login simulado).
*   **Design Responsivo:** Otimizado para funcionar em qualquer dispositivo (mobile, tablet, desktop).
*   **Experiência de Usuário Moderna:** Design inspirado na estética da Apple, com efeitos de glassmorphism e animações sutis.

## 🛠️ Tecnologias Utilizadas

*   **Frontend:**
    *   [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces de usuário.
    *   [Vite](https://vitejs.dev/) - Ferramenta de build rápida para projetos web modernos.
    *   [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first para estilização rápida e responsiva.
    *   [React Router DOM](https://reactrouter.com/web/guides/quick-start) - Biblioteca para roteamento declarativo no React.
    *   [Framer Motion](https://www.framer.com/motion/) - Biblioteca para animações de UI/UX.
    *   [Heroicons](https://heroicons.com/) - Conjunto de ícones SVG.
*   **Outras:**
    *   [Git](https://git-scm.com/) - Sistema de controle de versão.
    *   [GitHub](https://github.com/) - Hospedagem de repositórios Git.

## 🚀 Como Começar

Siga estes passos para ter o projeto rodando localmente:

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/thassito/culturafacil.git
    cd culturafacil
    ```

2.  **Instale as Dependências:**
    ```bash
    cd frontend
    npm install
    ```

3.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```
    O aplicativo estará disponível em `http://localhost:5173` (ou outra porta disponível).

## 📸 Screenshots (Em breve)

Esta seção será atualizada com capturas de tela e GIFs do projeto em funcionamento.

## 🌐 Deploy para Produção

Para fazer o deploy da versão frontend para a VPS de produção:

1.  Navegue até a raiz do projeto.
2.  Execute o script PowerShell:
    ```powershell
    ./deploy.ps1
    ```
    Este script fará o build do projeto e copiará os arquivos para `root@195.35.16.32:/var/www/culturafacil.com.br`.
    *   **Observação:** Certifique-se de que o `scp` esteja configurado e que você tenha as credenciais de acesso à VPS.

## 📜 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
Desenvolvido com ❤️ por [Thàssitto Gàspar](https://www.linkedin.com/in/thassito/).
```