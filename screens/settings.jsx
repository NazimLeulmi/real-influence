import React from "react";
import { Text, SafeAreaView, StatusBar } from "react-native";
import TopBar from "../components/topbar";

function Settings() {
  return (
    <SafeAreaView>
      <StatusBar />
      <TopBar title="Settings" />
      <Text>Settings</Text>
    </SafeAreaView>
  );
}

export default Settings;
