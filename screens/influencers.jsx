import React from "react";
import { Text, SafeAreaView, StatusBar } from "react-native";
import TopBar from "../components/topbar";

function Influencers() {
  return (
    <SafeAreaView>
      <StatusBar />
      <TopBar title="Influencers" />
      <Text>Influencers List</Text>
    </SafeAreaView>
  );
}

export default Influencers;
