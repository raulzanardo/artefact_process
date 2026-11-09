# artefact_process

Aplicação Next.js com backend tRPC integrado ao frontend.

## Executar localmente

```bash
pnpm install
pnpm dev
```

Abra <http://localhost:3000>. A página inicial consulta `health.status` pelo
tRPC e mostra o estado da conexão. A URL do endpoint é `/api/trpc`; o cliente
usa automaticamente a origem atual da aplicação.

## Adicionar endpoints

Defina procedimentos em `server/api/routers/` e inclua cada router em
`server/api/root.ts`. O tipo `AppRouter` exportado pelo router raiz alimenta o
cliente em `trpc/react.ts`, mantendo as chamadas do frontend tipadas.

Em um Client Component, use o provider configurado no layout:

```tsx
"use client";

import { trpc } from "@/trpc/react";

export function Example() {
  const result = trpc.health.status.useQuery();

  if (result.isPending) return <p>Carregando...</p>;
  if (result.error) return <p role="alert">{result.error.message}</p>;

  return <p>{result.data.status}</p>;
}
```
