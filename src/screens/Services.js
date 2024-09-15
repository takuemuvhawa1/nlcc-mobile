import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import {
  FontAwesome5,
  FontAwesome6,
  Octicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  Foundation,
  AntDesign,
} from "react-native-vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Services = ({ navigation }) => {

  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  const [isactive, setIsactive] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alerttext, setAlerttext] = React.useState("");
  const [alerttitle, setAlerttitle] = React.useState("");

  const doAlert = (txt, ttl) => {
    setShowAlert(!showAlert);
    setAlerttext(txt);
    setAlerttitle(ttl);
  };

  useEffect(() => {
    const asyncFetch = () => {
      console.log("first");
    };
    asyncFetch();
  }, []);

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
      <AwesomeAlert
        show={showAlert}
        contentContainerStyle={{ width: 307 }}
        showProgress={false}
        title={alerttitle}
        message={alerttext}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#F47920"
        onCancelPressed={() => {
          console.log("cancelled");
          setShowAlert(false);
          setAlerttext("");
          setAlerttitle("");
        }}
        onConfirmPressed={() => {
          console.log("closed");
          setShowAlert(false);
          setAlerttext("");
          setAlerttitle("");
        }}
      />
      <View style={styles.viewTop}>
        <View
          style={{
            width: "70%",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontFamily: "GeneralSansRegular",
              fontSize: 22,
              lineHeight: 24,
              marginTop: 10
            }}
          >
            Services
          </Text>
        </View>
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
      <View style={styles.viewMiddle}>
        
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
            width: "100%",
            marginTop: 30,
          }}
        >
          
        </View>
      </View>
      <View style={styles.viewBottom}>
        <View style={styles.viewInTabs}>
          <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons color="#1a6363" name="home" size={25} />
            <Text style={{ fontFamily: 'GeneralSansRegular', fontSize: 14, color: "#1a6363" }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons color="#000000" name="cart-outline" size={25} />
            <Text style={{ fontFamily: 'GeneralSansRegular', fontSize: 14, color: "#000000" }}>Services</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Contributions")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons
              color="#1a6363"
              name="chatbox-ellipses-outline"
              size={25}
            />
            <Text style={{ fontFamily: 'GeneralSansRegular', fontSize: 14, color: "#1a6363" }}>Contributions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Events")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <MaterialIcons color="#1a6363" name="support-agent" size={25} />
            <Text style={{ fontFamily: 'GeneralSansRegular', fontSize: 14, color: "#1a6363" }}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("More")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Foundation color="#1a6363" name="indent-more" size={25} />
            <Text style={{ fontFamily: 'GeneralSansRegular', fontSize: 14, color: "#1a6363" }}>More</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  imgLogo: {
    width: '100%',
    height: 35,
    borderRadius: 22.5,
    alignSelf: "center",
    resizeMode: "cover",
  },
  viewMiddle: {
    flex: 8,
    flexDirection: "column",
    width: "100%",
    marginTop: 10,
  },
  viewBottom: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  viewInTabs: {
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: '#ffffff',
    paddingTop: 8,
    paddingBottom: 3,
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default Services;