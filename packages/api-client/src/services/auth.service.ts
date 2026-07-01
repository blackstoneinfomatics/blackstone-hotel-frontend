import { AuthApi } from "../api/auth.api";
import { ApiClient } from "../client";

import { getDeviceId } from "../../../utilities/device";
import { getPlatform } from "../../../utilities/device-platform";

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
    

    const { data } = await this.authApi.login(request);

    return data;
  }

  async refresh() {
    const { data } = await this.authApi.refresh();

    return data;
  }
}