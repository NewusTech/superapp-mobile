import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

import {
  TravelScheduleQuery,
  TravelScheduleResponseSuccess,
} from "@/apis/internal.api.type";
import { PassengerSeat } from "@/app/(authenticated)/travel/passenger/[index]";
import { ExtractState } from "@/libs/zustand";

type TravelStore = {
  bookingPayload?: TravelScheduleQuery;
  pointToPointPayload?: {
    from?: { point: string; id: string };
    to?: { point: string; id: string };
  };
  travelSchedule?: TravelScheduleResponseSuccess["data"][number];
  passenger: PassengerSeat[];
  pesananResponse?: any;
  passagerOneSameOnUser: boolean;

  actions: {
    setBookingPayload: (bookinPayload?: TravelScheduleQuery) => void;
    setPointToPointPayload: (bookinPayload?: {
      from?: { point: string; id: string };
      to?: { point: string; id: string };
    }) => void;
    setTravelSchedule: (
      bookinPayload?: TravelScheduleResponseSuccess["data"][number]
    ) => void;
    setPassenger: (bookinPayload: PassengerSeat[]) => void;
    setPesananResponse: (response: any) => void;
    clearBookingSession: () => void;
    setPassengerOneSameOnUser: (payload: boolean) => void;
  };
};

const travelStore = createStore<TravelStore>()((set, get) => ({
  bookingPayload: undefined,
  pointToPointPayload: undefined,
  travelSchedule: undefined,
  passenger: [],
  pesananResponse: undefined,
  passagerOneSameOnUser: false,

  actions: {
    setBookingPayload: (bookingPayload) => set({ bookingPayload }),
    setPointToPointPayload: (pointToPointPayload) =>
      set({ pointToPointPayload: pointToPointPayload }),
    setTravelSchedule: (travelSchedule) => set({ travelSchedule }),
    setPassenger: (passenger) => set({ passenger }),
    setPesananResponse: (response) => set({ pesananResponse: response }),
    clearBookingSession: async () => {
      set({
        bookingPayload: undefined,
      });
    },
    setPassengerOneSameOnUser: (passagerOneSameOnUser) =>
      set({ passagerOneSameOnUser }),
  },
}));

type Params<U> = Parameters<typeof useStore<typeof travelStore, U>>;

// Selectors
const bookingPayloadSelector = (state: ExtractState<typeof travelStore>) =>
  state.bookingPayload;
const pointToPointPayloadSelector = (state: ExtractState<typeof travelStore>) =>
  state.pointToPointPayload;
const travelScheduleSelector = (state: ExtractState<typeof travelStore>) =>
  state.travelSchedule;
const travelPassengerSelector = (state: ExtractState<typeof travelStore>) =>
  state.passenger;
const actionsSelector = (state: ExtractState<typeof travelStore>) =>
  state.actions;
const pesananResponseSelector = (state: ExtractState<typeof travelStore>) =>
  state.pesananResponse;
const passengerOneSameOnUserSelector = (
  state: ExtractState<typeof travelStore>
) => state.passagerOneSameOnUser;

// getters
export const getbookingPayload = () =>
  bookingPayloadSelector(travelStore.getState());
export const getPointToPointPayload = () =>
  pointToPointPayloadSelector(travelStore.getState());
export const getTravelSchedule = () =>
  travelScheduleSelector(travelStore.getState());
export const getTravelPassenger = () =>
  travelPassengerSelector(travelStore.getState());
export const getTravelActions = () => actionsSelector(travelStore.getState());
export const getPesananResponse = () =>
  pesananResponseSelector(travelStore.getState());
export const getPassengeSameOnUserSelector = () =>
  passengerOneSameOnUserSelector(travelStore.getState());

function useTravelStore<U>(selector: Params<U>[1]) {
  return useStore(travelStore, selector);
}

// Hooks
export const useTravelbookingPayload = () =>
  useTravelStore(bookingPayloadSelector);
export const useTravelPointToPointPayload = () =>
  useTravelStore(pointToPointPayloadSelector);
export const useTravelSchedule = () => useTravelStore(travelScheduleSelector);
export const useTravelPassenger = () => useTravelStore(travelPassengerSelector);
export const useTravelActions = () => useTravelStore(actionsSelector);
export const usePesananResponse = () => useTravelStore(pesananResponseSelector);
export const usePassengerOneSameOnUser = () =>
  useTravelStore(passengerOneSameOnUserSelector);
