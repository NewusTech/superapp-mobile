import { getRentalBookDatesApi } from "@/apis/internal.api";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetBookDatesQuery = (mobil_id: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetBookDatesQuery"],
    queryFn: () => getRentalBookDatesApi({ mobil_id }),
    enabled: !!accessToken,
  });
};
