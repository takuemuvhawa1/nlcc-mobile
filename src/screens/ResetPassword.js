import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { SimpleLineIcons, FontAwesome } from "react-native-vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Apilink from "../constants/Links";

const ResetPassword = ({ navigation }) => {

  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  const [hidepin, setHidepin] = React.useState(true);
  const [hidepin2, setHidepin2] = React.useState(true);
  const [inputs, setInputs] = React.useState({
    email: "",
    otp: "",
    password: "",
    cnpassword: ""
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

  const handleBtnPress = async () => {
    if (inputs.password == "") {
      doAlert(
        "Fill in your new password before you proceed",
        "Submission Error"
      );
      return;
    }
    if (inputs.password != inputs.cnpassword) {
      doAlert(
        "Correctly confirm the new password before you proceed",
        "Submission Error"
      );
      return;
    }

    setIsactive(true);
    const apiLink = Apilink.getLink();
    const otp = await AsyncStorage.getItem("ForgotOTP");
    const email = await AsyncStorage.getItem("ForgotEmail");

    let signinresponse = await fetch(`${apiLink}onboarding/setpassword`, {
      method: "post",
      body: JSON.stringify({
        email,
        otp,
        password: inputs.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resJson = await signinresponse.json();
    setIsactive(false);

    console.log(resJson);

    if (resJson.message == "Password set successfully") {
      setInputs({
        email: "",
        otp: "",
        password: "",
        cnpassword: "",
      });
      doAlert("Password successfully changed", "Success");
    }else{
      doAlert("Invalid email or password", "Failed");
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
          if (alerttitle == "Success"){
            console.log("closed");
            setShowAlert(false);
            setAlerttext("");
            setAlerttitle("");
            navigation.navigate("SignIn");
          }else{
            console.log("closed");
            setShowAlert(false);
            setAlerttext("");
            setAlerttitle("");
          }
        }}
      />
      <Image
        style={styles.imgLogo}
        source={require("../../assets/nlcc-logo-1.png")}
      />
      <Text style={styles.txtTagline}>NEW LIFE COVENANT CHURCH</Text>
      <Text style={styles.txtFormName}>Set New Password</Text>

        <View style={styles.viewInputs}>
         
          <View style={[styles.viewInput, { marginTop: 20 }]}>
            <View style={styles.viewIcon}>
              <SimpleLineIcons
                name="lock"
                size={25}
                style={styles.icoInputIcon}
              />
            </View>
            <View style={styles.viewTextInput}>
              <TextInput
                autoCorrect={false}
                value={inputs.password}
                secureTextEntry={hidepin}
                onChangeText={(text) =>
                  setInputs({ ...inputs, password: text })
                }
                style={styles.inputTextInput}
                placeholder="Enter your new password"
              />
            </View>
            <TouchableOpacity
              onPress={() => setHidepin(!hidepin)}
              style={styles.viewToggler}
            >
              {hidepin && (
                <>
                  <FontAwesome
                    name="eye-slash"
                    size={25}
                    style={styles.icoInputIcon}
                  />
                </>
              )}
              {hidepin == false && (
                <>
                  <FontAwesome
                    name="eye"
                    size={25}
                    style={styles.icoInputIcon}
                  />
                </>
              )}
            </TouchableOpacity>
          </View>
          <View style={[styles.viewInput, { marginTop: 20 }]}>
            <View style={styles.viewIcon}>
              <SimpleLineIcons
                name="lock"
                size={25}
                style={styles.icoInputIcon}
              />
            </View>
            <View style={styles.viewTextInput}>
              <TextInput
                autoCorrect={false}
                value={inputs.cnpassword}
                secureTextEntry={hidepin2}
                onChangeText={(text) =>
                  setInputs({ ...inputs, cnpassword: text })
                }
                style={styles.inputTextInput}
                placeholder="Enter your password confirmation"
              />
            </View>
            <TouchableOpacity
              onPress={() => setHidepin2(!hidepin2)}
              style={styles.viewToggler}
            >
              {hidepin2 && (
                <>
                  <FontAwesome
                    name="eye-slash"
                    size={25}
                    style={styles.icoInputIcon}
                  />
                </>
              )}
              {hidepin2 == false && (
                <>
                  <FontAwesome
                    name="eye"
                    size={25}
                    style={styles.icoInputIcon}
                  />
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.viewBtns}>
          <TouchableOpacity
            onPress={() => handleBtnPress()}
            style={styles.btnBtns1}
          >
            {isactive && (
              <>
                <ActivityIndicator size="large" color="#ffffff" />
              </>
            )}
            {isactive == false && (
              <>
                <Text style={styles.txtBtnTxt1}>Save New Password</Text>
              </>
            )}
          </TouchableOpacity>
         
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  imgLogo: {
    width: 150,
    height: 45,
    alignSelf: "center",
    resizeMode: "cover",
    marginTop: 63
  },
  txtTagline: {
    fontSize: 14,
    fontFamily: 'PlayfairDisplayRegular',
    textAlign: 'center',
    color: '#1a6363',
    marginTop: 15
  },
  txtFormName: {
    fontSize: 20,
    fontFamily: 'GeneralSansRegular',
    textAlign: 'center',
    color: '#FFFFF0',
    marginTop: 35,
    lineHeight: 36
  },
  viewInputs: {
    flexDirection: "column",
    width: "100%",
    marginTop: 60,
    paddingHorizontal: 20
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
    paddingHorizontal: 20
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
  viewToggler: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputTextInput: {
    width: "98%",
    height: 45,
    color: '#ffffff',
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
  }
});

export default ResetPassword;
