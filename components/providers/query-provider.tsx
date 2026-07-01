"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClinet = new QueryClient();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClinet}>{children}</QueryClientProvider>
  );
};
