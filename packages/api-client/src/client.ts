import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import "axios";

declare module "axios" {
  interface AxiosRequestConfig<D = any> {
    skipRefresh?: boolean;
  }

  interface InternalAxiosRequestConfig<D = any> {
    _retry?: boolean;
    skipRefresh?: boolean;
  }
}

export interface ApiClientOptions {
  baseURL: string;
  appVersion: string;
  appName: string;
}


export class ApiClient {
  public readonly api: AxiosInstance;

  constructor(public readonly options: ApiClientOptions) {
    this.api = axios.create({
      baseURL: options.baseURL,
      timeout: 30000,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    this.setupRefreshInterceptor();
  }

  private setupRefreshInterceptor() {
    let isRefreshing = false;

    let failedQueue: {
      resolve: () => void;
      reject: (error: any) => void;
    }[] = [];

    const processQueue = (error?: any) => {
      failedQueue.forEach((promise) => {
        if (error) {
          promise.reject(error);
        } else {
          promise.resolve();
        }
      });

      failedQueue = [];
    };

    this.api.interceptors.response.use(
      (response) => response,

      async (error) => {
        const originalRequest =
          error.config as InternalAxiosRequestConfig;

        if (!originalRequest) {
          return Promise.reject(error);
        }

        /**
         * Ignore refresh request
         */
        if (originalRequest.skipRefresh) {
          return Promise.reject(error);
        }

        /**
         * Not 401
         */
        if (
          error.response?.status !== 401 ||
          originalRequest._retry
        ) {
          return Promise.reject(error);
        }

        /**
         * Refresh already running
         */
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: () => resolve(this.api(originalRequest)),
              reject,
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          /**
           * Refresh Cookie
           */
          await this.api.post(
            "/authentication/v1/refresh",
            {
              "platform":this.options.appName,
            },
            {
              skipRefresh: true,
            }
          );

          processQueue();

          return this.api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError);

          localStorage.clear();
          sessionStorage.clear();

          window.location.href = "/login";

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    );
  }
}