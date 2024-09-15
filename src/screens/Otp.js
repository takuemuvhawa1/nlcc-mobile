import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const Otp = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
        GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
        SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
        PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
        PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
      });

  const inputElement = useRef();
  const [isactive, setIsactive] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alerttext, setAlerttext] = React.useState("");
  const [alerttitle, setAlerttitle] = React.useState("");
  const [counter, setCounter] = React.useState(59);

  const doAlert = (txt, ttl) => {
    setShowAlert(!showAlert);
    setAlerttext(txt);
    setAlerttitle(ttl);
  };

  const [token, setToken] = useState("");

  const insertPin = (num) => {
    if (token.length < 6) {
      setToken(num);
    }
  };
  const doFocusing = (num) => {
    inputElement.current.focus();
  };

  const removeLastChar = () => {
    var latestsStr = token.slice(0, -1);
    setToken(latestsStr);
  };

  const checkOtp = async () => {
    if (token.length != 4) {
      doAlert("Fill in completed OTP before you proceed", "Submission Error");
    } else {
      console.log("Token: " + token);
      //Store OTP in async
      await AsyncStorage.setItem("TypedOtp", token);
      navigation.navigate("ResetPassword");
    }
  };

  const resendCodeHandler = async () => {
    setIsactive(true);

  };

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

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
       <Image
        style={styles.imgLogo}
        source={require("../../assets/nlcc-logo-1.png")}
      />
      <View style={styles.viewInner}>
        <Text style={styles.txtFormHead}>We have sent you an OTP</Text>
        <Text style={styles.txtFormInstruction}>
          Please enter the OTP below and click next button
        </Text>
        <View style={{ width: 1, height: 1 }}>
          <TextInput
            autoCorrect={false}
            autoFocus={true}
            ref={inputElement}
            keyboardType="numeric"
            value={token}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                removeLastChar();
              }
            }}
            onChangeText={(text) => insertPin(text)}
          />
        </View>
        <View style={styles.viewInput}>
          <View style={styles.viewTextInput}>
            {token.length > 0 && <View style={styles.viewDot}></View>}
          </View>
          <View style={styles.viewTextInput}>
            {token.length > 1 && <View style={styles.viewDot}></View>}
          </View>
          <View style={styles.viewTextInput}>
            {token.length > 2 && <View style={styles.viewDot}></View>}
          </View>
          <View style={styles.viewTextInput}>
            {token.length > 3 && <View style={styles.viewDot}></View>}
          </View>
        </View>

        <View style={styles.viewBtns}>
          <TouchableOpacity onPress={() => checkOtp()} style={styles.btnBtns1}>
          {isactive && (
              <>

                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={styles.txtBtnTxt1}>Resending ... </Text>
              </>
            )}
            {isactive == false && (
              <>
                <Text style={styles.txtBtnTxt1}>Next</Text>
              </>
            )}
          </TouchableOpacity>

          <Text
            onPress={() => navigation.navigate("SignIn")}
            style={styles.txtDontHave}
          >
            Didn’t get the code?{" "}
            {counter < 1 && (
              <Text
                onPress={() => resendCodeHandler()}
                style={{ color: "#1a6363", fontFamily: "GeneralSansMedium" }}
              >
                Resend Code
              </Text>
            )}
            {counter > 0 && (
              <Text
                style={{ color: "#1a6363", fontFamily: "GeneralSansMedium" }}
              >
                {" "}
                Resend in 0:{counter}
              </Text>
            )}
          </Text>

        </View>
      </View>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000000",
  },
  imgLogo: {
    width: 150,
    height: 45,
    alignSelf: "center",
    resizeMode: "cover",
    marginTop: 63
  },
  viewInner: {
    width: "100%",
    paddingHorizontal: 20,
  },
  txtFormHead: {
    fontSize: 20,
    fontFamily: "GeneralSansMedium",
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: 10,
  },
  txtFormInstruction: {
    fontSize: 14,
    fontFamily: "GeneralSansRegular",
    textAlign: "center",
    color: "#000000",
    marginTop: 10,
  },
  viewInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 55,
    marginTop: 30,
  },
  viewBtns: {
    flexDirection: "column",
    width: "100%",
    marginTop: 40,
  },
  viewDot: {
    backgroundColor: "#000000",
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  icoInputIcon: {
    color: "grey",
  },
  viewTextInput: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    height: 54,
    borderWidth: 1,
    borderColor: "#ffffff80",
    borderRadius: 7,
    backgroundColor: "#ffffff",
  },
  inputTextInput: {
    width: "98%",
    height: 45,
    alignItems: "center",
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
  txtForgotPin: {
    fontSize: 14,
    fontFamily: "GeneralSansRegular",
    alignSelf: "left",
    color: "#ffffff",
    marginTop: 15,
  },
  txtLoginWith: {
    fontSize: 14,
    fontFamily: "GeneralSansRegular",
    alignSelf: "center",
    color: "#ffffff90",
    marginTop: 15,
  },
  viewSocialHandles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 40,
    marginTop: 15,
  },
  txtDontHave: {
    fontSize: 14,
    fontFamily: "GeneralSansRegular",
    alignSelf: "center",
    color: "#ffffff",
    marginTop: 50,
  },
});

export default Otp;
