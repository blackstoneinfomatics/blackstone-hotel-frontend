import { ApiClient } from "../client";

export interface LoginRequest {
  email: string;
  password: string;
  deviceId: string;
  platform: string;
  appVersion: string;
}

export class AuthApi {
  constructor(private readonly client: ApiClient) {}

  login(payload: LoginRequest) {
    return this.client.api.post(
      "/authentication/v1/login",
      payload,
      {
      skipRefresh: true,
    }
    );
  }

  refresh(payload?: { platform: string }) {
          console.log("📞 AuthAPi.refresh()");
          console.log("📞 AuthAPi.refresh() payload", payload);
    return this.client.api.post(
      "/authentication/v1/refresh",
      payload || {},
        {
        skipRefresh: true,
      }
    );
  }
}