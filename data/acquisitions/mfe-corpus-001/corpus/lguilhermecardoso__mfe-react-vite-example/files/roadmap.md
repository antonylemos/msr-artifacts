# 📝 Roadmap & Checklist - Microfrontend APP

> **Kanban de tarefas para desenvolvimento e deploy do app modular**

---

## 🟢 **Login (mf-login)**
- [x] Tela de login integrada com root-app
- [x] Criação de conta com feedback de sucesso
- [x] Retorno de token simulado tipo JWT ao logar
- [x] Voltar para login após criar conta

---

## 🟡 **Navbar (mf-navbar)**
- [x] Criar microfrontend do Navbar
- [x] Exibir informações do usuário logado
- [x] Adicionar botão de logout (apagar token e voltar para login)
- [x] Adicionar navegação para outras áreas (ex: Dashboard)

---

## 🟡 **Dashboard (mf-dashboard)**
- [x] Criar microfrontend do Dashboard
- [x] Receber e validar token do usuário
- [x] Exibir dados iniciais (placeholder)
- [x] Integrar com API Rick and Morty para listar personagens
- [x] Implementar lista de cards de personagens com scroll infinito
- [x] Permitir clicar em um card para visualizar detalhes no mf-personagem-detalhe
- [x] Preparar estrutura para futuras features

---

## 🟡 **Personagem Detalhe (mf-personagem-detalhe)**
- [x] Criar microfrontend mf-personagem-detalhe
- [ ] Definir interface para receber ID ou dados do personagem
- [ ] Ao receber ID, buscar detalhes na API Rick and Morty
- [ ] Exibir detalhes do personagem (nome, imagem, status, espécie, etc)
- [ ] Estilizar e garantir responsividade
- [ ] Integrar navegação do Dashboard para abrir detalhes do personagem

---

## 🟡 **Integração de microfrontends no root-app**
- [ ] Renderizar Navbar acima do Dashboard após login
- [ ] Passar token/usuário para todos MFEs
- [ ] Garantir atualização do estado global ao logar/deslogar
- [ ] Permitir navegação Dashboard <-> Personagem Detalhe

---

## 🟡 **Gestão de autenticação**
- [ ] Verificar token no root-app ao iniciar (manter login via localStorage/sessionStorage)
- [ ] Redirecionar para login se token inválido ou ausente
- [ ] Compartilhar token entre MFEs quando necessário

---

## 🟡 **Estilo & Responsividade**
- [ ] Garantir layout responsivo em todos MFEs
- [ ] Centralizar e padronizar paleta de cores e fontes
- [ ] Ajustar espaçamentos, paddings, gaps e animações

---

## 🔲 **Documentação & Testes**
- [ ] Documentar MFEs e integração (README de cada MFE + root-app)
- [ ] Adicionar testes básicos

---

## 🔲 **Preparação para Deploy**
- [ ] Configurar build dos MFEs e root-app gerando arquivos estáticos
- [ ] Garantir que os MFEs possam ser servidos via GitHub Pages (import remoto ou copiando arquivos para build final)
- [ ] Testar funcionamento local como app estático
- [ ] Configurar fallback para SPA (`404.html` ou redirecionamento para `index.html`)

---

## 🔲 **CI/CD com GitHub Actions**
- [ ] Criar workflow de build automático para cada microfrontend e root-app
- [ ] Copiar arquivos finais para branch `gh-pages` no deploy
- [ ] Configurar deploy automático para GitHub Pages
- [ ] Validar rotas, imports e links no ambiente do GitHub Pages

---

## 🔲 **Deploy & Validação**
- [ ] Validar deploy final no GitHub Pages
- [ ] Testar login, navegação e dashboard em produção
- [ ] Corrigir eventuais problemas de caminhos, cache, integração

---

## 🔲 **Extras & Futuro**
- [ ] Adicionar área de perfil/conta
- [ ] Adicionar novas páginas ao dashboard (ex: settings, analytics...)
- [ ] Melhorar testes e cobertura de código
- [ ] Automatizar build e deploy dos MFEs em ambiente externo (CDN, cloud...)

---

**Como usar:**  
- Marque `[x]` quando finalizar uma tarefa  
- Adicione novas tarefas conforme surgirem  
- Use este arquivo para manter o time alinhado e priorizar o desenvolvimento

---