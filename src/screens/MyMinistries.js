import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Apilink from "../constants/Links";

const MyMinistries = ({props}) => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const showMinistry = async (id) => {
    let result = data.find((obj) => obj.id === id);
    console.log(id);
    console.log(result.admin);
    await AsyncStorage.setItem("SelectedMinistry", JSON.stringify(result));
    navigation.navigate("AdminMinistry");
  };
  const isFocused = useIsFocused();
  const SingleItem = ({
    id,
    name,
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
          height: 70,
          backgroundColor: "white",
          borderColor: "#1a636340",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 15,
        }}
      >
        <View style={{ width: "100%", flexDirection: "row" }}>
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
          </View>
          <View style={{ width: "30%" }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "GeneralSansRegular",
              alignSelf: "flex-end",
              color: "#000000",
              marginTop: 7,
            }}
          >
            {members} Members
          </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
              width: 140
            }}
          >
            {joinrequesting} Requesting To Join
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
              width: 140
            }}
          >
            {leaverequesting} Requesting To Leave
          </Text>
        </View>
      
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <SingleItem
      id={item.id}
      name={item.name}
      members={item.members}
      joinrequesting={item.joinrequesting}
      leaverequesting={item.leaverequesting}
    />
  );

  useEffect(() => {
    const asyncFetch = async () => {
      //Call API HERE
      const apiLink = Apilink.getLink();

      const asynctoken = await AsyncStorage.getItem("Tkn");
      const memberId = await AsyncStorage.getItem("UserID");

      let res = await fetch(
        `${apiLink}ministries/ministry-leaders/${memberId}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let responseJson = await res.json();

      let newValue = {};
      responseJson.map((item) => {
        newValue = {
          id: item.id,
          name: item.name,
          description: item.description,
          admin: item.admin,
          adminphone: item.adminphone,
          members: item.ToatlMembers,
          membersdata: item.members,
          joinrequesting: item.joinrequesting,
          requestingdata: item.requestingdata,
          leaverequesting: item.leaverequesting,
          leavingdata: item.leavingdata,
        };
        setData((data) => [...data, newValue]);
      });
    };

    if (isFocused) {
      setData([]);
      asyncFetch();
    }

   
  }, [props, isFocused]);

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
