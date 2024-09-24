import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
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

  const [userdata, setUserdata] = React.useState({
    Tkn: "",
    UserID: "",
    UserAlias: "",
    UserGender: "",
    UserEmail: "",
    UserPhone: "",
    UserAddress: "",
    UserZone: "",
    UserImg: "",
    UserMinistries: [],
    UserCellGroups: [],
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
    const asyncFetch = async () => {
      const Tkn = await AsyncStorage.getItem("Tkn");
      const UserID = await AsyncStorage.getItem("UserID");
      const UserAlias = await AsyncStorage.getItem("UserAlias");
      const UserGender = await AsyncStorage.getItem("UserGender");
      const UserEmail = await AsyncStorage.getItem("UserEmail");
      const UserPhone = await AsyncStorage.getItem("UserPhone");
      const UserAddress = await AsyncStorage.getItem("UserAddress");
      const UserZone = await AsyncStorage.getItem("UserZone");
      const UserImg = await AsyncStorage.getItem("UserImg");
      let UserMinistries = [];
      let UserCellGroups = [];
      try {
        let value = await AsyncStorage.getItem("UserMinistries");
        if (value != null) {
          // do something
          const AsyncUserMinistries = await AsyncStorage.getItem(
            "UserMinistries"
          );
          UserMinistries = JSON.parse(AsyncUserMinistries);
        }
      } catch (error) {
        console.log(error);
      }
      try {
        let value = await AsyncStorage.getItem("UserCellGroups");
        if (value != null) {
          // do something
          const AsyncUserCellGroups = await AsyncStorage.getItem(
            "UserCellGroups"
          );
          UserCellGroups = JSON.parse(AsyncUserCellGroups);
        } else {
          UserCellGroups = [];
        }
      } catch (error) {
        console.log(error);
      }

      if (UserID) {
        setUserdata({
          Tkn,
          UserID,
          UserAlias,
          UserGender,
          UserEmail,
          UserPhone,
          UserAddress,
          UserZone,
          UserImg,
          UserMinistries,
          UserCellGroups,
        });
        console.log("Set done");
      }
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
          source={userdata.UserImg ? { uri: `${userdata.UserImg}` } : null}
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
          Hi! {userdata.UserAlias}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
            borderBottomColor: "#1a636350",
            borderBottomWidth: 0.5,
            paddingBottom: 10,
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
              Zone
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
              {userdata.UserZone}
            </Text>
          </View>
        </View>

        {userdata.UserCellGroups.length > 0 && (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
                borderBottomColor: "#1a636350",
                borderBottomWidth: 0.5,
                paddingBottom: 10,
              }}
            >
              <View style={{ width: "40%" }}>
                <Text
                  style={{
                    fontFamily: "GeneralSansMedium",
                    fontSize: 18,
                    color: "#000000",
                    marginTop: 20,
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
                    marginTop: 20,
                    alignSelf: "flex-end",
                  }}
                >
                  {userdata.UserCellGroups[0].SmallGroupName}
                </Text>
              </View>
            </View>
          </>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
            borderBottomColor: "#1a636350",
            borderBottomWidth: 0.5,
            paddingBottom: 10,
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
          <View style={{ width: "60%", flexDirection: "column" }}>
            {userdata.UserMinistries.length == 0 ? (
              <>
                <Text
                  style={{
                    fontFamily: "GeneralSansMedium",
                    fontSize: 18,
                    color: "#00000050",
                    marginTop: 15,
                    alignSelf: "flex-end",
                  }}
                >
                  None Joined
                </Text>
              </>
            ) : (
              <>
                {userdata.UserMinistries.map((item, index) => (
                  <Text
                    style={{
                      fontFamily: "GeneralSansMedium",
                      fontSize: 18,
                      color: "#1a6363",
                      marginTop: 20,
                      alignSelf: "flex-end",
                    }}
                    key={index}
                  >
                    {item.SmallGroupName}
                  </Text>
                ))}
              </>
            )}
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
});

export default MyProfile;
