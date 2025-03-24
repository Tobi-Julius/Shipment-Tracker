import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Top, Bottom } from "@/assets/illustrations";
import { useRouter } from "expo-router";
import { Scale } from "@/constants";
import { Colors } from "@/constants";
import { StatusBar } from "expo-status-bar";

const Splash = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const scaleAnimTop = useRef(new Animated.Value(1)).current;
  const bottomTranslateX = useRef(new Animated.Value(0)).current;
  const bottomTranslateY = useRef(new Animated.Value(0)).current;
  const topTranslateX = useRef(new Animated.Value(0)).current;
  const topTranslateY = useRef(new Animated.Value(0)).current;
  const backgroundColorAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const initialWidth = Scale.widthPixel(37);
  const initialHeight = Scale.heightPixel(36);
  const targetWidth = Scale.widthPixel(146);
  const targetHeight = Scale.heightPixel(144);
  const scaleTarget = targetWidth / initialWidth;

  const topViewBoxHeight = Scale.heightPixel(48);
  const bottomViewBoxHeight = Scale.heightPixel(92);
  const totalViewBoxHeight = topViewBoxHeight + bottomViewBoxHeight + 5;
  const initialTopHeight =
    (initialHeight * topViewBoxHeight) /
    (topViewBoxHeight + bottomViewBoxHeight);
  const initialBottomHeight =
    (initialHeight * bottomViewBoxHeight) /
    (topViewBoxHeight + bottomViewBoxHeight);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: scaleTarget,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: scaleTarget * 2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimTop, {
          toValue: scaleTarget * 0.6,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bottomTranslateX, {
          toValue: -10,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bottomTranslateY, {
          toValue: -25,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(topTranslateX, {
          toValue: -5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(topTranslateY, {
          toValue: -5,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(backgroundColorAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start(async () => {
      await SplashScreen.hideAsync();
      router.replace("/auth/onBoard");
    });

    return () => {
      scaleAnim.setValue(1);
      scaleAnimTop.setValue(1);
      bottomTranslateX.setValue(0);
      topTranslateY.setValue(0);
      bottomTranslateX.setValue(0);
      topTranslateY.setValue(0);
      backgroundColorAnim.setValue(0);
    };
  }, [
    scaleAnim,
    bottomTranslateX,
    bottomTranslateY,
    backgroundColorAnim,
    topTranslateX,
    topTranslateY,
    router,
  ]);

  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.white, Colors.tint],
  });

  const translateY = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1000, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor,
            transform: [{ translateY }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.stackContainer}>
          <Animated.View
            style={{
              transform: [
                { scale: scaleAnimTop },
                { translateX: topTranslateX },
                { translateY: topTranslateY },
              ],
            }}
          >
            <Top width={initialWidth} height={initialTopHeight} />
          </Animated.View>

          <View style={{ height: 1 }} />
          <Animated.View
            style={{
              transform: [
                { translateX: bottomTranslateX },
                { translateY: bottomTranslateY },
              ],
            }}
          >
            <Bottom width={initialWidth} height={initialBottomHeight} />
          </Animated.View>
        </View>
      </Animated.View>
      <StatusBar translucent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  stackContainer: {
    alignItems: "center",
  },
});

export default Splash;
