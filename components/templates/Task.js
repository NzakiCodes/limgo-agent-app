import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import userService from "../../services/user.service";
const pInitials = require("../../assets/images/p.png");
const dInitials = require("../../assets/images/d.png");

const Task = ({ closeTask, tasks }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigation = useNavigation();

  const closeTaskList = (e) => {
    e.preventDefault();
    closeTask();
  };
  const closeFromTap = (e) => {
    e.preventDefault();
    closeTask();
  };
  const stopCloseFromTouch = (e) => {
    e.stopPropagation();
  };

  async function acceptTask(e) {
    // navigation.navigate("ViewTask", { pickup, destination });
    const task_id = e.id;
    const shipment_id = e.shipment.id;

    try {
      const acceptTaskReq = await userService.acceptTask({
        shipment_id,
        task_id,
      });
      const res = await acceptTaskReq.json();
      // console.log(res);
      if (res.status === "success") {
        navigation.navigate("ViewTask", {
          pickup: res.data.shipment.pickup_point,
          destination: res.data.shipment.delivery_point,
          type: "accept",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

   async function declineTask(e) {
    // navigation.navigate("ViewTask", { pickup, destination });
    const task_id = e.id;
    // const shipment_id = e.shipment.id;
    const note = "Not Available";

    try {
      const declineTaskReq = await userService.declineTask({
        task_id,
        note
      });
      const res = await declineTaskReq.json();
      console.log(res.status);
      if (res.status === "success") {
        // navigation.navigate("Home");
        closeTask()
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function viewTask(e) {
    // navigation.navigate("ViewTask", { pickup, destination });
    const task_id = e.id;

    try {
      const viewTaskReq = await userService.getSingleTask(task_id);
      const res = await viewTaskReq.json();
      // console.log(res);
      if (res.status === "success") {
        navigation.navigate("ViewTask", {
          pickup: res.data.shipment.pickup_point,
          destination: res.data.shipment.delivery_point,
          type: "view",
          task_id:task_id
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View
      style={styles.container}
      onTouchStart={(event) => closeFromTap(event)}
    >
      <TouchableOpacity style={styles.closeTaskList}></TouchableOpacity>

      <ScrollView
        style={styles.taskContainer}
        onTouchStart={(e) => stopCloseFromTouch(e)}
      >
        {tasks.length < 1 && (
          <Text style={styles.taskTitle}>No Available Tasks</Text>
        )}
        {tasks.map((item, index) => {
          return (
            <TaskItem
              key={item.id}
              time={item.created_at}
              itemDetails={item}
              accept={(e) => acceptTask(e)}
              decline={(e) => declineTask(e)}
              view={(e) => viewTask(e)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
export const TaskItem = (props) => {
  const { time, pickup, destination, itemDetails, view, accept, decline } =
    props;

  const [taskDetails, setTaskDetails] = useState(null);

  useEffect(async () => {
    async function fetchTaskDetails(tasks_id) {
      try {
        const res = await userService.getSingleTask(itemDetails.id);
        const detail = await res.json();
        setTaskDetails(detail.data);
        // console.log(detail);
      } catch (error) {}
    }
    fetchTaskDetails();
  }, []);

  if (taskDetails === null) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.taskItem}>
        <View>
          <Text style={styles.taskTitle}>
            <Image source={pInitials} /> Pickup Location
          </Text>
          <Text style={styles.taskDetails}>
            {taskDetails.shipment.pickup_point ||
              taskDetails.shipment.pickup_point[0]}
          </Text>
        </View>
        <View style={styles.taskTimeContainer}>
          <Text style={styles.taskTime}>{taskDetails.created_at} </Text>
          <Text
            style={[
              styles.taskTime,
              {
                color:
                  taskDetails.status === "in_progress"
                    ? "#FFB900"
                    : taskDetails.status === "declined"
                    ? "#E90000"
                    : "#00923F",
              },
            ]}
          >
            {taskDetails.status.replace(/_/g, " ")}{" "}
          </Text>
        </View>
        <View
          style={{
            borderTopColor: "rgba(244, 244, 246, 0.99)",
            borderTopWidth: 1,
            marginVertical: 15,
          }}
        />
        <View>
          <Text style={styles.taskTitle}>
            <Image source={dInitials} /> Destination Location
          </Text>
          <Text style={styles.taskDetails}>
            {taskDetails.shipment.delivery_point ||
              taskDetails.shipment.delivery_point[0]}
            .
          </Text>
        </View>
        {taskDetails.status === "pending" ? (
          <View style={styles.taskButtonContainer}>
            <TouchableOpacity
              style={[styles.taskButton, styles.taskButtonDecline]}
              onPress={() => decline(taskDetails)}
            >
              <Text style={styles.taskButtonDeclineText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.taskButton, styles.taskButtonAccept]}
              onPress={() => accept(taskDetails)}
            >
              <Text style={styles.taskButtonAcceptText}>Accept</Text>
            </TouchableOpacity>
          </View>
        ) : taskDetails.status === "in_progress" ? (
          <View style={styles.taskButtonContainer}>
            <TouchableOpacity
              style={[styles.taskButton, styles.taskButtonAccept]}
              onPress={() => view(taskDetails)}
            >
              <Text style={styles.taskButtonAcceptText}>View Task</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  }
};

export default Task;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "rgba(46, 56, 77, 0.8)",
    width: Dimensions.get("screen").width,
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 70,
  },
  taskContainer: {
    height: Dimensions.get("screen").height - 104,
    backgroundColor: "#ffffff",
    width: Dimensions.get("screen").width,
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 70,
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    paddingHorizontal: 15,
    paddingVertical: 65,
    overflow: "hidden",
  },
  closeTaskList: {
    width: Dimensions.get("screen").width,
    height: 134,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "red",
    zIndex: 80,
  },
  task: {},
  taskTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#959DAD",
    lineHeight: 37,
    // alignSelf:'center'
    // marginBottom: 10
  },
  taskDetails: {
    fontSize: 16,
    color: "#454F63",
    // marginBottom: 10,
    marginLeft: 20,

    lineHeight: 19,
  },
  taskTimeContainer: {
    position: "absolute",
    right: 20,
    top: 20,
    flexDirection: "row-reverse",
  },
  taskTime: {
    fontSize: 11,
    color: "#4b4d5a",
    marginBottom: 10,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginRight: 5,
  },
  taskItem: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: "#455b63",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 4,
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
  pInitials: {},
});
