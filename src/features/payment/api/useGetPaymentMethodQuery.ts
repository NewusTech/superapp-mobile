import { getPaymentMethod } from "@/apis/internal.api";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetPaymentMethodQuery = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetPaymentOption"],
    queryFn: () => getPaymentMethod(),
    enabled: !!accessToken,
  });
};
