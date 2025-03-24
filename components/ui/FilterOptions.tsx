import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState, RefObject } from "react";
import { filterOptions } from "@/mock/filter_data";
import { ThemedText } from "../ThemedText";
import { Colors, defaultStyles, fonts, Scale } from "@/constants";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface FilterOptionsProps {
  onFilterChange?: (selected: string[]) => void;
  handleDismiss: () => void;
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFilters: string[];
}

export const FilterOptions: React.FC<FilterOptionsProps> = ({
  onFilterChange,
  handleDismiss,
  bottomSheetModalRef,
  setSelectedFilters,
  selectedFilters,
}) => {
  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => {
      const newSelection = prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter];
      onFilterChange?.(newSelection);
      return newSelection;
    });
  };

  const isSelected = (filter: string) => selectedFilters.includes(filter);

  return (
    <View style={styles.container}>
      <View style={[defaultStyles.flexRowSpaceBetween, styles.topContainer]}>
        <ThemedText onPress={handleDismiss} style={styles.text} type="default">
          Cancel
        </ThemedText>
        <ThemedText type="default" style={styles.filter}>
          Filters
        </ThemedText>
        <ThemedText
          onPress={() => bottomSheetModalRef.current?.dismiss()}
          style={styles.text}
          type="default"
        >
          Done
        </ThemedText>
      </View>
      <View style={styles.eachContainer}>
        {filterOptions.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => toggleFilter(item)}
            key={index}
            style={[
              styles.eachItem,
              isSelected(item) ? styles.selectedItem : null,
            ]}
          >
            <ThemedText
              style={[
                styles.each,
                isSelected(item) ? styles.selectedText : null,
              ]}
              type="subtitle"
            >
              {item}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  text: {
    color: Colors.primaryText,
    fontFamily: fonts.medium,
  },
  filter: {
    color: "#000",
    fontFamily: fonts.semiBold,
  },
  topContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondaryButtonColor,
    paddingHorizontal: Scale.pixelSizeHorizontal(20),
    paddingBottom: Scale.pixelSizeVertical(10),
  },
  eachContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Scale.fontPixel(20),
    padding: Scale.pixelSizeHorizontal(16),
  },
  eachItem: {
    backgroundColor: Colors.backgroundFade,
    paddingVertical: Scale.pixelSizeVertical(10),
    paddingHorizontal: Scale.pixelSizeHorizontal(15),
    borderRadius: Scale.fontPixel(6),
    borderWidth: 1,
    borderColor: "transparent",
  },
  each: {
    color: Colors.grayText3,
    fontFamily: fonts.regular,
  },
  selectedItem: {
    borderColor: Colors.tint,
  },
  selectedText: {
    fontFamily: fonts.medium,
  },
});

export default FilterOptions;
