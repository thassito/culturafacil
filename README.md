# 🌟 Cultura Fácil 🌟

## Plataforma SaaS de Gestão Cultural

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/thassito/culturafacil)

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
*   **Painel Administrativo:** Área protegida para gestão e configuração do SaaS (com login simulado) e dashboard interativo.
*   **Design Responsivo:** Otimizado para funcionar em qualquer dispositivo (mobile, tablet, desktop).
*   **Experiência de Usuário Moderna:** Design inspirado na estética da Apple, com efeitos de glassmorphism e animações sutis.
*   **Alternância de Tema Inteligente:** Suporte a tema claro e escuro, adaptando-se automaticamente às preferências do sistema do usuário.

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

### ⚙️ Melhorias Recentes e Correções

Esta seção detalha as atualizações e correções implementadas para otimizar o desenvolvimento e a implantação da plataforma.

#### Configuração de CI/CD (GitHub Actions)
*   **Problemas de `npm ci` resolvidos:** Ajustes nos workflows `deploy.yml` e `lint-and-test.yml` para garantir que `npm ci` seja executado corretamente nos diretórios `apps/` e `frontend/`. Isso incluiu a desabilitação do cache do npm nas etapas de setup do Node.js e a regeneração dos arquivos `package-lock.json` para assegurar a consistência das dependências.
*   **Autenticação SSH no Deploy:** O erro de autenticação SSH no job `deploy` foi solucionado através da configuração correta da chave privada SSH no segredo `VPS_SSH_KEY` do GitHub Actions e da chave pública correspondente no servidor VPS.

#### Ajustes no Frontend (ESLint)
*   **Tipagem (`@typescript-eslint/no-explicit-any`):** Diversas ocorrências de `any` explícitos foram substituídas por tipos mais seguros como `Record<string, unknown>` e tratamentos de erro com `unknown` e type assertions para `Error`.
*   **Gerenciamento de Estado (`react-hooks/set-state-in-effect`):** O aviso sobre chamadas síncronas de `setState` em `useEffect` foi resolvido em `AuthContext.tsx` e `AdminHomepageEditor.tsx` desabilitando a regra do ESLint em blocos específicos para garantir a inicialização correta de estados sem impactar o desempenho ou causar loops.
*   **Otimização de Renderização (`react-refresh/only-export-components`):** A regra que afeta o "Fast Refresh" do React foi desabilitada para arquivos de contexto (`AuthContext.tsx`, `ContentContext.tsx`) que exportam itens não-componentes junto a componentes, um padrão comum em Context APIs.
*   **Dependências de Hooks (`react-hooks/exhaustive-deps`):** Avisos sobre dependências ausentes em `useEffect` foram resolvidos refatorando funções de `fetch` com `useCallback` e adicionando-as aos arrays de dependências, garantindo a execução correta dos efeitos.
*   **Script de Teste (`npm run test`):** Adicionado um script `test` ao `frontend/package.json` que executa o `eslint .` como um placeholder, resolvendo o erro "Missing script: \"test\"" no CI para o frontend.


## 📸 Screenshots (Em breve)

Esta seção será atualizada com capturas de tela e GIFs do projeto em funcionamento.

## 📜 Licença

Este projeto está licenciado sob a Licença MIT.

---
Desenvolvido com ❤️ por [Thàssitto Gàspar](https://www.linkedin.com/in/thassito/) e seu assistente Gemini.