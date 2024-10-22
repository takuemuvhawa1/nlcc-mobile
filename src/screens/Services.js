import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  Foundation,
  MaterialIcons
} from "react-native-vector-icons";
import { StatusBar } from "expo-status-bar";

const Services = ({ navigation }) => {

  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  useEffect(() => {
    const asyncFetch = () => {
      console.log("first");
    };
    asyncFetch();
  }, []);

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
      <StatusBar style="dark" translucent={true} hidden={false} />
      <View style={styles.viewTop}>
        <View
          style={{
            width: "70%",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontFamily: "GeneralSansRegular",
              fontSize: 22,
              lineHeight: 24,
              marginTop: 10
            }}
          >
            Services
          </Text>
        </View>
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
        
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
            width: "100%",
            marginTop: 30,
          }}
        >
          
        </View>
      </View>
      <View style={styles.viewBottom}>
        <View style={styles.viewInTabs}>
          <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons color="#1a6363" name="home" size={25} />
            <Text style={{ fontFamily: 'GeneralSansRegular', fontSize: 14, color: "#1a6363" }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons color="#bd7925" name="cart-outline" size={25} />
            <Text style={{ fontFamily: 'GeneralSansRegular', fontSize: 14, color: "#bd7925" }}>Services</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Contributions")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons
              color="#1a6363"
              name="chatbox-ellipses-outline"
              size={25}
            />
            <Text style={{ fontFamily: 'GeneralSansRegular', fontSize: 14, color: "#1a6363" }}>Contributions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Events")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <MaterialIcons color="#1a6363" name="support-agent" size={25} />
            <Text style={{ fontFamily: 'GeneralSansRegular', fontSize: 14, color: "#1a6363" }}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("More")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Foundation color="#1a6363" name="indent-more" size={25} />
            <Text style={{ fontFamily: 'GeneralSansRegular', fontSize: 14, color: "#1a6363" }}>More</Text>
          </TouchableOpacity>
        </View>
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
    width: '100%',
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
  viewBottom: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  viewInTabs: {
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: '#ffffff',
    paddingTop: 8,
    paddingBottom: 3,
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default Services;
