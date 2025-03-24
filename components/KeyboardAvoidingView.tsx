import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  View,
  type KeyboardAvoidingViewProps,
  type ScrollViewProps,
} from "react-native";
import { Scale } from "@/constants";

type KeyBoardAvoidingWrapperProps = {
  children: React.ReactNode;
  offset?: number;
  behavior?: "padding" | "height" | "position" | undefined;
  scrollViewProps?: ScrollViewProps;
  keyboardAvoidingProps?: Omit<
    KeyboardAvoidingViewProps,
    "behavior" | "keyboardVerticalOffset"
  >;
};

export const KeyBoardAvoidingWrapper = ({
  children,
  offset,
  behavior = Platform.OS === "ios" ? "padding" : "height",
  scrollViewProps = {},
  keyboardAvoidingProps = {},
}: KeyBoardAvoidingWrapperProps) => {
  const defaultOffset = Platform.select({
    ios: Scale.heightPixel(50),
    android: Scale.heightPixel(150),
  });

  return (
    <KeyboardAvoidingView
      behavior={behavior}
      keyboardVerticalOffset={offset ?? defaultOffset}
      style={[styles.keyboardAvoidingView, keyboardAvoidingProps.style]}
      {...keyboardAvoidingProps}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>{children}</View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
  },
});
