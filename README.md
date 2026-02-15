# Todo List Project

Uma aplicação de lista de tarefas (to-do list) desenvolvida com React, TypeScript e Material-UI.

## 📋 Funcionalidades

- **Criar tarefas** - Adicione novas tarefas com título, descrição, prioridade e categoria
- **Editar tarefas** - Modifique tarefas existentes
- **Excluir tarefas** - Remova tarefas da lista
- **Marcar como concluída** - Acompanhe o progresso das tarefas
- **Filtrar por categoria** - Visualize tarefas por categoria específica
- **Filtrar por prioridade** - Organize tarefas por nível de prioridade
- **Ordenar tarefas** - Classifique por data, prioridade ou categoria
- **Gerenciar categorias** - Crie e organize suas próprias categorias
- **Indicadores visuais** - Cores e ícones para prioridades e categorias

## 🛠️ Tecnologias

- **React** 19 - Biblioteca UI
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool rápido
- **Material-UI (MUI)** - Componentes React
- **ESLint** - Linting de código

## 🚀 Como executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install
```

### Executar em desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para produção

```bash
npm run build
```

### Visualizar build de produção

```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── BasicButton.tsx
│   ├── BasicInput.tsx
│   ├── BasicSelect.tsx
│   ├── BasicTextarea.tsx
│   ├── CardTask.tsx
│   ├── CategoryAutocomplete.tsx
│   ├── CategoryManagerDialog.tsx
│   ├── CreatedAt.tsx
│   ├── EmptyTasks.tsx
│   ├── EmptyTasksByFilter.tsx
│   ├── Header.tsx
│   ├── Indicador.tsx
│   ├── InputFilter.tsx
│   ├── NewTaskDialog.tsx
│   ├── OrderFilter.tsx
│   └── TaskFooter.tsx
├── data/
│   └── DataTask.tsx     # Tipos de dados das tarefas
├── hooks/
│   └── useCategorias.tsx # Hook para gerenciar categorias
├── Pages/
│   └── Home.tsx         # Página principal
├── theme/
│   └── theme.tsx        # Configuração do tema MUI
├── utils/
│   ├── CategoriaConfig.tsx
│   ├── PrioridadeConfig.tsx
│   └── TaskStyles.tsx
├── App.tsx              # Componente principal
└── main.tsx             # Ponto de entrada
```

## 🎨 Prioridades

- **Alta** - Vermelho
- **Média** - Laranja
- **Baixa** - Verde

## 📝 Licença

Este projeto está sob a licença MIT.
