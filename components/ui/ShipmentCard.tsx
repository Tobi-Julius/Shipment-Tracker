import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { ThemedText } from "../ThemedText";
import { Checkbox } from "../CheckBox";
import {
  Box,
  Call,
  Direction,
  Expand,
  Path,
  Whatsapp,
} from "@/assets/illustrations";
import { Colors, defaultStyles, fonts, Scale } from "@/constants";

interface ShipmentItem {
  shipment_title: string;
  shipment_id: string;
  shipment_from: string;
  shipment_to: string;
  shipment_status: string;
  shipment_from_address: string;
  shipment_to_address: string;
}

interface ShipmentCardProps {
  item: ShipmentItem;
  index: number;
  toggleCheckBox: boolean;
}

export const ShipmentCard: React.FC<ShipmentCardProps> = ({
  item,
  index,
  toggleCheckBox,
}) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(toggleCheckBox);

  const toggleExpand = () => setExpand((prev) => !prev);

  useEffect(() => {
    setToggle(toggleCheckBox);
  }, [toggleCheckBox]);

  return (
    <View style={[defaultStyles.containerWhite, toggle && styles.container]}>
      <View
        style={[
          defaultStyles.flexRowSpaceBetween,
          expand ? styles.topContainerExpand : styles.topContainer,
        ]}
      >
        <Checkbox onChange={setToggle} checked={toggle} />
        <Box />
        <View style={styles.details}>
          <ThemedText type="subtitle" style={styles.title}>
            {item.shipment_title}
          </ThemedText>
          <ThemedText style={styles.id} type="defaultSemiBold">
            {item.shipment_id}
          </ThemedText>
          <ThemedText style={[defaultStyles.flexRow, styles.places]}>
            {item.shipment_from} <Direction /> {item.shipment_to}
          </ThemedText>
        </View>
        <ThemedText style={[styles.status, styles[item.shipment_status]]}>
          {item.shipment_status === "hold" ? "on hold" : item.shipment_status}
        </ThemedText>
        <Expand
          handlePress={toggleExpand}
          fillColor={expand ? Colors.expand : Colors.white}
          color={expand ? Colors.white : Colors.expand}
          borderColor={expand ? Colors.completed : Colors.white}
        />
      </View>
      {expand && <View style={styles.dottedLine} />}
      {expand && (
        <View style={[styles.bottomContainer]}>
          <View style={[defaultStyles.flexRowSpaceBetween]}>
            <View style={styles.addressSection}>
              <ThemedText style={styles.label}>Origin</ThemedText>
              <ThemedText style={styles.fromTo} type="default">
                {item.shipment_from}
              </ThemedText>
              <ThemedText style={styles.address} type="default">
                {item.shipment_from_address}
              </ThemedText>
            </View>
            <Path />
            <View style={styles.addressSection}>
              <ThemedText style={styles.label}>Destination</ThemedText>
              <ThemedText style={styles.fromTo} type="default">
                {item.shipment_to}
              </ThemedText>
              <ThemedText style={styles.address} type="default">
                {item.shipment_to_address}
              </ThemedText>
            </View>
          </View>
          <View style={[styles.buttonsContainer]}>
            <TouchableOpacity
              style={[defaultStyles.flexRowCenter, styles.callButton]}
              activeOpacity={0.8}
            >
              <Call />
              <ThemedText style={styles.buttonText}>Call</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[defaultStyles.flexRowCenter, styles.whatsAppButton]}
              activeOpacity={0.8}
            >
              <Whatsapp />
              <ThemedText style={styles.buttonText}>Whatsapp</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.expand,
    borderWidth: Scale.fontPixel(2),
    borderRadius: Scale.fontPixel(8),
  },
  topContainer: {
    backgroundColor: Colors.backgroundFade,
    borderRadius: Scale.fontPixel(8),
    paddingHorizontal: Scale.pixelSizeHorizontal(10),
    paddingVertical: Scale.pixelSizeVertical(10),
    alignItems: "center",
  },
  topContainerExpand: {
    backgroundColor: Colors.backgroundFade,
    borderTopLeftRadius: Scale.fontPixel(8),
    borderTopRightRadius: Scale.fontPixel(8),
    paddingHorizontal: Scale.pixelSizeHorizontal(10),
    paddingVertical: Scale.pixelSizeVertical(10),
    alignItems: "center",
  },
  dottedLine: {
    borderBottomWidth: Scale.fontPixel(3),
    borderColor: Colors.white,
    borderStyle: "dashed",
    position: "absolute",
    bottom: 0,
    zIndex: 1000,
    width: "100%",
    bottom: "66%",
  },
  bottomContainer: {
    backgroundColor: Colors.backgroundFade50,
    paddingVertical: Scale.pixelSizeVertical(20),
    paddingHorizontal: Scale.pixelSizeHorizontal(10),
    borderBottomLeftRadius: Scale.fontPixel(8),
    borderBottomRightRadius: Scale.fontPixel(8),
  },
  label: {
    fontSize: Scale.fontPixel(12),
    fontFamily: fonts.regular,
    color: Colors.tint,
  },
  fromTo: {
    fontFamily: fonts.bold,
  },
  address: {
    fontFamily: fonts.regular,
    color: Colors.grayText3,
  },
  title: {
    fontFamily: fonts.regular,
  },
  id: {
    fontFamily: fonts.semiBold,
  },
  places: {
    fontSize: Scale.fontPixel(15),
    color: Colors.grayText,
    fontFamily: fonts.regular,
  },
  status: {
    fontSize: Scale.fontPixel(10),
    fontFamily: fonts.medium,
    paddingVertical: Scale.pixelSizeVertical(4),
    paddingHorizontal: Scale.pixelSizeHorizontal(8),
    borderRadius: Scale.fontPixel(8),
    borderWidth: Scale.fontPixel(1),
    textTransform: "uppercase",
    borderColor: Colors.white,
  },
  received: {
    backgroundColor: Colors.completed,
    color: Colors.tint,
  },
  canceled: {
    backgroundColor: Colors.backgroundFade50,
    color: Colors.grayText3,
  },
  hold: {
    backgroundColor: Colors.holdBG,
    color: Colors.holdText,
  },
  delivered: {
    backgroundColor: Colors.deliverBG,
    color: Colors.deliverText,
  },
  putaway: {
    backgroundColor: Colors.putAwayBG,
    color: Colors.putawayText,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Scale.pixelSizeHorizontal(20),
    marginTop: Scale.pixelSizeVertical(20),
  },
  whatsAppButton: {
    paddingVertical: Scale.pixelSizeVertical(6),
    paddingHorizontal: Scale.pixelSizeHorizontal(12),
    gap: Scale.pixelSizeHorizontal(5),
    backgroundColor: Colors.whatsApp,
    borderRadius: Scale.fontPixel(8),
  },
  callButton: {
    paddingVertical: Scale.pixelSizeVertical(6),
    paddingHorizontal: Scale.pixelSizeHorizontal(16),
    gap: Scale.pixelSizeHorizontal(5),
    backgroundColor: Colors.expand,
    borderRadius: Scale.fontPixel(8),
  },
  buttonText: {
    fontFamily: fonts.regular,
    color: Colors.white,
    fontSize: Scale.fontPixel(12),
  },
});
