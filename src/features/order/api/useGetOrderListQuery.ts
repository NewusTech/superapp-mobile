import { getOrderList } from "@/apis/internal.api";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderListQuery = (status: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetOrderListQuery"],
    queryFn: () => getOrderList(status),
    enabled: !!accessToken,
  });
};
