import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const wallet = () => {
  return (
    <SafeAreaProvider>
      <Text>wallet</Text>
    </SafeAreaProvider>
  );
};

export default wallet;
