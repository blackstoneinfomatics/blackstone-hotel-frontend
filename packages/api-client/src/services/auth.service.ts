import { AuthApi } from "../api/auth.api";
import { ApiClient } from "../client";

import { getDeviceId } from "../../../utilities/device";
import { getPlatform } from "../../../utilities/device-platform";
import { sessionHandler } from "@/lib/auth";

export interface LoginPayload {
  email: string;
  password: string;
}

export class AuthService {
  private readonly authApi: AuthApi;

  constructor(private readonly client: ApiClient) {
    this.authApi = new AuthApi(client);
  }

  async login(payload: LoginPayload) {
    const request = {
      ...payload,
      deviceId: getDeviceId(),
      platform: getPlatform(),
      appVersion: this.client.options.appVersion,
    };
    
  console.count("LOGIN API CALLED");

    const { data } = await this.authApi.login(request);

    return data;
  }

      // ✅ Logout
  async logout() {
    const { data } = await this.authApi.logout();
    await sessionHandler.clearSession();
    return data;
  }

  async refresh() {
      console.log("📞 AuthService.refresh()");

    const { data } = await this.authApi.refresh({
      platform: getPlatform(),
    });

    return data;
  }
}