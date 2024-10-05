import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  Feather,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import { StatusBar } from "expo-status-bar";
import Apilink from "../constants/Links";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "react-native-elements";
import axios from "axios";

const NewPassword = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  const [hidepin, setHidepin] = React.useState(true);
  const [hidenewpin, setHidenewpin] = React.useState(true);
  const [hidecnnewpin, setHidecnnewpin] = React.useState(true);
  const [inputs, setInputs] = React.useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    cnnewPassword: "",
  });

  const [isactive, setIsactive] = React.useState(false);
  const [isactive2, setIsactive2] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alerttext, setAlerttext] = React.useState("");
  const [alerttitle, setAlerttitle] = React.useState("");

  const doAlert = (txt, ttl) => {
    setShowAlert(!showAlert);
    setAlerttext(txt);
    setAlerttitle(ttl);
  };

  const [uploaddata, setUploaddata] = React.useState({
    name1: "",
    type1: "",
    uri1: "",
    ext1: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileimage] = useState("");

  const saveImage = async (image) => {
    try {
      setProfileimage(image);
      setModalVisible(false);
    } catch (error) {
      throw error;
    }
  };

  const removeImage = () => {
    setProfileimage("");
    setModalVisible(false);
  };

  const activateCam = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        //save
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error uploading image" + error.message);
      setModalVisible(false);
    }
  };

  const pickGalleryImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      //save
      await saveImage(result.assets[0].uri);
    }
  };

  const RenderItem = ({ title }) => (
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
          {title}
        </Text>

        {title == "My Profile" && (
          <>
            <FontAwesome color="#ffffff" name="user-o" size={20} />
          </>
        )}

        {title == "Ministry Admin" && (
          <>
            <FontAwesome color="#ffffff" name="user-circle" size={20} />
          </>
        )}

        {title == "Cell Group Admin" && (
          <>
            <FontAwesome color="#ffffff" name="user-circle" size={20} />
          </>
        )}
        {title == "Events Admin" && (
          <>
            <FontAwesome color="#ffffff" name="user-circle" size={20} />
          </>
        )}
        {title == "Settings" && (
          <>
            <Feather color="#ffffff" name="settings" size={20} />
          </>
        )}
        {title == "About NLCC" && (
          <>
            <SimpleLineIcons color="#ffffff" name="info" size={20} />
          </>
        )}
        {title == "Sign Out" && (
          <>
            <FontAwesome color="#ffffff" name="sign-out" size={22} />
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  const handleBtnPress = async () => {
    if (inputs.email == "") {
      doAlert("Fill in your email before you proceed", "Submission Error");
      return;
    }
    if (inputs.oldPassword == "") {
      doAlert(
        "Fill in your current password before you proceed",
        "Submission Error"
      );
      return;
    }
    if (inputs.newPassword == "") {
      doAlert(
        "Fill in your new password before you proceed",
        "Submission Error"
      );
      return;
    }
    if (inputs.newPassword != inputs.cnnewPassword) {
      doAlert(
        "Correctly confirm the new password before you proceed",
        "Submission Error"
      );
      return;
    }

    setIsactive(true);
    const apiLink = Apilink.getLink();

    let signinresponse = await fetch(`${apiLink}onboarding/resetpassword`, {
      method: "post",
      body: JSON.stringify({
        email: inputs.email,
        oldPassword: inputs.oldPassword,
        newPassword: inputs.newPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resJson = await signinresponse.json();

    console.log(resJson);

    if (resJson.message == "Invalid email or password") {
      doAlert("Invalid email or password", "Failed");
      setIsactive(false);
      return;
    }

    if (resJson.message == "Password reset successfully") {
      setInputs({
        email: "",
        oldPassword: "",
        newPassword: "",
        cnnewPassword: "",
      });
      setIsactive(false);
      doAlert("Password successfully changed", "Success");
    }
  };

  const handleImgUpload =async ()=>{
    if (profileImage == "") {
      doAlert(
        "Select the image first before proceeding",
        "Submission Error"
      );
      return;
    }

    const UserID = await AsyncStorage.getItem("UserID");
    setIsactive2(true);
    const formData = new FormData();
    const filename = profileImage.substring(profileImage.lastIndexOf("/") + 1);
    const ext = filename.substring(filename.lastIndexOf(".") + 1);
    formData.append("ext0", ext);

    formData.append("file", {
      uri: profileImage,
      type: `image/${ext}`,
      name: `profile-image.${ext}`,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: () => {
        return formData;
      },
    };
    const apiLink = Apilink.getLink();
    await axios
      .post(`${apiLink}upload/${UserID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        
        if (response.data.result.message == "Member updated successfully") {
          const setnewimg = async ()=>{
            await AsyncStorage.setItem("UserImg", response.data.Filename);
          }
          setnewimg();
          setProfileimage("");
          setIsactive2(false);
          doAlert(
            "Image uploaded successfully",
            "Successfull"
          );
          return;
        }
      })
      .catch((error) => {
        setIsactive2(false);
        console.log(error.response.data.message);
      });
  }

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FontAwesome
            onPress={()=>setModalVisible(false)}
              name="close"
              size={20}
              color="#ffffff"
              style={{ alignSelf: "flex-end", marginRight: 20 }}
            />
            <Text style={styles.txtPhotoselect}>Profile Image</Text>

            <View style={styles.viewPhotoOptions}>
              <TouchableOpacity
                onPress={() => activateCam()}
                style={{
                  backgroundColor: "#F2F2F2",
                  padding: 5,
                  borderRadius: 10,
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <FontAwesome5
                  name="camera-retro"
                  size={40}
                  color="#666"
                  style={{ marginVertical: 6, marginHorizontal: 6 }}
                />
                <Text style={styles.txtHeadViewSm}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => pickGalleryImage()}
                style={{
                  backgroundColor: "#F2F2F2",
                  padding: 5,
                  borderRadius: 10,
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <FontAwesome
                  name="image"
                  size={40}
                  color="#666"
                  style={{ marginVertical: 6, marginHorizontal: 6 }}
                />
                <Text style={styles.txtHeadViewSm}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeImage()}
                style={{
                  backgroundColor: "#F2F2F2",
                  padding: 5,
                  borderRadius: 10,
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <MaterialCommunityIcons
                  name="file-image-remove"
                  size={40}
                  color="#666"
                  style={{ marginVertical: 6, marginHorizontal: 6 }}
                />
                <Text style={styles.txtHeadViewSm}>Remove</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={[
                styles.txtHeadViewSm,
                { color: "#ffffff", alignSelf: "center", marginTop: 20 },
              ]}
            >
              Use camera, upload from gallery or remove uploaded
            </Text>
          </View>
        </View>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          confirmButtonStyle={{ width: 100, alignItems: "center" }}
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
            onPress={() => navigation.navigate("More")}
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
          <RenderItem title={"Settings"} />
          <Text
            style={{
              fontFamily: "GeneralSansMedium",
              fontSize: 18,
              color: "#000000",
              marginTop: 40,
              marginBottom: 40,
            }}
          >
            Change Account Profile Picture
          </Text>
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            {profileImage == "" && (
              <ImageBackground
                source={require("../../assets/temp.png")}
                resizeMode="cover"
                style={styles.viewDp}
              >
                <Text
                  style={{ alignSelf: "center", fontSize: 14, marginTop: 40 }}
                >
                  Profile Image
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.viewDpInBtm}
                >
                  <FontAwesome5
                    name="camera-retro"
                    size={20}
                    color="#666"
                    style={{ marginVertical: 6, marginHorizontal: 6 }}
                  />
                </TouchableOpacity>
              </ImageBackground>
            )}
            {profileImage != "" && (
              <View>
                <Avatar
                  rounded
                  source={{
                    uri: profileImage,
                  }}
                  containerStyle={{
                    width: 90,
                    height: 91,
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: "#707070",
                  }}
                />
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <FontAwesome5
                    name="camera-retro"
                    size={20}
                    color="#ffffff"
                    style={{ marginTop: -16, marginLeft: 80 }}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={() => handleImgUpload()}
            style={styles.btnBtns2}
          >
            {isactive2 && (
              <>
                <ActivityIndicator size="large" color="#ffffff" />
              </>
            )}
            {isactive2 == false && (
              <>
                <Text style={styles.txtBtnTxt2}>Upload New Image</Text>
              </>
            )}
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "GeneralSansMedium",
              fontSize: 18,
              color: "#000000",
              marginTop: 10,
              marginBottom: 40,
            }}
          >
            Change Account Password
          </Text>
          <View style={styles.viewInput}>
            <View style={styles.viewIcon}>
              <SimpleLineIcons
                name="envelope"
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
                placeholder="Enter your email"
              />
            </View>
          </View>
          <View style={[styles.viewInput, { marginTop: 20 }]}>
            <View style={styles.viewIcon}>
              <SimpleLineIcons
                name="lock"
                size={25}
                style={styles.icoInputIcon}
              />
            </View>
            <View style={styles.viewTextInput}>
              <TextInput
                autoCorrect={false}
                value={inputs.oldPassword}
                secureTextEntry={hidepin}
                onChangeText={(text) =>
                  setInputs({ ...inputs, oldPassword: text })
                }
                style={styles.inputTextInput}
                placeholder="Enter your current password"
              />
            </View>
            <TouchableOpacity
              onPress={() => setHidepin(!hidepin)}
              style={styles.viewToggler}
            >
              {hidepin && (
                <>
                  <FontAwesome
                    name="eye-slash"
                    size={25}
                    style={styles.icoInputIcon}
                  />
                </>
              )}
              {hidepin == false && (
                <>
                  <FontAwesome
                    name="eye"
                    size={25}
                    style={styles.icoInputIcon}
                  />
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={[styles.viewInput, { marginTop: 20 }]}>
            <View style={styles.viewIcon}>
              <SimpleLineIcons
                name="lock"
                size={25}
                style={styles.icoInputIcon}
              />
            </View>
            <View style={styles.viewTextInput}>
              <TextInput
                autoCorrect={false}
                value={inputs.newPassword}
                secureTextEntry={hidenewpin}
                onChangeText={(text) =>
                  setInputs({ ...inputs, newPassword: text })
                }
                style={styles.inputTextInput}
                placeholder="Enter your new password"
              />
            </View>
            <TouchableOpacity
              onPress={() => setHidenewpin(!hidenewpin)}
              style={styles.viewToggler}
            >
              {hidenewpin && (
                <>
                  <FontAwesome
                    name="eye-slash"
                    size={25}
                    style={styles.icoInputIcon}
                  />
                </>
              )}
              {hidenewpin == false && (
                <>
                  <FontAwesome
                    name="eye"
                    size={25}
                    style={styles.icoInputIcon}
                  />
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={[styles.viewInput, { marginTop: 20 }]}>
            <View style={styles.viewIcon}>
              <SimpleLineIcons
                name="lock"
                size={25}
                style={styles.icoInputIcon}
              />
            </View>
            <View style={styles.viewTextInput}>
              <TextInput
                autoCorrect={false}
                value={inputs.cnnewPassword}
                secureTextEntry={hidecnnewpin}
                onChangeText={(text) =>
                  setInputs({ ...inputs, cnnewPassword: text })
                }
                style={styles.inputTextInput}
                placeholder="Confirm new password "
              />
            </View>
            <TouchableOpacity
              onPress={() => setHidecnnewpin(!hidecnnewpin)}
              style={styles.viewToggler}
            >
              {hidecnnewpin && (
                <>
                  <FontAwesome
                    name="eye-slash"
                    size={25}
                    style={styles.icoInputIcon}
                  />
                </>
              )}
              {hidecnnewpin == false && (
                <>
                  <FontAwesome
                    name="eye"
                    size={25}
                    style={styles.icoInputIcon}
                  />
                </>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => handleBtnPress()}
            style={styles.btnBtns1}
          >
            {isactive && (
              <>
                <ActivityIndicator size="large" color="#ffffff" />
              </>
            )}
            {isactive == false && (
              <>
                <Text style={styles.txtBtnTxt1}>Save New Password</Text>
              </>
            )}
          </TouchableOpacity>
        
        </View>
      </ScrollView>
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
  viewInput: {
    flexDirection: "row",
    width: "100%",
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
    borderRadius: 7,
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
  viewToggler: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputTextInput: {
    width: "98%",
    height: 45,
    color: "#000000",
    fontSize: 16,
    fontFamily: "GeneralSansMedium",
  },
  btnBtns1: {
    width: "100%",
    height: 55,
    marginTop: 55,
    marginBottom: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    backgroundColor: "#1a6363",
  },
  txtBtnTxt1: {
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
    textAlign: "center",
    color: "#FFFFF0",
  },
  btnBtns2: {
    width: "100%",
    height: 55,
    marginTop: 55,
    marginBottom: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    backgroundColor: "#1a6363",
  },
  txtBtnTxt2: {
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
    textAlign: "center",
    color: "#FFFFF0",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    height: 250,
    paddingVertical: 30,
    backgroundColor: "#1a6363",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  txtPhotoselect: {
    fontSize: 22,
    fontFamily: "GeneralSansMedium",
    textAlign: "center",
    color: "#ffffff",
  },
  txtHeadViewSm: {},
  viewPhotoOptions: {
    marginTop: 25,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  viewDp: {
    width: 90,
    height: 91,
    marginTop: 10,
    borderRadius: 91,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  viewDpInBtm: {
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 60,
  },
  btnUpload: {
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    height: 55,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop: 12,
  },
  txtUpload: {
    fontSize: 16,
    fontFamily: "GeneralSansRegular",
    textAlign: "center",
    color: "#F47920",
  },
});

export default NewPassword;
