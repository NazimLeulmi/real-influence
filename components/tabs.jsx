import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Brands from "../screens/brands";
import Categories from "../screens/categories";
import InfluencersStack from "./infStack";
import Home from "../screens/home";

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Brands") {
            iconName = "tag-multiple";
          } else if (route.name === "Influencers") {
            iconName = "account-multiple";
          } else {
            iconName = "hexagon-multiple";
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              size={size}
              color={focused ? "gold" : "white"}
            />
          );
        },
        tabBarLabelStyle: {
          fontFamily: "regular",
          fontSize: 12,
        },
        tabBarActiveTintColor: "gold",
        tabBarInactiveTintColor: "white",
        tabBarActiveBackgroundColor: "black",
        tabBarStyle: { backgroundColor: "black", height: 45 },
        headerShown: false,
        unmountOnBlur: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Brands" component={Brands} />
      <Tab.Screen name="Influencers" component={InfluencersStack} />
      <Tab.Screen name="Categories" component={Categories} />
    </Tab.Navigator>
  );
}

export default Tabs;
