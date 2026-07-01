import { AxiosInstance } from "axios";
import { setupRefreshInterceptor } from "./refresh.interceptor";
import { setupErrorInterceptor } from "./error.interceptor";
import { setupLoadingInterceptor } from "./loading.interceptor";
import { setupLoggerInterceptor } from "./logger.interceptor";

export function registerInterceptors(api: AxiosInstance) {
  setupRefreshInterceptor(api);

  setupErrorInterceptor(api);

  setupLoadingInterceptor(api);

  if (process.env.NODE_ENV === "development") {
    setupLoggerInterceptor(api);
  }
}
