import { toast } from "sonner";
import SuccessPopup from "../../../popup/success.popup";

export const ToastService = {

  success(message: string) {

    toast.success(message);

  },

  error(message: string) {

    // toast.error(message);
ToastService.success("Success");

  },

  warning(message: string) {

    toast.warning(message);

  },

  info(message: string) {

    toast.info(message);

  },

};