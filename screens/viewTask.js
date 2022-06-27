import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native-ui-lib";
import { Alert, StyleSheet, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RidersMap from "../components/organisms/Maps/RidersMap";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userService from "../services/user.service";

const iconsDots = require("../assets/images/icons-chevron-light.png");
const filterButton = require("../assets/images/filter.png");
const expanButton = require("../assets/images/icons-dots.png");

const pInitials = require("../assets/images/p.png");
const dInitials = require("../assets/images/d.png");
const startPickup = require("../assets/images/startPickup.png");
const LocationArrow = require("../assets/images/LocationArrow.png");
import moment from "moment";

export const callNumber = (phone) => {
  console.log("callNumber ----> ", phone);
  let phoneNumber = phone;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Phone number is not available");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => console.log(err));
};

export default function ViewTask({ route, navigation }) {
  const [dutyState, setDutyState] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);
  const [activityLog, setActivityLog] = useState(null);
  const [activityLogSize, setActivityLogSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const { pickup, destination, type, task_id } = route.params;
  // console.log(route);

  useEffect(async () => {
    setTaskId(task_id);
  }, [task_id]);

  const activityCodes = [
    { code: "arrived_for_pickup" },
    { code: "start_trip" },
    { code: "arrived_for_delivery" },
    { code: "delivery_confirmed" },
  ];

  const nextActivities = [
    { message: "Accept Task", nextActivityCode: "Driver has accepted pickup" },
    { message: "Start Pickup", nextActivityCode: "arrived_for_pickup" },
    { message: "Start Trip", nextActivityCode: "start_trip" },
    { message: "Arrived", nextActivityCode: "arrived_for_delivery" },
    { message: "Confirm Delivery", nextActivityCode: "delivery_confirmed" },
  ];

  useEffect(async () => {
    const user = await AsyncStorage.getItem("user");
    const userJSON = JSON.parse(user);

    const availState = userJSON.data.user.availability;

    if (availState === null) {
      setDutyState(false);
    }
    setDutyState(availState === "on" ? true : false);
  }, []);

  useEffect(async () => {
    loadTaskDetails(task_id);
  }, []);

  async function loadTaskDetails(task_id) {
    setLoading(true);
    try {
      const viewTask = await userService.getSingleTask(task_id);
      const res = await viewTask.json();
      setTaskDetails(res.data);
      console.log(res.data);
      setActivityLogSize(res.data.shipment.activities_log.length);
      // console.log(res.data.shipment.activities_log);
      // console.log(res.data);
      setLoading(false);
    } catch (error) {
      // setError(error);
      // setLoading(false);
      console.log(error);
    }
  }
  async function updateTaskProgress(code) {
    setLoading(true);
    try {
      const updateTask = await userService.updateTaskProgress(taskId, code);
      const res = await updateTask.json();

      console.log(res);
      if (res?.status === "fail") {
        Alert.alert("Failed", res.message, [
          { text: "Cancel", style: "destructive" },
        ]);
      }
      await loadTaskDetails(taskId);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCall = (number) => {
    callNumber(number);
  };
  const handleMessage = (e) => {
    navigation.navigate("Chat", {
      order_id: route.params.order_id,
      shipment_id: e.id,
    });
  };

  const coordinates = {
    latitude: 5.034611,
    longitude: 7.928292,
  };

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <View style={styles.mapContainer}>
          <View style={styles.slideOutBottomContainer}>
            <View style={styles.slideOutBottom}>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "75%" }}>
                  <TaskItem
                    time={
                      taskDetails &&
                      moment(taskDetails.created_at).format("lll")
                    }
                    pickup={pickup}
                    destination={destination}
                  />
                </View>
                <View style={{ width: "15%" }}>
                  <Image source={LocationArrow} />
                </View>
              </View>
              <View></View>
            </View>
            <View
              style={[
                styles.switchContainer,
                { backgroundColor: !loading ? "#00923F" : "#475675" },
              ]}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "space-around",
                  width: "100%",
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
                onPress={() =>
                  updateTaskProgress(
                    nextActivities[activityLogSize].nextActivityCode
                  )
                }
                disabled={loading}
              >
                <View>{!loading && <Image source={startPickup} />}</View>
                <Text style={[styles.switchText, { alignSelf: "center" }]}>
                  {loading
                    ? "Loading..."
                    : activityLogSize !== null &&
                      nextActivities[activityLogSize].message}
                </Text>
                <Text
                  style={[
                    styles.switchText,
                    { alignSelf: "center", opacity: 0 },
                  ]}
                >
                  .
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ position: "relative" }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={taskButtonStyle.container}
            >
              <Image
                style={{
                  transform: [{ rotate: "90deg" }],
                  height: 30,
                  width: 35,
                }}
                source={iconsDots}
              />
            </TouchableOpacity>
            <RidersMap coordinates={coordinates} title={"Rider"} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
const TaskItem = (props) => {
  const { time, pickup, destination } = props;
  return (
    <View style={styles.taskItem}>
      <View>
        <Text style={styles.taskTitle}>
          <Image style={styles.initials} source={pInitials} /> Pickup Location
        </Text>
        <Text style={styles.taskDetails}>{pickup}</Text>
      </View>
      <View style={styles.taskTimeContainer}>
        <Text style={styles.taskTime}>{time} </Text>
      </View>
      <View
        style={{
          borderTopColor: "rgba(244, 244, 246, 0.99)",
          borderTopWidth: 1,
          marginVertical: 15,
          width: "95%",
          textAlign: "center",
          marginLeft: 20,
        }}
      />
      <View>
        <Text style={styles.taskTitle}>
          <Image style={styles.initials} source={dInitials} /> Destination
          Location
        </Text>
        <Text style={styles.taskDetails}>{destination}.</Text>
      </View>
    </View>
  );
};

const taskButtonStyle = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: 35,
    height: 35,
    position: "absolute",
    top: 29,
    left: "5%",
    zIndex: 10,
    borderRadius: 9999,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    paddingVertical: 18,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 29,
  },
  button: {
    flexDirection: "row",
  },
  badge: {
    backgroundColor: "#E90000",
    height: 20,
    width: 20,
    borderRadius: 9999,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    lineHeight: 12,
    color: "#ffffff",
    fontSize: 11,
    margin: "auto",
  },
});
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#2E384D",
    color: "#ffffff",
  },
  navigationBar: {
    width: "100%",
    height: 50,
    backgroundColor: "#2E384D",
    color: "#ffffff",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  mapContainer: {
    position: "relative",
  },
  map: {
    zIndex: 1,
  },
  heading: {
    color: "#ffffff",
    fontSize: 16,
    flex: 1,
    alignContent: "space-between",
    flexDirection: "row",
  },
  navContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: "auto",
    paddingVertical: 5,
    height: 24,
  },
  navMenuButton: {
    width: 18,
    height: 14,
  },
  dateButton: {
    width: 87,
    height: 21,
  },
  filterButton: {
    width: 22,
    height: 14,
  },
  slideOutBottomContainer: {
    backgroundColor: "#2E384D",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 351,
    zIndex: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 1,
    paddingVertical: 34,
  },
  slideOutBottom: {
    paddingHorizontal: 22,
  },
  greetingText: {
    fontSize: 22,
    lineHeight: 32,
    fontWeight: "bold",
    color: "#ffff",
  },
  welcomeText: {
    color: "#ffff",
    opacity: 0.5,
    fontSize: 14,
    lineHeight: 32,
  },
  switchContainer: {
    height: 70,
    width: "100%",
    // marginVertical: 29,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  switchText: {
    color: "#ffffff",
    fontSize: 18,
    lineHeight: 32,
    textTransform: "uppercase",
  },
  switchButton: {
    // width: '100%'
  },
  menu: {
    position: "absolute",
    zIndex: 20,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  taskList: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
  },
  task: {},
  taskTitle: {
    fontSize: 14,
    // fontWeight: "bold",
    color: "#F7F7F7",
    lineHeight: 37,
    // alignSelf:'center'
    // marginRight: 10
  },
  taskDetails: {
    fontSize: 16,
    color: "rgba(214, 214, 214, 0.5)",
    marginLeft: 20,
    lineHeight: 19,
  },
  taskTimeContainer: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  taskTime: {
    fontSize: 11,
    color: "#ffffff",
    marginBottom: 10,
    fontWeight: "bold",
  },
  taskItem: {
    paddingHorizontal: 20,
    // paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  taskButton: {
    backgroundColor: "#00923F",
    paddingHorizontal: 45,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",

    justifyContent: "center",
  },
  taskButtonAccept: {
    backgroundColor: "#00923F",
  },
  taskButtonAcceptText: {
    color: "#ffffff",
  },
  taskButtonDecline: {
    backgroundColor: "#F8F8F8",
    marginRight: 10,
  },
  taskButtonDeclineText: {
    color: "#E90000",
  },

  taskButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    // marginBottom:5,
  },
  initials: {
    marginRight: 20,
  },
});
