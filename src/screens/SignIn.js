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
import { useFocusEffect } from "@react-navigation/native";
import { SimpleLineIcons, FontAwesome } from "react-native-vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Apilink from "../constants/Links";

const SignIn = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  const [hidepin, setHidepin] = React.useState(true);
  const [inputs, setInputs] = React.useState({
    email: "tanyaradzwasaukira@gmail.com",
    password: "8899",
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
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const handleSignIn = async () => {
    if (inputs.email == "") {
      doAlert("Fill in your email before you proceed", "Submission Error");
      return;
    }
    if (inputs.password == "") {
      doAlert("Fill in your password before you proceed", "Submission Error");
      return;
    }

    // if (!validateEmail(inputs.email)) {
    //   doAlert("Email is not in correct format", "Submission Error");
    //   return;
    // }

    setIsactive(true);
    const apiLink = Apilink.getLink();

    let signinresponse = await fetch(`${apiLink}onboarding/signin`, {
      method: "post",
      body: JSON.stringify({
        email: inputs.email,
        password: inputs.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resJson = await signinresponse.json();

    console.log(resJson);

    if (resJson.message == "Invalid email or password") {
      doAlert("Invalid email or password", "Login Failed");
      setIsactive(false);
      return;
    }

    if (resJson.message == "Login successful") {
      setInputs({
        email: "",
        password: "",
      });

      setIsactive(false);
      //Set Async Data
      await AsyncStorage.setItem("Tkn", "No token");
      await AsyncStorage.setItem("UserID", resJson.member.MemberID.toString());
      await AsyncStorage.setItem(
        "UserAlias",
        resJson.member.Name + " " + resJson.member.Surname
      );
      await AsyncStorage.setItem("UserGender", resJson.member.Gender);
      await AsyncStorage.setItem("UserEmail", resJson.member.Email == null ? "---": resJson.member.Email);
      await AsyncStorage.setItem("UserPhone", resJson.member.Phone == null ? "---": resJson.member.Phone);
      await AsyncStorage.setItem("UserAddress", resJson.member.Address == null? "---": resJson.member.Address);
      await AsyncStorage.setItem("UserZone", resJson.member.Zone == null? "---": resJson.member.Zone);
      await AsyncStorage.setItem("UserImg", resJson.member.ProfilePicture == null ? "https://nlcc-backend-1.onrender.com/file/avator.PNG": resJson.member.ProfilePicture);
      await AsyncStorage.setItem("UserPrefMail", resJson.member.preferred_email == null ? "0": resJson.member.preferred_email.toString());
      await AsyncStorage.setItem("UserPrefPhone", resJson.member.preferred_phone == null ? "0": resJson.member.preferred_phone.toString());
      await AsyncStorage.setItem("UserNok", resJson.member.nxt_of_kin == null? "---": resJson.member.nxt_of_kin);
      await AsyncStorage.setItem("UserNokPhone", resJson.member.nok_phone == null? "---": resJson.member.nok_phone);
      await AsyncStorage.setItem("UserNokRel", resJson.member.nok_relationship == null? "---": resJson.member.nok_relationship);
      await AsyncStorage.setItem("UserMarital", resJson.member.marital_status == 0 ? "---": resJson.member.marital_status);
      await AsyncStorage.setItem("UserSpouse", resJson.member.sponame == null ? "---": resJson.member.sponame);
      await AsyncStorage.setItem("UserSpousePhone", resJson.member.spophone == null ? "---": resJson.member.spophone);
      if (resJson.member.ministries.length) {
        await AsyncStorage.setItem(
          "UserMinistries",
          JSON.stringify(resJson.member.ministries)
        );
      }
      if (resJson.member.cellgroups.length) {
        await AsyncStorage.setItem(
          "UserCellGroups",
          JSON.stringify(resJson.member.cellgroups)
        );
      }
      navigation.navigate("Home");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const clearAsyncStorage = async () => {
        AsyncStorage.clear();
        console.log("Async Cleared");
      };

      clearAsyncStorage();
    }, [])
  );

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
      <Text style={styles.txtFormName}>Sign In</Text>
      {/* <Text style={styles.txtFormInstruction}>
          Provide your account details and press login button
        </Text> */}

      <View style={styles.viewInputs}>
        <View style={styles.viewInput}>
          <View style={styles.viewIcon}>
            <SimpleLineIcons
              name="envelope"
              size={25}
              style={styles.icoInputIcon}
            />
          </View>
          <View style={styles.viewTextInput}>
            <TextInput
              autoCorrect={false}
              value={inputs.email}
              onChangeText={(text) => setInputs({ ...inputs, email: text })}
              style={styles.inputTextInput}
              placeholder="Enter your email"
            />
          </View>
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
              onChangeText={(text) => setInputs({ ...inputs, password: text })}
              style={styles.inputTextInput}
              placeholder="Enter your password"
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
                <FontAwesome name="eye" size={25} style={styles.icoInputIcon} />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewBtns}>
        <TouchableOpacity
          onPress={() => handleSignIn()}
          style={styles.btnBtns1}
        >
          {isactive && (
            <>
              <ActivityIndicator size="large" color="#ffffff" />
            </>
          )}
          {isactive == false && (
            <>
              <Text style={styles.txtBtnTxt1}>Log In</Text>
            </>
          )}
        </TouchableOpacity>
        <Text
          onPress={() => navigation.navigate("ForgotPassword")}
          style={styles.txtForgotPin}
        >
          Forgot password?
        </Text>
        <Text
          onPress={() => navigation.navigate("Register")}
          style={styles.txtDontHave}
        >
          Not yet registered?{"  "}
          <Text style={{ color: "#FFFFF0", fontFamily: "GeneralSansMedium" }}>
            Register
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
    //color: '#FFFFFF',
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
  viewToggler: {
    width: "15%",
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
  txtForgotPin: {
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
    alignSelf: "left",
    color: "#FFFFF0",
    marginTop: 15,
  },
  txtDontHave: {
    fontSize: 14,
    fontFamily: "GeneralSansRegular",
    alignSelf: "center",
    color: "#ffffff",
    marginTop: 100,
  },
});

export default SignIn;
