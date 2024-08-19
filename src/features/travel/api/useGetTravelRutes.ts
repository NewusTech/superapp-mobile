import { getTravelRute } from "@/apis/internal.api";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetTravelRute = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetTravelRute"],
    queryFn: () => getTravelRute(),
    enabled: !!accessToken,
  });
};
