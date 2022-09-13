import React from "react";
import { Text, SafeAreaView } from "react-native";
import TopBar from "../components/topbar";

function Notifications() {
  return (
    <SafeAreaView>
      <TopBar title="Notifications" />
      <Text>Notifications</Text>
    </SafeAreaView>
  );
}

export default Notifications;
