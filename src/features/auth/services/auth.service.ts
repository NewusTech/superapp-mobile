import { Snackbar } from "@/components";
import { removeItem } from "@/libs/async-storage";

import { getAuthActions } from "../store/auth-store";

export const handleLogoutSession = async () => {
  const { clearAuthSession } = getAuthActions();
  clearAuthSession();
  await removeItem("accesstoken");
  await removeItem("profile");

  Snackbar.show({ message: "Logging out" });
};
