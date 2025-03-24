import { useCallback, useEffect, useState } from "react";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

export const useFontScheme = () => {
  const [isFontReady, setIsFontReady] = useState(false);

  SplashScreen.preventAutoHideAsync();

  const subscribe = async () => {
    SplashScreen.preventAutoHideAsync();

    try {
      await Font.loadAsync({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold,
      });
    } catch (error) {
      console.error(error);
    } finally {
      Font.isLoaded ? setIsFontReady(true) : setIsFontReady(false);
    }
  };
  useEffect(() => {
    subscribe();
  });

  const unSubscribe = async () => {
    isFontReady === true ? SplashScreen.hideAsync() : subscribe();
  };

  useEffect(() => {
    unSubscribe();
  });

  return { isFontReady };
};
