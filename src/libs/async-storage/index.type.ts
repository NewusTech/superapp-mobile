import { PostLoginResponseSuccess } from "@/apis/internal.api.type";

export type StorageData = {
  accesstoken: string;
  profile: PostLoginResponseSuccess["data"];
};
