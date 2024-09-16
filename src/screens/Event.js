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
import { useIsFocused } from "@react-navigation/native";
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
  Feather,
  SimpleLineIcons,
} from "react-native-vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Event = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  const [record, setRecord] = React.useState({
    id: "",
    type: "",
    theme: "",
    description: "",
    date: "",
    time: "",
    enddate: null,
    endtime: null,
  });

  const [isactive, setIsactive] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alerttext, setAlerttext] = React.useState("");
  const [alerttitle, setAlerttitle] = React.useState("");

  const isFocused = useIsFocused();

  const doAlert = (txt, ttl) => {
    setShowAlert(!showAlert);
    setAlerttext(txt);
    setAlerttitle(ttl);
  };

  useEffect(() => {
    const findFormData = async () => {
      try {
        const slctdObj = await AsyncStorage.getItem("SelectedEvent");
        const eventObj = JSON.parse(slctdObj);

        if (eventObj) {
          setRecord({
            id: eventObj.id,
            type: eventObj.type,
            theme: eventObj.theme,
            description: eventObj.description,
            date: eventObj.date,
            time: eventObj.time,
            enddate: eventObj.enddate,
            endtime: eventObj.endtime,
          });

          console.log("Ministry data found");
        } else {
          console.log("No ministry data found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isFocused) {
      findFormData();
    }
  }, [props, isFocused]);

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
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            width: "70%",
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
      <View style={styles.viewMiddle}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            borderColor: "#1a6363",
            borderWidth: 0.5,
            height: 60,
            borderRadius: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 5,
              width: "98.5%",
              backgroundColor: "#1a6363",
              borderWidth: 0.5,
              height: 52,
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingTop: 15,
            }}
          >
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#ffffff",
              }}
            >
              {record.type}
            </Text>
            <FontAwesome
            name="calendar"
              size={20}
              style={{ marginRight: 5, color: "#ffffff" }}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "GeneralSansMedium",
            fontSize: 18,
            color: "#000000",
            marginTop: 30,
            alignSelf: "center",
            textAlign: "justify",
          }}
        >
          Theme: {record.theme}
        </Text>
        <Text
          style={{
            fontFamily: "GeneralSansMedium",
            fontSize: 18,
            color: "#000000",
            marginTop: 20,
            marginBottom: 30,
            alignSelf: "center",
            textAlign: "justify",
          }}
        >
          {record.description}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
            borderBottomColor: "#1a636350",
            borderBottomWidth: 0.5,
            borderTopColor: "#1a636350",
            borderTopWidth: 0.5,
            paddingBottom: 15,
          }}
        >
          <View style={{ width: "40%" }}>
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#000000",
                marginTop: 15,
              }}
            >
              Start Time
            </Text>
          </View>
          <View style={{ width: "60%", flexDirection: "column" }}>
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#1a6363",
                marginTop: 15,
                alignSelf: "flex-end",
              }}
            >
              {record.date} {record.time}
            </Text>
            
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
            borderBottomColor: "#1a636350",
            borderBottomWidth: 0.5,
            borderTopColor: "#1a636350",
            borderTopWidth: 0.5,
            paddingBottom: 15,
          }}
        >
          <View style={{ width: "40%" }}>
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#000000",
                marginTop: 15,
              }}
            >
              End Time
            </Text>
          </View>
          <View style={{ width: "60%", flexDirection: "column" }}>            
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#1a6363",
                marginTop: 20,
                alignSelf: "flex-end",
              }}
            >
              {record.enddate} {record.endtime}
            </Text>
          </View>
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
    width: "100%",
    height: 35,
    borderRadius: 22.5,
    alignSelf: "center",
    resizeMode: "cover",
  },
  imgUsr: {
    width: 90,
    height: 90,
    borderRadius: 22.5,
    alignSelf: "center",
    resizeMode: "cover",
    marginTop: 40,
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
    backgroundColor: "#ffffff",
    paddingTop: 8,
    paddingBottom: 3,
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default Event;