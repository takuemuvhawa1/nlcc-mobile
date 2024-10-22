import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons
} from "react-native-vector-icons";
import { StatusBar } from "expo-status-bar";
import MyCellgroups from "./MyCellgroups";

const SelectCellgroup = ({ navigation }) => {
  
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#30303030", "#ffffff", "#30303050"]}
      style={styles.container}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar style="dark" translucent={true} hidden={false} />
      <View style={styles.viewTop}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("More")}
            style={{
              width: "30%",
              marginTop: "20",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Ionicons color="#000000" name="chevron-back" size={25} />
          </TouchableOpacity>
          <View
            style={{
              width: "30%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Image
              style={styles.imgLogo}
              source={require("../../assets/nlcc-logo-1.png")}
            />
          </View>
        </View>
        <Text
          style={{
            fontFamily: "GeneralSansRegular",
            fontSize: 22,
            lineHeight: 24,
            marginTop: 10,
            alignSelf: "flex-start",
          }}
        >
          Cell Group Admin
        </Text>
      </View>
      <View style={styles.viewMiddle}>
        <Text
          style={{
            fontFamily: "GeneralSansRegular",
            fontSize: 14,
            lineHeight: 18,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Here is the list of cell groups that you are an admin. Click to select
          the one you want to proceed to.
        </Text>
        <MyCellgroups />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  viewTop: {
    flex: 0.8,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 35,
  },
  imgLogo: {
    width: "100%",
    height: 35,
    borderRadius: 22.5,
    resizeMode: "cover",
  },
  viewMiddle: {
    flex: 8,
    flexDirection: "column",
    width: "100%",
    marginTop: 30,
    marginBottom: 65,
  },
});

export default SelectCellgroup;
