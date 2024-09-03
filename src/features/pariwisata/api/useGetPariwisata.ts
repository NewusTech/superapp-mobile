import { getPariwisataApi } from "@/apis/internal.api";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetPariwisata = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetPariwisata"],
    queryFn: () => getPariwisataApi(),
    enabled: !!accessToken,
  });
};
