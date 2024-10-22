import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Linking,
  Keyboard
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import {
  FontAwesome6,
  Octicons,
  Ionicons,
  AntDesign
} from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Apilink from "../constants/Links";

const Sermons = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  const [data, setData] = useState([]);
  const [filtereddata, setFilteredData] = useState([]);
  const [showTabs, setShowTabs] = useState(true);

  const [searchtext, setSearchtext] = React.useState("");
  const isFocused = useIsFocused();


  const SingleItem = ({ id, name, weblink, date }) => (
    <TouchableOpacity
      style={{ marginTop: 10 }}
      onPress={() => Linking.openURL(`${weblink}`)}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 100,
          backgroundColor: "white",
          borderColor: "#1a636340",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 15,
        }}
      >
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "GeneralSansMedium",
              textAlign: "flex-start",
              color: "#000000",
              marginTop: 10,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "GeneralSansRegular",
              textAlign: "flex-start",
              color: "#bd7925",
              marginTop: 7,
            }}
          >
            {date}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "GeneralSansRegular",
              textAlign: "flex-start",
              color: "#000000",
              marginTop: 7,
            }}
          >
            {weblink}
          </Text>
        </View>
        <View
          style={{
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.imgYouTube}
            source={require("../../assets/youtube5.png")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <SingleItem
      id={item.id}
      name={item.name}
      weblink={item.weblink}
      date={item.date}
    />
  );

  useEffect(() => {
    const asyncFetch = async () => {
      //Call API HERE
      const apiLink = Apilink.getLink();

      const asynctoken = await AsyncStorage.getItem("Tkn");

      let res = await fetch(`${apiLink}sermons`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let responseJson = await res.json();
      setData(responseJson);
      setFilteredData(responseJson);
    };

    if (isFocused) {
      asyncFetch();
    }
  }, [props, isFocused]);

  const findSearched = (text) => {
    setSearchtext(text);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

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
      <View style={styles.viewTop}>
        <View
          style={{
            width: "70%",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontFamily: "GeneralSansRegular",
              fontSize: 22,
              lineHeight: 24,
              marginTop: 10,
            }}
          >
            Sermons
          </Text>
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
      </View>
      <View style={styles.viewMiddle}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            paddingHorizontal: 5,
            width: "100%",
            marginTop: 30,
          }}
        >
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
                placeholder="Search sermon . . ."
              />
            </View>
          </View>
          <View style={{ paddingBottom: 20, height: "94%" }}>
            {filtereddata && (
              <>
                <FlatList
                  vertical
                  data={filtereddata}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 100 }}
                />
              </>
            )}
          </View>
        </View>
      </View>
      <View style={styles.viewBottom}>
        {showTabs && (
          <>
            <View style={styles.viewInTabs}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Ionicons color="#1a6363" name="home" size={25} />
                <Text
                  style={{
                    fontFamily: "GeneralSansRegular",
                    fontSize: 14,
                    color: "#1a6363",
                  }}
                >
                  Home
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Sermons")}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <FontAwesome6 color="#bd7925" name="book-bible" size={25} />
                <Text
                  style={{
                    fontFamily: "GeneralSansRegular",
                    fontSize: 14,
                    color: "#bd7925",
                  }}
                >
                  Sermons
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ justifyContent: "center", alignItems: "center" }}
                onPress={() => navigation.navigate("Contributions")}
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
                <FontAwesome6 color="#1a6363" name="building-user" size={25} />
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
    marginTop: 20,
  },
  imgLogo: {
    width: "100%",
    height: 35,
    borderRadius: 22.5,
    alignSelf: "center",
    resizeMode: "cover",
  },
  imgYouTube: {
    width: "100%",
    height: 60,
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
});

export default Sermons;
