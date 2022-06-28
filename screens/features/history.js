import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Image, TouchableOpacity } from "react-native-ui-lib";
import { TaskItem } from "../../components/templates/Task";
import userService from "../../services/user.service";

const backIcon = require("../../assets/icons/backIcon.png");
const loadingGif = require("../../assets/images/Pulse-1.3s-58px.gif");
const HistoryPNG = require("../../assets/images/historyIcon.png");

const History = () => {
  const navigation = useNavigation();
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [historyList, setHistory] = React.useState(true);
  const [tasks, setTasks] = React.useState([]);

  function a(b) {
    var c = [];
    var e = [];
    for (const d in b) {
      e.push([...b[d].data]);
    }
    e.forEach(function (g, h) {
      g.forEach((i, u) => {
        c.push(i);
      });
    });
    return c;
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
          task_id: task_id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(async () => {
    const fetchActiveRiders = async () => {
      setLoading(true);

      try {
        const listRiderTask = await userService.listRiderTaskTypes();
        const res = await listRiderTask.json();
        // console.log(res);
        const e = a(res.data);

        setTasks(e);
        console.log(e);
        // console.log(res.data);
      } catch (error) {
        // setError(error);
        setLoading(false);
        console.log(error);
      }
    };
    fetchActiveRiders();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigatorContainer}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.main}
      >
        {historyList === null && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 500,
              alignContent: "center",
            }}
          >
            <Image source={HistoryPNG} />
            <Text
              style={{ color: "#4B4D5A", fontSize: 34, fontWeight: "bold" }}
            >
              All Clear
            </Text>
            <Text
              style={{
                color: "#4B4D5A",
                fontSize: 14,
                fontWeight: "bold",
                opacity: 0.8,
              }}
            >
              Looks like you have no history
            </Text>
          </View>
        )}
        {historyList !== null && (
          <View style={{ paddingVertical: 20 }}>
            {tasks.length < 1 && (
              <Text style={styles.taskTitle}>No Available Tasks</Text>
            )}
            {tasks.map((item, index) => {
              return (
                <TaskItem
                  key={item.id}
                  time={item.created_at}
                  itemDetails={item}
                  view={(e) => viewTask(e)}
                  isHistory={true}
                />
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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
