import { AxiosError } from "axios";

import { postBuktiTransferTravel } from "@/apis/internal.api";
import { useMutation } from "@tanstack/react-query";

export const usePostUploadBuktiPembayranMutation = () => {
  return useMutation({
    mutationFn: (data: { data: any; kode_pembayaran: string }) =>
      postBuktiTransferTravel(data),
    onError: (error: AxiosError) => error,
  });
};
