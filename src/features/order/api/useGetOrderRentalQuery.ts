import { getOrderListRental } from "@/apis/internal.api";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderRentalQuery = (status: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetOrderRentalQuery"],
    queryFn: () => getOrderListRental(status),
    enabled: !!accessToken,
  });
};
