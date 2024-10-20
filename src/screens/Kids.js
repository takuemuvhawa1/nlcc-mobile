import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataTable } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import Apilink from "../constants/Links";
import RNPickerSelect from "react-native-picker-select";

const Kids = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  const [memberdata, setMemberdata] = React.useState({
    id: "",
    name: "",
    surname: "",
    dob: "",
    relationship: "",
    gender: "",
    dd: "",
    mm: "",
    yy: "",
  });

  const [isactive, setIsactive] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [alerttext, setAlerttext] = React.useState("");
  const [alerttitle, setAlerttitle] = React.useState("");
  const [formstate, setFormstate] = React.useState("New Member");

  const [modalVisible, setModalVisible] = useState(false);
  const handleCancel = () => {
    setModalVisible(false);
  };

  const doAlert = (txt, ttl) => {
    setShowAlert(!showAlert);
    setAlerttext(txt);
    setAlerttitle(ttl);
  };

  const isFocused = useIsFocused();

  const addNew = async () => {
    setMemberdata({
      id: "",
      name: "",
      surname: "",
      dob: "",
      relationship: "",
      gender: "",
      dd: "",
      mm: "",
      yy: "",
    });
    setModalVisible(true);
  };

  const saveData = async () => {
    if (memberdata.name == "") {
      doAlert(
        "Submission failed. Member name is not filled",
        "Submission Error"
      );
      return;
    }
    if (memberdata.surname == "") {
      doAlert(
        "Submission failed. Member surname is not filled",
        "Submission Error"
      );
      return;
    }
    if (memberdata.dd == "" || memberdata.mm == "" || memberdata.yy == "") {
      doAlert(
        "Submission failed. Member DOB is not filled",
        "Submission Error"
      );
      return;
    }
    if (memberdata.relationship == "") {
      doAlert(
        "Submission failed. Member relationship is not filled",
        "Submission Error"
      );
      return;
    }
    if (memberdata.gender == "") {
      doAlert(
        "Submission failed. Member gender is not filled",
        "Submission Error"
      );
      return;
    }

    const dat = memberdata.yy + "-" + memberdata.mm + "-" + memberdata.dd;
    const parID = await AsyncStorage.getItem("UserID");

    const memberObj = {
      parentID: parID,
      name: memberdata.name,
      surname: memberdata.surname,
      dob: dat,
      relationship: memberdata.relationship,
      gender: memberdata.gender,
    };

    setIsactive(true);
    const apiLink = Apilink.getLink();
    let signinresponse = null;
    if (formstate == "New Member") {
      signinresponse = await fetch(`${apiLink}children`, {
        method: "post",
        body: JSON.stringify(memberObj),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      signinresponse = await fetch(`${apiLink}children/${memberdata.id}`, {
        method: "put",
        body: JSON.stringify(memberObj),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    let resJson = await signinresponse.json();

    console.log(resJson);

    setIsactive(false);
    if (resJson.message == "Child record added successfully") {
      setModalVisible(false);
      setMemberdata({
        id: "",
        name: "",
        surname: "",
        dob: "",
        relationship: "",
        gender: "",
        dd: "",
        mm: "",
        yy: "",
      });
      doAlert("Child record added successfully", "Success");
      const memberId = await AsyncStorage.getItem("UserID");
      const apiLink = Apilink.getLink();

      const asynctoken = await AsyncStorage.getItem("Tkn");

      let res = await fetch(`${apiLink}children/parent/${memberId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let responseJson = await res.json();
      setTableData(responseJson);
      setFormstate("New Member");
      return;
    } else if (resJson.message == "Child record updated successfully") {
      setModalVisible(false);
      setMemberdata({
        id: "",
        name: "",
        surname: "",
        dob: "",
        relationship: "",
        gender: "",
        dd: "",
        mm: "",
        yy: "",
      });
      doAlert("Child record updated successfully", "Success");
      const memberId = await AsyncStorage.getItem("UserID");
      const apiLink = Apilink.getLink();

      const asynctoken = await AsyncStorage.getItem("Tkn");

      let res = await fetch(`${apiLink}children/parent/${memberId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let responseJson = await res.json();
      setTableData(responseJson);
      setFormstate("New Member");
      return;
    } else {
      doAlert(
        "Child record did not save successfully. Try again or Contact system admin",
        "Failure"
      );
    }
  };

  const deleteChild = async () => {
    setConfirmDelete(false);
    if (memberdata.name == "") {
      doAlert(
        "Deletion failed. Member data is absent",
        "Submission Error"
      );
      return;
    }

    const apiLink = Apilink.getLink();
    let signinresponse = await fetch(`${apiLink}children/${memberdata.id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resJson = await signinresponse.json();

    console.log(resJson);

    if (resJson.message == "Child record deleted successfully") {
      setModalVisible(false);
      setMemberdata({
        id: "",
        name: "",
        surname: "",
        dob: "",
        relationship: "",
        gender: "",
        dd: "",
        mm: "",
        yy: "",
      });
      doAlert("Child record deleted successfully", "Success");
      const memberId = await AsyncStorage.getItem("UserID");
      const apiLink = Apilink.getLink();

      const asynctoken = await AsyncStorage.getItem("Tkn");

      let res = await fetch(`${apiLink}children/parent/${memberId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let responseJson = await res.json();
      setTableData(responseJson);
      setFormstate("New Member");
      return;
    } else {
      doAlert(
        "Child record did not delete successfully. Try again or Contact system admin",
        "Failure"
      );
    }
  }

  const [tableData, setTableData] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([7, 14, 21]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, tableData.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    const findFormData = async () => {
      try {
        const memberId = await AsyncStorage.getItem("UserID");
        const apiLink = Apilink.getLink();

        const asynctoken = await AsyncStorage.getItem("Tkn");

        let res = await fetch(`${apiLink}children/parent/${memberId}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let responseJson = await res.json();
        setTableData(responseJson);
      } catch (error) {
        console.log(error);
      }
    };

    if (isFocused) {
      findFormData();
    }
  }, [props, isFocused]);

  const viewMember = (id) => {
    let result = tableData.find((obj) => obj.childID == id);
    arr = result.dob.split("-");
    setMemberdata({
      id: result.childID,
      name: result.name,
      surname: result.surname,
      dob: result.dob,
      relationship: result.relationship,
      gender: result.gender,
      dd: arr[2].substring(0, 2),
      mm: arr[1],
      yy: result.dob.slice(0, result.dob.indexOf("-")),
    });
    setFormstate("Update Member");
    setModalVisible(true);
  };

  const findOneToDelete = (id) => {
    let result = tableData.find((obj) => obj.childID == id);
    arr = result.dob.split("-");
    setMemberdata({
      id: result.childID,
      name: result.name,
      surname: result.surname,
      dob: result.dob,
      relationship: result.relationship,
      gender: result.gender,
      dd: arr[2].substring(0, 2),
      mm: arr[1],
      yy: result.dob.slice(0, result.dob.indexOf("-")),
    });
    setConfirmDelete(true);
  };

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
      <AwesomeAlert
        show={confirmDelete}
        contentContainerStyle={{ width: 307 }}
        showProgress={false}
        title={"Confirm Child Deletion"}
        message={`Are you sure you want to delete ${memberdata.name} ${memberdata.surname} ?`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes Delete"
        cancelButtonColor="#1a6363"
        cancelButtonStyle={{ width: "40%", alignItems: "center" }}
        confirmButtonColor="#1a6363"
        confirmButtonStyle={{ width: "40%", alignItems: "center" }}
        onCancelPressed={() => {
          console.log("cancelled");
        }}
        onConfirmPressed={() => {
          deleteChild();
        }}
      />
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
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "GeneralSansMedium",
                  fontSize: 18,
                  color: "#000000",
                  alignSelf: "center",
                }}
              >
                {formstate}
              </Text>
              <AntDesign
                color="#000000"
                name="closesquareo"
                size={25}
                onPress={() => handleCancel()}
              />
            </View>
            <View style={styles.viewInputs}>
              <View style={styles.viewInput}>
                <View style={styles.viewIcon}>
                  <AntDesign
                    name="user"
                    size={25}
                    style={styles.icoInputIcon}
                  />
                </View>
                <View style={styles.viewTextInput}>
                  <TextInput
                    autoCorrect={false}
                    value={memberdata.name}
                    onChangeText={(text) =>
                      setMemberdata({ ...memberdata, name: text })
                    }
                    style={styles.inputTextInput}
                    placeholder="First name(s)"
                  />
                </View>
              </View>
            </View>
            <View style={styles.viewInputs}>
              <View style={styles.viewInput}>
                <View style={styles.viewIcon}>
                  <AntDesign
                    name="user"
                    size={25}
                    style={styles.icoInputIcon}
                  />
                </View>
                <View style={styles.viewTextInput}>
                  <TextInput
                    autoCorrect={false}
                    value={memberdata.surname}
                    onChangeText={(text) =>
                      setMemberdata({ ...memberdata, surname: text })
                    }
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
                    style={{ color: "#00000070" }}
                  />
                </View>
                <View style={styles.viewPickerInput}>
                  <RNPickerSelect
                    onValueChange={(text) =>
                      setMemberdata({ ...memberdata, gender: text })
                    }
                    value={memberdata.gender}
                    placeholder={{
                      label: "Gender",
                      value: null,
                    }}
                    style={{
                      placeholder: { color: "#00000065" },
                      inputIOS: { color: "#000000" },
                      inputAndroid: {
                        color: "#000000",
                        fontFamily: "GeneralSansMedium",
                        fontSize: 16,
                      },
                    }}
                    items={[
                      {
                        value: "M",
                        label: "Male",
                        key: "1",
                      },
                      {
                        value: "F",
                        label: "Female",
                        key: "2",
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
            <View style={styles.viewInputs}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  paddingHorizontal: 10,
                }}
              >
                <AntDesign color="#00000065" name="calendar" size={25} />
                <Text
                  style={{
                    color: "#00000065",
                    fontFamily: "GeneralSansMedium",
                    fontSize: 16,
                    marginLeft: 15,
                  }}
                >
                  Date of birth (Day-Month-Year)
                </Text>
              </View>
              <View style={styles.viewInput}>
                <View style={[styles.viewDatPickerInput, { width: "30%" }]}>
                  <RNPickerSelect
                    onValueChange={(text) =>
                      setMemberdata({ ...memberdata, dd: text })
                    }
                    placeholder={{
                      label: "",
                      value: null,
                    }}
                    value={memberdata.dd}
                    style={{
                      placeholder: { color: "#00000065" },
                      inputIOS: { color: "#000000" },
                      inputAndroid: {
                        color: "#000000",
                        fontFamily: "GeneralSansMedium",
                        fontSize: 16,
                      },
                    }}
                    items={[
                      {
                        value: "01",
                        label: "01",
                        key: "1",
                      },
                      {
                        value: "02",
                        label: "02",
                        key: "2",
                      },
                      {
                        value: "03",
                        label: "03",
                        key: "3",
                      },
                      {
                        value: "04",
                        label: "04",
                        key: "4",
                      },
                      {
                        value: "05",
                        label: "05",
                        key: "5",
                      },
                      {
                        value: "06",
                        label: "06",
                        key: "6",
                      },
                      {
                        value: "07",
                        label: "07",
                        key: "7",
                      },
                      {
                        value: "08",
                        label: "08",
                        key: "8",
                      },
                      {
                        value: "09",
                        label: "09",
                        key: "9",
                      },
                      {
                        value: "10",
                        label: "10",
                        key: "10",
                      },
                      {
                        value: "11",
                        label: "11",
                        key: "11",
                      },
                      {
                        value: "12",
                        label: "12",
                        key: "12",
                      },
                      {
                        value: "13",
                        label: "13",
                        key: "13",
                      },
                      {
                        value: "14",
                        label: "14",
                        key: "14",
                      },
                      {
                        value: "15",
                        label: "15",
                        key: "15",
                      },
                      {
                        value: "16",
                        label: "16",
                        key: "16",
                      },
                      {
                        value: "17",
                        label: "17",
                        key: "17",
                      },
                      {
                        value: "18",
                        label: "18",
                        key: "18",
                      },
                      {
                        value: "19",
                        label: "19",
                        key: "19",
                      },
                      {
                        value: "20",
                        label: "20",
                        key: "20",
                      },
                      {
                        value: "21",
                        label: "21",
                        key: "21",
                      },
                      {
                        value: "22",
                        label: "22",
                        key: "22",
                      },
                      {
                        value: "23",
                        label: "23",
                        key: "23",
                      },
                      {
                        value: "24",
                        label: "24",
                        key: "24",
                      },
                      {
                        value: "25",
                        label: "25",
                        key: "25",
                      },
                      {
                        value: "26",
                        label: "26",
                        key: "26",
                      },
                      {
                        value: "27",
                        label: "27",
                        key: "27",
                      },
                      {
                        value: "28",
                        label: "28",
                        key: "28",
                      },
                      {
                        value: "29",
                        label: "29",
                        key: "29",
                      },
                      {
                        value: "30",
                        label: "30",
                        key: "30",
                      },
                      {
                        value: "31",
                        label: "31",
                        key: "31",
                      },
                    ]}
                  />
                </View>
                <View style={[styles.viewDatPickerInput, { width: "35%" }]}>
                  <RNPickerSelect
                    onValueChange={(text) =>
                      setMemberdata({ ...memberdata, mm: text })
                    }
                    value={memberdata.mm}
                    placeholder={{
                      label: "",
                      value: null,
                    }}
                    style={{
                      placeholder: { color: "#00000065" },
                      inputIOS: { color: "#000000" },
                      inputAndroid: {
                        color: "#000000",
                        fontFamily: "GeneralSansMedium",
                        fontSize: 16,
                      },
                    }}
                    items={[
                      {
                        value: "01",
                        label: "Jan",
                        key: "1",
                      },
                      {
                        value: "02",
                        label: "Feb",
                        key: "2",
                      },
                      {
                        value: "03",
                        label: "Mar",
                        key: "3",
                      },
                      {
                        value: "04",
                        label: "Apr",
                        key: "4",
                      },
                      {
                        value: "05",
                        label: "May",
                        key: "5",
                      },
                      {
                        value: "06",
                        label: "Jun",
                        key: "6",
                      },
                      {
                        value: "07",
                        label: "Jul",
                        key: "7",
                      },
                      {
                        value: "08",
                        label: "Aug",
                        key: "8",
                      },
                      {
                        value: "09",
                        label: "Sep",
                        key: "9",
                      },
                      {
                        value: "10",
                        label: "Oct",
                        key: "10",
                      },
                      {
                        value: "11",
                        label: "Nov",
                        key: "11",
                      },
                      {
                        value: "12",
                        label: "Dec",
                        key: "12",
                      },
                    ]}
                  />
                </View>
                <View style={[styles.viewDatPickerInput, { width: "35%" }]}>
                  <RNPickerSelect
                    onValueChange={(text) =>
                      setMemberdata({ ...memberdata, yy: text })
                    }
                    placeholder={{
                      label: "",
                      value: null,
                    }}
                    value={memberdata.yy}
                    style={{
                      placeholder: { color: "#00000065" },
                      inputIOS: { color: "#000000" },
                      inputAndroid: {
                        color: "#000000",
                        fontFamily: "GeneralSansMedium",
                        fontSize: 16,
                      },
                    }}
                    items={[
                      {
                        value: "2024",
                        label: "2024",
                        key: "1",
                      },
                      {
                        value: "2023",
                        label: "2023",
                        key: "2",
                      },
                      {
                        value: "2022",
                        label: "2022",
                        key: "3",
                      },
                      {
                        value: "2021",
                        label: "2021",
                        key: "4",
                      },
                      {
                        value: "2020",
                        label: "2020",
                        key: "5",
                      },
                      {
                        value: "2019",
                        label: "2019",
                        key: "6",
                      },
                      {
                        value: "2018",
                        label: "2018",
                        key: "7",
                      },
                      {
                        value: "2017",
                        label: "2017",
                        key: "8",
                      },
                      {
                        value: "2016",
                        label: "2016",
                        key: "9",
                      },
                      {
                        value: "2015",
                        label: "2015",
                        key: "10",
                      },
                      {
                        value: "2014",
                        label: "2014",
                        key: "11",
                      },
                      {
                        value: "2013",
                        label: "2013",
                        key: "12",
                      },
                      {
                        value: "2012",
                        label: "2012",
                        key: "13",
                      },
                      {
                        value: "2011",
                        label: "2011",
                        key: "14",
                      },
                      {
                        value: "2010",
                        label: "2010",
                        key: "15",
                      },
                      {
                        value: "2009",
                        label: "2009",
                        key: "16",
                      },
                      {
                        value: "2008",
                        label: "2008",
                        key: "17",
                      },
                      {
                        value: "2007",
                        label: "2007",
                        key: "18",
                      },
                      {
                        value: "2006",
                        label: "2006",
                        key: "19",
                      },
                      {
                        value: "2005",
                        label: "2005",
                        key: "20",
                      },
                    ]}
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
                  <Feather
                    name="users"
                    size={25}
                    style={{ color: "#00000070" }}
                  />
                </View>
                <View style={styles.viewPickerInput}>
                  <RNPickerSelect
                    onValueChange={(text) =>
                      setMemberdata({ ...memberdata, relationship: text })
                    }
                    value={memberdata.relationship}
                    placeholder={{
                      label: "Relationship",
                      value: null,
                    }}
                    style={{
                      placeholder: { color: "#00000065" },
                      inputIOS: { color: "#000000" },
                      inputAndroid: {
                        color: "#000000",
                        fontFamily: "GeneralSansMedium",
                        fontSize: 16,
                      },
                    }}
                    items={[
                      {
                        value: "Son",
                        label: "Son",
                        key: "1",
                      },
                      {
                        value: "Daughter",
                        label: "Daughter",
                        key: "2",
                      },
                      {
                        value: "GrandSon",
                        label: "GrandSon",
                        key: "3",
                      },
                      {
                        value: "GrandDaughter",
                        label: "GrandDaughter",
                        key: "4",
                      },
                      {
                        value: "Brother",
                        label: "Brother",
                        key: "5",
                      },
                      {
                        value: "Sister",
                        label: "Sister",
                        key: "6",
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
            <View style={styles.viewBtns}>
              <TouchableOpacity
                onPress={() => {
                  saveData();
                }}
                style={styles.btnBtns1}
              >
                {isactive && (
                  <>
                    <ActivityIndicator size="large" color="#ffffff" />
                  </>
                )}
                {isactive == false && (
                  <>
                    <Text style={styles.txtBtnTxt1}>
                      {formstate == "New Member" ? "Save" : "Update"}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
              Family Members (Kids)
            </Text>
            <FontAwesome
              name="users"
              size={20}
              style={{ marginRight: 5, color: "#ffffff" }}
            />
          </View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-end",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => addNew()}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "40%",
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
              New Member
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ flex: 4 }}>Full Name</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Gender</DataTable.Title>
              <DataTable.Title style={{ flex: 0.5 }}><AntDesign name="delete" size={25} color={"black"}/></DataTable.Title>
            </DataTable.Header>

            {tableData.length
              ? tableData.slice(from, to).map((item) => (
                  <DataTable.Row
                    key={item.childID}
                    onPress={() => viewMember(`${item.childID}`)}
                  >
                    <DataTable.Cell style={{ flex: 4 }}>
                      {item.name} {item.surname}
                    </DataTable.Cell>

                    <DataTable.Cell style={{ flex: 2 }}>
                      {item.gender == "M" ? "Male" : "Female"}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 0.5 }}>
                      <AntDesign onPress={()=>findOneToDelete(`${item.childID}`)} name="delete" size={25} color={"red"}/>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))
              : ""}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(tableData.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} of ${tableData.length}`}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={"Rows per page"}
            />
          </DataTable>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    height: 600,
    paddingVertical: 30,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: 10,
  },
  viewBtns: {
    flexDirection: "row",
    width: "100%",
    marginTop: 70,
    justifyContent: "flex-end",
  },
  btnBtns1: {
    width: "49%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    backgroundColor: "#000000",
  },
  txtBtnTxt1: {
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
    textAlign: "center",
    color: "#ffffff",
  },
  viewInputs: {
    flexDirection: "column",
    width: "100%",
    marginTop: 10,
  },
  viewInput: {
    flexDirection: "row",
    width: "100%",
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: "#00000080",
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
  inputTextInput: {
    width: "98%",
    height: 45,
    color: "#000000",
    fontSize: 16,
    fontFamily: "GeneralSansMedium",
  },
  viewPickerInput: {
    width: "89%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  viewDatPickerInput: {
    width: "33%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export default Kids;
