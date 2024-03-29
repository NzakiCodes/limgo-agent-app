import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Button } from "react-native-ui-lib";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { Alert } from "react-native";
import AuthApi from "../../api/auth";
import userService from "../../services/user.service";
import * as SecureStore from "expo-secure-store";
import authService from "../../services/auth.service";

const backIcon = require("../../assets/icons/chevron-left.png");

const VerifyPhone = ({ route, navigation }) => {
  const [code, setCode] = useState("");

  const { user_id } = route.params;

  const onSubmit = async () => {
    try {
      console.log(code);
      const verifyRequest = await authService.verifyPhone({
        user_id: user_id,
        code: code,
      });
      const res = await verifyRequest.json();
      console.log(res);

      if (res.status === "success") {
        navigation.navigate("SignIn");
      }
    } catch (error) {}
    // if (res.data.status === "success") {
    //   navigation.navigate("SignIn");
    // }
  };

  function verifyUserOTP(code, token, user_id) {
    try {
      const res = userService.verifyPhone(code, token, user_id);
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView
      style={{
        paddingVertical: 45,
        paddingHorizontal: 15,
        backgroundColor: "#ffffff",
        height: "100%",
      }}
    >
      <ScrollView
        contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
      >
        <View>
          <Button
            iconSource={backIcon}
            style={{ width: 44, height: 44, marginLeft: 0, marginBottom: 18 }}
            color={"#4B4D5A"}
            backgroundColor={"#F7F7F7"}
            onPress={() => navigation.goBack()}
          />
          <View style={{ paddingHorizontal: 10 }}>
            <Text black text20BL style={{ fontWeight: "bold", width: 225 }}>
              Verify Phone Number
            </Text>
            <Text color="#2E384D">
              Enter the four digit code sent to your phone
            </Text>
          </View>
          <View style={{ marginVertical: 60 }}>
            <SmoothPinCodeInput
              placeholder={
                <View
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 25,
                    backgroundColor: "#D6D6D6",
                  }}
                ></View>
              }
              cellStyle={{
                borderBottomWidth: 4,
                borderColor: "#D6D6D6",
                marginRight: 13,
                width: 62,
                height: 58,
              }}
              containerStyle={{
                width: "100%",
              }}
              cellStyleFocused={{
                borderColor: "#00923F",
              }}
              codeLength={4}
              textStyle={{
                color: "#00923F",
                fontSize: 32,
                fontWeight: "bold",
              }}
              keyboardType="phone-pad"
              restrictToNumbers={true}
              // autoFocus={true}
              value={code}
              onTextChange={(code) => setCode(code)}
            />
          </View>
        </View>

        <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
          <Button
            label="Verify"
            labelStyle={{ fontSize: 18, fontWeight: "bold" }}
            style={{
              backgroundColor: "#00923f",
              height: 58,
              marginVertical: 20,
              borderRadius: 24,
            }}
            onPress={() => onSubmit()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyPhone;
