import { AxiosError } from "axios";

import { postProcessPayment } from "@/apis/internal.api";
import { PostProcessPaymentPayload } from "@/apis/internal.api.type";
import { useMutation } from "@tanstack/react-query";

export const usePostProcessPaymentMutation = () => {
  return useMutation({
    mutationFn: (data: PostProcessPaymentPayload) => postProcessPayment(data),
    onError: (error: AxiosError) => error,
  });
};
