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
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiData = [
  {
    id: "1",
    type: "Easter Monday",
    theme: "The death of Jesus",
    description: "Easter Monday is the second day of Eastertide and a public holiday in some countries. In Western Christianity it marks the second day of the Octave of Easter; in Eastern Christianity it marks the second day of Bright Week",
    date: "12/12/2000",
    time: "12:34 Pm",
    enddate: "14/12/2000",
    endtime: "14:00 Pm",
  },
  {
    id: "2",
    type: "Church Service",
    theme: "The power of giving",
    description: "When you give to someone else, it can create a sense of connection and gratitude that can improve your relationship and bring you closer together. Giving to others doesn't have to be about spending money or buying someone a super expensive gift, there are plenty of free acts of kindness and giving you can do.",
    date: "12/12/2000",
    time: "12:34 Pm",
    enddate: null,
    endtime: "14:34 Pm",
  },
  {
    id: "3",
    type: "Harare Gardens Miracles",
    theme: "Salvation through worship",
    description: "If you are sick and afflicted, you must know that God's love heals; and you can be healed right now. He sent his word, and healed them (Psalm 107:20). He is ...",
    date: "12/12/2000",
    time: "12:34 Pm",
    enddate: "16/12/2000",
    endtime: "14:00 Pm",
  },
  {
    id: "4",
    type: "Church Service",
    theme: "The power of giving",
    description: "When you give tithes and offerings, it helps your local church actively be the church by helping others. Giving encourages a grateful and generous spirit and can help steer us away from greed and discontent. Plus, I always say that being outrageously generous is the most fun you'll ever have with money!",
    date: "12/12/2000",
    time: "12:34 Pm",
    enddate: null,
    endtime: "13:34 Pm",
  },
];

const Calender = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const showEvent = async (id) => {
    let result = data.find((obj) => obj.id === id);
    console.log(id);
    await AsyncStorage.setItem("SelectedEvent", JSON.stringify(result));
    navigation.navigate("Event");
  };

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

export default Calender;
