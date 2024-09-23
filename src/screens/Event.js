import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome, Ionicons } from "react-native-vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';

const Event = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  const [record, setRecord] = React.useState({
    id: "",
    type: "",
    theme: "",
    description: "",
    date: "",
    time: "",
    enddate: null,
    endtime: null,
    volunteertasks: [],
  });

  const [isactive, setIsactive] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alerttext, setAlerttext] = React.useState("");
  const [alerttitle, setAlerttitle] = React.useState("");

  const isFocused = useIsFocused();

  const doAlert = (txt, ttl) => {
    setShowAlert(!showAlert);
    setAlerttext(txt);
    setAlerttitle(ttl);
  };

  const OneTask = ({ id, task, requirements }) => (
    <View
      style={{
        marginTop: 10,
        backgroundColor: "#1a636320",
        width: '49%',
        height: 40, 
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10
      }}
    >
    <Text
      style={{
        fontFamily: "GeneralSansMedium",
        fontSize: 18,
        color: "#1a6363",
      }}
    >
      {task}
    </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <OneTask id={item.id} task={item.task} requirements={item.requirements} />
  );

  useEffect(() => {
    const findFormData = async () => {
      try {
        const slctdObj = await AsyncStorage.getItem("SelectedEvent");
        const eventObj = JSON.parse(slctdObj);

        if (eventObj) {
          setRecord({
            id: eventObj.id,
            type: eventObj.type,
            theme: eventObj.theme,
            description: eventObj.description,
            date: eventObj.date,
            time: eventObj.time,
            enddate: eventObj.enddate,
            endtime: eventObj.endtime,
            volunteertasks: eventObj.volunteertasks,
          });

          console.log("Ministry data found");
        } else {
          console.log("No ministry data found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isFocused) {
      findFormData();
    }
  }, [props, isFocused]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#30303030", "#ffffff", "#30303050"]}
      style={styles.container}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <AwesomeAlert
        show={showAlert}
        contentContainerStyle={{ width: 307 }}
        showProgress={false}
        title={alerttitle}
        message={alerttext}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#F47920"
        onCancelPressed={() => {
          console.log("cancelled");
          setShowAlert(false);
          setAlerttext("");
          setAlerttitle("");
        }}
        onConfirmPressed={() => {
          console.log("closed");
          setShowAlert(false);
          setAlerttext("");
          setAlerttitle("");
        }}
      />
      <View style={styles.viewTop}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            width: "70%",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Ionicons color="#000000" name="chevron-back" size={25} />
        </TouchableOpacity>
        <View
          style={{
            width: "30%",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Image
            style={styles.imgLogo}
            source={require("../../assets/nlcc-logo-1.png")}
          />
        </View>
      </View>
      <View style={styles.viewMiddle}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            borderColor: "#1a6363",
            borderWidth: 0.5,
            height: 60,
            borderRadius: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "98.5%",
              backgroundColor: "#1a6363",
              borderWidth: 0.5,
              height: 52,
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingTop: 15,
            }}
          >
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#ffffff",
              }}
            >
              {record.type}
            </Text>
            <FontAwesome
              name="calendar"
              size={20}
              style={{ marginRight: 5, color: "#ffffff" }}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "GeneralSansMedium",
            fontSize: 18,
            color: "#000000",
            marginTop: 30,
            alignSelf: "center",
            textAlign: "justify",
          }}
        >
          Theme: {record.theme}
        </Text>
        <Text
          style={{
            fontFamily: "GeneralSansMedium",
            fontSize: 18,
            color: "#000000",
            marginTop: 20,
            marginBottom: 30,
            textAlign: "justify",
          }}
        >
          {record.description}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
            borderBottomColor: "#1a636350",
            borderBottomWidth: 0.5,
            borderTopColor: "#1a636350",
            borderTopWidth: 0.5,
            paddingBottom: 15,
          }}
        >
          <View style={{ width: "40%" }}>
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#000000",
                marginTop: 15,
              }}
            >
              Start Time
            </Text>
          </View>
          <View style={{ width: "60%", flexDirection: "column" }}>
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#1a6363",
                marginTop: 15,
                alignSelf: "flex-end",
              }}
            >
              { moment(record.date).format('DD-MM-YYYY')} {record.time.slice(0, -3)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
            borderBottomColor: "#1a636350",
            borderBottomWidth: 0.5,
            borderTopColor: "#1a636350",
            borderTopWidth: 0.5,
            paddingBottom: 15,
          }}
        >
          <View style={{ width: "40%" }}>
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#000000",
                marginTop: 15,
              }}
            >
              End Time
            </Text>
          </View>
          <View style={{ width: "60%", flexDirection: "column" }}>
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                color: "#1a6363",
                marginTop: 20,
                alignSelf: "flex-end",
              }}
            >
              { moment(record.enddate).format('DD-MM-YYYY')} {record.endtime.slice(0, -3)}
            </Text>
          </View>
        </View>

        {record.volunteertasks.length > 0 && (
          <>
            <View
              style={{
                width: "100%",
                borderTopColor: "#1a636350",
                borderTopWidth: 0.5,
                paddingBottom: 15,
              }}
            >
              <View style={{ width: "40%" }}>
                <Text
                  style={{
                    fontFamily: "GeneralSansMedium",
                    fontSize: 18,
                    color: "#000000",
                    marginTop: 15,
                  }}
                >
                  Volunteer Tasks
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: "30%",
                paddingBottom: 15,
              }}
            >
              <FlatList
                vertical
                numColumns={2}
                data={record.volunteertasks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  viewTop: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  imgLogo: {
    width: "100%",
    height: 35,
    borderRadius: 22.5,
    alignSelf: "center",
    resizeMode: "cover",
  },
  viewMiddle: {
    flex: 8,
    flexDirection: "column",
    width: "100%",
    marginTop: 10,
  },
});

export default Event;
