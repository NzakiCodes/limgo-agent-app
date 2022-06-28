import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native-ui-lib";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RidersMap from "../components/organisms/Maps/RidersMap";
import Menu from "../components/organisms/Menu";
import FilterTask from "../components/organisms/task";
import Task from "../components/templates/Task";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userService from "../services/user.service";
import moment from "moment";

const menuButton = require("../assets/images/menu.png");
const filterButton = require("../assets/images/filter.png");
const expanButton = require("../assets/images/icons-dots.png");

export default function HomeScreen({ navigation }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterTaskOpen, setIsFilterTaskOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isTaskList, setTaskList] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = SecureStore.getItemAsync("token");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [dutyState, setDutyState] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(async () => {
    const user = await AsyncStorage.getItem("user");
    const userJSON = JSON.parse(user);

    const availState = userJSON.data.user.availability;

    if (availState === null) {
      setDutyState(false);
    }
    setDutyState(availState === "on" ? true : false);
  }, []);


  function a(b) {
    var c = [];
    var e = [];
    for (const d in b) {
      e.push([...b[d].data]);
    }
    e.forEach(function (g, h) {
      g.forEach((i,u)=>{
        c.push(i)
      })
    });
    return c;
  }

  useEffect(async () => {
    const fetchActiveRiders = async () => {
      setLoading(true);

      try {
        const listRiderTask = await userService.listRiderTaskTypes();
        const res = await listRiderTask.json();
        // console.log(res);
        const e = a(res.data);

        setTasks(e);
        // console.log(e);
        // console.log(res.data);
      } catch (error) {
        // setError(error);
        setLoading(false);
        console.log(error);
      }
    };
    fetchActiveRiders();
  }, []);

  const coordinates = {
    latitude: 5.034611,
    longitude: 7.928292,
  };

  async function setDutyStateHandler(state) {
    // const dutyVariableState = dutyState ? "on" : "off";

    setDutyState(state);

    const dutyVariableState = state ? "on" : "off";
    // const

    try {
      const setDutyStateReq = await userService.updateDutyStatus({
        availability: dutyVariableState,
      });
      const res = await setDutyStateReq.json();
      // console.log(res.data.availability);

      setDutyState(res.data.availability === "on" ? true : false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      {isMenuOpen && (
        <View style={styles.menu}>
          <Menu
            onClose={() => setIsMenuOpen(!isMenuOpen)}
            isNavOpen={isMenuOpen}
            userData={userData}
          />
        </View>
      )}
      {isFilterTaskOpen && (
        <View style={styles.menu}>
          <FilterTask
            onClose={() => setIsFilterTaskOpen(!isFilterTaskOpen)}
            isNavOpen={isMenuOpen}
          />
        </View>
      )}
      {/* {isTaskList && (
        <View style={[styles.menu]}>
          <Task closeTask={() => setTaskList(false)} tasks={tasks} />
        </View>
      )} */}
      {
        // console.log(isTaskList)
      }
      <SafeAreaView style={styles.container}>
        <View style={styles.mapContainer}>
          <View style={styles.navigationBar}>
            <View style={styles.navContainer}>
              <View>
                <TouchableOpacity
                  style={styles.navMenuButton}
                  onPress={() => setIsMenuOpen(true)}
                >
                  <Image source={menuButton} style={styles.navMenuButton} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => navigation.navigate("CalendarScreen")}
                >
                  <Text style={styles.heading}>{moment().format('LL')}</Text>
                </TouchableOpacity>
              </View>
              <View style={{opacity:0, width:0}}>
                <TouchableOpacity
                  style={[styles.navMenuButton,{opacity:0}]}
                  onPress={() => setIsFilterTaskOpen(!isFilterTaskOpen)}
                >
                  <Image source={filterButton} style={[styles.filterButton,{opacity:0}]} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.slideOutBottomContainer}>
            <View style={styles.slideOutBottom}>
              <View>
                <Text style={styles.greetingText}>
                  Hello{" "}
                  {!!user && user?.user.first_name !== null ? user.user.first_name: user?.user?.email} !
                </Text>
                <Text style={styles.welcomeText}>
                  Welcome Back to Limgo Logistics
                </Text>
              </View>
              <View></View>
            </View>

            <View
              style={[
                styles.switchContainer,
                { backgroundColor: dutyState ? "#00923F" : "#475675" },
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.switchText,
                    { opacity: dutyState ? 0.7 : 0.5 },
                  ]}
                >
                  {dutyState ? "on" : "Off"} Duty
                </Text>
              </View>
              <View style={styles.switchButton}>
                <Switch
                  onColor={"#66be8c"}
                  offColor={"#a1a1a1"}
                  // style={{backgroundColor:'#00923F7D'}}
                  value={dutyState}
                  onValueChange={() => setDutyStateHandler(!dutyState)}
                  // style={{ marginBottom: 20 }}
                />
              </View>
            </View>
          </View>
          <View style={{ position: "relative" }}>
            <View>
              <TaskButton
                taskCount={tasks ? tasks.length : 0}
                onPress={() => navigation.navigate("Tasks",{tasks:tasks})}
              />
            </View>
            <RidersMap coordinates={coordinates} title={"Rider"} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
const TaskButton = (props) => {
  const { taskCount = 199 } = props;
  const taskCountCheck = taskCount > 100 ? "99+" : taskCount;
  return (
    <TouchableOpacity  {...props} style={taskButtonStyle.container}>
      <View style={taskButtonStyle.content}>
        <Text style={taskButtonStyle.buttonText}>View Task(s)</Text>
        <View  style={taskButtonStyle.button}>
          <View style={taskButtonStyle.badge}>
            <Text style={taskButtonStyle.badgeText}>{taskCountCheck}</Text>
          </View>
          <Image style={{ width: 24, height: 24 }} source={expanButton} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const taskButtonStyle = StyleSheet.create({
  container: {
    backgroundColor: "#00923F",
    width: "90%",
    height: 62,
    position: "absolute",
    top: 69,
    left: "5%",
    zIndex: 10,
    borderRadius: 8,
  },
  content: {
    flexDirection: "row",
    paddingVertical: 18,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems:'center',
    alignContent:'center'
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    // lineHeight: 29,
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
    height: 251,
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
    height: 30,
    width: "100%",
    marginVertical: 17,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems:"center",
    paddingHorizontal: 22,
    // paddingVertical: 5,
  },
  switchText: {
    color: "#ffff",
    opacity: 0.5,
    fontSize: 18,
    lineHeight: 32,
    textTransform: "uppercase",
  },
  switchButton: {
    // width: '100%'
    // marginVertical:15
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
});
