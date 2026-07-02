import { AxiosError, AxiosInstance } from "axios";

import { handleApiError } from "../utils/handle-api-error";

export function setupErrorInterceptor(api: AxiosInstance) {
  api.interceptors.response.use(
    (response) => response,

    (error: AxiosError) => {
      /**
       * Refresh interceptor
       * already handles 401
       */

      if (error.response?.status === 401) {
        return Promise.reject(error);
      }

      /**
       * Network Error
       */
      console.log(
        "Error Interceptor:",
        error.config?.url,
        error.response?.status,
      );

      if (!error.response) {
        handleApiError(error);

        return Promise.reject(error);
      }

      switch (error.response.status) {
        case 400:
        case 403:
        case 404:
        case 409:
        case 422:
        case 429:
        case 500:
        case 503:
          handleApiError(error);

          break;

        default:
          handleApiError(error);
      }

      return Promise.reject(error);
    },
  );
}
