"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 6 * 60 * 60 * 1000, // 6 hours
            gcTime: 7 * 60 * 60 * 1000, // Slightly longer than stale time
            refetchOnWindowFocus: false, // Prevent refetching when returning to tab
            refetchOnReconnect: false, // Prevent refetching on network reconnection
            refetchOnMount: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
