import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  Keyboard,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import Apilink from "../constants/Links";
import moment from "moment";

const jsonData = [
  {
    id: "1",
    requestnotes: "Got cheating husband",
    memberid: "10",
    membername: "Sekai",
    membersurname: "Chiramwiwa",
    requestedon: "12-12-2000 13:30",
  },
  {
    id: "2",
    requestnotes: "Got Sore Throat",
    memberid: "10",
    membername: "Sekai",
    membersurname: "Chiramwiwa",
    requestedon: "15-12-2000 13:30",
  },
];

const PrayerRequests = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [filtereddata, setFilteredData] = useState([]);
  const navigation = useNavigation();

  const showGroup = async (id) => {
    let result = data.find((obj) => obj.id === id);
    console.log(id);
    console.log(result.admin);
    await AsyncStorage.setItem("SelectedGroup", JSON.stringify(result));
    navigation.navigate("CellGroup");
  };

  const isFocused = useIsFocused();

  useImperativeHandle(ref, () => ({
    getFilterValue(val) {
      console.log(val);
      const filtered = data.filter(
        (item) =>
          item.name.toLowerCase().includes(val.toLowerCase()) ||
          item.surname.toLowerCase().includes(val.toLowerCase()) ||
          item.requestnotes.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredData(filtered);
    },
  }));

  const SingleItem = ({
    id,
    requestnotes,
    memberid,
    membername,
    membersurname,
    requestedon,
  }) => (
    <TouchableOpacity style={{ marginTop: 10 }}>
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          backgroundColor: "white",
          borderColor: "#1a636340",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "GeneralSansMedium",
              textAlign: "flex-start",
              color: "#000000",
              marginTop: 10,
            }}
          >
            {membername} {membersurname}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "GeneralSansMedium",
              textAlign: "flex-end",
              color: "#000000",
              marginTop: 10,
            }}
          >
            {moment(requestedon).format("DD-MMM-YYYY")}
          </Text>
        </View>
        <View style={{ width: "100%" }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "GeneralSansRegular",
              textAlign: "flex-start",
              color: "#000000",
              marginTop: 7,
              marginBottom: 10,
            }}
          >
            {requestnotes}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <SingleItem
      id={item.id}
      requestnotes={item.requestnotes}
      memberid={item.MemberID}
      membername={item.name}
      membersurname={item.surname}
      requestedon={item.requestedon}
    />
  );

  // useEffect(() => {
  //   const asyncFetch = () => {
  //     setData(jsonData);
  //   };
  //   asyncFetch();
  // }, []);

  useEffect(() => {
    const asyncFetch = async () => {
      //Call API HERE
      const apiLink = Apilink.getLink();

      const asynctoken = await AsyncStorage.getItem("Tkn");
      const userId = await AsyncStorage.getItem("UserID");

      let res = await fetch(`${apiLink}prayer-req`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let responseJson = await res.json();
      setData(responseJson);
      setFilteredData(responseJson);
    };

    asyncFetch();
  }, []);

  return (
    <View>
      {filtereddata && (
        <FlatList
          vertical
          data={filtereddata}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ width: 7 }} />}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
});

export default PrayerRequests;
