import { getArticles } from "@/apis/internal.api";
import { GetArticleQuery } from "@/apis/internal.api.type";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetArticleList = (query?: GetArticleQuery) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetArticleList", accessToken, query],
    queryFn: () => getArticles(query),
    enabled: !!accessToken && false,
  });
};
