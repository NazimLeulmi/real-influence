import "react-native-gesture-handler";
import React, { useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { InfluencersProvider } from "./context/infContext";
import RootStack from "./components/navigation/root";
import { AuthProvider } from "./context/authContext";

function App() {
  let [fontsLoaded] = useFonts({
    light: require("./assets/fonts/OpenSans-Light.ttf"),
    regular: require("./assets/fonts/OpenSans-Regular.ttf"),
    medium: require("./assets/fonts/OpenSans-Medium.ttf"),
    bold: require("./assets/fonts/OpenSans-Bold.ttf"),
    brand: require("./assets/fonts/Pacifico-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        onLayout={onLayoutRootView}
        style={{ flex: 1, backgroundColor: "black" }}
      >
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <InfluencersProvider>
            <AuthProvider>
              <RootStack />
            </AuthProvider>
          </InfluencersProvider>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
