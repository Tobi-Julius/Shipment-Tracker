import { Scale } from "@/constants";
import { Text, type TextProps, StyleSheet } from "react-native";

export type ThemedTextProps = TextProps & {
  color?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  color,
  type = "default",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: Scale.fontPixel(16),
    lineHeight: Scale.fontPixel(24),
  },
  defaultSemiBold: {
    fontSize: Scale.fontPixel(20),
    lineHeight: Scale.fontPixel(24),
  },
  title: {
    fontSize: Scale.fontPixel(24),
    lineHeight: Scale.fontPixel(32),
  },
  subtitle: {
    fontSize: Scale.fontPixel(15),
    lineHeight: Scale.fontPixel(20),
  },
  link: {
    fontSize: Scale.fontPixel(16),
    lineHeight: Scale.fontPixel(30),
  },
});
