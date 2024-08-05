import { getArticleById } from "@/apis/internal.api";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetArticleDetail = (id?: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetArticleDetail", id],
    queryFn: () => getArticleById(id as string),
    enabled: !!accessToken || !!id,
  });
};
