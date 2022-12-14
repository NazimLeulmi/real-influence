import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, Dimensions, TextInput } from "react-native";
import TopBar from "../components/topbar";
import Header from "../components/header";
import Animated, { FadeOutLeft, SlideInLeft } from "react-native-reanimated";
import ProfileGallery from "../components/userProfile/gallery";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import SnackBar from "../components/snackbar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import postImage from "../requests/postImage";
import ProfileImage from "../components/shared/profileImage";
import VoteBtn from "../components/voteBtn";
import fetchVotes from "../requests/fetchVotes";
import { ScrollView } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;

function MyProfile({}) {
  const { user, setUser } = useContext(AuthContext);
  const [status, setStatus] = useState("VIEW");
  const [bio, setBio] = useState(user ? user.bio : null);
  const [snack, setSnack] = useState(false);
  const queryClient = useQueryClient();
  const { data, isFetched } = useQuery(["votes"], () => fetchVotes(user.id));
  const mutation = useMutation(postImage, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["myGallery"]);
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.cancelled) {
        if (result.type !== "image") {
          setSnack(true);
          return;
        }
        const uri = result.uri;
        const data = new FormData();
        const fileName = uri.split("/").pop();
        const mimeType = fileName.split(".").pop();
        data.append("profileImage", {
          uri: uri,
          type: "image/" + mimeType,
          name: fileName,
        });
        const url = "https://realinfluence.io/influencers/profileImage";
        const headers = { "Content-Type": "multipart/form-data" };
        let response = await fetch(url, {
          method: "post",
          body: data,
          headers: headers,
          credentials: "include",
        });
        let res = await response.json();
        if (res.success === true) setUser(res.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      if (result.type !== "image") {
        setSnack(true);
        return;
      }
      const uri = result.uri;
      mutation.mutate(uri);
    }
  };
  async function postBio() {
    try {
      const response = await axios.post(
        "https://realinfluence.io/influencers/bio",
        {
          bio: bio,
        }
      );
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

  if (isFetched) {
    return (
      <View style={s.container}>
        <TopBar title="Profile" stack={true} />
        <ProfileImage img={user.profileImg} pickImage={pickImage} />
        <View style={s.imgFooter}>
          <Text style={s.name}>{user.name}</Text>
          <VoteBtn votes={data.votes.length} type="influencer" voted={false} />
        </View>
        {snack ? (
          <SnackBar text="Only images are permitted" setSnack={setSnack} />
        ) : null}
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
            {user ? user.bio : null}
          </Animated.Text>
        )}
        <Header text="GALLERY" btn={true} uploadImage={uploadImage} />
      </View>
    );
  }
}

function Gallery() {
  return <ProfileGallery header={MyProfile} />;
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    position: "relative",
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
  imgFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },
  name: {
    fontFamily: "regular",
    fontSize: 18,
    marginRight: "auto",
    marginLeft: 15,
  },
  text: {
    fontFamily: "regular",
    fontSize: 15,
    marginLeft: 16,
    marginRight: 16,
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

export default Gallery;
