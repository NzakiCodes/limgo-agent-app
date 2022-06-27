import React, { useState } from 'react'
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, Button } from 'react-native-ui-lib';
import TextField from '../../components/atoms/TextField';
import AuthApi from '../../api/auth';
import userService from '../../services/user.service';


const logo = require("../../assets/images/logo_icon.png");
const backIcon = require("../../assets/icons/backIcon.png");


const ChangePassword = ({ route, navigation }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { email } = route.params || {};
    const [error, setError] = useState({
      errorValue: false,
      message: "",
    });
  
    const onSubmit = async () => {
      if (oldPassword === "") {
        Alert.alert("Enter Old Password", "Please Enter old Password");
        return 0;
      }
      if (oldPassword.length < 6) {
        Alert.alert(
          "Old Passwords too short",
          "Please enter up to 6 characters."
        );
        return 0;
      } else if (newPassword !== confirmPassword) {
        Alert.alert(
          "Passwords Must match",
          "Please New Password should match Confirm Password"
        );
        return 0;
      } else if (oldPassword.length < 6) {
        Alert.alert("Passwords too short", "Please enter up to 6 characters.");
        return 0;
      } else if (newPassword.length < 6) {
        Alert.alert("Passwords too short", "Please enter up to 6 characters.");
        return 0;
      } else {
        var res = await updatePassword();
        if (res.status === 200) {
          setError({
            errorValue: false,
            message: "",
          });
          navigation.navigate("SignIn");
        } else {
          setError({
            errorValue: true,
            message: "Wrong Code",
          });
        }
      }
    };

   
    async function updatePassword() {
        try {
            // const res = await AuthApi.UpdatePassword(data);
            // console.log(oldPassword, newPassword, confirmPassword);
            const res = await userService.changePassword(
              oldPassword,
              newPassword,
              confirmPassword
            );
            const resData = await res.json();
            console.log(resData);
            console.log(resData.message);
            if (
              resData.message ===
              "New Password cannot be same as your current password. Please choose a different password."
            ) {
              Alert.alert(
                resData.message === "New Passwords Required",
                resData.message
              );
            } else if (resData.message === "Current password is Wrong !!") {
              Alert.alert("Wrong Password", resData.message);
            } else {
              Alert.alert("Passwords Successfully Change", resData.message);
              navigation.navigate("Home");
            }
      
            setError({
              errorValue: false,
              message: "",
            });
            return res;
          } catch (error) {
            return error;
          }
    }

    return (
        <SafeAreaView
      style={{
        paddingVertical: 15,
        paddingHorizontal: 25,
        backgroundColor: "rgba(255, 255, 255, 1)",
        height: "100%",
      }}
    >
      <View style={styles.navigatorContainer}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image source={backIcon} style={styles.backButton} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.heading}>Change Password</Text>
        </View>
        <View>
          <Text style={{ opacity: 0 }}>Password</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={{ marginVertical: 20 }}>
          <TextField
            textBold
            textStyle={{
              marginLeft: 15,
              fontSize: 14,
              marginBottom: -2,
              color: "rgba(51, 51, 51, 1)",
              fontWeight: "normal",
            }}
            inputStyle={{
              backgroundColor: "rgba(247, 247, 247, 1)",
              borderWidth: 0,
              marginBottom: -20,
              color: "#4B4D5A",
            }}
            title={"Enter Old Password"}
            securePassword={true}
            value={oldPassword}
            onChangeText={(text) => setOldPassword(text)}
          />
          <TextField
            textBold
            title={"Enter New Password"}
            textStyle={{
              marginLeft: 15,
              fontSize: 14,
              marginBottom: -2,
              color: "rgba(51, 51, 51, 1)",
              fontWeight: "normal",
            }}
            inputStyle={{
              backgroundColor: "rgba(247, 247, 247, 1)",
              borderWidth: 0,
              marginBottom: -20,
              color: "#4B4D5A",
            }}
            securePassword={true}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
          <TextField
            textBold
            title={"Enter Confirm Password"}
            textStyle={{
              marginLeft: 15,
              fontSize: 14,
              marginBottom: -2,
              color: "rgba(51, 51, 51, 1)",
              fontWeight: "normal",
            }}
            inputStyle={{
              backgroundColor: "rgba(247, 247, 247, 1)",
              borderWidth: 0,
              marginBottom: -20,
              color: "#4B4D5A",
            }}
            securePassword={true}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <View>
          <Button
            label="Change Password"
            labelStyle={{ fontSize: 16, fontWeight: "bold" }}
            style={{
              backgroundColor: "#00923f",
              height: 54,
              marginVertical: 20,
              borderRadius: 24,
            }}
            onPress={() => onSubmit()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    navigatorContainer: {
      // flex: 2,
      justifyContent: "space-between",
      flexDirection: "row",
      paddingVertical: 5,
      height: 40,
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
    formContainer: {
      flex: 1,
      justifyContent: "space-between",
      // flexDirection: 'column',
      // alignContent: 'space-between',
    },
  });

export default ChangePassword
