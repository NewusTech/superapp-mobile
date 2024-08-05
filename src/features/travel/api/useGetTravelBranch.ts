import { getTravelBranch } from "@/apis/internal.api";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetTravelBranch = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetTravelBranch"],
    queryFn: () => getTravelBranch(),
    enabled: !!accessToken,
  });
};
