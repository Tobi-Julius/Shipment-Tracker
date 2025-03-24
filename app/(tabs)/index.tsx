import React, { useCallback, useRef, useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyles, Scale, Colors } from "@/constants";
import { Header } from "@/components/ui/Header";
import { FilterOptions } from "@/components/ui/FilterOptions";
import { Shipment } from "@/components/ui/Shipment";
import { data } from "@/mock/shipments";

const Home = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const handleDismiss = useCallback(() => {
    setSelectedFilters([]);
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );
  const handleFilterChange = useCallback((filters: string[]) => {
    setSelectedFilters(filters);
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = [
        item.shipment_status,
        item.shipment_id,
        item.shipment_title_name,
        item.shipment_from_address,
        item.shipment_to_address,
        item.shipment_from,
        item.shipment_to,
      ].some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.some(
          (filter) =>
            filter.toLowerCase() === item.shipment_status.toLowerCase()
        );

      return matchesSearch && matchesFilters;
    });
  }, [searchTerm, selectedFilters]);

  return (
    <View style={defaultStyles.containerWhite}>
      <SafeAreaView style={styles.container}>
        <Header
          setSearchTerm={setSearchTerm}
          handlePresentModalPress={handlePresentModalPress}
          setSelectedFilters={setSelectedFilters}
        />
        <Shipment data={filteredData} />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
          snapPoints={["30%", "50%"]}
          enablePanDownToClose={true}
          backgroundStyle={styles.bottomSheetBackground}
          backdropComponent={renderBackdrop}
          stackBehavior="push"
          enableDynamicSizing={false}
          bottomInset={0}
        >
          <BottomSheetView style={styles.contentContainer}>
            <FilterOptions
              onFilterChange={handleFilterChange}
              handleDismiss={handleDismiss}
              bottomSheetModalRef={bottomSheetModalRef}
              setSelectedFilters={setSelectedFilters}
              selectedFilters={selectedFilters}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Scale.pixelSizeHorizontal(20),
  },
  buttonContainer: {
    marginTop: Scale.pixelSizeVertical(20),
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
  },
  bottomSheetBackground: {
    backgroundColor: "white",
    borderRadius: Scale.pixelSizeHorizontal(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Home;
