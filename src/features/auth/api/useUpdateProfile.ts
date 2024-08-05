import { AxiosError } from "axios";

import { putUpdateUserProfile } from "@/apis/internal.api";
import { PostUpdateProfileData } from "@/apis/internal.api.type";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: async (data: PostUpdateProfileData) =>
      putUpdateUserProfile(data),
    onError: (error: AxiosError) => error,
  });
};
