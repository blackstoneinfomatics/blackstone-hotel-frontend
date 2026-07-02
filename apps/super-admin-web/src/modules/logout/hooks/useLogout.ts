import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../lib/auth/api";

export function useLogout() {
  return useMutation({
    mutationFn: authService.logout.bind(authService),
  });
}