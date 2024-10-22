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
import { Picker } from "@react-native-picker/picker";

const EmailRegister = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

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
        gender: "",
        address: "",
        country: "",
      });
      navigation.navigate("SetPassword");
      return;
    }
    if (resJson.message == "User already registered") {
      setIsactive(false);
      doAlert(
        "Proceeding failed. User is registered already",
        "Submission Error"
      );
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
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              width: "11%",
            }}
          >
            <MaterialCommunityIcons
              name="gender-male-female"
              size={25}
              style={{ color: "#00000050" }}
            />
          </View>
          <View style={styles.viewPickerInput}>
            <Picker
              selectedValue={inputs.gender}
              onValueChange={(value) => {
                setInputs({ ...inputs, gender: value });
              }}
              style={
                inputs.gender == ""
                  ? {
                      width: "100%",
                      height: 55,
                      color: "#00000090",
                      fontFamily: "GeneralSansMedium",
                      fontSize: 16,
                    }
                  : {
                      width: "100%",
                      height: 55,
                      color: "#ffffff",
                      fontFamily: "GeneralSansMedium",
                      fontSize: 16,
                    }
              }
            >
              <Picker.Item value="" label="Gender" />
              <Picker.Item value="Male" label="Male" />
              <Picker.Item value="Female" label="Female" />
              <Picker.Item value="Other" label="Other" />
            </Picker>
          </View>
        </View>
      </View>
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
            <Picker
              selectedValue={inputs.country}
              onValueChange={(value) => {
                setInputs({ ...inputs, country: value });
              }}
              style={
                inputs.country == ""
                  ? {
                      width: "100%",
                      height: 55,
                      color: "#00000090",
                      fontFamily: "GeneralSansMedium",
                      fontSize: 16,
                    }
                  : {
                      width: "100%",
                      height: 55,
                      color: "#ffffff",
                      fontFamily: "GeneralSansMedium",
                      fontSize: 16,
                    }
              }
            >
              <Picker.Item value="" label="Country" />
              <Picker.Item value="Afghanistan" label="Afghanistan" />
              <Picker.Item value="Aland Islands" label="Aland Islands" />
              <Picker.Item value="Albania" label="Albania" />
              <Picker.Item value="Algeria" label="Algeria" />
              <Picker.Item value="American Samoa" label="American Samoa" />
              <Picker.Item value="AndorrA" label="AndorrA" />
              <Picker.Item value="Angola" label="Angola" />
              <Picker.Item value="Anguilla" label="Anguilla" />
              <Picker.Item value="Antarctica" label="Antarctica" />
              <Picker.Item
                value="Antigua and Barbuda"
                label="Antigua and Barbuda"
              />
              <Picker.Item value="Argentina" label="Argentina" />
              <Picker.Item value="Armenia" label="Armenia" />
              <Picker.Item value="Aruba" label="Aruba" />
              <Picker.Item value="Australia" label="Australia" />
              <Picker.Item value="Austria" label="Austria" />
              <Picker.Item value="Azerbaijan" label="Azerbaijan" />
              <Picker.Item value="Bahamas" label="Bahamas" />
              <Picker.Item value="Bahrain" label="Bahrain" />
              <Picker.Item value="Bangladesh" label="Bangladesh" />
              <Picker.Item value="Barbados" label="Barbados" />
              <Picker.Item value="Belarus" label="Belarus" />
              <Picker.Item value="Belgium" label="Belgium" />
              <Picker.Item value="Belize" label="Belize" />
              <Picker.Item value="Benin" label="Benin" />
              <Picker.Item value="Bermuda" label="Bermuda" />
              <Picker.Item value="Bhutan" label="Bhutan" />
              <Picker.Item value="Bolivia" label="Bolivia" />
              <Picker.Item
                value="Bosnia and Herzegovina"
                label="Bosnia and Herzegovina"
              />
              <Picker.Item value="Botswana" label="Botswana" />
              <Picker.Item value="Bouvet Island" label="Bouvet Island" />
              <Picker.Item value="Brazil" label="Brazil" />
              <Picker.Item
                value="British Indian Ocean Territory"
                label="British Indian Ocean Territory"
              />
              <Picker.Item
                value="Brunei Darussalam"
                label="Brunei Darussalam"
              />
              <Picker.Item value="Bulgaria" label="Bulgaria" />
              <Picker.Item value="Burkina Faso" label="Burkina Faso" />
              <Picker.Item value="Burundi" label="Burundi" />
              <Picker.Item value="Cambodia" label="Cambodia" />
              <Picker.Item value="Cameroon" label="Cameroon" />
              <Picker.Item value="Canada" label="Canada" />
              <Picker.Item value="Cape Verde" label="Cape Verde" />
              <Picker.Item value="Cayman Islands" label="Cayman Islands" />
              <Picker.Item
                value="Central African Republic"
                label="Central African Republic"
              />
              <Picker.Item value="Chad" label="TChadD" />
              <Picker.Item value="Chile" label="Chile" />
              <Picker.Item value="China" label="China" />
              <Picker.Item value="Christmas Island" label="Christmas Island" />
              <Picker.Item
                value="Cocos (Keeling) Islands"
                label="Cocos (Keeling) Islands"
              />
              <Picker.Item value="Colombia" label="Colombia" />
              <Picker.Item value="Comoros" label="Comoros" />
              <Picker.Item value="Congo" label="Congo" />
              <Picker.Item
                value="The Democratic Republic of Congo"
                label="The Democratic Republic of Congo"
              />
              <Picker.Item value="Cook Islands" label="Cook Islands" />
              <Picker.Item value="Costa Rica" label="Costa Rica" />
              <Picker.Item value="Croatia" label="Croatia" />
              <Picker.Item value="Cuba" label="Cuba" />
              <Picker.Item value="Cyprus" label="Cyprus" />
              <Picker.Item value="Czech Republic" label="Czech Republic" />
              <Picker.Item value="Denmark" label="Denmark" />
              <Picker.Item value="Djibouti" label="Djibouti" />
              <Picker.Item value="Dominica" label="Dominica" />
              <Picker.Item
                value="Dominican Republic"
                label="Dominican Republic"
              />
              <Picker.Item value="Ecuador" label="Ecuador" />
              <Picker.Item value="Egypt" label="Egypt" />
              <Picker.Item value="El Salvador" label="El Salvador" />
              <Picker.Item
                value="Equatorial Guinea"
                label="Equatorial Guinea"
              />
              <Picker.Item value="Eritrea" label="Eritrea" />
              <Picker.Item value="Estonia" label="Estonia" />
              <Picker.Item value="Ethiopia" label="Ethiopia" />
              <Picker.Item
                value="Falkland Islands (Malvinas)"
                label="Falkland Islands (Malvinas)"
              />
              <Picker.Item value="Faroe Islands" label="Faroe Islands" />
              <Picker.Item value="Fiji" label="Fiji" />
              <Picker.Item value="Finland" label="Finland" />
              <Picker.Item value="France" label="France" />
              <Picker.Item value="French Guiana" label="French Guiana" />
              <Picker.Item value="French Polynesia" label="French Polynesia" />
              <Picker.Item
                value="French Southern Territories"
                label="French Southern Territories"
              />
              <Picker.Item value="Gabon" label="Gabon" />
              <Picker.Item value="Gambia" label="Gambia" />
              <Picker.Item value="Georgia" label="Georgia" />
              <Picker.Item value="Germany" label="Germany" />
              <Picker.Item value="Ghana" label="Ghana" />
              <Picker.Item value="Gibraltar" label="Gibraltar" />
              <Picker.Item value="Greece" label="Greece" />
              <Picker.Item value="Greenland" label="Greenland" />
              <Picker.Item value="Grenada" label="Grenada" />
              <Picker.Item value="Guadeloupe" label="Guadeloupe" />
              <Picker.Item value="Guam" label="Guam" />
              <Picker.Item value="Guatemala" label="Guatemala" />
              <Picker.Item value="Guernsey" label="Guernsey" />
              <Picker.Item value="Guinea" label="Guinea" />
              <Picker.Item value="Guinea-Bissau" label="Guinea-Bissau" />
              <Picker.Item value="Guyana" label="Guyana" />
              <Picker.Item value="Haiti" label="Haiti" />
              <Picker.Item
                value="Heard Island and Mcdonald Islands"
                label="Heard Island and Mcdonald Islands"
              />
              <Picker.Item
                value="Holy See (Vatican City State)"
                label="Holy See (Vatican City State)"
              />
              <Picker.Item value="Honduras" label="Honduras" />
              <Picker.Item value="Hong Kong" label="Hong Kong" />
              <Picker.Item value="Hungary" label="Hungary" />
              <Picker.Item value="Iceland" label="Iceland" />
              <Picker.Item value="India" label="India" />

              <Picker.Item value="Indonesia" label="Indonesia" />

              <Picker.Item
                value="Islamic Republic Of Iran"
                label="Islamic Republic Of Iran"
              />
              <Picker.Item value="Iraq" label="Iraq" />

              <Picker.Item value="Ireland" label="Ireland" />

              <Picker.Item value="Isle of Man" label="Isle of Man" />

              <Picker.Item value="Israel" label="Israel" />
              <Picker.Item value="Italy" label="Italy" />
              <Picker.Item value="Jamaica" label="Jamaica" />
              <Picker.Item value="Japan" label="Japan" />
              <Picker.Item value="Jersey" label="Jersey" />
              <Picker.Item value="Jordan" label="Jordan" />
              <Picker.Item value="Kazakhstan" label="Kazakhstan" />
              <Picker.Item value="Kenya" label="Kenya" />
              <Picker.Item value="Kiribati" label="Kiribati" />
              <Picker.Item
                value="Republic of Korea"
                label="Republic of Korea"
              />
              <Picker.Item value="Kuwait" label="Kuwait" />
              <Picker.Item value="Kyrgyzstan" label="Kyrgyzstan" />
              <Picker.Item value="Latvia" label="Latvia" />
              <Picker.Item value="Lebanon" label="Lebanon" />
              <Picker.Item value="Lesotho" label="Lesotho" />
              <Picker.Item value="Liberia" label="Liberia" />
              <Picker.Item
                value="Libyan Arab Jamahiriya"
                label="Libyan Arab Jamahiriya"
              />
              <Picker.Item value="Liechtenstein" label="Liechtenstein" />
              <Picker.Item value="Lithuania" label="Lithuania" />
              <Picker.Item value="Luxembourg" label="Luxembourg" />
              <Picker.Item value="Macao" label="Macao" />
              <Picker.Item value="North Macedonia" label="North Macedonia" />
              <Picker.Item value="Madagascar" label="Madagascar" />
              <Picker.Item value="Malawi" label="Malawi" />
              <Picker.Item value="Malaysia" label="Malaysia" />
              <Picker.Item value="Maldives" label="Maldives" />
              <Picker.Item value="Mali" label="Mali" />
              <Picker.Item value="Malta" label="Malta" />
              <Picker.Item value="Marshall Islands" label="Marshall Islands" />
              <Picker.Item value="Martinique" label="Martinique" />
              <Picker.Item value="Mauritania" label="Mauritania" />
              <Picker.Item value="Mauritius" label="Mauritius" />
              <Picker.Item value="Mayotte" label="Mayotte" />
              <Picker.Item value="Mexico" label="Mexico" />
              <Picker.Item
                value="Federated States of Micronesia"
                label="Federated States of Micronesia"
              />
              <Picker.Item
                value="Republic of Moldova"
                label="Republic of Moldova"
              />
              <Picker.Item value="Monaco" label="Monaco" />
              <Picker.Item value="Mongolia" label="Mongolia" />
              <Picker.Item value="Montserrat" label="Montserrat" />
              <Picker.Item value="Morocco" label="Morocco" />
              <Picker.Item value="Mozambique" label="Mozambique" />
              <Picker.Item value="Myanmar" label="Myanmar" />
              <Picker.Item value="Namibia" label="Namibia" />
              <Picker.Item value="Nauru" label="Nauru" />
              <Picker.Item value="Nepal" label="Nepal" />
              <Picker.Item value="Netherlands" label="Netherlands" />
              <Picker.Item
                value="Netherlands Antilles"
                label="Netherlands Antilles"
              />
              <Picker.Item value="New Caledonia" label="New Caledonia" />
              <Picker.Item value="New Zealand" label="New Zealand" />
              <Picker.Item value="Nicaragua" label="Nicaragua" />
              <Picker.Item value="Niger" label="Niger" />
              <Picker.Item value="Nigeria" label="Nigeria" />
              <Picker.Item value="Niue" label="Niue" />
              <Picker.Item value="Norfolk Island" label="Norfolk Island" />
              <Picker.Item
                value="Northern Mariana Islands"
                label="Northern Mariana Islands"
              />
              <Picker.Item value="Norway" label="Norway" />
              <Picker.Item value="Oman" label="Oman" />
              <Picker.Item value="Pakistan" label="Pakistan" />
              <Picker.Item value="Palau" label="Palau" />
              <Picker.Item
                value="Palestinian Territory Occupied"
                label="Palestinian Territory Occupied"
              />
              <Picker.Item value="Panama" label="Panama" />
              <Picker.Item value="Papua New Guinea" label="Papua New Guinea" />
              <Picker.Item value="Paraguay" label="Paraguay" />
              <Picker.Item value="Peru" label="Peru" />
              <Picker.Item value="Philippines" label="Philippines" />
              <Picker.Item value="Pitcairn Islands" label="Pitcairn Islands" />
              <Picker.Item value="Poland" label="Poland" />
              <Picker.Item value="Portugal" label="Portugal" />
              <Picker.Item value="Puerto Rico" label="Puerto Rico" />
              <Picker.Item value="Qatar" label="Qatar" />
              <Picker.Item value="Reunion" label="Reunion" />
              <Picker.Item value="Romania" label="Romania" />
              <Picker.Item
                value="Russian Federation"
                label="Russian Federation"
              />
              <Picker.Item value="Rwanda" label="Rwanda" />
              <Picker.Item value="Saint Helena" label="Saint Helena" />
              <Picker.Item
                value="Saint Kitts and Nevis"
                label="Saint Kitts and Nevis"
              />
              <Picker.Item value="Saint Lucia" label="Saint Lucia" />
              <Picker.Item
                value="Saint Pierre and Miquelon"
                label="Saint Pierre and Miquelon"
              />
              <Picker.Item
                value="Saint Vincent and the Grenadines"
                label="Saint Vincent and the Grenadines"
              />
              <Picker.Item value="Samoa" label="Samoa" />
              <Picker.Item value="San Marino" label="San Marino" />
              <Picker.Item
                value="Sao Tome and Principe"
                label="Sao Tome and Principe"
              />
              <Picker.Item value="Saudi Arabia" label="Saudi Arabia" />
              <Picker.Item value="Senegal" label="Senegal" />
              <Picker.Item
                value="Serbia and Montenegro"
                label="Serbia and Montenegro"
              />
              <Picker.Item value="Seychelles" label="Seychelles" />
              <Picker.Item value="Sierra Leone" label="Sierra Leone" />
              <Picker.Item value="Singapore" label="Singapore" />
              <Picker.Item value="Slovakia" label="Slovakia" />
              <Picker.Item value="Slovenia" label="Slovenia" />
              <Picker.Item value="Solomon Islands" label="Solomon Islands" />
              <Picker.Item value="Somalia" label="Somalia" />
              <Picker.Item value="South Africa" label="South Africa" />
              <Picker.Item
                value="South Georgia and the South Sandwich Islands"
                label="South Georgia and the South Sandwich Islands"
              />
              <Picker.Item value="Spain" label="Spain" />
              <Picker.Item value="Sri Lanka" label="Sri Lanka" />
              <Picker.Item value="Sudan" label="Sudan" />
              <Picker.Item value="Suriname" label="Suriname" />
              <Picker.Item
                value="Svalbard and Jan Mayen"
                label="Svalbard and Jan Mayen"
              />
              <Picker.Item value="Swaziland" label="SSwazilandZ" />
              <Picker.Item value="Sweden" label="Sweden" />
              <Picker.Item value="Switzerland" label="Switzerland" />
              <Picker.Item
                value="Syrian Arab Republic"
                label="Syrian Arab Republic"
              />
              <Picker.Item value="Taiwan" label="Taiwan" />
              <Picker.Item value="Tajikistan" label="Tajikistan" />
              <Picker.Item
                value="United Republic of Tanzania"
                label="United Republic of Tanzania"
              />
              <Picker.Item value="Thailand" label="Thailand" />
              <Picker.Item value="Timor-Leste" label="Timor-Leste" />
              <Picker.Item value="Togo" label="Togo" />
              <Picker.Item value="Tokelau" label="Tokelau" />
              <Picker.Item value="Tonga" label="Tonga" />
              <Picker.Item
                value="Trinidad and Tobago"
                label="Trinidad and Tobago"
              />
              <Picker.Item value="Tunisia" label="Tunisia" />
              <Picker.Item value="Turkey" label="Turkey" />
              <Picker.Item value="Turkmenistan" label="Turkmenistan" />
              <Picker.Item
                value="Turks and Caicos Islands"
                label="Turks and Caicos Islands"
              />
              <Picker.Item value="Tuvalu" label="Tuvalu" />
              <Picker.Item value="Uganda" label="Uganda" />
              <Picker.Item value="Ukraine" label="Ukraine" />
              <Picker.Item
                value="United Arab Emirates"
                label="United Arab Emirates"
              />
              <Picker.Item value="United Kingdom" label="United Kingdom" />
              <Picker.Item value="United States" label="United States" />
              <Picker.Item
                value="United States Minor Outlying Islands"
                label="United States Minor Outlying Islands"
              />
              <Picker.Item value="Uruguay" label="Uruguay" />
              <Picker.Item value="Uzbekistan" label="Uzbekistan" />
              <Picker.Item value="Vanuatu" label="Vanuatu" />
              <Picker.Item value="Venezuela" label="Venezuela" />
              <Picker.Item value="Vietnam" label="Vietnam" />
              <Picker.Item
                value="Virgin Islands British"
                label="Virgin Islands British"
              />
              <Picker.Item
                value="Virgin Islands U.S."
                label="Virgin Islands U.S."
              />
              <Picker.Item
                value="Wallis and Futuna"
                label="Wallis and Futuna"
              />
              <Picker.Item value="Western Sahara" label="Western Sahara" />
              <Picker.Item value="Yemen" label="Yemen" />
              <Picker.Item value="Zambia" label="Zambia" />
              <Picker.Item value="Zimbabwe" label="Zimbabwe" />
            </Picker>
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
    marginBottom: 100,
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
