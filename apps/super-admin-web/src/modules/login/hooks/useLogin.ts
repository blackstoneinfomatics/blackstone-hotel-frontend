
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../lib/auth/api";
export function useLogin() {
  return useMutation({
    mutationFn: authService.login.bind(authService),
  });
}