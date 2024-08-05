import { getPointToPointApi } from "@/apis/internal.api";
import { TravelPointToPointApiParams } from "@/apis/internal.api.type";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetPointToPointApi = (params: TravelPointToPointApiParams) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetPointToPointApi", params],
    queryFn: () => getPointToPointApi(params),
    enabled: !!accessToken && !!params,
  });
};
