import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import {
  FontAwesome5,
  AntDesign,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "react-native-vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import Apilink from "../constants/Links";
import RNPickerSelect from "react-native-picker-select";

const EmailRegister = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  const [hidepin, setHidepin] = React.useState(true);
  const [inputs, setInputs] = React.useState({
    registerwith: "Email",
    name: "",
    surname: "",
    phone: "",
    email: "",
    gender: "",
    address: "",
    country: "",
  });

  const [drooped, setDrooped] = React.useState(false);
  const [isactive, setIsactive] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alerttext, setAlerttext] = React.useState("");
  const [alerttitle, setAlerttitle] = React.useState("");

  const doAlert = (txt, ttl) => {
    setShowAlert(!showAlert);
    setAlerttext(txt);
    setAlerttitle(ttl);
  };

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const dropDown = () => {
    setDrooped(!drooped);
    console.log("first");
  };

  const maleSelected = () => {
    setDrooped(!drooped);
    setInputs({ ...inputs, gender: "Male" });
  };

  const femaleSelected = () => {
    setDrooped(!drooped);
    setInputs({ ...inputs, gender: "Female" });
  };

  const handleProceed = async () => {
    if (inputs.name == "") {
      doAlert("Fill in your name(s) before you proceed", "Submission Error");
      return;
    }
    if (inputs.surname == "") {
      doAlert("Fill in your surname before you proceed", "Submission Error");
      return;
    }
    if (inputs.email == "") {
      doAlert("Fill in your email before you proceed", "Submission Error");
      return;
    }
    if (inputs.gender == "") {
      doAlert("Select your gender before you proceed", "Submission Error");
      return;
    }
    if (inputs.country == "") {
      doAlert("Select your country before you proceed", "Submission Error");
      return;
    }

    setIsactive(true);

    const apiLink = Apilink.getLink();

    const userObj = {
      registerwith: "Email",
      name: inputs.name,
      surname: inputs.surname,
      phone: inputs.phone,
      email: inputs.email == "" ? null : inputs.email,
      gender: inputs.gender == "Male" ? "M" : "F",
      address: null,
      country: inputs.country,
    };

    console.log(userObj);

    let signinresponse = await fetch(`${apiLink}onboarding/member`, {
      method: "post",
      body: JSON.stringify(userObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resJson = await signinresponse.json();

    console.log(resJson);

    if (resJson.message == "Member added successfully") {
      
      setIsactive(false);
      await AsyncStorage.setItem("TypedEmail", inputs.email);
      await AsyncStorage.setItem("ReceivedOTP", resJson.randNum);
      await AsyncStorage.setItem(
        "ReceivedName",
        inputs.name + " " + inputs.surname
      );
      setInputs({
        email: "",
        name: "",
        surname: "",
        phone: "",
        email: "",
        gender: "",
        address: "",
        country: ""
      });
      navigation.navigate("SetPassword");
      return;
    }
    if (resJson.message == "User already registered") {
      
      setIsactive(false);
        doAlert("Proceeding failed. User is registered already", "Submission Error");
        return;
    }
  };

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
      <StatusBar style="dark" translucent={true} hidden={false} />
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
        confirmButtonColor="#1a6363"
        confirmButtonStyle={{ width: "40%", alignItems: "center" }}
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
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginTop: 33,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={{ width: "50%" }}
        >
          <Ionicons name="chevron-back" size={25} style={styles.icoInputIcon} />
        </TouchableOpacity>
        <View style={{ width: "50%" }}>
          <Image
            style={styles.imgLogo}
            source={require("../../assets/nlcc-logo-1.png")}
          />
        </View>
      </View>
      {/* <Text style={styles.txtTagline}>NEW LIFE COVENANT CHURCH</Text> */}
      <Text style={styles.txtFormName}>Email Registration</Text>

      <Text style={styles.txtFormInstruction}>
        Welcome to NLCC. Its good to have you here. Lets get starrted. Fill in
        your details and click Register button
      </Text>

      <View style={styles.viewInputs}>
        <View style={styles.viewInput}>
          <View style={styles.viewIcon}>
            <AntDesign name="user" size={25} style={styles.icoInputIcon} />
          </View>
          <View style={styles.viewTextInput}>
            <TextInput
              autoCorrect={false}
              value={inputs.name}
              onChangeText={(text) => setInputs({ ...inputs, name: text })}
              style={styles.inputTextInput}
              placeholder="First name(s)"
            />
          </View>
        </View>
      </View>
      <View style={styles.viewInputs}>
        <View style={styles.viewInput}>
          <View style={styles.viewIcon}>
            <AntDesign name="user" size={25} style={styles.icoInputIcon} />
          </View>
          <View style={styles.viewTextInput}>
            <TextInput
              autoCorrect={false}
              value={inputs.surname}
              onChangeText={(text) => setInputs({ ...inputs, surname: text })}
              style={styles.inputTextInput}
              placeholder="Surname"
            />
          </View>
        </View>
      </View>
      <View style={styles.viewInputs}>
        <View style={styles.viewInput}>
          <View style={styles.viewIcon}>
            <MaterialCommunityIcons
              name="gender-male-female"
              size={25}
              style={styles.icoInputIcon}
            />
          </View>
          <TouchableOpacity
            onPress={() => dropDown()}
            style={styles.viewGenderInput}
          >
            <Text
              style={
                inputs.gender == ""
                  ? {
                      color: "#00000060",
                      fontSize: 16,
                      fontFamily: "GeneralSansMedium",
                    }
                  : {
                      color: "#ffffff",
                      fontSize: 16,
                      fontFamily: "GeneralSansMedium",
                    }
              }
            >
              {inputs.gender == "" ? "Gender" : inputs.gender}
            </Text>
          </TouchableOpacity>
          <View style={styles.viewGenderArrow}>
            {drooped == false && (
              <>
                <MaterialIcons
                  name="arrow-drop-down"
                  size={26}
                  style={{ color: "#00000090" }}
                />
              </>
            )}
            {drooped == true && (
              <>
                <MaterialIcons
                  name="arrow-drop-up"
                  size={26}
                  style={{ color: "#00000090" }}
                />
              </>
            )}
          </View>
        </View>
      </View>
      {drooped == true && (
        <>
          <TouchableOpacity
            onPress={() => maleSelected()}
            style={styles.viewInputs}
          >
            <View style={styles.viewGenders}>
              <View style={styles.viewIcon}>
                <MaterialCommunityIcons
                  name="gender-male"
                  size={22}
                  style={styles.icoInputIcon}
                />
              </View>
              <View style={styles.viewTextInput}>
                <Text
                  style={{
                    color: "#00000060",
                    fontSize: 16,
                    fontFamily: "GeneralSansMedium",
                    alignSelf: "flex-start",
                  }}
                >
                  Male
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => femaleSelected()}
            style={styles.viewInputs}
          >
            <View style={styles.viewGenders}>
              <View style={styles.viewIcon}>
                <MaterialCommunityIcons
                  name="gender-female"
                  size={22}
                  style={styles.icoInputIcon}
                />
              </View>
              <View style={styles.viewTextInput}>
                <Text
                  style={{
                    color: "#00000060",
                    fontSize: 16,
                    fontFamily: "GeneralSansMedium",
                    alignSelf: "flex-start",
                  }}
                >
                  Female
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </>
      )}
      <View style={styles.viewInputs}>
        <View style={styles.viewInput}>
          <View style={styles.viewIcon}>
            <MaterialIcons
              name="alternate-email"
              size={25}
              style={styles.icoInputIcon}
            />
          </View>
          <View style={styles.viewTextInput}>
            <TextInput
              autoCorrect={false}
              value={inputs.email}
              onChangeText={(text) => setInputs({ ...inputs, email: text })}
              style={styles.inputTextInput}
              placeholder="Email address"
            />
          </View>
        </View>
      </View>
      <View style={styles.viewInputs}>
        <View style={styles.viewInput}>
          <View style={styles.viewIcon}>
            <Feather name="smartphone" size={25} style={styles.icoInputIcon} />
          </View>
          <View style={styles.viewTextInput}>
            <TextInput
              autoCorrect={false}
              value={inputs.phone}
              onChangeText={(text) => setInputs({ ...inputs, phone: text })}
              style={styles.inputTextInput}
              placeholder="Mobile number (optional)"
            />
          </View>
        </View>
      </View>
      <View style={styles.viewInputs}>
        <View style={styles.viewInput}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              width: "11%",
            }}
          >
            <FontAwesome5
              name="globe-africa"
              size={25}
              style={{ color: "#00000050" }}
            />
          </View>
          <View style={styles.viewPickerInput}>
            <RNPickerSelect
              onValueChange={(text) => setInputs({ ...inputs, country: text })}
              placeholder={{
                label: "Country",
                value: null,
              }}
              style={{
                placeholder: { color: "#00000085" },
                inputIOS: { color: "#ffffff" },
                inputAndroid: {
                  color: "#ffffff",
                  fontFamily: "GeneralSansMedium",
                  fontSize: 16,
                },
              }}
              items={[
                { value: "Afghanistan", label: "Afghanistan", key: "1" },
                {
                  value: "Aland Islands",
                  label: "Aland Islands",
                  key: "2",
                },
                { value: "Albania", label: "Albania", key: "3" },
                { value: "Algeria", label: "Algeria", key: "4" },
                {
                  value: "American Samoa",
                  label: "American Samoa",
                  key: "5",
                },
                { value: "AndorrA", label: "AndorrA", key: "6" },
                { value: "Angola", label: "Angola", key: "7" },
                { value: "Anguilla", label: "Anguilla", key: "8" },
                { value: "Antarctica", label: "Antarctica", key: "9" },
                {
                  value: "Antigua and Barbuda",
                  label: "Antigua and Barbuda",
                  key: "10",
                },
                { value: "Argentina", label: "Argentina", key: "11" },
                { value: "Armenia", label: "Armenia", key: "12" },
                { value: "Aruba", label: "Aruba", key: "13" },
                { value: "Australia", label: "Australia", key: "14" },
                { value: "Austria", label: "Austria", key: "15" },
                { value: "Azerbaijan", label: "Azerbaijan", key: "16" },
                { value: "Bahamas", label: "Bahamas", key: "17" },
                { value: "Bahrain", label: "Bahrain", key: "18" },
                { value: "Bangladesh", label: "Bangladesh", key: "19" },
                { value: "Barbados", label: "Barbados", key: "20" },
                { value: "Belarus", label: "Belarus", key: "21" },
                { value: "Belgium", label: "Belgium", key: "22" },
                { value: "Belize", label: "Belize", key: "23" },
                { value: "Benin", label: "Benin", key: "24" },
                { value: "Bermuda", label: "Bermuda", key: "25" },
                { value: "Bhutan", label: "Bhutan", key: "26" },
                { value: "Bolivia", label: "Bolivia", key: "27" },
                {
                  value: "Bosnia and Herzegovina",
                  label: "Bosnia and Herzegovina",
                  key: "28",
                },
                { value: "Botswana", label: "Botswana", key: "29" },
                {
                  value: "Bouvet Island",
                  label: "ouvet Island",
                  key: "30",
                },
                { value: "Brazil", label: "Brazil", key: "31" },
                {
                  value: "British Indian Ocean Territory",
                  label: "British Indian Ocean Territory",
                  key: "32",
                },
                {
                  value: "Brunei Darussalam",
                  label: "Brunei Darussalam",
                  key: "33",
                },
                { value: "Bulgaria", label: "Bulgaria", key: "34" },
                { value: "Burkina Faso", label: "Burkina Faso", key: "35" },
                { value: "Burundi", label: "Burundi", key: "36" },
                { value: "Cambodia", label: "Cambodia", key: "37" },
                { value: "Cameroon", label: "Cameroon", key: "38" },
                { value: "Canada", label: "Canada", key: "39" },
                { value: "Cape Verde", label: "Cape Verde", key: "40" },
                {
                  value: "Cayman Islands",
                  label: "Cayman Islands",
                  key: "41",
                },
                {
                  value: "Central African Republic",
                  label: "Central African Republic",
                  key: "42",
                },
                { value: "Chad", label: "TChadD", key: "43" },
                { value: "Chile", label: "Chile", key: "44" },
                { value: "China", label: "China", key: "45" },
                {
                  value: "Christmas Island",
                  label: "Christmas Island",
                  key: "46",
                },
                {
                  value: "Cocos (Keeling) Islands",
                  label: "Cocos (Keeling) Islands",
                  key: "47",
                },
                { value: "Colombia", label: "Colombia", key: "48" },
                { value: "Comoros", label: "Comoros", key: "49" },
                { value: "Congo", label: "Congo", key: "50" },
                {
                  value: "The Democratic Republic of Congo",
                  label: "The Democratic Republic of Congo",
                  key: "51",
                },
                { value: "Cook Islands", label: "Cook Islands", key: "52" },
                { value: "Costa Rica", label: "Costa Rica", key: "53" },
                { value: "Croatia", label: "Croatia", key: "54" },
                { value: "Cuba", label: "Cuba", key: "55" },
                { value: "Cyprus", label: "Cyprus", key: "56" },
                {
                  value: "Czech Republic",
                  label: "Czech Republic",
                  key: "57",
                },
                { value: "Denmark", label: "Denmark", key: "58" },
                { value: "Djibouti", label: "Djibouti", key: "59" },
                { value: "Dominica", label: "Dominica", key: "60" },
                {
                  value: "Dominican Republic",
                  label: "Dominican Republic",
                  key: "61",
                },
                { value: "Ecuador", label: "Ecuador", key: "62" },
                { value: "Egypt", label: "Egypt", key: "63" },
                { value: "El Salvador", label: "El Salvador", key: "64" },
                {
                  value: "Equatorial Guinea",
                  label: "Equatorial Guinea",
                  key: "65",
                },
                { value: "Eritrea", label: "Eritrea", key: "66" },
                { value: "Estonia", label: "Estonia", key: "67" },
                { value: "Ethiopia", label: "Ethiopia", key: "68" },
                {
                  value: "Falkland Islands (Malvinas)",
                  label: "Falkland Islands (Malvinas)",
                  key: "69",
                },
                {
                  value: "Faroe Islands",
                  label: "Faroe Islands",
                  key: "70",
                },
                { value: "Fiji", label: "Fiji", key: "71" },
                { value: "Finland", label: "Finland", key: "72" },
                { value: "France", label: "France", key: "73" },
                {
                  value: "French Guiana",
                  label: "French Guiana",
                  key: "74",
                },
                {
                  value: "French Polynesia",
                  label: "French Polynesia",
                  key: "75",
                },
                {
                  value: "French Southern Territories",
                  label: "French Southern Territories",
                  key: "76",
                },
                { value: "Gabon", label: "Gabon", key: "77" },
                { value: "Gambia", label: "Gambia", key: "78" },
                { value: "Georgia", label: "Georgia", key: "79" },
                { value: "Germany", label: "Germany", key: "80" },
                { value: "Ghana", label: "Ghana", key: "81" },
                { value: "Gibraltar", label: "Gibraltar", key: "82" },
                { value: "Greece", label: "Greece", key: "83" },
                { value: "Greenland", label: "Greenland", key: "84" },
                { value: "Grenada", label: "Grenada", key: "85" },
                { value: "Guadeloupe", label: "Guadeloupe", key: "86" },
                { value: "Guam", label: "Guam", key: "87" },
                { value: "Guatemala", label: "Guatemala", key: "88" },
                { value: "Guernsey", label: "Guernsey", key: "89" },
                { value: "Guinea", label: "Guinea", key: "90" },
                {
                  value: "Guinea-Bissau",
                  label: "Guinea-Bissau",
                  key: "91",
                },
                { value: "Guyana", label: "Guyana", key: "92" },
                { value: "Haiti", label: "Haiti", key: "93" },
                {
                  value: "Heard Island and Mcdonald Islands",
                  label: "Heard Island and Mcdonald Islands",
                  key: "94",
                },
                {
                  value: "Holy See (Vatican City State)",
                  label: "Holy See (Vatican City State)",
                  key: "95",
                },
                { value: "Honduras", label: "Honduras", key: "96" },
                { value: "Hong Kong", label: "Hong Kong", key: "97" },
                { value: "Hungary", label: "Hungary", key: "98" },
                { value: "Iceland", label: "Iceland", key: "99" },
                { value: "India", label: "India", key: "100" },
                { value: "Indonesia", label: "Indonesia", key: "101" },
                {
                  value: "Islamic Republic Of Iran",
                  label: "Islamic Republic Of Iran",
                  key: "102",
                },
                { value: "Iraq", label: "Iraq", key: "104" },
                { value: "Ireland", label: "Ireland", key: "105" },
                { value: "Isle of Man", label: "Isle of Man", key: "106" },
                { value: "Israel", label: "Israel", key: "107" },
                { value: "Italy", label: "Italy", key: "108" },
                { value: "Jamaica", label: "Jamaica", key: "109" },
                { value: "Japan", label: "Japan", key: "110" },
                { value: "Jersey", label: "Jersey", key: "111" },
                { value: "Jordan", label: "Jordan", key: "112" },
                { value: "Kazakhstan", label: "Kazakhstan", key: "113" },
                { value: "Kenya", label: "Kenya", key: "114" },
                { value: "Kiribati", label: "Kiribati", key: "115" },
                {
                  value: "Republic of Korea",
                  label: "Republic of Korea",
                  key: "116",
                },
                { value: "Kuwait", label: "Kuwait", key: "117" },
                { value: "Kyrgyzstan", label: "Kyrgyzstan", key: "118" },
                { value: "Latvia", label: "Latvia", key: "119" },
                { value: "Lebanon", label: "Lebanon", key: "120" },
                { value: "Lesotho", label: "Lesotho", key: "121" },
                { value: "Liberia", label: "Liberia", key: "122" },
                {
                  value: "Libyan Arab Jamahiriya",
                  label: "Libyan Arab Jamahiriya",
                  key: "123",
                },
                {
                  value: "Liechtenstein",
                  label: "Liechtenstein",
                  key: "124",
                },
                { value: "Lithuania", label: "Lithuania", key: "125" },
                { value: "Luxembourg", label: "Luxembourg", key: "126" },
                { value: "Macao", label: "Macao", key: "127" },
                {
                  value: "North Macedonia",
                  label: "North Macedonia",
                  key: "128",
                },
                { value: "Madagascar", label: "Madagascar", key: "129" },
                { value: "Malawi", label: "Malawi", key: "130" },
                { value: "Malaysia", label: "Malaysia", key: "131" },
                { value: "Maldives", label: "Maldives", key: "132" },
                { value: "Mali", label: "Mali", key: "133" },
                { value: "Malta", label: "Malta", key: "134" },
                {
                  value: "Marshall Islands",
                  label: "Marshall Islands",
                  key: "135",
                },
                { value: "Martinique", label: "Martinique", key: "136" },
                { value: "Mauritania", label: "Mauritania", key: "137" },
                { value: "Mauritius", label: "Mauritius", key: "138" },
                { value: "Mayotte", label: "Mayotte", key: "139" },
                { value: "Mexico", label: "Mexico", key: "140" },
                {
                  value: "Federated States of Micronesia",
                  label: "Federated States of Micronesia",
                  key: "141",
                },
                {
                  value: "Republic of Moldova",
                  label: "Republic of Moldova",
                  key: "142",
                },
                { value: "Monaco", label: "Monaco", key: "143" },
                { value: "Mongolia", label: "Mongolia", key: "144" },
                { value: "Montserrat", label: "Montserrat", key: "145" },
                { value: "Morocco", label: "Morocco", key: "146" },
                { value: "Mozambique", label: "Mozambique", key: "147" },
                { value: "Myanmar", label: "Myanmar", key: "148" },
                { value: "Namibia", label: "Namibia", key: "149" },
                { value: "Nauru", label: "Nauru", key: "150" },
                { value: "Nepal", label: "Nepal", key: "151" },
                { value: "Netherlands", label: "Netherlands", key: "152" },
                {
                  value: "Netherlands Antilles",
                  label: "Netherlands Antilles",
                  key: "153",
                },
                {
                  value: "New Caledonia",
                  label: "New Caledonia",
                  key: "154",
                },
                { value: "New Zealand", label: "New Zealand", key: "155" },
                { value: "Nicaragua", label: "Nicaragua", key: "156" },
                { value: "Niger", label: "Niger", key: "157" },
                { value: "Nigeria", label: "Nigeria", key: "158" },
                { value: "Niue", label: "Niue", key: "159" },
                {
                  value: "Norfolk Island",
                  label: "Norfolk Island",
                  key: "160",
                },
                {
                  value: "Northern Mariana Islands",
                  label: "Northern Mariana Islands",
                  key: "161",
                },
                { value: "Norway", label: "Norway", key: "162" },
                { value: "Oman", label: "Oman", key: "163" },
                { value: "Pakistan", label: "Pakistan", key: "164" },
                { value: "Palau", label: "Palau", key: "165" },
                {
                  value: "Palestinian Territory, Occupied",
                  label: "Palestinian Territory, Occupied",
                  key: "166",
                },
                { value: "Panama", label: "Panama", key: "167" },
                {
                  value: "Papua New Guinea",
                  label: "Papua New Guinea",
                  key: "168",
                },
                { value: "Paraguay", label: "Paraguay", key: "169" },
                { value: "Peru", label: "Peru", key: "170" },
                { value: "Philippines", label: "Philippines", key: "171" },
                {
                  value: "Pitcairn Islands",
                  label: "Pitcairn Islands",
                  key: "172",
                },
                { value: "Poland", label: "Poland", key: "173" },
                { value: "Portugal", label: "Portugal", key: "174" },
                { value: "Puerto Rico", label: "Puerto Rico", key: "175" },
                { value: "Qatar", label: "Qatar", key: "176" },
                { value: "Reunion", label: "Reunion", key: "177" },
                { value: "Romania", label: "Romania", key: "178" },
                {
                  value: "Russian Federation",
                  label: "Russian Federation",
                  key: "179",
                },
                { value: "Rwanda", label: "Rwanda", key: "180" },
                {
                  value: "Saint Helena",
                  label: "Saint Helena",
                  key: "181",
                },
                {
                  value: "Saint Kitts and Nevis",
                  label: "Saint Kitts and Nevis",
                  key: "182",
                },
                { value: "Saint Lucia", label: "Saint Lucia", key: "183" },
                {
                  value: "Saint Pierre and Miquelon",
                  label: "Saint Pierre and Miquelon",
                  key: "184",
                },
                {
                  value: "Saint Vincent and the Grenadines",
                  label: "Saint Vincent and the Grenadines",
                  key: "185",
                },
                { value: "Samoa", label: "Samoa", key: "186" },
                { value: "San Marino", label: "San Marino", key: "187" },
                {
                  value: "Sao Tome and Principe",
                  label: "Sao Tome and Principe",
                  key: "188",
                },
                {
                  value: "Saudi Arabia",
                  label: "Saudi Arabia",
                  key: "189",
                },
                { value: "Senegal", label: "Senegal", key: "190" },
                {
                  value: "Serbia and Montenegro",
                  label: "Serbia and Montenegro",
                  key: "191",
                },
                { value: "Seychelles", label: "Seychelles", key: "192" },
                {
                  value: "Sierra Leone",
                  label: "Sierra Leone",
                  key: "193",
                },
                { value: "Singapore", label: "Singapore", key: "194" },
                { value: "Slovakia", label: "Slovakia", key: "195" },
                { value: "Slovenia", label: "Slovenia", key: "196" },
                {
                  value: "Solomon Islands",
                  label: "Solomon Islands",
                  key: "197",
                },
                { value: "Somalia", label: "Somalia", key: "198" },
                {
                  value: "South Africa",
                  label: "South Africa",
                  key: "199",
                },
                {
                  value: "South Georgia and the South Sandwich Islands",
                  label: "South Georgia and the South Sandwich Islands",
                  key: "200",
                },
                { value: "Spain", label: "Spain", key: "201" },
                { value: "Sri Lanka", label: "Sri Lanka", key: "202" },
                { value: "Sudan", label: "Sudan", key: "203" },
                { value: "Suriname", label: "Suriname", key: "204" },
                {
                  value: "Svalbard and Jan Mayen",
                  label: "Svalbard and Jan Mayen",
                  key: "205",
                },
                { value: "Swaziland", label: "SSwazilandZ", key: "206" },
                { value: "Sweden", label: "Sweden", key: "207" },
                { value: "Switzerland", label: "Switzerland", key: "208" },
                {
                  value: "Syrian Arab Republic",
                  label: "Syrian Arab Republic",
                  key: "209",
                },
                { value: "Taiwan", label: "Taiwan", key: "210" },
                { value: "Tajikistan", label: "Tajikistan", key: "211" },
                {
                  value: "United Republic of Tanzania",
                  label: "United Republic of Tanzania",
                  key: "212",
                },
                { value: "Thailand", label: "Thailand", key: "213" },
                { value: "Timor-Leste", label: "Timor-Leste", key: "214" },
                { value: "Togo", label: "Togo", key: "215" },
                { value: "Tokelau", label: "Tokelau", key: "216" },
                { value: "Tonga", label: "Tonga", key: "217" },
                {
                  value: "Trinidad and Tobago",
                  label: "Trinidad and Tobago",
                  key: "218",
                },
                { value: "Tunisia", label: "Tunisia", key: "219" },
                { value: "Turkey", label: "Turkey", key: "220" },
                {
                  value: "Turkmenistan",
                  label: "Turkmenistan",
                  key: "221",
                },
                {
                  value: "Turks and Caicos Islands",
                  label: "Turks and Caicos Islands",
                  key: "222",
                },
                { value: "Tuvalu", label: "Tuvalu", key: "223" },
                { value: "Uganda", label: "Uganda", key: "224" },
                { value: "Ukraine", label: "Ukraine", key: "225" },
                {
                  value: "United Arab Emirates",
                  label: "United Arab Emirates",
                  key: "226",
                },
                {
                  value: "United Kingdom",
                  label: "United Kingdom",
                  key: "227",
                },
                {
                  value: "United States",
                  label: "United States",
                  key: "228",
                },
                {
                  value: "United States Minor Outlying Islands",
                  label: "United States Minor Outlying Islands",
                  key: "229",
                },
                { value: "Uruguay", label: "Uruguay", key: "230" },
                { value: "Uzbekistan", label: "Uzbekistan", key: "231" },
                { value: "Vanuatu", label: "Vanuatu", key: "232" },
                { value: "Venezuela", label: "Venezuela", key: "233" },
                { value: "Vietnam", label: "Vietnam", key: "234" },
                {
                  value: "Virgin Islands, British",
                  label: "Virgin Islands, British",
                  key: "235",
                },
                {
                  value: "Virgin Islands, U.S.",
                  label: "Virgin Islands, U.S.",
                  key: "236",
                },
                {
                  value: "Wallis and Futuna",
                  label: "Wallis and Futuna",
                  key: "237",
                },
                {
                  value: "Western Sahara",
                  label: "Western Sahara",
                  key: "238",
                },
                { value: "Yemen", label: "Yemen", key: "239" },
                { value: "Zambia", label: "Zambia", key: "240" },
                { value: "Zimbabwe", label: "Zimbabwe", key: "241" },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.viewBtns}>
        <TouchableOpacity
          onPress={() => handleProceed()}
          style={styles.btnBtns1}
        >
          {isactive && (
            <>
              <ActivityIndicator size="large" color="#ffffff" />
            </>
          )}
          {isactive == false && (
            <>
              <Text style={styles.txtBtnTxt1}>Register</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 7,
  },
  imgLogo: {
    width: 145,
    height: 40,
    alignSelf: "flex-end",
    resizeMode: "cover",
  },
  txtTagline: {
    fontSize: 14,
    fontFamily: "PlayfairDisplayRegular",
    textAlign: "center",
    color: "#1a6363",
    marginTop: 15,
  },
  txtFormName: {
    fontSize: 20,
    fontFamily: "GeneralSansRegular",
    textAlign: "center",
    color: "#FFFFF0",
    marginTop: 15,
    lineHeight: 36,
  },
  txtFormInstruction: {
    fontSize: 14,
    fontFamily: "GeneralSansRegular",
    textAlign: "center",
    color: "#000000",
    marginTop: 15,
    marginBottom: 25,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  viewInputs: {
    flexDirection: "column",
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  viewInput: {
    flexDirection: "row",
    width: "100%",
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff80",
    borderRadius: 7,
  },
  viewGenders: {
    flexDirection: "row",
    width: "100%",
    height: 55,
    borderWidth: 1,
    borderColor: "#1a6363",
    borderRadius: 7,
    backgroundColor: "#ffffff",
  },
  viewBtns: {
    flexDirection: "column",
    width: "100%",
    marginTop: 40,
    paddingHorizontal: 20,
    marginBottom: 100
  },
  viewIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
  },
  icoInputIcon: {
    color: "grey",
  },
  viewTextInput: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  viewGenderInput: {
    width: "65%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  viewPickerInput: {
    width: "85%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  viewGenderArrow: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputTextInput: {
    width: "98%",
    height: 45,
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "GeneralSansMedium",
  },
  btnBtns1: {
    width: "100%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    backgroundColor: "#1a6363",
    marginTop: 30,
  },
  txtBtnTxt1: {
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
    textAlign: "center",
    color: "#FFFFF0",
  },
});

export default EmailRegister;
