# T3 Chat Nextjs

A modern AI chat application built using Next.js, Prisma, Postgres, BetterAuth, Zustand, and OpenRouter AI SDK.

---

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Authentication**: [BetterAuth](https://www.better-auth.com/)
- **UI**: Shadcn UI + TailwindCSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **AI Integration**: OpenRouter + AI SDK
- **Infrastructure**: Docker, Git

---

## 📁 Project Structure (Simplified)

```text
src/
├── app/            # Next.js App Router (Auth, Root, API)
├── modules/        # Domain-driven logic (Auth, Chat)
├── components/     # Reusable UI components
├── lib/            # Shared utilities & configurations
├── components/providers/ # Context & Query providers
└── prisma/         # Database schema & migrations
```

---

## ⚙️ Features

- **Authentication**: Secure user flow with BetterAuth.
- **Persistence**: Chat history and messages stored in PostgreSQL.
- **Real-time UI**: Responsive chat interface with streaming-like feel.
- **Model Selection**: Dynamic AI model selection via OpenRouter.
- **Global State**: Managed via Zustand for active chats and UI toggles.
- **Data Handling**: Efficient fetching and mutations with TanStack Query.
- **Modular Architecture**: Clean separation of concerns via `modules/` directory.

---

## 🧱 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/wormcracker/t3-chat-nextjs-clone.git
cd t3-chat-nextjs-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file based on `.env.example`.

### 4. Run PostgreSQL via Docker

```bash
docker-compose up -d
```

### 5. Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev
```

### 6. Run Development Server

```bash
npm run dev
```

---

## 🔐 Authentication

Implemented using **BetterAuth**, providing a robust foundation for:

- Sign-in / Sign-up pages.
- Protected routes via Next.js layouts.
- User session handling and persistent login.
- User profile button in the application header.

---

## 💬 Chat System

### Chat Flow

1. **Creation**: User initiates a new chat session.
2. **Storage**: Chat is stored in the DB (1:N relation with messages).
3. **Streaming**: Messages are processed via the AI SDK route.
4. **Persistence**: AI and User messages are saved to the database.

---

## 🧠 AI Integration

- **OpenRouter**: Used as the primary backend for multi-model access.
- **AI SDK**: Handles chat completions via the `/api/chat` route.
- **Dynamic Fetching**: Model lists are fetched dynamically.

---

## 🧾 Database Schema

- **User**: Handles authentication and profile data.
- **Chat**: Groups messages together; belongs to a User.
- **Message**: Individual entries within a chat.

---

## 🧩 Core Modules

### Authentication Module

- Login / Signup UI components.
- Session hooks and middleware.

### Chat Module

- **Sidebar**: List of recent conversations.
- **Messages View**: Main window for chat interaction.
- **Input Form**: TextArea with submission logic.
- **Model Selector**: Dropdown to switch between LLMs.

---

## 📜 License

MIT License
