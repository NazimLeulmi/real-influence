import { createStackNavigator } from "@react-navigation/stack";
import Infleuncers from "../../screens/influencers";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React from "react";
import Profile from "../../screens/profile";
import Feed from "../../screens/feed";
import Gallery from "../../screens/gallery";

const Stack = createStackNavigator();

function InfluencersStack() {
  const navigation = useNavigation();

  function useResetScreenOnBlur() {
    useFocusEffect(
      React.useCallback(() => {
        return () =>
          navigation.setParams({ screen: undefined, params: undefined });
      }, [navigation])
    );
  }
  useResetScreenOnBlur();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InfluencersList" component={Infleuncers} />
      <Stack.Screen name="Influencer" component={Profile} />
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Gallery" component={Gallery} />
    </Stack.Navigator>
  );
}

export default InfluencersStack;
