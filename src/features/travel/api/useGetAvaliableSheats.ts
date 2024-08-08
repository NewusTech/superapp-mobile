import { getAvaliableSheatApi } from "@/apis/internal.api";
import { AvaliableSheats } from "@/apis/internal.api.type";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetAvaliableSheats = (params: AvaliableSheats) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetAvaliableSheats", params],
    queryFn: () => getAvaliableSheatApi(params),
    enabled: !!accessToken && !!params,
  });
};
