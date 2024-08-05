import { AxiosError } from "axios";

import { postLogin } from "@/apis/internal.api";
import {
  PostLoginPayload,
  PostLoginResponseError,
} from "@/apis/internal.api.type";
import { useMutation } from "@tanstack/react-query";

export const useAuthLogin = () => {
  return useMutation({
    mutationFn: (payload: PostLoginPayload) => postLogin(payload),
    onError: (error: AxiosError<PostLoginResponseError>) => error,
  });
};
