import React from "react";
import { Text, SafeAreaView } from "react-native";
import TopBar from "../components/topbar";

function Settings() {
  return (
    <SafeAreaView>
      <TopBar title="Settings" />
      <Text>Settings</Text>
    </SafeAreaView>
  );
}

export default Settings;
