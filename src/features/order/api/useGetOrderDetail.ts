import { getOrderDetail } from "@/apis/internal.api";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderDetail = (kode_pesanan: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetOrderDetail"],
    queryFn: () => getOrderDetail(kode_pesanan),
    enabled: !!accessToken,
  });
};
