import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const profile = () => {
  return (
    <SafeAreaProvider>
      <Text>profile</Text>
    </SafeAreaProvider>
  );
};

export default profile;
