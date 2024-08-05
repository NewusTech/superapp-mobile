import AsyncStorage from "@react-native-async-storage/async-storage";

import { StorageData } from "./index.type";

export const setItem = async <K extends keyof StorageData>(
  key: K,
  value: StorageData[K],
) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setItem AsyncStorage", error);
  }
};

export const getItem = async <K extends keyof StorageData>(
  key: K,
): Promise<StorageData[K] | null> => {
  try {
    const data = await AsyncStorage.getItem(key);

    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getItem AsyncStorage", error);
    return null;
  }
};

export const removeItem = async <K extends keyof StorageData>(key: K) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removeItem AsyncStorage", error);
  }
};
