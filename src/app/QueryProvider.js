"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Keep most settings as defaults
            staleTime: 30 * 1000, // 30 seconds instead of 6 hours
            gcTime: 5 * 60 * 1000, // 5 minutes
            refetchOnMount: true, // Enable refetch on mount
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
