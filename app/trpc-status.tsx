"use client";

import { trpc } from "@/trpc/react";

export function TrpcStatus() {
  const { data, error, isPending } = trpc.health.status.useQuery();

  if (isPending) {
    return <p role="status">Conectando à API...</p>;
  }

  if (error) {
    return <p role="alert">Falha ao consultar a API: {error.message}</p>;
  }

  return <p role="status">Status da API: {data.status}</p>;
}
