import { getPariwisataBySlugApi } from "@/apis/internal.api";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetPariwisataSlugQuery = (slug: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetPariwisataSlugQuery"],
    queryFn: () => getPariwisataBySlugApi(slug),
    enabled: !!accessToken,
  });
};
