import { AxiosError } from "axios";

import { postProcessPaymentRental } from "@/apis/internal.api";
import { PostProcessPaymentRentalPayload } from "@/apis/internal.api.type";
import { useMutation } from "@tanstack/react-query";

export const usePostProcessPaymentMutationRental = () => {
  return useMutation({
    mutationFn: (data: PostProcessPaymentRentalPayload) =>
      postProcessPaymentRental(data),
    onError: (error: AxiosError) => error,
  });
};
