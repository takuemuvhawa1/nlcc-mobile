import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard
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
import { StatusBar } from "expo-status-bar";
import Calender from "./Calender";

const Events = ({ navigation }) => {

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
  const [filtereddata, setFilteredData] = useState([]);
  const [showTabs, setShowTabs] = useState(true);
  const [searchtext, setSearchtext] = React.useState("");

  const calenderRef = useRef();

  const doAlert = (txt, ttl) => {
    setShowAlert(!showAlert);
    setAlerttext(txt);
    setAlerttitle(ttl);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setShowTabs(false);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setShowTabs(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const findSearched = (text)=>{
    setSearchtext(text);
    calenderRef.current.getFilterValue(text);
  }

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
        confirmButtonColor="#1a6363"
        confirmButtonStyle={{width: "40%", alignItems: "center"}}
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
            Events
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
            width: "100%",
            marginTop: 20,
          }}
        >
          <View style={styles.viewInput}>
            <View style={styles.viewIcon}>
              <Octicons name="search" size={25} style={styles.icoInputIcon} />
            </View>
            <View style={styles.viewTextInput}>
              <TextInput
                autoCorrect={false}
                value={searchtext}
                onChangeText={(text) => findSearched(text)}
                style={styles.inputTextInput}
                placeholder="Search contribution . . ."
              />
            </View>
          </View>
          <Calender ref={calenderRef}/>
        </View>
      </View>
      <View style={styles.viewBottom}>
        {showTabs && <>
        <View style={styles.viewInTabs}>
          <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons color="#1a6363" name="home" size={25} />
            <Text style={{ fontFamily: 'GeneralSansRegular', fontSize: 14, color: "#1a6363" }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Sermons")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <FontAwesome6 color="#1a6363" name="book-bible" size={25} />
            <Text style={{ fontFamily: 'GeneralSansRegular', fontSize: 14, color: "#1a6363" }}>Sermons</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Contributions")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <FontAwesome6
              color="#1a6363"
              name="money-check"
              size={25}
            />
            <Text style={{ fontFamily: 'GeneralSansRegular', fontSize: 14, color: "#1a6363" }}>Contributions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <FontAwesome6 color="#bd7925" name="building-user" size={25} />
            <Text style={{ fontFamily: 'GeneralSansRegular', fontSize: 14, color: "#bd7925" }}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("More")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <AntDesign color="#1a6363" name="appstore1" size={25} />
            <Text style={{ fontFamily: 'GeneralSansRegular', fontSize: 14, color: "#1a6363" }}>More</Text>
          </TouchableOpacity>
        </View>
        
        </>}
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
  viewInput: {
    flexDirection: "row",
    width: "100%",
    height: 55,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 8,
  },
  viewIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
  },
  icoInputIcon: {
    color: "grey",
  },
  viewTextInput: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputTextInput: {
    width: "98%",
    height: 45,
    color: "#000000",
    fontSize: 16,
    fontFamily: "GeneralSansMedium",
  },
});

export default Events;
