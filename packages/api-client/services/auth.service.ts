import { api } from "../axios";

export interface LoginPayload {
  email: string;
  password: string;
  deviceid: string;
  role: string;
  appversion: string;
}

export const authService = {
  async login(payload: LoginPayload) {
      console.log("🔄 Refresh API Called");
    const { data } = await api.post(
      "/auth/v1/login",
      payload
    );

    return data;
  },

  async refresh() {
    console.log("🔄 Refresh API Called");

    const { data } = await api.post(
      "/authentication/v1/refresh",
      {
        platform: "web",
      }
    );

    return data;
  },
};