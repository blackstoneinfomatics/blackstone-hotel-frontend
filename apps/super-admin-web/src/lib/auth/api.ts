import { ApiClient, AuthService } from "@repo/api-client";

const client = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION!,
  appName: process.env.NEXT_PUBLIC_APP_NAME!,
});

export const authService = new AuthService(client);