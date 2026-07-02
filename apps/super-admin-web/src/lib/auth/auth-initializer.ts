// src/auth/auth-initializer.ts

import { AuthService } from "@repo/api-client";

export class AuthInitializer {
  constructor(
    private readonly authService: AuthService
  ) {}

  async initialize() {
     console.log("🚀 AuthInitializer Started");
    try {
      await this.authService.refresh();
   
    console.log("✅ Refresh Success");
      return {
        authenticated: true,
      };
    } catch(error) {
         console.log("❌ Refresh Failed", error);
      return {
        authenticated: false,
      };
    }
  }
}