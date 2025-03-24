import {
  Pressable,
  StyleSheet,
  StyleSheetProperties,
  type PressableProps,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { Scale, Colors } from "@/constants";

export type ThemedButtonProps = PressableProps & {
  color?: string;
  backgroundColor?: string;
  type?: "default" | "primary" | "white";
  title: string;
  textStyle: StyleSheetProperties;
};

export function ThemedButton({
  style,
  color,
  backgroundColor,
  type = "default",
  title,
  textStyle,
  ...rest
}: ThemedButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: backgroundColor },
        type === "default" ? styles.default : undefined,
        type === "primary" ? styles.primary : undefined,
        type === "white" ? styles.primary : undefined,
        style,
      ]}
      {...rest}
    >
      <ThemedText style={[textStyle, { color: color }]}>{title}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Scale.fontPixel(8),
    alignItems: "center",
    justifyContent: "center",
  },
  default: {
    paddingVertical: Scale.pixelSizeVertical(15),
    paddingHorizontal: Scale.pixelSizeHorizontal(20),
    backgroundColor: Colors.tint,
    width: "100%",
  },
  white: {
    paddingVertical: Scale.pixelSizeVertical(15),
    paddingHorizontal: Scale.pixelSizeHorizontal(20),
    backgroundColor: "#fff",
    width: "100%",
  },
  primary: {
    paddingVertical: Scale.pixelSizeVertical(15),
    paddingHorizontal: Scale.pixelSizeHorizontal(20),
    backgroundColor: Colors.secondaryButtonColor,
    width: "100%",
  },
});
