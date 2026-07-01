import { AxiosError } from "axios";

import { ToastService } from "./toast";

export function handleApiError(
  error: AxiosError<any>
) {

  const data = error.response?.data;

  const message =
    data?.message ??
    "Something went wrong.";

  ToastService.error(message);

}