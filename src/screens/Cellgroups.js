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
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import Apilink from "../constants/Links";

const Cellgroups = forwardRef((props, ref) =>  {

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
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(val.toLowerCase()) || item.location.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredData(filtered);
    },
  }));

  const SingleItem = ({ id, name, location,description, admin, adminphone, joined }) => (
    <TouchableOpacity
      style={{ marginTop: 10 }}
      onPress={() => showGroup(id)}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 60,
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
            {name} - {location}
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
            {joined == true ? "Joined" : "Not yet joined"}
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
      name={item.name}
      location={item.location}
      description={item.description}
      admin={item.admin}
      adminphone={item.adminphone}
      joined={item.joined}
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
      const userId = await AsyncStorage.getItem("UserID");

      let res = await fetch(`${apiLink}smallgroups/small-groups/${userId}`, {
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

export default Cellgroups;
