import React, { useState, useMemo } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import countries from "../../countries";
import { Flag } from "react-native-svg-flagkit";
import Search from "../search";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

class Country extends React.PureComponent {
  pickCode = () => {
    this.props.set;
    this.props.setCode(this.props.dialCode);
    this.props.setOpen(false);
  };

  render() {
    return (
      <TouchableOpacity style={s.country} onPress={this.pickCode}>
        <Flag id={this.props.isoCode} width={21} height={15} />
        <Text style={s.code}>{this.props.dialCode}</Text>
        <Text style={s.name}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

function Countries({ open, setOpen, setCode }) {
  const [filtered, setFiltered] = useState(countries);
  const filteredValue = React.useMemo(
    () => ({ filtered, setFiltered }),
    [filtered, setFiltered]
  );
  const [text, setText] = useState("");
  function renderItem({ item }) {
    return (
      <Country
        name={item.name}
        dialCode={item.dialCode}
        isoCode={item.isoCode}
        setOpen={setOpen}
        setCode={setCode}
      />
    );
  }
  async function filter(text) {
    const copy = [...countries];
    const filtered = await copy.filter((influencer) =>
      influencer.name.includes(text)
    );
    filteredValue.setFiltered(filtered);
  }
  return (
    <View>
      <Modal
        animationType="slide"
        visible={open}
        onRequestClose={() => {
          setOpen(!open);
        }}
      >
        <View style={s.container}>
          <Search value={text} onChange={filter} />
          <FlatList
            data={filteredValue.filtered}
            renderItem={renderItem}
            initialNumToRender={16}
            keyExtractor={(item) => item.name}
          />
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  country: {
    width: width - 20,
    height: 45,
    borderRadius: 8,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,.1)",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 20,
  },
  name: {
    fontFamily: "regular",
    fontSize: 14,
    marginLeft: 20,
  },
  code: {
    fontFamily: "medium",
    fontSize: 15,
    marginLeft: 20,
    width: 50,
  },
  flag: {
    width: 35,
    height: 35,
  },
});

export default Countries;
