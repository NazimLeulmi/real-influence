import { Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function VoteBtn({ votes, voted, vote, type }) {
  return (
    <TouchableOpacity
      style={s.btn}
      disabled={type === "influencer"}
      onPress={vote ? vote : null}
    >
      <Text style={s.text}>{votes} votes</Text>
      <Icon
        size={25}
        name={voted ? "account-arrow-down" : "account-arrow-up"}
      />
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: {
    backgroundColor: "#FFD700",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 115,
    paddingHorizontal: 5,
    paddingVertical: 10,
    maxWidth: 200,
    borderRadius: 10,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    alignSelf: "center",
  },
  text: {
    fontFamily: "regular",
    fontSize: 18,
    marginRight: 10,
  },
});

export default VoteBtn;
