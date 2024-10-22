import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Apilink from "../constants/Links";
import moment from "moment";

const PrayerRequests = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [filtereddata, setFilteredData] = useState([]);

  useImperativeHandle(ref, () => ({
    getFilterValue(val) {
      console.log(val);
      const filtered = data.filter((item) =>
        item.requestnotes.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredData(filtered);
    },
  }));

  const SingleItem = ({ requestnotes, requestedon }) => (
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
      requestnotes={item.requestnotes}
      requestedon={item.requestedon}
    />
  );

  useEffect(() => {
    const asyncFetch = async () => {
      //Call API HERE
      const apiLink = Apilink.getLink();

      const asynctoken = await AsyncStorage.getItem("Tkn");
      const userId = await AsyncStorage.getItem("UserID");

      let res = await fetch(`${apiLink}prayer-req/${userId}`, {
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
