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
  StatusBar,
  ScrollView,
  TextInput,
  FlatList,
  Keyboard,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Apilink from "../constants/Links";

const Calender = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [filtereddata, setFilteredData] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const showEvent = async (id) => {
    let result = data.find((obj) => obj.id === id);
    console.log(id);
    await AsyncStorage.setItem("SelectedEvent", JSON.stringify(result));
    navigation.navigate("Event");
  };

  useImperativeHandle(ref, () => ({
    getFilterValue(val) {
      console.log(val);
      const filtered = data.filter(
        (item) =>
          item.type.toLowerCase().includes(val.toLowerCase()) ||
          item.theme.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredData(filtered);
    },
  }));

  const SingleItem = ({ id, type, theme, date, time }) => (
    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => showEvent(id)}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 80,
          backgroundColor: "white",
          borderColor: "#1a636340",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 15,
        }}
      >
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
            {type}
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
            {theme}
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
            {date} {time}
          </Text>
        </View>
        <View style={{ width: "20%" }}>
          <MaterialIcons
            color="#000000"
            name="navigate-next"
            size={25}
            style={{ alignSelf: "flex-end", marginTop: 10 }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <SingleItem
      id={item.id}
      type={item.type}
      theme={item.theme}
      date={item.date}
      time={item.time}
    />
  );

  // useEffect(() => {
  //   const asyncFetch = () => {
  //     setData(apiData);
  //   };
  //   asyncFetch();
  // }, []);

  useEffect(() => {
    const asyncFetch = async () => {
      //Call API HERE
      const apiLink = Apilink.getLink();

      const asynctoken = await AsyncStorage.getItem("Tkn");

      let res = await fetch(`${apiLink}events-tasks`, {
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

export default Calender;
