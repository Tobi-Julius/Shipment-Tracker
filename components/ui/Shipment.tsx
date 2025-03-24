import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Colors, defaultStyles, fonts, Scale } from "@/constants";
import { ThemedText } from "../ThemedText";
import { Checkbox } from "../CheckBox";
import { ShipmentCard } from "./ShipmentCard";
import { Empty } from "./Empty";

interface ShipmentItem {
  shipment_title: string;
  shipment_id: string;
  shipment_from: string;
  shipment_to: string;
  shipment_status: string;
  shipment_from_address: string;
  shipment_to_address: string;
}

interface ShipmentProps {
  data: ShipmentItem[];
}

export const Shipment: React.FC<ShipmentProps> = ({ data }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false);
  const [refreshing, updateRefreshing] = useState<boolean>(false);

  const onRefresh = React.useCallback(() => {
    updateRefreshing(true);
    setTimeout(() => {
      updateRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={[defaultStyles.containerWhite, styles.container]}>
      <View style={styles.topContainer}>
        <ThemedText style={styles.title} type="default">
          Shipments
        </ThemedText>
        <View style={styles.markContainer}>
          <Checkbox checked={toggleCheckBox} onChange={setToggleCheckBox} />
          <ThemedText type="default" style={styles.mark}>
            Mark All
          </ThemedText>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <Empty />}
        data={data}
        refreshControl={
          <RefreshControl
            colors={[Colors.tint, Colors.expand]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={{
          gap: Scale.pixelSizeVertical(12),
          marginTop: Scale.pixelSizeVertical(17),
          paddingBottom: Scale.pixelSizeVertical(100),
        }}
        renderItem={({ item, index }) => (
          <ShipmentCard
            item={item}
            index={index}
            toggleCheckBox={toggleCheckBox}
          />
        )}
        keyExtractor={(item) => item.shipment_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Scale.pixelSizeVertical(30),
    paddingBottom: Scale.pixelSizeVertical(5),
  },
  title: {
    fontFamily: fonts.semiBold,
  },
  markContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: Scale.pixelSizeHorizontal(8),
  },
  mark: {
    fontFamily: fonts.regular,
  },
});
