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
import { useNavigation } from "@react-navigation/native";

const apiData = [
  {
    id: "1",
    name: "Ladies Ministry",
    description:
      "This is a ministry for laddies of all ages from adult and above and we discuss all matters...",
    admin: "Christabel Mwanza",
    adminphone: "+263778476234",
    members: 30,
    joinrequesting: 4,
    leaverequesting: 1,
  },
  {
    id: "2",
    name: "Mens Ministry",
    description:
      "This is a ministry for man of all ages from adult and above and we discuss all matters...",
    admin: "Jonnah Kavaza",
    adminphone: "+263778476654",
    members: 30,
    joinrequesting: 4,
    leaverequesting: 1,
  },
  {
    id: "3",
    name: "Covenant Kids Ministry",
    description:
      "This is a ministry for kids and we discuss all matters that affect them biblically assisting to mould...",
    admin: "Chris Chibwe",
    adminphone: "+263778476122",
    members: 30,
    joinrequesting: 4,
    leaverequesting: 1,
  },
  {
    id: "4",
    name: "Covenant Care Ministry",
    description:
      "This is a ministry for all age grups from adult and above and we discuss all matters...",
    admin: "Abigail Kurai",
    adminphone: "+263778476000",
    members: 30,
    joinrequesting: 4,
    leaverequesting: 1,
  },
  {
    id: "5",
    name: "Ladies Ministry",
    description:
      "This is a ministry for laddies of all ages from adult and above and we discuss all matters...",
    admin: "Christabel Mwanza",
    adminphone: "+263778476234",
    members: 30,
    joinrequesting: 4,
    leaverequesting: 1,
  },
  {
    id: "6",
    name: "Mens Ministry",
    description:
      "This is a ministry for man of all ages from adult and above and we discuss all matters...",
    admin: "Jonnah Kavaza",
    adminphone: "+263778476654",
    members: 30,
    joinrequesting: 4,
    leaverequesting: 1,
  },
  {
    id: "7",
    name: "Covenant Kids Ministry",
    description:
      "This is a ministry for kids and we discuss all matters that affect them biblically assisting to mould...",
    admin: "Chris Chibwe",
    adminphone: "+263778476122",
    members: 30,
    joinrequesting: 4,
    leaverequesting: 1,
  },
  {
    id: "8",
    name: "Covenant Care Ministry",
    description:
      "This is a ministry for all age grups from adult and above and we discuss all matters...",
    admin: "Abigail Kurai",
    adminphone: "+263778476000",
    members: 30,
    joinrequesting: 4,
    leaverequesting: 1,
  },
];

const MyMinistries = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const showMinistry = async (id) => {
    let result = data.find((obj) => obj.id === id);
    console.log(id);
    console.log(result.admin);
    await AsyncStorage.setItem("SelectedMinistry", JSON.stringify(result));
    navigation.navigate("AdminMinistry");
  };

  const SingleItem = ({
    id,
    name,
    description,
    admin,
    adminphone,
    members,
    joinrequesting,
    leaverequesting,
  }) => (
    <TouchableOpacity
      style={{ marginTop: 10 }}
      onPress={() => showMinistry(id)}
    >
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          height: 80,
          backgroundColor: "white",
          borderColor: "#1a636340",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 15,
        }}
      >
        <View style={{ width: "100%", flexDirection: "row" }}>
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "GeneralSansRegular",
              textAlign: "flex-start",
              color: "#000000",
              marginTop: 7,
            }}
          >
            {members} Members
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "GeneralSansRegular",
              textAlign: "flex-start",
              color: "#000000",
              backgroundColor: "#1a636320",
              padding: 5,
              borderRadius: 6,
              marginTop: 7,
            }}
          >
            {joinrequesting} Requesting To Join
          </Text>
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
      members={item.members}
      joinrequesting={item.joinrequesting}
      leaverequesting={item.leaverequesting}
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

export default MyMinistries;
