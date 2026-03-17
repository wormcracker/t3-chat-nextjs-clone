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
