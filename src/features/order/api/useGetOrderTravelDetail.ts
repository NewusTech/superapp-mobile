import { getOrderTravelDetail } from "@/apis/internal.api";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderTravelDetail = (kode_pesanan: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetOrderTravelDetail"],
    queryFn: () => getOrderTravelDetail(kode_pesanan),
    enabled: !!accessToken,
  });
};
