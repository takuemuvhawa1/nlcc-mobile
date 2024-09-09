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
  TextInput
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from '@react-navigation/native';
import { SimpleLineIcons, FontAwesome } from "react-native-vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    email: "",
    password: "",
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

  const handleSignIn = (email) => {
    navigation.navigate('Home');
  };

  useFocusEffect(
    React.useCallback(() => {
      const unloadScreen = () => {
        console.log('SignIn');
      };
      setTimeout(() => {
        unloadScreen();
      }, 5000);
    }, [navigation])
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
      {/* <StatusBar hidden={true} /> */}
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
                placeholder="Enter your email: example@gmail.com"
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
                onChangeText={(text) =>
                  setInputs({ ...inputs, password: text })
                }
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
            onPress={() => navigation.navigate("EmailReset")}
            style={styles.txtForgotPin}
          >
            Forgot password?
          </Text>
          <Text
            onPress={() => navigation.navigate("SignUp")}
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
  txtFormName: {
    fontSize: 32,
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
  },
  txtForgotPin: {
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
    alignSelf: "left",
    color: "#FFFFF0",
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
    marginTop: 100,
  },
});

export default SignIn;
