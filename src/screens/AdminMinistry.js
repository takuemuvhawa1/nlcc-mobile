import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome6, Ionicons, Feather } from "react-native-vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminMinistry = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  const [record, setRecord] = React.useState({
    id: "",
    name: "",
    description: "",
    admin: "",
    adminphone: "",
    members: "",
    joinrequesting: "",
    leaverequesting: "",
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
        const slctdObj = await AsyncStorage.getItem("SelectedMinistry");
        const ministryObj = JSON.parse(slctdObj);

        if (ministryObj) {
          setRecord({
            id: ministryObj.id,
            name: ministryObj.name,
            description: ministryObj.description,
            admin: ministryObj.admin,
            adminphone: ministryObj.adminphone,
            members: ministryObj.members,
            joinrequesting: ministryObj.joinrequesting,
            leaverequesting: ministryObj.leaverequesting
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
          onPress={() => navigation.navigate("SelectMinistry")}
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
              {record.name}
            </Text>
            <FontAwesome6
              name="people-roof"
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
              Leader:
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
              {record.admin}
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
              {record.adminphone}
            </Text>
          </View>
        </View>
        <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "98.5%",
              backgroundColor: "#1a636360",
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
                color: "#ffffff"
              }}
            >
              New members requesting to join:{" "}{record.joinrequesting}
            </Text>
            <Feather
              name="chevron-down"
              size={20}
              style={{ marginRight: 5, color: "#ffffff" }}
            />
        </View>
        <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "98.5%",
              backgroundColor: "#1a636360",
              borderWidth: 0.5,
              height: 52,
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingTop: 15,
              marginTop: 15,
            }}
          >
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#ffffff"
              }}
            >
              Old members requesting to leave:{" "}{record.joinrequesting}
            </Text>
            <Feather
              name="chevron-down"
              size={20}
              style={{ marginRight: 5, color: "#ffffff" }}
            />
        </View>
        <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "98.5%",
              backgroundColor: "#1a636360",
              borderWidth: 0.5,
              height: 52,
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingTop: 15,
              marginTop: 15,
            }}
          >
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#ffffff"
              }}
            >
              All members:{" "}{record.members}
            </Text>
            <Feather
              name="chevron-down"
              size={20}
              style={{ marginRight: 5, color: "#ffffff" }}
            />
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
  viewMiddle: {
    flex: 8,
    flexDirection: "column",
    width: "100%",
    marginTop: 10,
  },
});

export default AdminMinistry;