import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import {
  FontAwesome6,
  Ionicons,
  Feather,
  AntDesign,
  ActivityIndicator,
} from "react-native-vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataTable } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import Apilink from "../constants/Links";

const AdminMinistry = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../assets/font/GeneralSans/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../assets/font/GeneralSans/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../assets/font/GeneralSans/SF-Pro-Text-Regular.otf"),
    PlayfairDisplayRegular: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Regular.otf"),
    PlayfairDisplayBold: require("../../assets/font/PlayfairDisplay/PlayfairDisplay-Bold.otf"),
  });

  const [record, setRecord] = React.useState({
    id: "",
    name: "",
    description: "",
    admin: "",
    adminphone: "",
    members: "",
    joinrequesting: "",
    leaverequesting: "",
  });

  const [memberdata, setMemberdata] = React.useState({
    id: "",
    name: "",
    gender: "",
    phone: "",
    email: "",
    requesttime: "",
  });

  const [isactive, setIsactive] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alerttext, setAlerttext] = React.useState("");
  const [alerttitle, setAlerttitle] = React.useState("");

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

  // Datatable Codes
  const [currenttab, setCurtab] = React.useState("1");

  const setCurrenttab = (num) => {
    setCurtab(num);
    if (num == "1") {
      setTableData(rmembers);
    }
    if (num == "2") {
      setTableData(lmembers);
    }
    if (num == "3") {
      setTableData(members);
    }
  };
  const [data, setData] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [rmembers, setRmembers] = React.useState([]);
  const [lmembers, setLmembers] = React.useState([]);
  const [members, setMembers] = React.useState([]);

  const [requesting, setRequesting] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [allmembers, setAllmembers] = useState(false);
  const [acceptdenytext, setAcceptdenytext] = React.useState("");

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
        const slctdObj = await AsyncStorage.getItem("SelectedMinistry");
        const ministryObj = JSON.parse(slctdObj);
        //console.log(ministryObj);
        if (ministryObj) {
          setRecord({
            id: ministryObj.id,
            name: ministryObj.name,
            description: ministryObj.description,
            admin: ministryObj.admin,
            adminphone: ministryObj.adminphone,
            members: ministryObj.members,
            joinrequesting: ministryObj.joinrequesting,
            leaverequesting: ministryObj.leaverequesting,
          });

          setTableData(ministryObj.requestingdata);
          setRmembers(ministryObj.requestingdata);
          setLmembers(ministryObj.leavingdata);
          setMembers(ministryObj.membersdata);

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

  const handleAccept = async () => {
    const memberId = memberdata.id;
    const ministryId = record.id;

    setIsactive(true);
    const apiLink = Apilink.getLink();

    //Request To Join
    if (currenttab == 1) {
      let approveResponse = await fetch(
        `${apiLink}ministrymembers/approve/${memberId}/${ministryId}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let approveResJson = await approveResponse.json();
      console.log(approveResJson);

      // if (approveResJson.message == "Member ministry updated successfully") {
      //   doAlert("Member accepted successfully", "Success");
      //   setIsactive(false);
      //   return;
      // }
      // if (approveResJson.message == "No request found to approve or already approved.") {
      //   doAlert("Member accepted failed. Contact system admin", "Failed");
      //   setIsactive(false);
      //   return;
      // }
      setIsactive(false);
      navigation.navigate("SelectMinistry");
    }

    //Request To Leave
    if (currenttab == 2) {
      console.log("2nd");
      let disapResponse = await fetch(
        `${apiLink}ministrymembers/leave/${memberId}/${ministryId}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let disapResJson = await disapResponse.json();
      console.log(disapResJson);
      // if (disapResJson.message == "Member ministry updated successfully") {
      //   doAlert("Member removed successfully", "Success");
      //   setIsactive(false);
      //   return;
      // }
      // if (disapResJson.message == "No request found to approve or already approved.") {
      //   doAlert("Member removal failed. Contact system admin", "Failed");
      //   setIsactive(false);
      //   return;
      // }
      setIsactive(false);
      navigation.navigate("SelectMinistry");
    }

    // //Member Data Is Set To Leaving Only Because They Are There Already
    // if (currenttab == 3) {
    //   console.log("3rd");
    // }
  };

  const handleDenny = () => {
    console.log("Dennying");
  };

  const acceptMember = async () => {
    const memberId = memberdata.id;
    const ministryId = record.id;

    setIsactive(true);
    const apiLink = Apilink.getLink();
    //Request To Join

    let approveResponse = await fetch(
      `${apiLink}ministrymembers/approve/${memberId}/${ministryId}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let approveResJson = await approveResponse.json();
    console.log(approveResJson);

    // if (approveResJson.message == "Member ministry updated successfully") {
    //   doAlert("Member accepted successfully", "Success");
    //   setIsactive(false);
    //   return;
    // }
    // if (approveResJson.message == "No request found to approve or already approved.") {
    //   doAlert("Member accepted failed. Contact system admin", "Failed");
    //   setIsactive(false);
    //   return;
    // }
    setIsactive(false);
  };

  const viewMember = (id) => {
    console.log(id);
    let result = tableData.find((obj) => obj.MemberID == id);
    setMemberdata({
      id: result.MemberID,
      name: result.Name + " " + result.Surname,
      gender: "Not set",
      phone: result.Phone,
      email: "Not Set",
      requesttime: "Not Set",
    });
    setModalVisible(true);
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
        confirmButtonStyle={{width: "40%", alignItems: "center"}}
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
                {currenttab == "1" && <>Request To Join</>}
                {currenttab == "2" && <>Request To Leave</>}
                {currenttab == "3" && <>Member Data</>}
              </Text>
              <AntDesign
                color="#000000"
                name="closesquareo"
                size={25}
                onPress={() => handleCancel()}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 50,
              }}
            >
              <Text
                style={{
                  fontFamily: "GeneralSansMedium",
                  fontSize: 18,
                  color: "#000000",
                  alignSelf: "center",
                }}
              >
                Name
              </Text>
              <Text
                style={{
                  fontFamily: "GeneralSansMedium",
                  fontSize: 18,
                  color: "#1a6363",
                  alignSelf: "center",
                }}
              >
                {memberdata.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  fontFamily: "GeneralSansMedium",
                  fontSize: 18,
                  color: "#000000",
                  alignSelf: "center",
                }}
              >
                Gender
              </Text>
              <Text
                style={{
                  fontFamily: "GeneralSansMedium",
                  fontSize: 18,
                  color: "#1a6363",
                  alignSelf: "center",
                }}
              >
                {memberdata.gender}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  fontFamily: "GeneralSansMedium",
                  fontSize: 18,
                  color: "#000000",
                  alignSelf: "center",
                }}
              >
                Mobile Number
              </Text>
              <Text
                style={{
                  fontFamily: "GeneralSansMedium",
                  fontSize: 18,
                  color: "#1a6363",
                  alignSelf: "center",
                }}
              >
                {memberdata.phone}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  fontFamily: "GeneralSansMedium",
                  fontSize: 18,
                  color: "#000000",
                  alignSelf: "center",
                }}
              >
                Email
              </Text>
              <Text
                style={{
                  fontFamily: "GeneralSansMedium",
                  fontSize: 18,
                  color: "#1a6363",
                  alignSelf: "center",
                }}
              >
                {memberdata.email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  fontFamily: "GeneralSansMedium",
                  fontSize: 18,
                  color: "#000000",
                  alignSelf: "center",
                }}
              >
                Requested On
              </Text>
              <Text
                style={{
                  fontFamily: "GeneralSansMedium",
                  fontSize: 18,
                  color: "#1a6363",
                  alignSelf: "center",
                }}
              >
                {memberdata.requesttime}
              </Text>
            </View>

            <View style={styles.viewBtns}>
              {currenttab != "3" && <>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  handleAccept();
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
                    <Text style={styles.txtBtnTxt1}>Accept</Text>
                  </>
                )}
              </TouchableOpacity>
              
              </>}
             
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.viewTop}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SelectMinistry")}
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
              {record.name}
            </Text>
            <FontAwesome6
              name="people-roof"
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
            marginBottom: 30,
            alignSelf: "center",
            textAlign: "justify",
          }}
        >
          {record.description}
        </Text>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => setCurrenttab("1")}
            style={
              currenttab == "1"
                ? {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "32%",
                    backgroundColor: "#1a6363",
                    borderWidth: 0.5,
                    height: 52,
                    borderRadius: 8,
                    paddingHorizontal: 15,
                    paddingTop: 15,
                  }
                : {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "32%",
                    backgroundColor: "#ffffff",
                    borderWidth: 0.5,
                    height: 52,
                    borderRadius: 8,
                    paddingHorizontal: 15,
                    paddingTop: 15,
                  }
            }
          >
            <Text
              style={
                currenttab == "1"
                  ? {
                      fontFamily: "GeneralSansMedium",
                      fontSize: 18,
                      color: "#ffffff",
                    }
                  : {
                      fontFamily: "GeneralSansMedium",
                      fontSize: 18,
                      color: "#000000",
                    }
              }
            >
              New
            </Text>
            <Text
              style={
                currenttab == "1"
                  ? {
                      fontFamily: "GeneralSansMedium",
                      fontSize: 18,
                      color: "#ffffff",
                    }
                  : {
                      fontFamily: "GeneralSansMedium",
                      fontSize: 18,
                      color: "#000000",
                    }
              }
            >
              {record.joinrequesting}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCurrenttab("2")}
            style={
              currenttab == "2"
                ? {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "32%",
                    backgroundColor: "#1a6363",
                    borderWidth: 0.5,
                    height: 52,
                    borderRadius: 8,
                    paddingHorizontal: 15,
                    paddingTop: 15,
                  }
                : {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "32%",
                    backgroundColor: "#ffffff",
                    borderWidth: 0.5,
                    height: 52,
                    borderRadius: 8,
                    paddingHorizontal: 15,
                    paddingTop: 15,
                  }
            }
          >
            <Text
              style={
                currenttab == "2"
                  ? {
                      fontFamily: "GeneralSansMedium",
                      fontSize: 18,
                      color: "#ffffff",
                    }
                  : {
                      fontFamily: "GeneralSansMedium",
                      fontSize: 18,
                      color: "#000000",
                    }
              }
            >
              Leaving
            </Text>
            <Text
              style={
                currenttab == "2"
                  ? {
                      fontFamily: "GeneralSansMedium",
                      fontSize: 18,
                      color: "#ffffff",
                    }
                  : {
                      fontFamily: "GeneralSansMedium",
                      fontSize: 18,
                      color: "#000000",
                    }
              }
            >
              {record.leaverequesting}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCurrenttab("3")}
            style={
              currenttab == "3"
                ? {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "32%",
                    backgroundColor: "#1a6363",
                    borderWidth: 0.5,
                    height: 52,
                    borderRadius: 8,
                    paddingHorizontal: 15,
                    paddingTop: 15,
                  }
                : {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "32%",
                    backgroundColor: "#ffffff",
                    borderWidth: 0.5,
                    height: 52,
                    borderRadius: 8,
                    paddingHorizontal: 15,
                    paddingTop: 15,
                  }
            }
          >
            <Text
              style={
                currenttab == "3"
                  ? {
                      fontFamily: "GeneralSansMedium",
                      fontSize: 18,
                      color: "#ffffff",
                    }
                  : {
                      fontFamily: "GeneralSansMedium",
                      fontSize: 18,
                      color: "#000000",
                    }
              }
            >
              All
            </Text>
            <Text
              style={
                currenttab == "3"
                  ? {
                      fontFamily: "GeneralSansMedium",
                      fontSize: 18,
                      color: "#ffffff",
                    }
                  : {
                      fontFamily: "GeneralSansMedium",
                      fontSize: 18,
                      color: "#000000",
                    }
              }
            >
              {record.members}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ flex: 4 }}>Full Name</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Phone</DataTable.Title>
            </DataTable.Header>

            {tableData.length
              ? tableData.slice(from, to).map((item) => (
                  <DataTable.Row
                    key={item.MemberID}
                    onPress={() => viewMember(`${item.MemberID}`)}
                  >
                    <DataTable.Cell style={{ flex: 4 }}>
                      {item.Name} {item.Surname}
                    </DataTable.Cell>

                    <DataTable.Cell style={{ flex: 2 }}>
                      {item.Phone}
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
    height: 500,
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
    paddingHorizontal: 15,
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
});

export default AdminMinistry;
