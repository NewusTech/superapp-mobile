import { getTravelSchedule } from "@/apis/internal.api";
import { TravelScheduleQuery } from "@/apis/internal.api.type";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetTravelSchedule = (params: TravelScheduleQuery) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetSchedule", params],
    queryFn: () => getTravelSchedule(params),
    enabled: !!accessToken,
  });
};
