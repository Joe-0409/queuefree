import { PropsWithChildren, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import * as ReactQuery from "@tanstack/react-query";

export function QueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(
    () =>
      new (ReactQuery as unknown as { QueryClient: new (...args: any[]) => any }).QueryClient({
        defaultOptions: {
          queries: {
            retry: 0
          },
          mutations: {
            retry: 0
          }
        }
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
