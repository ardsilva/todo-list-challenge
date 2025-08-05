# 📋 To-Do List App

Uma aplicação **moderna e interativa de lista de tarefas**, construída com **React 19**, **Vite**, **TypeScript** e **shadcn/ui**. Permite a criação de tarefas por usuário, filtragem por status (pendente/concluído/todas), salvamento local com `localStorage`, e feedback visual com `sonner`.

---

## 🚀 Funcionalidades

- ✅ Adicionar tarefas com autor e data
- ✅ Listar tarefas por usuário
- ✅ Marcar tarefas como concluídas
- ✅ Remover tarefas
- ✅ Filtro por status: Todos | Pendentes | Concluídos
- ✅ Persistência com `localStorage`
- ✅ UI responsiva com **Tailwind** e **shadcn/ui**
- ✅ Toasts de feedback com `sonner`
- ✅ Testes com **Vitest** e **React Testing Library**

---

## 🧠 Lógica de negócio

- Uma tarefa **só pode ser concluída** se a data de início **não for posterior à data atual**
- Cada usuário possui sua própria lista salva em `localStorage`:

  ```json
  {
  	"name": "Alexandre",
  	"ToDoList": [
  		{
  			"id": "uuid",
  			"event": "Reunião com equipe",
  			"startDate": "05/08/2025",
  			"endDate": null,
  			"author": "Alexandre"
  		}
  	]
  }
  ```

---

## 📸 Demo

[Live Demo](https://todo-list-challenge.vercel.app/)

---

## ⚙️ Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io)

### Passos

```bash
pnpm install
pnpm dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Rodando os testes

```bash
pnpm test          # roda os testes no terminal
pnpm test:ui       # modo visual interativo
pnpm test:coverage # com cobertura de testes
```

---

## 🗃️ Estrutura de pastas

```
src/
├── components/
│   ├── ToDoDialog.tsx
│   ├── ToDoTable.tsx
│   ├── ToDoCalendar.tsx
│   └── ...
├── __tests__/
│   ├── App.test.tsx
│   ├── ToDoDialog.test.tsx
│   └── ...
├── utils/
│   ├── localStorage.ts
│   └── types.ts
├── App.tsx
└── main.tsx
```

---

## 📦 Tecnologias utilizadas

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui**
- **sonner** – feedbacks/toasts
- **Vitest** – testes unitários
- **@testing-library/react** – testes de UI

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido por **Alexandre Silva**

- GitHub: [@ardsilva](https://github.com/ardsilva)
- LinkedIn: [linkedin.com/in/ardsilva87](https://linkedin.com/in/ardsilva87)
