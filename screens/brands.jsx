import React from "react";
import { Text, SafeAreaView, StatusBar } from "react-native";
import TopBar from "../components/topbar";

function Notifications() {
  return (
    <SafeAreaView>
      <StatusBar />
      <TopBar title="Brands" />
      <Text>Brands</Text>
    </SafeAreaView>
  );
}

export default Notifications;
