import { StyleSheet, View } from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";
import { Colors, Scale, fonts, defaultStyles } from "@/constants";
import { Box } from "@/assets/illustrations";

export const Empty: React.FC = () => {
  return (
    <View style={styles.container}>
      <Box width={Scale.widthPixel(120)} height={Scale.heightPixel(120)} />
      <ThemedText style={styles.title} type="default">
        No Shipments Found
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...defaultStyles.containerWhite,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Scale.pixelSizeHorizontal(20),
    marginTop: Scale.pixelSizeVertical(40),
  },
  title: {
    fontFamily: fonts.semiBold,
    color: Colors.primaryText,
    marginTop: Scale.pixelSizeVertical(20),
    textAlign: "center",
  },
});
