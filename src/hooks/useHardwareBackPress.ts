import { useCallback, useEffect } from "react";
import { BackHandler } from "react-native";
import { router, useNavigation } from "expo-router";

export const useHardwareBackpress = (onBackFunction?: () => void) => {
  const navigation = useNavigation();

  const goBackAction = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      const routes = navigation.getState().routes;
      console.log(routes);


      const routeList = ["article", "home", "order", "profile"];
      if (routeList.includes(routes?.[routes.length - 1].name)) {
        BackHandler.exitApp();
      } else {
        router.replace("/(home)/dashboard");
      }
    }
  }, [navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (onBackFunction) {
          onBackFunction();
        } else {
          goBackAction();
        }

        return true;
      }
    );

    return () => backHandler.remove();
  }, [goBackAction, onBackFunction]);

  return { goBackAction };
};
