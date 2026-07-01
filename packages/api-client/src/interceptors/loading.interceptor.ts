import { AxiosInstance } from "axios";

import { useLoadingStore } from "../stores/loading.store";

export function setupLoadingInterceptor(
  api: AxiosInstance
) {

  api.interceptors.request.use((config) => {

    useLoadingStore.getState().start();

    return config;
  });

  api.interceptors.response.use(

    (response) => {

      useLoadingStore.getState().stop();

      return response;
    },

    (error) => {

      useLoadingStore.getState().stop();

      return Promise.reject(error);

    }

  );

}