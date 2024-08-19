import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

import { RentalCarQuery } from "@/apis/internal.api.type";
import { UserRent } from "@/app/(authenticated)/rental/detail-user-rent";
import { ExtractState } from "@/libs/zustand";

type RentalStore = {
  rentalCarPayload: RentalCarQuery;
  userRentalPayload: UserRent;

  actions: {
    setRentalPayload: (rentalCarPayload?: RentalCarQuery) => void;
    setUserRentalPayload: (userRentalPayload?: UserRent) => void;
  };
};

const rentalStore = createStore<RentalStore>()((set, get) => ({
  rentalCarPayload: {
    all_in: "",
    area: "",
    durasi_sewa: "",
    alamat_keberangkatan: "",
    rute: "",
    tanggal_mulai: new Date(),
    tanggal_selesai: new Date(),
  },
  userRentalPayload: {
    nama: "",
    email: "",
    nik: "",
    no_telp: "",
    alamat: "",
  },

  actions: {
    setRentalPayload: (rentalCarPayload) => set({ rentalCarPayload }),
    setUserRentalPayload: (userRentalPayload) => set({ userRentalPayload }),
  },
}));

type Params<U> = Parameters<typeof useStore<typeof rentalStore, U>>;

// Selectors
const rentalPayloadSelector = (state: ExtractState<typeof rentalStore>) =>
  state.rentalCarPayload;
const userRentalPayloadSelector = (state: ExtractState<typeof rentalStore>) =>
  state.userRentalPayload;
const actionsSelector = (state: ExtractState<typeof rentalStore>) =>
  state.actions;

// getters
export const getrentalPayload = () =>
  rentalPayloadSelector(rentalStore.getState());
export const getUserRentalPayload = () =>
  userRentalPayloadSelector(rentalStore.getState());
export const getTravelActions = () => actionsSelector(rentalStore.getState());

function useRentalStore<U>(selector: Params<U>[1]) {
  return useStore(rentalStore, selector);
}

// Hooks
export const useRentalBookingPayload = () =>
  useRentalStore(rentalPayloadSelector);
export const useUserRentalPayload = () =>
  useRentalStore(userRentalPayloadSelector);
export const useRentActions = () => useRentalStore(actionsSelector);
