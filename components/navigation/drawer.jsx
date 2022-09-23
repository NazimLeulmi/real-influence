import React, { useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Tabs from "./tabs";
import Settings from "../../screens/settings";
import Notifications from "../../screens/notifications";
import Favourites from "../../screens/favourites";
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Bg from "../../assets/background.jpg";
import Logo from "../../assets/logo.png";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Drawer = createDrawerNavigator();

function DrawerView(props) {
  const { user, setUser } = useContext(AuthContext);
  async function signOut() {
    console.log("SignOut");
    const response = await axios.post("https://realinfluence.io/signout");
    const data = response.data;
    console.log(data);
    if (data.success === true) setUser(null);
  }
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <ImageBackground source={Bg} style={{ height: 150, marginBottom: 20 }}>
          <Image source={Logo} style={s.img} />
        </ImageBackground>
        <DrawerItemList {...props}></DrawerItemList>
      </DrawerContentScrollView>
      <View style={s.footer}>
        <TouchableOpacity style={s.btn}>
          <Icon name="share-variant" size={22} style={s.btnIcon} />
          <Text style={s.btnText}>Share profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.btn} onPress={signOut}>
          <Icon name="logout-variant" size={22} style={s.btnIcon} />
          <Text style={s.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function DrawerNav() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerView {...props} />}
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          marginLeft: -20,
          fontFamily: "regular",
          letterSpacing: 1,
        },
        drawerActiveBackgroundColor: "rgba(0,0,0,.15)",
        drawerActiveTintColor: "#fff",
      }}
    >
      <Drawer.Screen
        name="Main"
        component={Tabs}
        options={{
          drawerIcon: () => (
            <Icon name="home" size={22} color="rgba(0,0,0,.5)" />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          drawerIcon: () => (
            <Icon name="bell" size={22} color="rgba(0,0,0,.5)" />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: () => (
            <Icon name="cog" size={22} color="rgba(0,0,0,.5)" />
          ),
        }}
      />
      <Drawer.Screen
        name="Favourites"
        component={Favourites}
        options={{
          drawerIcon: () => (
            <Icon name="heart" size={22} color="rgba(0,0,0,.5)" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const s = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    alignSelf: "center",
    margin: 20,
  },
  footer: {
    padding: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    height: 47.5,
  },
  btnIcon: {
    marginRight: 10,
  },
  btnText: {
    fontFamily: "regular",
    letterSpacing: 1,
  },
});

export default DrawerNav;
