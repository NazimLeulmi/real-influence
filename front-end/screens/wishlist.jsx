import React from "react";
import { Text, SafeAreaView } from "react-native";
import TopBar from "../components/topbar";

function Wishlist() {
  return (
    <SafeAreaView>
      <TopBar title="Wishlist" />
      <Text>WishList</Text>
    </SafeAreaView>
  );
}

export default Wishlist;
