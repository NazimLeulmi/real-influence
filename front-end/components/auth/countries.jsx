import React, { useState } from "react";
import { Dimensions, Modal, StyleSheet, Text, View, FlatList,TouchableOpacity, Image } from "react-native";
import countries from "../../countries";
import { Flag } from 'react-native-svg-flagkit'


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Country({ name, dialCode, isoCode}) {
  return (
    <TouchableOpacity style={s.country}>
      <Flag id={isoCode} width={21} height={15}/>
      <Text style={s.name}>{name}</Text>
    </TouchableOpacity>
  );
}
const Countries = ({ open, setOpen }) => {
  function renderItem({ item }) {
    return (
      <Country
        name={item.name}
        dialCode={item.dialCode}
        isoCode={item.isoCode}
      />
    );
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
          <FlatList
            data={countries}
            renderItem={renderItem}
            initialNumToRender={16}
            keyExtractor={(item) => item.name}
          />
        </View>
      </Modal>
    </View>
  );
};

const s= StyleSheet.create({
  container: {
    flex: 1,
  },
  country:{
    width:width,
    height:45,
    backgroundColor:"rgba(0,0,0,.1)",
    flexDirection:"row",
    alignItems:"center",
    marginBottom:10,
    paddingLeft:20
  },
  name:{
    fontFamily:"regular",
    fontSize:14,
    marginLeft:15
  },
  flag:{
    width:35,
    height:35
  }
});

export default Countries;
