import { getRentalCarLIst } from "@/apis/internal.api";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetRentalCarQuery = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetRentalCarQuery"],
    queryFn: () => getRentalCarLIst(),
    enabled: !!accessToken,
  });
};
