import { StyleSheet } from "react-native";
import Colors from "./colors";

const defaultStyles = StyleSheet.create({
  containerPrimary: {
    backgroundColor: Colors.tint,
    flex: 1,
  },
  containerWhite: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexRowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  flexRowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexRowSpaceAround: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  flexRowSpaceEvenly: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  flexColumn: {
    flexDirection: "column",
  },
  flexColumnCenter: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  flexCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  flexGrow: {
    flexGrow: 1,
  },
});

export default defaultStyles;
