import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

import { PostLoginResponseSuccess } from "@/apis/internal.api.type";
import { ExtractState } from "@/libs/zustand";

type AuthStore = {
  accessToken: string | null;
  profile: PostLoginResponseSuccess["data"] | null;

  actions: {
    setAccessToken: (accessToken: string | null) => void;
    setProfile: (data: PostLoginResponseSuccess["data"]) => void;
    clearAuthSession: () => void;
  };
};

const authStore = createStore<AuthStore>()((set, get) => ({
  accessToken: null,
  profile: null,

  actions: {
    setAccessToken: (accessToken) => set({ accessToken }),
    setProfile: (profile) => set({ profile }),
    clearAuthSession: async () => {
      set({
        accessToken: null,
        profile: null,
      });
    },
  },
}));

type Params<U> = Parameters<typeof useStore<typeof authStore, U>>;

// Selectors
const accessTokenSelector = (state: ExtractState<typeof authStore>) =>
  state.accessToken;
const profileSelector = (state: ExtractState<typeof authStore>) =>
  state.profile;
const actionsSelector = (state: ExtractState<typeof authStore>) =>
  state.actions;

// getters
export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getProfile = () => profileSelector(authStore.getState());
export const getAuthActions = () => actionsSelector(authStore.getState());

function useAuthStore<U>(selector: Params<U>[1]) {
  return useStore(authStore, selector);
}

// Hooks
export const useAccessToken = () => useAuthStore(accessTokenSelector);
export const useAuthProfile = () => useAuthStore(profileSelector);
export const useAuthActions = () => useAuthStore(actionsSelector);
