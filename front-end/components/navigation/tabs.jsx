import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InfluencersStack from "./influencers";
import Home from "../../screens/home";
import Sponsors from "../../screens/sponsors";
import MyProfile from "../../screens/myProfile";

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Sponsors") {
            iconName = "tag-multiple";
          } else if (route.name === "Influencers") {
            iconName = "account-multiple";
          } else {
            iconName = "face-woman-profile";
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              size={size}
              color={focused ? "black" : "rgba(0,0,0,.5)"}
            />
          );
        },
        tabBarLabelStyle: {
          fontFamily: "regular",
          fontSize: 12,
          color: "black",
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "whitesmoke",
        tabBarActiveBackgroundColor: "whitesmoke",
        tabBarStyle: { backgroundColor: "whitesmoke", height: 45 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Influencers"
        component={InfluencersStack}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen name="Sponsors" component={Sponsors} />

      <Tab.Screen name="Profile" component={MyProfile} />
    </Tab.Navigator>
  );
}

export default Tabs;
