import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Image, TouchableOpacity } from "react-native-ui-lib";
import { TaskItem } from "../../components/templates/Task";
import userService from "../../services/user.service";
import RidersMap from "../../components/organisms/Maps/RidersMap";
import { getGeometryFromAddress } from "../../utils/geocode";

const backIcon = require("../../assets/icons/backIcon.png");

const TaskDetails = ({ route }) => {
  const navigation = useNavigation();
  const [taskDetails, setTaskDetails] = React.useState(null);
  const [coordinates, setCoordinates] = React.useState(null);

  async function fetchTask(task_id) {
    try {
      const viewTaskReq = await userService.getSingleTask(task_id);
      const res = await viewTaskReq.json();
      //   console.log(res.data);
      setTaskDetails(res.data);

      const res2 = await getGeometryFromAddress(
        res.data.shipment.pickup_point
      );
      // console.log(res.geometry.location);
      const { lat, lng } = res2.geometry.location;
      setCoordinates({
        latitude: lat,
        longitude: lng,
      });
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(async () => {
    fetchTask(route.params.task_id);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigatorContainer}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backIcon} style={styles.backButton} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.heading}>History</Text>
        </View>
        <Text
          style={{
            color: "#000000",
            fontSize: 12,
            fontWeight: "bold",
            opacity: 0,
          }}
        >
          [chatIcon ]
        </Text>
      </View>
      <View style={styles.main}>
        <View style={{ paddingTop: 10, paddingHorizontal: 15 }}>
          {taskDetails !== null && (
            <TaskItem
              // time={tasksDetails.created_at}
              itemDetails={taskDetails}
              isViewOnly={true}
            />
          )}
        </View>
        <View style={{ width: "100%",height:'97%', marginTop:-250 }}>
          {coordinates && (
            <RidersMap pointer={true} coordinates={coordinates} title={`Pickup Point: ${taskDetails.shipment.pickup_point}`} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  navigatorContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 5,
    height: 40,
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 38,
    height: 36,
  },
  heading: {
    color: "#4B4D5A",
    fontSize: 18,
    flex: 1,
    fontWeight: "bold",
    alignContent: "center",
    flexDirection: "row",
    marginTop: 5,
    textAlign: "center",
  },
  avatar: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 25,
    height: 89,
    width: "100%",
  },
  main: {
    // height: '100%'
  },
});
