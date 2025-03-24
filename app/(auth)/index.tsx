import { useCallback, useRef } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Scale, fonts, defaultStyles } from "@/constants";
import { Logo } from "@/assets/illustrations";
import { ThemedButton, ThemedText } from "@/components";
import { useRouter } from "expo-router";
import { Login } from "@/components/ui/Login";
import { KeyBoardAvoidingWrapper } from "@/components/KeyboardAvoidingView";

const Index = () => {
  const router = useRouter();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const animatedMargin = useSharedValue(0);
  const animatedBorderRadius = useSharedValue(0);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    animatedMargin.value = withTiming(StatusBar.currentHeight || 30, {
      duration: 300,
    });
    animatedBorderRadius.value = withTiming(StatusBar.currentHeight || 30, {
      duration: 300,
    });
  }, []);

  const handleDismiss = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();

    animatedMargin.value = withTiming(0, { duration: 50 });
    animatedBorderRadius.value = withTiming(0, { duration: 50 });
  }, []);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    marginTop: animatedMargin.value,
    borderTopLeftRadius: animatedBorderRadius.value,
    borderTopRightRadius: animatedBorderRadius.value,
  }));

  return (
    <Animated.View
      style={[defaultStyles.containerPrimary, animatedContainerStyle]}
    >
      <SafeAreaView style={[defaultStyles.flexCenter, styles.container]}>
        <Logo />
        <View style={styles.buttonWrapper}>
          <ThemedButton
            type="white"
            color={Colors.tint}
            textStyle={styles.buttonText}
            title="Login"
            style={styles.button}
            onPress={handlePresentModalPress}
          />
        </View>
      </SafeAreaView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["94%"]}
        index={1}
        enablePanDownToClose={true}
        backgroundStyle={styles.bottomSheetBackground}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
        onDismiss={handleDismiss}
        keyboardBlurBehavior="none"
        keyboardBehavior="interactive"
      >
        <BottomSheetView style={styles.contentContainer}>
          <Login onDismiss={handleDismiss} />
        </BottomSheetView>
      </BottomSheetModal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Scale.pixelSizeHorizontal(20),
    position: "relative",
  },
  buttonWrapper: {
    position: "absolute",
    bottom: Scale.pixelSizeVertical(50),
    width: "100%",
    alignItems: "center",
    gap: Scale.pixelSizeVertical(10),
  },

  buttonText: {
    fontSize: Scale.fontPixel(16),
    fontFamily: fonts.semiBold,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: Scale.heightPixel(4) },
    textShadowRadius: Scale.fontPixel(2),
  },
  bottomSheetBackground: {
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: Scale.pixelSizeVertical(20),
  },
});

export default Index;
