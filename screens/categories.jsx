import React from "react";
import { Text, SafeAreaView, StatusBar } from "react-native";
import TopBar from "../components/topbar";

function Categories() {
  return (
    <SafeAreaView>
      <StatusBar />
      <TopBar title="Categories" />
      <Text>Categories</Text>
    </SafeAreaView>
  );
}

export default Categories;
