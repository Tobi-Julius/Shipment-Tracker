import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import {
  Filter,
  HomeLogo,
  Notification,
  Scan,
  Search,
} from "@/assets/illustrations";
import { Colors, defaultStyles, fonts, Scale } from "@/constants";
import { image } from "@/assets/images";
import { ThemedText } from "../ThemedText";

interface HeaderProps {
  handlePresentModalPress: () => void;
  setSearchTerm: (text: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  handlePresentModalPress,
  setSearchTerm,
}) => {
  return (
    <>
      <View style={[defaultStyles.flexRowSpaceBetween, styles.headerContainer]}>
        <Image
          source={image}
          cachePolicy={"memory-disk"}
          contentFit="contain"
          style={styles.image}
        />
        <HomeLogo />
        <Notification />
      </View>
      <View style={styles.headerTextContainer}>
        <ThemedText style={styles.hello} type="subtitle">
          Hello,
        </ThemedText>
        <ThemedText style={styles.name} type="title">
          Ibrahim Shaker
        </ThemedText>
      </View>
      <View style={[styles.searchContainer]}>
        <Search />
        <TextInput
          placeholder="Search"
          caretColor={Colors.background}
          style={styles.search}
          placeholderTextColor={Colors.grayText2}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>
      <View
        style={[styles.filterScanContainer, defaultStyles.flexRowSpaceBetween]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePresentModalPress}
          style={[styles.filterContainer, defaultStyles.flexRowCenter]}
        >
          <Filter />
          <ThemedText style={styles.filter} type="subtitle">
            Filters
          </ThemedText>
        </TouchableOpacity>
        <View style={[styles.scanContainer, defaultStyles.flexRowCenter]}>
          <Scan />
          <ThemedText style={styles.scan} type="subtitle">
            Add Scan
          </ThemedText>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Scale.pixelSizeVertical(12),
  },
  image: {
    height: Scale.heightPixel(40),
    width: Scale.widthPixel(40),
  },
  hello: {
    color: "#00000060",
    fontFamily: fonts.regular,
  },
  name: {
    color: "#000000",
    fontFamily: fonts.semiBold,
  },
  headerTextContainer: {
    marginTop: Scale.pixelSizeVertical(15),
    gap: Scale.pixelSizeVertical(2),
  },
  searchContainer: {
    gap: Scale.pixelSizeHorizontal(8),
    backgroundColor: Colors.backgroundFade,
    height: Scale.heightPixel(50),
    width: "100%",
    borderRadius: Scale.fontPixel(8),
    marginTop: Scale.pixelSizeVertical(15),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Scale.pixelSizeHorizontal(10),
  },
  search: {
    width: "100%",
    fontSize: Scale.fontPixel(14),
    fontFamily: fonts.medium,
    color: Colors.grayText3,
    textAlignVertical: "bottom",
  },
  filterScanContainer: {
    marginTop: Scale.pixelSizeVertical(30),
  },
  filterContainer: {
    gap: Scale.pixelSizeHorizontal(10),
    width: "47%",
    backgroundColor: Colors.backgroundFade,
    paddingVertical: Scale.pixelSizeVertical(12),
    borderRadius: Scale.fontPixel(8),
  },
  scanContainer: {
    gap: Scale.pixelSizeHorizontal(10),
    width: "47%",
    backgroundColor: Colors.tint,
    paddingVertical: Scale.pixelSizeVertical(12),
    borderRadius: Scale.fontPixel(8),
  },
  filter: {
    color: Colors.grayText3,
    fontFamily: fonts.regular,
  },
  scan: {
    color: Colors.white,
    fontFamily: fonts.regular,
  },
});
