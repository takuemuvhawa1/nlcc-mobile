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
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import {
  FontAwesome6
} from "react-native-vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStatusBarBackgroundColor } from "expo-status-bar";

const Splash = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  useFocusEffect(
    React.useCallback(() => {
      const unloadScreen = () => {
        //console.log('SignIn');
        navigation.navigate('SignIn');
      };
      setTimeout(() => {
        unloadScreen();
      }, 5000);
    }, [navigation])
  );


  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#ffffff", "#303030"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar hidden={true} />
      <Image
        style={styles.imgLogo}
        source={require("../../assets/nlcc-logo-1.png")}
      />
      <Text style={styles.txtTagline}>NEW LIFE COVENANT CHURCH</Text>
      <View style={{width: '100%', flexDirection: 'row', marginTop: 105}}>
      <View style={{width: '50%'}}>

      </View>
      <View style={{width: '50%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <FontAwesome6
            name="church"
            size={25}
            style={{ color: "#ffffff", alignSelf: 'flex-end', marginRight: 60 }}
          />
      <Text style={styles.txtLowTagline}>A place to belong</Text>

      </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 20
  },
  imgLogo: {
    width: 300,
    height: 90,
    alignSelf: "center",
    resizeMode: "cover",
  },
  txtTagline: {
    fontSize: 20,
    fontFamily: 'PlayfairDisplayRegular',
    alignSelf: 'flex-end',
    color: '#FFFFFF',
    // color: '#1a6363',
    marginTop: 5,
    marginRight: 25
  },
  txtLowTagline: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplayRegular',
    alignSelf: 'flex-end',
    lineHeight: 30,
    color: '#FFFFFF',
    //color: '#1a6363',
    marginTop: 5,
    marginRight: 25
  },
});

export default Splash;
