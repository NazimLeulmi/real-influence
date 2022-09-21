import React, { useContext, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import TopBar from "../components/topbar";
import Bg from "../assets/background.jpg";
import Header from "../components/header";
import Animated, {
  FadeOutLeft,
  SlideInLeft,
  ZoomInLeft,
} from "react-native-reanimated";
import ProfileGallery from "../components/profileGallery";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function ProfileHeader() {
  const { user, setUser } = useContext(AuthContext);
  const [status, setStatus] = useState("VIEW");
  const [bio, setBio] = useState(user.bio);
  const [img, setImg] = React.useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImg(result);
      console.log(result);
    }
  };

  async function postBio() {
    try {
      const response = await axios.post("http://194.233.163.93:8888/bio", {
        bio: bio,
      });
      const { data } = response;
      if (data.success === true) {
        setUser(data.user);
        setBio(data.user.bio);
        setStatus("VIEW");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <ScrollView style={s.container}>
      <View>
        <Image source={Bg} style={s.bg} />
      </View>
      <TopBar title="Profile" stack={true} />
      <View style={s.imgContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Animated.Image
            source={{
              uri: "http://194.233.163.93:8888/" + user.profileImg,
            }}
            style={s.img}
            entering={ZoomInLeft.duration(500)}
          />
        </TouchableOpacity>
      </View>
      <View style={s.content}>
        <Text style={s.name}>{user.name}</Text>
      </View>
      <Header
        text="BIO"
        status={status}
        setStatus={setStatus}
        postBio={postBio}
      />
      {status === "EDIT" ? (
        <Animated.View
          entering={SlideInLeft.duration(800)}
          exiting={FadeOutLeft.duration(100)}
        >
          <TextInput
            style={s.input}
            multiline={true}
            textAlignVertical="top"
            maxLength={300}
            placeholder="Your biography in less than 300 characters"
            cursorColor="black"
            value={bio}
            onChangeText={setBio}
          />
        </Animated.View>
      ) : (
        <Animated.Text
          style={s.text}
          entering={SlideInLeft.duration(800)}
          exiting={FadeOutLeft.duration(100)}
        >
          {user.bio}
        </Animated.Text>
      )}
      <Header text="GALLERY" btn={false} />
    </ScrollView>
  );
}

function MyProfile() {
  return <ProfileGallery header={ProfileHeader} />;
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    position: "relative",
  },
  bg: {
    height: height,
    width: width,
    position: "absolute",
    top: 0,
    left: 0,
  },
  imgContainer: {
    width: width / 1.75,
    height: width / 1.75,
    borderRadius: width / 1.75,
    alignSelf: "center",
    margin: 10,
  },
  img: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: width / 1.75,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,.15)",
  },
  content: {
    flexDirection: "row",
    alignSelf: "center",
    margin: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,.1)",
    paddingBottom: 5,
  },
  name: {
    fontFamily: "regular",
    fontSize: 16,
  },
  text: {
    fontFamily: "regular",
    fontSize: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  input: {
    width: width - 30,
    height: 100,
    backgroundColor: "rgba(0,0,0,.05)",
    borderLeftWidth: 3,
    borderLeftColor: "gold",
    fontSize: 16,
    position: "relative",
    alignSelf: "center",
    padding: 10,
  },
});

export default MyProfile;
