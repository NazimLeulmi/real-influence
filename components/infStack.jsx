import { createStackNavigator } from "@react-navigation/stack";
import Infleuncer from "../screens/infleuncer";
import Infleuncers from "../screens/influencers";

const Stack = createStackNavigator();

function InfluencersStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="InfluencersList"
    >
      <Stack.Screen name="InfluencersList" component={Infleuncers} />
      <Stack.Screen name="Influencer" component={Infleuncer} />
    </Stack.Navigator>
  );
}

export default InfluencersStack;
