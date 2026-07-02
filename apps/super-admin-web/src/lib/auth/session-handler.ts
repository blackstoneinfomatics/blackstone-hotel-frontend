import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface SessionHandlerOptions {
  queryClient?: QueryClient;
}

export class SessionHandler {
  constructor(
    private readonly options?: SessionHandlerOptions
  ) {}

  async clearSession(message?: string) {
    try {
      /**
       * Clear React Query Cache
       */
      this.options?.queryClient?.clear();

      /**
       * Clear Browser Storage
       */
      localStorage.clear();
      sessionStorage.clear();

      /**
       * TODO
       * Clear Zustand Stores
       */

      /**
       * Optional
       * Show Toast
       */

      if (message) {
        toast.error(message);
        console.log(message);
      }

      /**
       * Redirect Login
       */

      window.location.replace("/login");
    } catch (error) {
      console.error(error);

      window.location.replace("/login");
    }
  }
}