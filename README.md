# Task Manager

A sample application built with Next.js and tRPC. It supports listing, creating,
editing, and deleting tasks. Data is stored in memory and is lost when the
server process restarts; multiple instances also do not share the same list.

## Run locally

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>. The tRPC endpoint is `/api/trpc`.

## Project structure

- `server/api/routers/tasks.ts`: task validation and tRPC operations.
- `server/api/tasks-store.ts`: in-memory storage.
- `server/api/root.ts`: main router and `AppRouter` type.
- `app/page.tsx`: SSR task list, loaded directly through the router on the
  server to avoid an internal HTTP request.
- `trpc/provider.tsx`: React Query/tRPC provider for interactive components.

The router exposes `tasks.list`, `tasks.byId`, `tasks.create`, `tasks.update`,
and `tasks.delete`. The `AppRouter` type is shared with the frontend as a
type-only import, keeping inputs and outputs in sync.

## Case decisions

- **SSR, CSR, and SSG:** SSR renders the page on the server for each request and
  is useful for up-to-date or server-dependent content, but increases work per
  request. CSR renders or updates the interface in the browser and supports
  rich interactions, but may delay the initial content. SSG generates HTML at
  build time and is efficient for stable content, but is not a good fit for
  this changing task list without a revalidation strategy.
- **Backend:** it can be implemented with Next.js route handlers, a separate
  service (such as Express or Nest), or serverless functions. This case uses a
  tRPC endpoint in Next.js to keep the frontend and backend in one project.
- **tRPC:** it provides TypeScript-inferred contracts and reduces duplicated
  types between the client and server. Types do not replace authentication,
  authorization, or runtime validation, so inputs are validated with Zod.
  TypeScript coupling and the shared contract can make integration with
  clients written in other languages harder. For horizontal scaling, in-memory
  storage should be replaced with a shared database.
