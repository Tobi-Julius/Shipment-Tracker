import React, { useRef, useEffect } from "react";
import {
  TextInput as RNTextInput,
  View,
  StyleSheet,
  Animated,
  Text,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors, defaultStyles, fonts, Scale } from "@/constants";

export type ThemedTextInputProps = RNTextInput["props"] & {
  label: string;
  backgroundColor?: string;
  type?: "default" | "filled" | "url";
  secureTextEntry?: boolean;
};

export function ThemedTextInput({
  style,
  backgroundColor = Colors.backgroundFade,
  label,
  type = "default",
  onFocus,
  onBlur,
  secureTextEntry,
  value,
  ...rest
}: ThemedTextInputProps) {
  const animatedLabelPosition = useRef(
    new Animated.Value(value ? 1 : 0)
  ).current;
  const inputRef = useRef<RNTextInput>(null);

  useEffect(() => {
    Animated.timing(animatedLabelPosition, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animatedLabelPosition]);

  const handleFocus = (e: any) => {
    Animated.timing(animatedLabelPosition, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    if (!value) {
      Animated.timing(animatedLabelPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    onBlur?.(e);
  };

  const labelStyle = {
    transform: [
      {
        translateY: animatedLabelPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -Scale.pixelSizeVertical(20)],
        }),
      },
    ],
    fontSize: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [Scale.fontPixel(16), Scale.fontPixel(12)],
    }),
  };

  const extractUrlParts = (url: string) => {
    if (type === "url") {
      if (!url) return { protocol: "https://", domain: "" };

      const match = url.match(/^(https?:\/\/)?(.*)/i);
      if (match) {
        return {
          protocol: match[1] || "https://",
          domain: match[2],
        };
      }
      return { protocol: "https://", domain: url };
    }
  };

  const handleUrlChange = (newDomain: string) => {
    const currentParts = extractUrlParts(value || "");
    const sanitizedDomain = newDomain.replace(/^(https?:\/\/)?/i, "");
    const newUrl = currentParts.protocol + sanitizedDomain;

    if (rest.onChangeText) {
      rest.onChangeText(newUrl);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor },
        type === "filled" && styles.filledContainer,
      ]}
    >
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
      {type === "url" ? (
        <View style={[defaultStyles.flexRow, styles.urlContainer]}>
          <ThemedText style={styles.http}>
            {value && extractUrlParts(value || "")?.protocol}
            {value && <Text style={styles.separator}> | </Text>}
          </ThemedText>
          <RNTextInput
            ref={inputRef}
            style={[
              styles.input,
              type === "default" ? styles.default : undefined,
              type === "filled" ? styles.filled : undefined,
              style,
            ]}
            onChangeText={handleUrlChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            cursorColor={`${Colors.tint}80`}
            selectionColor={`${Colors.tint}80`}
            selectionHandleColor={`${Colors.tint}80`}
            value={extractUrlParts(value || "")?.domain?.toLowerCase()}
            {...rest}
          />
        </View>
      ) : (
        <RNTextInput
          ref={inputRef}
          style={[
            styles.input,
            type === "default" ? styles.default : undefined,
            type === "filled" ? styles.filled : undefined,
            style,
          ]}
          placeholderTextColor={Colors.grayText2}
          onFocus={handleFocus}
          onBlur={handleBlur}
          cursorColor={`${Colors.tint}80`}
          selectionColor={`${Colors.tint}80`}
          selectionHandleColor={`${Colors.tint}80`}
          secureTextEntry={secureTextEntry}
          value={value}
          {...rest}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: Scale.pixelSizeHorizontal(8),
    paddingVertical: Scale.pixelSizeVertical(8),
    paddingHorizontal: Scale.pixelSizeHorizontal(12),
    height: Scale.pixelSizeVertical(60),
    marginVertical: Scale.pixelSizeVertical(10),
  },
  label: {
    position: "absolute" as const,
    left: Scale.pixelSizeHorizontal(12),
    top: "48%",
    transform: [{ translateY: -Scale.fontPixel(14) }],
    color: Colors.grayText2,
    fontSize: Scale.fontPixel(14),
  },
  input: {
    fontSize: Scale.fontPixel(16),
    lineHeight: Scale.fontPixel(20),
    fontFamily: fonts.medium,
    paddingVertical: Scale.pixelSizeVertical(8),
    flex: 1,
    color: Colors.tint,
  },
  default: {
    backgroundColor: "transparent",
  },
  filledContainer: {
    paddingVertical: Scale.pixelSizeVertical(12),
  },
  filled: {
    backgroundColor: "transparent",
    paddingVertical: Scale.pixelSizeVertical(4),
  },
  http: {
    fontSize: Scale.fontPixel(14),
    lineHeight: Scale.fontPixel(18),
    color: "#000",
    letterSpacing: 1,
  },
  separator: {
    fontSize: Scale.fontPixel(14),
    lineHeight: Scale.fontPixel(18),
    color: "#15487620",
    letterSpacing: 1,
    paddingHorizontal: Scale.pixelSizeHorizontal(5),
  },
  urlContainer: {
    marginTop: 5,
  },
});

export default ThemedTextInput;
