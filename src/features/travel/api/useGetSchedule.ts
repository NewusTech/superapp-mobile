import { getTravelSchedule } from "@/apis/internal.api";
import { TravelScheduleQuery } from "@/apis/internal.api.type";
import { convertToStartOfDay } from "@/constants/Constant";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetTravelSchedule = (params: TravelScheduleQuery) => {
  const accessToken = useAccessToken();
  console.log({ params });
  let tmpData;
  tmpData = params;
  tmpData.date = convertToStartOfDay(params.date) as any;
  console.log({ tmpData });
  return useQuery({
    queryKey: ["useGetSchedule", params],
    queryFn: () => getTravelSchedule(tmpData),
    enabled: !!accessToken,
  });
};
