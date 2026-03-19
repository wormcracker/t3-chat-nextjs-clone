# T3 Chat Nextjs Clone

## Modules and Libraries

- Framework: Nextjs
- ORM: Prisma
- DB: Postgres
- Authentication: BetterAuth
- UI: Shadcn
- CSS: TailwindCss, ai-sdk Ui
- AI: ai-sdk, openrouter API
- Infrastructure: Docker, git

## Database Setup

- Prisma Init
- Setup Docker
- Setup db.js `./src/lib/db.js`

## Authentication

- BetterAuth Setup from docs
- Add Sign-in frontend `./src/app/(auth)/*`
- Add UserButton to show after login `./src/modules/authentication/*` and display it.
- Add protection at sign in `./src/app/(auth)/layout.jsx`

## Chat Page Layout

- Add Sidebar `./src/modules/chat/components/chat-sidebar.jsx`
- Add Header `./src/modules/chat/components/header.jsx`
- Theme: from docs shadcn
- Home Page and Chat Form UI `./src/modules/chat/components/chat-message-form.jsx` `./src/modules/chat/components/chat-welcome-tabs.jsx` `./src/modules/chat/components/chat-message-view.jsx`

## AI model Selector

- Get Openrouter api: docs
- Get-models api endpoint: `./src/app/api/ai/get-models/route.js`
- Setup tanstack query: `./src/components/providers/query-provider.jsx`
- Model-selector component `./src/modules/chat/components/model-selector.jsx`

## Chat Creation

- Add prisma schema for Chat and Message `./prisma/schema.prisma`
- 1 Chat: n Messages
- Server Actions for chat initializations `./src/modules/chat/actions/index.js`
- Tanstack Hooks to call it `./src/modules/chat/hooks/chat.js`
- Mutation in message form `./src/modules/chat/components/chat-message-form.jsx`
