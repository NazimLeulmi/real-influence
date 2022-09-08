import React from "react";
import { Text, SafeAreaView, StatusBar } from "react-native";
import TopBar from "../components/topbar";

function Notifications() {
  return (
    <SafeAreaView>
      <StatusBar />
      <TopBar title="Notifications" />
      <Text>Notifications</Text>
    </SafeAreaView>
  );
}

export default Notifications;
