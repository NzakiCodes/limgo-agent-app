import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, Button } from "react-native-ui-lib";
import AuthApi from "../../api/auth";
import axios from "axios";
import TextField from "../../components/atoms/TextField";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../slices/auth";
import * as SecureStore from "expo-secure-store";
import authService from "../../services/auth.service";

const logo = require("../../assets/images/logo_icon.png");
const backIcon = require("../../assets/icons/chevron-left.png");

const Register = ({ route, navigation }) => {
  const [password, setPassword] = useState("");
  const [repeat_password, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { email, phoneNumber } = route.params;
  const [error, setError] = useState({
    errorState: false,
    values: "",
  });
  const initialValues = {
    email,
    phone_number: phoneNumber,
    password,
    repeat_password,
  };
  const validate = (values) => {
    if (!values.password) {
      setError({
        values: "Enter a Password!",
        errorState: true,
      });
    } else {
      setError({
        values: "",
        errorState: false,
      });
    }
    if (values.password !== values.repeat_password) {
      setError({ values: "Password must match.", errorState: true });
    } else {
      setError({
        values: "",
        errorState: false,
      });
    }
  };
  const onSubmit = async () => {
    if (password === "") {
      setError({
        values: "Please Enter a Password!",
        errorState: true,
      });
      return 0;
    } else if (repeat_password === "") {
      //   Alert.alert("Enter Repeat Password", "Please Repeat Password");
      setError({
        values: "Enter Repeat Password!",
        errorState: true,
      });
      return 0;
    } else if (password !== repeat_password) {
      setError({
        values: "Password must match!",
        errorState: true,
      });
      return 0;
    } else {
      var res = await createUser();
      if (res.status === 200) {
        navigation.navigate("VerifyPhone", { phoneNumber });
      } else if (res.status === 400) {
        setError({
          errorState: true,
          values: "Invalid Email or Phone Number",
        });
      }
    }
  };

  const handleRegister = async (values) => {
    const { email, phone_number, password, repeat_password } = values;
    if (password === "") {
      //   Alert.alert("Enter Password", "");
      setError({
        values: "Please Enter a Password!",
        errorState: true,
      });
      return 0;
    } else if (password.length < 6) {
      setError({
        values: "Please Enter up to 6 characters as pasword!",
        errorState: true,
      });
      return 0;
    } else if (repeat_password === "") {
      setError({
        values: "Enter Repeat Password!",
        errorState: true,
      });
      return 0;
    } else if (password !== repeat_password) {
      setError({
        values: "Please Repeat Password same as Password!",
        errorState: true,
      });
      return 0;
    }
    setLoading(true);
    console.log(values);

    try {
      const registerRequest = await authService.register({
        email,
        phone_number,
        password,
      });
      const res = await registerRequest.json();
      if (res.errors) {
        const errorObject = res.errors;
        for (const property in errorObject) {
          setError({ values: errorObject[property], errorState: true });
        }
        console.error(res.errors);
      }
      console.log(res.data);
      navigation.navigate("VerifyPhone", { user_id: res.data.id });
    } catch (error) {
      console.log(error);
      setError({ values: error.message, errorState: true });
    }

    /*  dispatch(register({email, phone_number, password}))
        .unwrap()
        .then((res)=>{
            navigation.navigate("VerifyPhone");
            SecureStore.setItemAsync('user_id', res.user.user.id);
            // navigation.navigate("Home")

        })
        .catch((message)=>{
            setLoading(false)
            console.log(message);

        }) */
  };
  return (
    <SafeAreaView style={{ marginVertical: 45, marginHorizontal: 30 }}>
      <ScrollView>
        <Button
          iconSource={backIcon}
          style={{ width: 44, height: 44 }}
          color={"#4B4D5A"}
          backgroundColor={"#F7F7F7"}
          onPress={() => navigation.navigate("SignUp")}
        />
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <Image style={{ width: 118, height: 84 }} source={logo} />
        </View>
        <Text black text30BL style={{ fontWeight: "bold" }}>
          Create Password
        </Text>
        <Text grey30>Create a strong password for {email}</Text>

        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleRegister}
        >
          {({ handleSubmit, handleBlur, handleChange, values }) => (
            <View style={{ marginVertical: 20 }}>
              {error.errorState === true ? (
                <Text
                  style={{ color: "red", fontSize: 16, fontWeight: "bold" }}
                >
                  {error.values}
                </Text>
              ) : (
                <Text></Text>
              )}
              <TextField
                textBold
                title={"Password"}
                placeholder={"Enter Password"}
                securePassword={true}
                value={values.password}
                onChangeText={handleChange("password")}
              />
              <TextField
                textBold
                title={"Repeat Password"}
                placeholder={"Repeat Password"}
                securePassword={true}
                value={values.repeat_password}
                onChangeText={handleChange("repeat_password")}
              />
              <Button
                label="Sign Up"
                labelStyle={{ fontSize: 18, fontWeight: "bold" }}
                style={{
                  backgroundColor: "#00923f",
                  height: 58,
                  marginVertical: 20,
                  borderRadius: 24,
                }}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
