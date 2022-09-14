import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
function TopBar({ stack, title }) {
  const navigation = useNavigation();

  function action() {
    if (stack) {
      navigation.navigate("Home");
    } else {
      navigation.openDrawer();
    }
  }

  return (
    <View style={s.container}>
      <TouchableOpacity onPress={action}>
        <Icon name={stack ? "arrow-left" : "menu"} style={s.menu} />
      </TouchableOpacity>
      <Text style={s.brand}>{title}</Text>
      <Icon name="magnify" style={s.icon} color="rgba(0,0,0,.45)" />
      <Icon name="heart" style={s.icon} color="#FFD700" />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    width: windowWidth,
    height: 90,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,.3)",
  },
  brand: {
    fontFamily: "brand",
    fontSize: 18,
    marginRight: "auto",
    marginLeft: "auto",
  },
  menu: {
    color: "rgba(0,0,0,.45)",
    fontSize: 30,
  },
  icon: {
    fontSize: 25,
    marginLeft: 5,
  },
});

export default TopBar;
