import { getUserProfile } from "@/apis/internal.api";
import { useQuery } from "@tanstack/react-query";

import { useAccessToken } from "../store/auth-store";

export const useGetProfile = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetProfile", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getUserProfile(),
    enabled: !!accessToken,
  });
};
