import { AxiosError } from "axios";

import { postUpdateFotoProfile } from "@/apis/internal.api";
import { useMutation } from "@tanstack/react-query";

export const useUpdateFotoProfile = () => {
  return useMutation({
    mutationFn: async (data: any) => postUpdateFotoProfile(data),
    onError: (error: AxiosError) => error,
  });
};
