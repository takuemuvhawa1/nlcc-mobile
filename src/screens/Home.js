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
  TextInput,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import {
  FontAwesome5,
  FontAwesome6,
  Octicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  Foundation,
  AntDesign,
} from "react-native-vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BtnsData = [
  {
    id: "1",
    title: "Ministries",
    vectoricon: "FontAwesome5",
    icon: "church",
    selected: true,
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
    title: "Discussion Forums",
    vectoricon: "FontAwesome5",
    icon: "church",
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

  const [searchtext, setSearchtext] = React.useState("");
  const [isactive, setIsactive] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alerttext, setAlerttext] = React.useState("");
  const [alerttitle, setAlerttitle] = React.useState("");

  const doAlert = (txt, ttl) => {
    setShowAlert(!showAlert);
    setAlerttext(txt);
    setAlerttitle(ttl);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [btns, setBtns] = useState([]);
  const [prevbtn, setPrevbtn] = useState("1");

  const changeState = (id) => {
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
              width: 150,
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
              width: 150,
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
            name="church"
            size={15}
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
          <FontAwesome6
            name="people-roof"
            size={15}
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
          <MaterialIcons
            name="event-note"
            size={20}
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
            name="people-carry-box"
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
    const asyncFetch = () => {
      setBtns(BtnsData);
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
        <View
          style={{
            width: "80%",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Text style={{ fontFamily: "PlayfairDisplayRegular", fontSize: 16 }}>
            Hi Emma Griffins
          </Text>
          <Text
            style={{
              fontFamily: "PlayfairDisplayRegular",
              fontSize: 22,
              lineHeight: 24,
              marginTop: 10
            }}
          >
            Good Morning
          </Text>
        </View>
        <View
          style={{
            width: "20%",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Image
            style={styles.imgLogo}
            source={require("../../assets/user.png")}
          />
        </View>
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
            flexDirection: "row",
            justifyContent: "space-between",
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
      </View>
      <View style={styles.viewBottom}>
        <View style={styles.viewInTabs}>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons color="#000000" name="home" size={25} />
            <Text style={{ color: "#000000" }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Orders")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons color="#1a6363" name="cart-outline" size={25} />
            <Text style={{ color: "#1a6363" }}>Services</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Chat")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons
              color="#1a6363"
              name="chatbox-ellipses-outline"
              size={25}
            />
            <Text style={{ color: "#1a6363" }}>Contributions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Support")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <MaterialIcons color="#1a6363" name="support-agent" size={25} />
            <Text style={{ color: "#1a6363" }}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("More")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Foundation color="#1a6363" name="indent-more" size={25} />
            <Text style={{ color: "#1a6363" }}>More</Text>
          </TouchableOpacity>
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
    marginTop: 10,
  },
  imgLogo: {
    width: 45,
    height: 45,
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
  viewBottom: {
    flex: 0.8,
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
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff"
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
  viewInTabs: {
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
});

export default Home;
