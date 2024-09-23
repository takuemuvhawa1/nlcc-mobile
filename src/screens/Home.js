import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Keyboard,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

import {
  FontAwesome6,
  Octicons,
  FontAwesome,
  Ionicons,
  AntDesign,
  SimpleLineIcons,
} from "react-native-vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ministries from "./Ministries";
import Calender from "./Calender";
import Cellgroups from "./Cellgroups";
import Forums from "./Forums";
import Notifications from "./Notifications";

const BtnsData = [
  {
    id: "1",
    title: "Ministries",
    vectoricon: "FontAwesome5",
    icon: "church",
    selected: false,
  },
  {
    id: "2",
    title: "Calender",
    vectoricon: "FontAwesome6",
    icon: "people-roof",
    selected: false,
  },
  {
    id: "3",
    title: "Cell Groups",
    vectoricon: "FontAwesome6",
    icon: "people-roof",
    selected: false,
  },
  {
    id: "4",
    title: "Feeds",
    vectoricon: "FontAwesome5",
    icon: "church",
    selected: false,
  },
  {
    id: "5",
    title: "Refresh",
    vectoricon: "SimpleLineIcons",
    icon: "refresh",
    selected: true,
  },
];

const Home = ({ navigation }) => {
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
  });

  const [dayhour, setDayhour] = React.useState("");
  const [searchtext, setSearchtext] = React.useState("");
  const [isactive, setIsactive] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alerttext, setAlerttext] = React.useState("");
  const [alerttitle, setAlerttitle] = React.useState("");
  const [showTabs, setShowTabs] = useState(true);

  const doAlert = (txt, ttl) => {
    setShowAlert(!showAlert);
    setAlerttext(txt);
    setAlerttitle(ttl);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [btns, setBtns] = useState([]);
  const [prevbtn, setPrevbtn] = useState("5");
  const [page, setPage] = useState("5");

  const changeState = (id) => {
    setPage(id);
    let markers = [...btns];
    let index = markers.findIndex((el) => el.id == id);
    let previndex = markers.findIndex((el) => el.id == prevbtn);

    markers[index] = { ...markers[index], selected: !markers[index].selected };
    markers[previndex] = {
      ...markers[previndex],
      selected: !markers[previndex].selected,
    };

    setPrevbtn(id);
    setBtns(markers);
  };

  const OneItem = ({ id, title, vectoricon, icon, selected }) => (
    <TouchableOpacity
      style={
        selected == true
          ? {
              width: 130,
              height: 45,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 7,
              backgroundColor: "#1a6363",
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "#bd7925",
            }
          : {
              width: 130,
              height: 45,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 7,
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "#1a6363",
            }
      }
      onPress={() => changeState(id.toString())}
    >
      {id == 1 && (
        <>
          <FontAwesome6
            name="people-roof"
            size={17}
            style={
              selected == true
                ? { marginRight: 5, color: "#ffffff" }
                : { marginRight: 5, color: "#000000" }
            }
          />
        </>
      )}
      {id == 2 && (
        <>
          <FontAwesome
            name="calendar"
            size={17}
            style={
              selected == true
                ? { marginRight: 5, color: "#ffffff" }
                : { marginRight: 5, color: "#000000" }
            }
          />
        </>
      )}

      {id == 3 && (
        <>
          <FontAwesome6
            name="users-viewfinder"
            size={17}
            style={
              selected == true
                ? { marginRight: 5, color: "#ffffff" }
                : { marginRight: 5, color: "#000000" }
            }
          />
        </>
      )}

      {id == 4 && (
        <>
          <FontAwesome6
            name="users-rays"
            size={17}
            style={
              selected == true
                ? { marginRight: 5, color: "#ffffff" }
                : { marginRight: 5, color: "#000000" }
            }
          />
        </>
      )}
      {id == 5 && (
        <>
          <SimpleLineIcons
            name="refresh"
            size={17}
            style={
              selected == true
                ? { marginRight: 5, color: "#ffffff" }
                : { marginRight: 5, color: "#000000" }
            }
          />
        </>
      )}
      <Text
        style={
          selected == true
            ? {
                fontFamily: "PlayfairDisplayRegular",
                fontSize: 18,
                lineHeight: 24,
                color: "#ffffff",
              }
            : {
                fontFamily: "PlayfairDisplayRegular",
                fontSize: 18,
                lineHeight: 24,
                color: "#000000",
              }
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <OneItem
      id={item.id}
      title={item.title}
      vectoricon={item.vectoricon}
      icon={item.icon}
      selected={item.selected}
    />
  );

  useEffect(() => {
    const asyncFetch = async () => {
      setBtns(BtnsData);
      const Tkn = await AsyncStorage.getItem("Tkn");
      const UserID = await AsyncStorage.getItem("UserID");
      const UserAlias = await AsyncStorage.getItem("UserAlias");
      const UserGender = await AsyncStorage.getItem("UserGender");
      const UserEmail = await AsyncStorage.getItem("UserEmail");
      const UserPhone = await AsyncStorage.getItem("UserPhone");
      const UserAddress = await AsyncStorage.getItem("UserAddress");
      const UserZone = await AsyncStorage.getItem("UserZone");
      const UserImg = await AsyncStorage.getItem("UserImg");

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
          UserImg
        });
      }
    };
    asyncFetch();
    getHour();
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setShowTabs(false);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setShowTabs(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const getHour = () => {
    const date = new Date();
    const hour = date.getHours();
    setDayhour(hour);
  };

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
        {showTabs && (
          <>
            <View
              style={{
                width: "15%",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <Image
                style={styles.imgUsr}
                source={userdata.UserImg ? {uri: `${userdata.UserImg}` } : null}
                // source={{
                //   uri: `${userdata.UserImg}`,
                // }}
              />
            </View>
            <View
              style={{
                width: "52%",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  fontFamily: "PlayfairDisplayRegular",
                  fontSize: 20,
                  lineHeight: 24,
                  marginTop: 10,
                }}
              >
                Hi {userdata.UserAlias}
              </Text>
              {dayhour < 12 && (
                <>
                  <Text
                    style={{
                      fontFamily: "PlayfairDisplayRegular",
                      fontSize: 18,
                      lineHeight: 24,
                    }}
                  >
                    Good Afternoon
                  </Text>
                </>
              )}
              {dayhour >= 12 && dayhour < 18 && (
                <>
                  <Text
                    style={{
                      fontFamily: "PlayfairDisplayRegular",
                      fontSize: 18,
                      lineHeight: 24,
                    }}
                  >
                    Good Morning
                  </Text>
                </>
              )}
              {dayhour >= 18 && (
                <>
                  <Text
                    style={{
                      fontFamily: "PlayfairDisplayRegular",
                      fontSize: 18,
                      lineHeight: 24,
                    }}
                  >
                    Good Evening
                  </Text>
                </>
              )}
            </View>
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
          </>
        )}
      </View>
      <View style={styles.viewMiddle}>
        <View style={styles.viewInput}>
          <View style={styles.viewIcon}>
            <Octicons name="search" size={25} style={styles.icoInputIcon} />
          </View>
          <View style={styles.viewTextInput}>
            <TextInput
              autoCorrect={false}
              value={searchtext}
              onChangeText={(text) => setSearchtext(text)}
              style={styles.inputTextInput}
              placeholder="Search here for church . . ."
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 5,
            width: "100%",
            marginTop: 30,
          }}
        >
          {btns && (
            <FlatList
              horizontal
              data={btns}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ width: 7 }} />}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        {page == 1 && (
          <>
            <Text
              style={{
                fontFamily: "GeneralSansRegular",
                fontSize: 14,
                lineHeight: 24,
                marginTop: 20,
              }}
            >
              Be part of diffrent ministries available
            </Text>
            <View style={{ height: "75%" }}>
              <Ministries />
            </View>
          </>
        )}
        {page == 2 && (
          <>
            <Text
              style={{
                fontFamily: "GeneralSansRegular",
                fontSize: 14,
                lineHeight: 24,
                marginTop: 20,
              }}
            >
              View events and church services as part of our calender
            </Text>
            <View style={{ height: "75%" }}>
              <Calender />
            </View>
          </>
        )}
        {page == 3 && (
          <>
            <Text
              style={{
                fontFamily: "GeneralSansRegular",
                fontSize: 14,
                lineHeight: 24,
                marginTop: 20,
              }}
            >
              Be part of a Cell Group
            </Text>
            <View style={{ height: "75%" }}>
              <Cellgroups />
            </View>
          </>
        )}
        {page == 4 && (
          <>
            <Text
              style={{
                fontFamily: "GeneralSansRegular",
                fontSize: 14,
                lineHeight: 24,
                marginTop: 20,
              }}
            >
              Be part of the discussion forums on the listed topics
            </Text>
            <View style={{ height: "75%" }}>
              <Forums />
            </View>
          </>
        )}
        {page == 5 && (
          <>
            <Image
              style={styles.imgChurch}
              source={require("../../assets/church.png")}
            />

            <View
              style={{ width: "100%", flexDirection: "row", marginTop: 20 }}
            >
              <View
                style={{
                  width: "50%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{ fontFamily: "GeneralSansRegular", fontSize: 14 }}
                >
                  Notifications (30)
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{ fontFamily: "GeneralSansRegular", fontSize: 14 }}
                >
                  View All
                </Text>
              </View>
            </View>
            <View style={{ height: "41%" }}>
              <Notifications />
            </View>
          </>
        )}
      </View>
      <View style={styles.viewBottom}>
        {showTabs && (
          <>
            <View style={styles.viewInTabs}>
              <TouchableOpacity
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Ionicons color="#bd7925" name="home" size={25} />
                <Text
                  style={{
                    fontFamily: "GeneralSansRegular",
                    fontSize: 14,
                    color: "#bd7925",
                  }}
                >
                  Home
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Sermons")}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <FontAwesome6 color="#1a6363" name="book-bible" size={25} />
                <Text
                  style={{
                    fontFamily: "GeneralSansRegular",
                    fontSize: 14,
                    color: "#1a6363",
                  }}
                >
                  Sermons
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Contributions")}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <FontAwesome6 color="#1a6363" name="money-check" size={25} />
                <Text
                  style={{
                    fontFamily: "GeneralSansRegular",
                    fontSize: 14,
                    color: "#1a6363",
                  }}
                >
                  Contributions
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Events")}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <FontAwesome6 color="#1a6363" name="building-user" size={22} />
                <Text
                  style={{
                    fontFamily: "GeneralSansRegular",
                    fontSize: 14,
                    color: "#1a6363",
                  }}
                >
                  Events
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("More")}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <AntDesign color="#1a6363" name="appstore1" size={25} />
                <Text
                  style={{
                    fontFamily: "GeneralSansRegular",
                    fontSize: 14,
                    color: "#1a6363",
                  }}
                >
                  More
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    marginTop: 25,
  },
  imgUsr: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    resizeMode: "cover",
  },
  imgLogo: {
    width: "98%",
    height: 35,
    alignSelf: "flex-start",
    resizeMode: "cover",
  },
  imgChurch: {
    marginTop: 20,
    width: "100%",
    alignSelf: "center",
    height: "30%",
    borderRadius: 5,
    resizeMode: "cover",
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
  viewInput: {
    flexDirection: "row",
    width: "100%",
    height: 55,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 8,
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
    color: "#000000",
    fontSize: 16,
    fontFamily: "GeneralSansMedium",
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

export default Home;
