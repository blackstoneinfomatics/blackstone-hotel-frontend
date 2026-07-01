import { AxiosInstance } from "axios";

export function setupLoggerInterceptor(
  api: AxiosInstance
) {

  api.interceptors.request.use((config) => {

    console.groupCollapsed(
      `🚀 ${config.method?.toUpperCase()} ${config.url}`
    );

    console.log("Headers", config.headers);

    console.log("Body", config.data);

    console.groupEnd();

    return config;

  });

  api.interceptors.response.use(

    (response) => {

      console.groupCollapsed(
        `✅ ${response.status} ${response.config.url}`
      );

      console.log(response.data);

      console.groupEnd();

      return response;

    },

    (error) => {

      console.groupCollapsed(
        `❌ ${error.response?.status} ${error.config?.url}`
      );

      console.log(error.response?.data);

      console.groupEnd();

      return Promise.reject(error);

    }

  );

}