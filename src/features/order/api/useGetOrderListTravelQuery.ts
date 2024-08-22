import { getOrderListTravel } from "@/apis/internal.api";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderListTravelQuery = (status: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetOrderListTravelQuery"],
    queryFn: () => getOrderListTravel(status),
    enabled: !!accessToken,
  });
};
