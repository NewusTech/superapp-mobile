import { getPaymentStatusDetail } from "@/apis/internal.api";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetPaymentStatusDetail = (id: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetPaymentStatusDetail", id],
    queryFn: () => getPaymentStatusDetail(id),
    enabled: !!accessToken && !!id,
  });
};
