import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { SimpleLineIcons } from "react-native-vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import Apilink from "../constants/Links";

const Register = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  const [hidepin, setHidepin] = React.useState(true);
  const [inputs, setInputs] = React.useState({
    email: "",
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

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleProceed = async () => {
    if (inputs.email == "") {
      doAlert("Fill in your email before you proceed", "Submission Error");
      return;
    }

    // if (!validateEmail(inputs.email)) {
    //   doAlert("Email is not in correct format", "Submission Error");
    //   return;
    // }

    setIsactive(true);

    const apiLink = Apilink.getLink();

    let signinresponse = await fetch(`${apiLink}onboarding/searchmember`, {
      method: "post",
      body: JSON.stringify({
        email: inputs.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resJson = await signinresponse.json();

    console.log(resJson);

    if (resJson.message == "Email found") {
      setInputs({
        email: "",
      });
      setIsactive(false);
      await AsyncStorage.setItem("TypedEmail", inputs.email);
      await AsyncStorage.setItem("ReceivedOTP", resJson.randNum);
      await AsyncStorage.setItem("ReceivedName", resJson.member.Name +" "+resJson.member.Surname);
      navigation.navigate("SetPassword");
      return;
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#ffffff", "#303030"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
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
      <Image
        style={styles.imgLogo}
        source={require("../../assets/nlcc-logo-1.png")}
      />
      <Text style={styles.txtTagline}>NEW LIFE COVENANT CHURCH</Text>
      <Text style={styles.txtFormName}>Register</Text>

      <Text style={styles.txtFormInstruction}>
        Use a valid and working email or phone number to register your account
      </Text>

      
      <View style={styles.viewBtns}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EmailRegister")}
          style={styles.btnBtns1}
        >
         
              <Text style={styles.txtBtnTxt1}>Register With Email</Text>
         
        </TouchableOpacity>
      </View>
      <View style={styles.viewBtns}>
        <TouchableOpacity
          onPress={() => navigation.navigate("PhoneRegister")}
          style={styles.btnBtns1}
        >
       
              <Text style={styles.txtBtnTxt1}>Register With Mobile Number</Text>
          
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 7,
  },
  imgLogo: {
    width: 150,
    height: 45,
    alignSelf: "center",
    resizeMode: "cover",
    marginTop: 63,
  },
  txtTagline: {
    fontSize: 14,
    fontFamily: "PlayfairDisplayRegular",
    textAlign: "center",
    color: "#1a6363",
    marginTop: 15,
  },
  txtFormName: {
    fontSize: 20,
    fontFamily: "GeneralSansRegular",
    textAlign: "center",
    color: "#FFFFF0",
    marginTop: 35,
    lineHeight: 36,
  },
  txtFormInstruction: {
    fontSize: 14,
    fontFamily: "GeneralSansRegular",
    textAlign: "center",
    color: "#000000",
    marginTop: 15,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  viewInputs: {
    flexDirection: "column",
    width: "100%",
    marginTop: 60,
    paddingHorizontal: 20,
  },
  viewInput: {
    flexDirection: "row",
    width: "100%",
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff80",
    borderRadius: 7,
  },
  viewBtns: {
    flexDirection: "column",
    width: "100%",
    marginTop: 40,
    paddingHorizontal: 20,
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
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "GeneralSansMedium",
  },
  btnBtns1: {
    width: "100%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    backgroundColor: "#1a6363",
  },
  txtBtnTxt1: {
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
    textAlign: "center",
    color: "#FFFFF0",
  },
});

export default Register;
