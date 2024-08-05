import { AxiosError } from "axios";

import { postRegister } from "@/apis/internal.api";
import {
  PostRegisterPayload,
  PostRegisterResponseError,
} from "@/apis/internal.api.type";
import { useMutation } from "@tanstack/react-query";

export const useAuthRegister = () => {
  return useMutation({
    mutationFn: (payload: PostRegisterPayload) => postRegister(payload),
    onError: (error: AxiosError<PostRegisterResponseError>) => error,
  });
};
