import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Apilink from "../constants/Links";

const Ministries = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [filtereddata, setFilteredData] = useState([]);
  const navigation = useNavigation();

  useImperativeHandle(ref, () => ({
    getFilterValue(val) {
      console.log(val);
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredData(filtered);

      // const filteredData = data.filter((item) => {
      //   const searchTextLowerCase = val.toLowerCase();
      //   return (
      //     item.name.toLowerCase().includes(searchTextLowerCase) ||
      //     item.description.includes(searchText)
      //   );
      // });

      // setFilteredData(filteredData);
    },
  }));

  const showMinistry = async (id) => {
    let result = data.find((obj) => obj.id === id);
    console.log(id);
    console.log(result.leaders);
    await AsyncStorage.setItem("SelectedMinistry", JSON.stringify(result));
    navigation.navigate("Ministry");
  };

  const SingleItem = ({ id, name, joined }) => (
    <TouchableOpacity
      style={{ marginTop: 10 }}
      onPress={() => showMinistry(id)}
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
      joined={item.joined}
    />
  );

  useEffect(() => {
    const asyncFetch = async () => {
      //Call API HERE
      const apiLink = Apilink.getLink();

      const asynctoken = await AsyncStorage.getItem("Tkn");
      const userId = await AsyncStorage.getItem("UserID");

      let res = await fetch(`${apiLink}ministries/ministry/${userId}`, {
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

export default Ministries;
