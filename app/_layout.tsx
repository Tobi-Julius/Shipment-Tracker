// app/_layout.tsx
import "react-native-gesture-handler";
import React, { useEffect, useState, useCallback } from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFontScheme } from "@/hooks";

import Splash from "./Splash";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Platform } from "react-native";

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const { isFontReady } = useFontScheme();

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } catch (error) {
        console.warn("Error loading app resources:", error);
      } finally {
        setIsAppReady(true);
      }
    };
    prepareApp();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady && isFontReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady, isFontReady]);

  if (!isAppReady || !isFontReady) {
    return <Splash />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack onLayout={onLayoutRootView}>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              animation: "fade",
              presentation:
                Platform.OS === "android" ? "transparentModal" : "card",
              animationDuration: 500,
            }}
          />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="dark" />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
