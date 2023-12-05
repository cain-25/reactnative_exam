import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Video from "react-native-video";
import Thumbnail from "../Components/VideoPlayer/Thumbnail";
export default function UiExamScreen() {
  return (
    <View >
      <Thumbnail videoUri={"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}/>
      {/* <Video style={{ width:"100%", height:400, backgroundColor:'white'}}
         source={{ uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }}
         paused={false}
       /> */}
    </View>
  );
}

const styles = StyleSheet.create({});
