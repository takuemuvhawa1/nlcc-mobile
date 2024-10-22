import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Keyboard,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  FontAwesome6,
  FontAwesome5,
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
import PrayerRequests from "./PrayerRequests";
import Notifications from "./Notifications";
import Apilink from "../constants/Links";

const BtnsData = [
  {
    id: "6",
    title: "About",
    selected: true,
  },
  {
    id: "1",
    title: "Ministries",
    selected: false,
  },
  {
    id: "2",
    title: "Calender",
    selected: false,
  },
  {
    id: "3",
    title: "Cell Groups",
    selected: false,
  },
  {
    id: "4",
    title: "Prayer Requests",
    selected: false,
  },
  {
    id: "5",
    title: "Refresh",
    selected: false,
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

  const ministryRef = useRef();
  const calenderRef = useRef();
  const cellgroupRef = useRef();
  const prayerrequestRef = useRef();
  const notificationRef = useRef();

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
  const [prequest, setPrequest] = React.useState("");
  const [newrequest, setNewrequest] = React.useState(true);
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

  const [btns, setBtns] = useState([]);
  const [prevbtn, setPrevbtn] = useState("5");
  const [page, setPage] = useState("6");

  const handleSendPraRequest = async() => {
    if (prequest==""){
      doAlert("You can not send an empty prayer request","Submission Error");
    }
    setIsactive(true)
    const apiLink = Apilink.getLink();
    let response = await fetch(`${apiLink}prayer-req`, {
      method: "post",
      body: JSON.stringify({
        MemberID: userdata.UserID,
        requestnotes: prequest
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resJson = await response.json();
    setIsactive(false);

    console.log(resJson);

    if (resJson.message == "Prayer request added successfully") {
      setPrequest("")
      doAlert("Prayer request sent successfully", "Success");
    }else{
      doAlert("Sending failed. Contact system admin", "Failed");
    }
  }
  const changeState = (id) => {
    if (page==id){
      return;
    }
    setPage(id);

    let markers = [...btns];
    let index = markers.findIndex((el) => el.id == id);
    let previndex = markers.findIndex((el) => el.id == prevbtn);

    markers[index] = { ...markers[index], selected: true};
    markers[previndex] = {
      ...markers[previndex],
      selected: false
    };

    setPrevbtn(id);
    setBtns(markers);
  };

  const findSearched = (text) => {
    setSearchtext(text);
    if (page==6 || page == 5){
      return;
    }
    if (prevbtn == 1) {
      ministryRef.current.getFilterValue(text);
    }
    if (prevbtn == 2) {
      calenderRef.current.getFilterValue(text);
    }
    if (prevbtn == 3) {
      cellgroupRef.current.getFilterValue(text);
    }
    if (prevbtn == 4) {
      prayerrequestRef.current.getFilterValue(text);
    }
    if (prevbtn == 5) {
      notificationRef.current.getFilterValue(text);
    }
  };

  const OneItem = ({ id, title, selected }) => (
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
      {id == 6 && (
        <>
          <SimpleLineIcons
            name="info"
            size={17}
            style={
              selected == true
                ? { marginRight: 5, color: "#ffffff", marginTop: 3 }
                : { marginRight: 5, color: "#000000", marginTop: 3 }
            }
          />
        </>
      )}
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
          <FontAwesome5
            name="pray"
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
      console.log(UserAlias)
      
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
    console.log(hour);
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
                // source={
                //   userdata.UserImg ? { uri: `${userdata.UserImg}` } : null
                // }
                source={{
                  uri: `${userdata.UserImg}`,
                }}
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
                    Good Morning
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
                    Good Afternoon
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
              onChangeText={(text) => findSearched(text)}
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
        {page == 6 && (
          <>
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#1a6363",
                marginTop: 40,
              }}
            >
              About New Life Covenant Church
            </Text>
            <ScrollView
              style={{ height: "75%" }}
              showsVerticalScrollIndicator={false}
            >
              <Text
                style={{
                  fontFamily: "GeneralSansMedium",
                  fontSize: 18,
                  color: "#000000",
                  marginTop: 40,
                }}
              >
                Who we are and what we believe in
              </Text>
              <Text
                style={{
                  fontFamily: "GeneralSansRegular",
                  fontSize: 18,
                  color: "#000000",
                  marginTop: 10,
                  textAlign: "justify",
                }}
              >
                New Life Covenant Church is a Pentecostal, Charismatic and
                Evangelical church with a dominant gift and anointing of
                Revelation Knowledge. We have and believe in fundamental
                doctrines that constitute our spiritual DNA and define us as
                well as distinguish us as a ministry with a God given mandate
                and purpose. These are our Non-Negotiables. Essentially they are
                at the centre of everything we do, unite us as a ministry
              </Text>
              <Text
                style={{
                  fontFamily: "GeneralSansMedium",
                  fontSize: 18,
                  color: "#000000",
                  marginTop: 40,
                }}
              >
                A place to belong
              </Text>
              <Text
                style={{
                  fontFamily: "GeneralSansRegular",
                  fontSize: 18,
                  color: "#000000",
                  marginTop: 10,
                  textAlign: "justify",
                }}
              >
                Welcome to New Life Covenant Church! Whether you’ve attended
                church since your infancy days or are just beginning to explore
                the idea, we’re here to give support to you through biblical
                teaching, inspiring worship and fellowship which we are certain
                will draw you incredibly close to Christ that your life will be
                transformed. The transformation approach at NLCC is holistic:
                spirit, body, mind and heart, and our values, beliefs and
                culture reflect that.
              </Text>
            </ScrollView>
          </>
        )}
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
              <Ministries ref={ministryRef} />
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
              <Calender ref={calenderRef} />
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
              <Cellgroups ref={cellgroupRef} />
            </View>
          </>
        )}
        {page == 4 && (
          <>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, alignItems: " center" }}
            >
              <Text
                style={{
                  fontFamily: "GeneralSansMedium",
                  fontSize: 18,
                  color: "#000000", marginTop: 20
                }}
              >
                Prayer Requests
              </Text>
              <TouchableOpacity
                onPress={() => setNewrequest(!newrequest)}
                style={{
                  width: "45%",
                  height: 35,
                  marginTop: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 7,
                  backgroundColor: "#ffffff",
                  borderColor: "#1a6363",
                  borderWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "GeneralSansMedium",
                    textAlign: "center",
                    color: "#000000",
                  }}
                >
                  {newrequest == false? "New Prayer Request":"Sent Prayer Requests"}
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontFamily: "GeneralSansRegular",
                fontSize: 14,
                lineHeight: 24,
                marginTop: 20,
              }}
            >
              The Bible commands us to pray for one another, “Therefore, confess
              your sins to one another and pray for one another, that you may be
              healed. Again, prayer lightens burdens, therefore praying for one
              another is a powerful way for us to bear one another's burdens. It
              is a loving act to pray for someone.
            </Text>
            <View style={{ height: "75%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
               
              </View>
              {newrequest ? (
                <>
                  <View
                    style={{
                      width: "100%",
                      marginTop: 20,
                    }}
                  >
                    <TextInput
                      autoCorrect={false}
                      value={prequest}
                      multiline={true}
                      onChangeText={(text) => setPrequest(text)}
                      style={{
                        width: "100%",
                        height: 145,
                        color: "#000000",
                        fontSize: 16,
                        fontFamily: "GeneralSansMedium",
                        textAlignVertical: "top",
                        borderWidth: 1,
                        borderColor: "#1a6363",
                        borderRadius: 8,
                        paddingHorizontal: 7,
                      }}
                      placeholder="Type your prayer request here . . ."
                    />
                    <TouchableOpacity
                      onPress={() => handleSendPraRequest()}
                      style={styles.btnBtns1}
                    >
                      {isactive && (
                        <>
                          <ActivityIndicator size="large" color="#ffffff" />
                        </>
                      )}
                      {isactive == false && (
                        <>
                          <Text style={styles.txtBtnTxt1}>
                            Send Prayer Request
                          </Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <View style={{height: "60%"}}>
                  <PrayerRequests ref={prayerrequestRef} />
                </View>
              )}
            </View>
          </>
        )}
        {page == 5 && (
          <>
            <Image
              style={styles.imgChurch}
              source={require("../../assets/logoup.png")}
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
                onPress={()=>navigation.navigate("AllNotifications")}
                  style={{ fontFamily: "GeneralSansRegular", fontSize: 14 }}
                >
                  View All
                </Text>
              </View>
            </View>
            <View style={{ height: "33%" }}>
              <Notifications ref={notificationRef} />
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
    width: "90%",
    alignSelf: "center",
    height: "40%",
    borderRadius: 5,
    resizeMode: "stretch",
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
  btnBtns1: {
    width: "100%",
    height: 55,
    marginTop: 15,
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
