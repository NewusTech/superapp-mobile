import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

import { GetDoorToDoorApiResponseSuccess } from "@/apis/internal.api.type";
import { PackageDetailPayload } from "@/app/(authenticated)/package/package-detail-form";
import { ShipmentDetailForm } from "@/app/(authenticated)/package/shipment-detail-form/[pageType]";
import { ExtractState } from "@/libs/zustand";

type PackageOrderPayloadType = {
  location?: GetDoorToDoorApiResponseSuccess["data"][number];
  form?: ShipmentDetailForm;
};
type PackageOrderPayload = {
  from: PackageOrderPayloadType;
  to: PackageOrderPayloadType;
  orderDetail: PackageDetailPayload;
};
type PackageStore = {
  packageOrderPayload: PackageOrderPayload | undefined;

  actions: {
    setPackageOrderPayload: (
      packageOrderPayload: PackageOrderPayload | undefined
    ) => void;
  };
};

const packageStore = createStore<PackageStore>()((set, get) => ({
  packageOrderPayload: undefined,

  actions: {
    setPackageOrderPayload: (packageOrderPayload) =>
      set({ packageOrderPayload }),
  },
}));

type Params<U> = Parameters<typeof useStore<typeof packageStore, U>>;

// Selectors
const packageOrderPayloadSelector = (
  state: ExtractState<typeof packageStore>
) => state.packageOrderPayload;
const actionsSelector = (state: ExtractState<typeof packageStore>) =>
  state.actions;

// getters
export const getPackageOrderPayload = () =>
  packageOrderPayloadSelector(packageStore.getState());
export const getPackageActions = () => actionsSelector(packageStore.getState());

function usePackageStore<U>(selector: Params<U>[1]) {
  return useStore(packageStore, selector);
}

// Hooks
export const usePackageOrderPayload = () =>
  usePackageStore(packageOrderPayloadSelector);
export const usePackageActions = () => usePackageStore(actionsSelector);
