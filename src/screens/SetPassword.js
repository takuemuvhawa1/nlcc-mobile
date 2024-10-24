import React, {useEffect} from "react";
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from "expo-status-bar";
import Apilink from "../constants/Links";

const SetPassword = ({ navigation }) => {

  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  const [inputs, setInputs] = React.useState({
    nam: "",
    otp: "",
    email: "",
    password: "",
    cnpassword: "",
  });
  
  const [hideotp, setHideotp] = React.useState(true);
  const [successfull, setSuccessfull] = React.useState(false);
  const [hidepin, setHidepin] = React.useState(true);
  const [hidecnpin, setHidecnpin] = React.useState(true);

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
    
    if (inputs.otp == "") {
      doAlert("Provide the OTP before you proceed", "Submission Error");
      return;
    }
    if (inputs.password == "") {
      doAlert("Provide the password before you proceed", "Submission Error");
      return;
    }
    if (inputs.password != inputs.cnpassword) {
      doAlert("Password confirmation is wrong", "Submission Error");
      return;
    }
    const receivedOTP = await AsyncStorage.getItem("ReceivedOTP");
    if (inputs.otp != receivedOTP) {
      doAlert("Provided OTP is wrong", "Submission Error");
      return;
    }

    setIsactive(true);

    const asyncEmail = await AsyncStorage.getItem("TypedEmail");
    console.log("email"+asyncEmail)
    const apiLink = Apilink.getLink();

    let signinresponse = await fetch(`${apiLink}onboarding/setpassword`, {
      method: "post",
      body: JSON.stringify({
        email: asyncEmail,
        otp: inputs.otp,
        password: inputs.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resJson = await signinresponse.json();

    console.log(resJson);

    if (resJson.message == "Password set successfully") {
      doAlert("Password saved successfully", "Saving Succssful");
      setInputs({
        email: "",
        otp: "",
        password: "",
      });

      setIsactive(false);
      setSuccessfull(true);
      return;
    }
  };

  useEffect(()=>{
    const findData = async()=>{
      const asyncNam = await AsyncStorage.getItem("ReceivedName");
      setInputs({
        ...inputs,
        nam: asyncNam
      })
    }
    findData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
          if (successfull == true){
            navigation.navigate("SignIn");
          }
        }}
      />
      <Image
        style={styles.imgLogo}
        source={require("../../assets/nlcc-logo-1.png")}
      />
      <Text style={styles.txtTagline}>NEW LIFE COVENANT CHURCH</Text>
      <Text style={styles.txtFormName}>Welcome: {inputs.nam}</Text>
        <Text style={styles.txtFormInstruction}>
          Enter the OTP you received on your email and set your password to proceed
        </Text>

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
                value={inputs.otp}
                secureTextEntry={hideotp}
                onChangeText={(text) =>
                  setInputs({ ...inputs, otp: text })
                }
                style={styles.inputTextInput}
                placeholder="Enter OTP you received on email"
              />
            </View>
            <TouchableOpacity
              onPress={() => setHideotp(!hideotp)}
              style={styles.viewToggler}
            >
              {hideotp && (
                <>
                  <FontAwesome
                    name="eye-slash"
                    size={25}
                    style={styles.icoInputIcon}
                  />
                </>
              )}
              {hideotp == false && (
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
                secureTextEntry={hidecnpin}
                onChangeText={(text) =>
                  setInputs({ ...inputs, cnpassword: text })
                }
                style={styles.inputTextInput}
                placeholder="Enter your password confirmation"
              />
            </View>
            <TouchableOpacity
              onPress={() => setHidecnpin(!hidecnpin)}
              style={styles.viewToggler}
            >
              {hidecnpin && (
                <>
                  <FontAwesome
                    name="eye-slash"
                    size={25}
                    style={styles.icoInputIcon}
                  />
                </>
              )}
              {hidecnpin == false && (
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
    //color: '#FFFFFF',
    color: '#1a6363',
    marginTop: 15
  },
  txtFormInstruction: {
    fontSize: 14,
    fontFamily: 'GeneralSansRegular',
    textAlign: 'center',
    color: '#000000',
    marginTop: 15,
    lineHeight: 20,
    paddingHorizontal: 20
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
    color: "#00000060",
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

export default SetPassword;
