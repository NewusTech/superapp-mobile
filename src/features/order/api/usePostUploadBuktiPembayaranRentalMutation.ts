import { AxiosError } from "axios";

import { postBuktiTransferRental } from "@/apis/internal.api";
import { useMutation } from "@tanstack/react-query";

export const usePostUploadBuktiPembayaranRentalMutation = () => {
  return useMutation({
    mutationFn: (data: { data: any; kode_pembayaran: string }) =>
      postBuktiTransferRental(data),
    onError: (error: AxiosError) => error,
  });
};
