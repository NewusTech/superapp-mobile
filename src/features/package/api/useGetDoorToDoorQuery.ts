import { getDoorToDoorApi } from "@/apis/internal.api";
import { GetDoorToDoorParams } from "@/apis/internal.api.type";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetDoorToDoorQuery = (params: GetDoorToDoorParams) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetDoorToDoorQuery", params],
    queryFn: () => getDoorToDoorApi(params),
    enabled: !!accessToken && !!params.query,
  });
};
