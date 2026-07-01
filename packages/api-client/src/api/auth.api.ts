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
      payload
    );
  }

  refresh() {
    return this.client.api.post(
      "/authentication/v1/refresh",
      {}
    );
  }
}