import axios, { AxiosInstance } from "axios";

export interface ApiClientOptions {
  baseURL: string;
  appVersion: string;
  appName: string;
}

export class ApiClient {
  public readonly api: AxiosInstance;

  constructor(
    public readonly options: ApiClientOptions
  ) {
    this.api = axios.create({
      baseURL: options.baseURL,
      timeout: 30000,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}