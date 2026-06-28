import { useState } from "react";
import { authService } from "../../../../../../packages/api-client/services/auth.service";
import { getDeviceId } from "../../../../../../packages/utilities/device";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (     
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);

      const data = await authService.login({
        email,
        password,
        deviceid: getDeviceId(),
        role: "SUPER_ADMIN",
        appversion: "1.0.0",
      });

      return data;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
};