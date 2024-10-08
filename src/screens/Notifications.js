import React, { useState, useEffect, forwardRef,
  useImperativeHandle } from "react";
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
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Apilink from "../constants/Links";
import moment from 'moment';

const apiData = [
  {
    id: "1",
    header: "Easter Monday",
    content: "The death of Jesus",
    sender: "Taurai Shoko",
    date: "12/12/2000",
    time: "12:34 Pm",
  },
  {
    id: "2",
    header: "Church Service",
    content: "The power of giving",
    sender: "Taurai Shoko",
    date: "12/12/2000",
    time: "12:34 Pm",
  },
  {
    id: "3",
    header: "Harare Gardens Miracles",
    content: "The power of giving",
    sender: "Taurai Shoko",
    date: "12/12/2000",
    time: "12:34 Pm",
  },
];

const Notifications = forwardRef((props, ref) =>  {
  const [data, setData] = useState([]);
  const [filtereddata, setFilteredData] = useState([]);

  useImperativeHandle(ref, () => ({
    getFilterValue(val) {
      console.log(val);
      const filtered = data.filter((item) =>
        item.header.toLowerCase().includes(val.toLowerCase()) || item.content.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredData(filtered);
    },
    
  }));

  const SingleItem = ({ id, header, content, sender,date, time }) => (
    <TouchableOpacity style={{ marginTop: 10 }}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
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
            Subject: {header}
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
            Notice: {content}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "GeneralSansRegular",
              textAlign: "flex-start",
              color: "#bd7925",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            Sent On: { moment(date).format('DD-MM-YYYY')} {time}
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
      header={item.header}
      content={item.content}
      sender={item.sender}
      date={item.date}
      time={item.time}
    />
  );

  // useEffect(() => {
  //   const asyncFetch = () => {
  //     setData(apiData);
  //     setFilteredData(apiData);
  //   };
  //   asyncFetch();
  // }, []);
  useEffect(() => {
    const asyncFetch = async () => {
      //Call API HERE
      const apiLink = Apilink.getLink();

      const asynctoken = await AsyncStorage.getItem("Tkn");
      const userId = await AsyncStorage.getItem("UserID");

      let res = await fetch(`${apiLink}notifications`, {
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
    console.log("first");
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
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
});

export default Notifications;
