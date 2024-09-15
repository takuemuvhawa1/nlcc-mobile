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
  Keyboard,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiData = [
  {
    id: "1",
    name: "Growing strong in faith",
    description:
      "This is a ministry for laddies of all ages from adult and above and we discuss all matters...",
    admin: "Christabel Mwanza",
    adminphone: "+263778476",
    joined: true,
  },
  {
    id: "2",
    name: "Biblical parenting morals",
    description:
      "This is a ministry for man of all ages from adult and above and we discuss all matters...",
    admin: "Jonnah Kavaza",
    adminphone: "+263778476",
    joined: false,
  },
  {
    id: "3",
    name: "Giving and contributions as a christian",
    description:
      "This is a ministry for kids and we discuss all matters that affect them biblically assisting to mould...",
    admin: "Chris Chibwe",
    adminphone: "+263778476",
    joined: false,
  },
  {
    id: "4",
    name: "Church projects",
    description:
      "This is a ministry for all age grups from adult and above and we discuss all matters...",
    admin: "Abigail Kurai",
    adminphone: "+263778476",
    joined: true,
  },
];

const Forums = ({ navigation }) => {
  const [data, setData] = useState([]);

  const SingleItem = ({ id, name, description, admin, adminphone, joined }) => (
    <TouchableOpacity style={{ marginTop: 10 }}>
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
            {name}
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
      description={item.description}
      admin={item.admin}
      adminphone={item.adminphone}
      joined={item.joined}
    />
  );

  useEffect(() => {
    const asyncFetch = () => {
      setData(apiData);
    };
    asyncFetch();
  }, []);

  return (
    <View>
      {data && (
        <FlatList
          vertical
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ width: 7 }} />}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Forums;
