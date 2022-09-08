import React from "react";
import { Text, SafeAreaView, StatusBar } from "react-native";
import TopBar from "../components/topbar";

function Wishlist() {
  return (
    <SafeAreaView>
      <StatusBar />
      <TopBar title="Wishlist" />
      <Text>WishList</Text>
    </SafeAreaView>
  );
}

export default Wishlist;
