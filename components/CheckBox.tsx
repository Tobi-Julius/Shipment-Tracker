import { Colors, Scale } from "@/constants";
import React, { useState, useEffect, memo } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = memo(
  ({ checked = false, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked);


    useEffect(() => {
      setIsChecked(checked);
    }, [checked]);

    const handlePress = () => {
      const newValue = !isChecked;
      setIsChecked(newValue);
      onChange?.(newValue);
    };

    return (
      <TouchableOpacity
        onPress={handlePress}
        style={styles.container}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, isChecked && styles.checked]}>
          {isChecked && <ThemedText style={styles.checkMark}>✔</ThemedText>}
        </View>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) =>
    prevProps.checked === nextProps.checked &&
    prevProps.onChange === nextProps.onChange
);

const styles = StyleSheet.create({
  container: {
    width: Scale.widthPixel(20),
    height: Scale.heightPixel(20),
  },
  checkbox: {
    flex: 1,
    borderRadius: Scale.fontPixel(6),
    borderWidth: Scale.fontPixel(2),
    borderColor: Colors.check,
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    borderColor: Colors.tint,
    backgroundColor: Colors.completed,
  },
  checkMark: {
    color: Colors.tint,
    fontSize: Scale.fontPixel(9),
    lineHeight: Scale.fontPixel(13),
  },
});
