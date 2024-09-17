import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

import {
  FontAwesome6,
  Octicons,
  Ionicons,
  AntDesign,
} from "react-native-vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiData = [
  {
    id: "1",
    name: "Kingdom Cathedral",
    amount: "25.00",
    date: "12-12-2000",
  },
  {
    id: "2",
    name: "Church Renovations",
    amount: "500.00",
    date: "12-12-2000",
  },
  {
    id: "3",
    name: "Special Offering",
    amount: "15.00",
    date: "12-12-2000",
  },
  {
    id: "4",
    name: "Kingdom Cathedral",
    amount: "25.00",
    date: "12-12-2000",
  },
  {
    id: "5",
    name: "Kingdom Cathedral",
    amount: "25.00",
    date: "12-12-2000",
  },
  {
    id: "6",
    name: "Church Renovations",
    amount: "500.00",
    date: "12-12-2000",
  },
  {
    id: "7",
    name: "Special Offering",
    amount: "15.00",
    date: "12-12-2000",
  },
  {
    id: "8",
    name: "Kingdom Cathedral",
    amount: "25.00",
    date: "12-12-2000",
  },
  {
    id: "9",
    name: "Kingdom Cathedral",
    amount: "25.00",
    date: "12-12-2000",
  },
  {
    id: "10",
    name: "Church Renovations",
    amount: "500.00",
    date: "12-12-2000",
  },
  {
    id: "11",
    name: "Special Offering",
    amount: "15.00",
    date: "12-12-2000",
  },
  {
    id: "12",
    name: "Kingdom Cathedral",
    amount: "25.00",
    date: "12-12-2000",
  },
];

const Contributions = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  const [data, setData] = useState([]);
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

  const SingleItem = ({ id, name, amount, date }) => (
    <TouchableOpacity style={{
          flexDirection: "row",
          width:'47%',
          height: 100,
          backgroundColor: "white",
          borderColor: "#1a636340",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 15,
          marginTop: 10
        }}
        
         onPress={() => showGroup(id)}>
      
        <View style={{ width: "80%" }}>
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
            ${amount}
          </Text>
        </View>

    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <SingleItem
      id={item.id}
      name={item.name}
      amount={item.amount}
      date={item.date}
    />
  );

  useEffect(() => {
    const asyncFetch = () => {
      setData(apiData);
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
            Contributions
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
                onChangeText={(text) => setSearchtext(text)}
                style={styles.inputTextInput}
                placeholder="Search contribution . . ."
              />
            </View>
          </View>
          <View style={{paddingBottom: 20, height: '94%'}}>
          {data && (
            <>
            <FlatList
              vertical
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              contentContainerStyle={{paddingBottom:100}} 
            />
            </>
          )}

          </View>
        </View>
      </View>
      <View style={styles.viewBottom}>
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
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <FontAwesome6
              color="#bd7925"
              name="money-check"
              size={25}
            />
            <Text
              style={{
                fontFamily: "GeneralSansRegular",
                fontSize: 14,
                color: "#bd7925",
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

export default Contributions;
