import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

import {
  FontAwesome,
  Ionicons,
  Feather,
  SimpleLineIcons,
} from "react-native-vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyProfile = ({ navigation }) => {
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

  const RenderItem = ({ title }) => (
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
          {title}
        </Text>

        {title == "My Profile" && (
          <>
            <FontAwesome color="#ffffff" name="user-o" size={20} />
          </>
        )}

        {title == "Ministry Admin" && (
          <>
            <FontAwesome color="#ffffff" name="user-circle" size={20} />
          </>
        )}

        {title == "Cell Group Admin" && (
          <>
            <FontAwesome color="#ffffff" name="user-circle" size={20} />
          </>
        )}
        {title == "Events Admin" && (
          <>
            <FontAwesome color="#ffffff" name="user-circle" size={20} />
          </>
        )}
        {title == "Settings" && (
          <>
            <Feather color="#ffffff" name="settings" size={20} />
          </>
        )}
        {title == "About NLCC" && (
          <>
            <SimpleLineIcons color="#ffffff" name="info" size={20} />
          </>
        )}
        {title == "Sign Out" && (
          <>
            <FontAwesome color="#ffffff" name="sign-out" size={22} />
          </>
        )}
      </View>
    </TouchableOpacity>
  );

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
        <TouchableOpacity
          onPress={() => navigation.navigate("More")}
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
        <RenderItem title={"My Profile"} />
        <Image
          style={styles.imgUsr}
          source={require("../../assets/user.png")}
        />
        <Text
          style={{
            fontFamily: "GeneralSansMedium",
            fontSize: 18,
            color: "#000000",
            marginTop: 10,
            alignSelf: "center",
          }}
        >
          Hi! Gemma Griffins
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
            borderBottomColor: '#1a636350',
            borderBottomWidth: 0.5,
            paddingBottom: 10
          }}
        >
          <View style={{ width: "40%" }}>
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#000000",
                marginTop: 40,
              }}
            >
              Date Joined
            </Text>
          </View>
          <View style={{ width: "60%" }}>
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#1a6363",
                marginTop: 40,
                alignSelf: "flex-end",
              }}
            >
              12-12-2000
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
            borderBottomColor: '#1a636350',
            borderBottomWidth: 0.5,
            paddingBottom: 10
          }}
        >
          <View style={{ width: "40%" }}>
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#000000",
                marginTop: 10,
              }}
            >
              Cell Group
            </Text>
          </View>
          <View style={{ width: "60%" }}>
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#1a6363",
                marginTop: 15,
                alignSelf: "flex-end",
              }}
            >
              Belevedere North  Harare
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
            borderBottomColor: '#1a636350',
            borderBottomWidth: 0.5,
            paddingBottom: 15
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
              Ministries
            </Text>
          </View>
          <View style={{ width: "60%", flexDirection: 'column' }}>
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#1a6363",
                marginTop: 15,
                alignSelf: "flex-end",
              }}
            >
              Ladies Ministry
            </Text>
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#1a6363",
                marginTop: 20,
                alignSelf: "flex-end",
              }}
            >
              Covenant Care Ministry
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
  }
});

export default MyProfile;
