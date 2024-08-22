import { getOrderRentalDetail } from "@/apis/internal.api";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderRentalDetailQuery = (kode_pesanan: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetOrderRentalDetailQuery"],
    queryFn: () => getOrderRentalDetail(kode_pesanan),
    enabled: !!accessToken,
  });
};
