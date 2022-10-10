import { createStackNavigator } from "@react-navigation/stack";
import DrawerNav from "./drawer";
import AuthStack from "./auth";
import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Root = createStackNavigator();

function RootStack() {
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    async function checkAuth() {
      try {
        if (user === null) {
          const response = await axios.get("http://localhost:8888/check-auth");
          const { data } = response;
          if (data.success === true) {
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    checkAuth();
  }, []);
  return (
    <Root.Navigator screenOptions={{ headerShown: false }}>
      {user === null ? (
        <Root.Screen name="Auth" component={AuthStack} />
      ) : (
        <Root.Screen name="App" component={DrawerNav} />
      )}
    </Root.Navigator>
  );
}

export default RootStack;
