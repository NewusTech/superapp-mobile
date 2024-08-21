import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

import { RentalCarData, RentalCarQuery } from "@/apis/internal.api.type";
import { UserRent } from "@/app/(authenticated)/rental/detail-user-rent";
import { ExtractState } from "@/libs/zustand";

type RentalStore = {
  rentalCarPayload: RentalCarQuery;
  userRentalPayload: UserRent;
  rentalCarData?: RentalCarData;

  actions: {
    setRentalPayload: (rentalCarPayload?: RentalCarQuery) => void;
    setUserRentalPayload: (userRentalPayload?: UserRent) => void;
    setRentalCarData: (rentalCarData?: RentalCarData) => void;
  };
};

const rentalStore = createStore<RentalStore>()((set, get) => ({
  rentalCarPayload: {
    all_in: 0,
    area: "",
    durasi_sewa: 1,
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

  rentalCarData: undefined,

  actions: {
    setRentalPayload: (rentalCarPayload) => set({ rentalCarPayload }),
    setUserRentalPayload: (userRentalPayload) => set({ userRentalPayload }),
    setRentalCarData: (rentalCarData: any) => set({ rentalCarData }),
  },
}));

type Params<U> = Parameters<typeof useStore<typeof rentalStore, U>>;

// Selectors
const rentalPayloadSelector = (state: ExtractState<typeof rentalStore>) =>
  state.rentalCarPayload;
const userRentalPayloadSelector = (state: ExtractState<typeof rentalStore>) =>
  state.userRentalPayload;
const userRentalCarSelector = (state: ExtractState<typeof rentalStore>) =>
  state.rentalCarData;
const actionsSelector = (state: ExtractState<typeof rentalStore>) =>
  state.actions;

// getters
export const getrentalPayload = () =>
  rentalPayloadSelector(rentalStore.getState());
export const getUserRentalPayload = () =>
  userRentalPayloadSelector(rentalStore.getState());
export const getRentalCarData = () =>
  userRentalCarSelector(rentalStore.getState());
export const getTravelActions = () => actionsSelector(rentalStore.getState());

function useRentalStore<U>(selector: Params<U>[1]) {
  return useStore(rentalStore, selector);
}

// Hooks
export const useRentalBookingPayload = () =>
  useRentalStore(rentalPayloadSelector);
export const useUserRentalPayload = () =>
  useRentalStore(userRentalPayloadSelector);
export const useRentalCarData = () => useRentalStore(userRentalCarSelector);
export const useRentActions = () => useRentalStore(actionsSelector);
