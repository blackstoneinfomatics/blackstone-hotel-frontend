import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getPlatform } from "../../../utilities/device-platform";
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

export function setupRefreshInterceptor(api: AxiosInstance) {
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

  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config as InternalAxiosRequestConfig;

      if (!originalRequest) {
        return Promise.reject(error);
      }
      console.log(
  "Refresh Interceptor:",
  originalRequest.url,
  error.response?.status
);

      /**
       * Ignore refresh request
       */
      if (originalRequest.skipRefresh) {
        return Promise.reject(error);
      }

      /**
       * Not 401
       */
      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      /**
       * Refresh already running
       */
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(api(originalRequest)),
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
        await api.post(
          "/authentication/v1/refresh",
          {
            platform: getPlatform(),
          },
          {
            skipRefresh: true,
          },
        );

        processQueue();

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        localStorage.clear();
        sessionStorage.clear();

        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );
}
