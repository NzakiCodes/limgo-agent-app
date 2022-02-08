import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, Button } from 'react-native-ui-lib';
import AuthApi from '../../api/auth';
import axios from 'axios';
import TextField from '../../components/atoms/TextField';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../slices/auth';


const logo = require("../../assets/images/logo_icon.png");
const backIcon = require("../../assets/icons/chevron-left.png");


const Register = ({ route, navigation }) => {
    const [password, setPassword] = useState('');
    const [repeat_password, setRepeatPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { email, phoneNumber } = route.params;
    const [error, setError] = useState({
        errorValue: false,
        message: ""
    })
    const initialValues = {
        email,
        phone_number: phoneNumber,
        password,
        repeat_password
    };
    const validate = (values) => {
        if (!values.password || values.password) {
            setError({ values: "Please Repeat Password same as Password", errorValue: true })

        }
        if (values.password !== values.repeat_password) {
            setError({ values: "PPlease Enter a Password')", errorValue: true })
        }
    }
    const onSubmit = async () => {
        if (password === '') {
            Alert.alert('Enter Password', 'Please Enter a Password')
            return 0
        }
        else if (repeat_password === '') {
            Alert.alert('Enter Repeat Password', 'Please Repeat Password')
            return 0
        } else if (password !== repeat_password) {
            Alert.alert('Passwords Must match', 'Please Repeat Password same as Password')
            return 0
        }
        else {
            var res = await createUser()
            if (res.status === 200) {
                navigation.navigate("VerifyPhone", { phoneNumber })
            } else if (res.status === 400) {
                setError({
                    errorValue: true,
                    message: "Invalid Email or Phone Number"
                })
            }

        }
    }
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(clearMessage());
    }, [dispatch])

    const handleRegister = (values) => {
        const { email, phone_number, password, repeat_password } = values;
        if (password === '') {
            Alert.alert('Enter Password', 'Please Enter a Password')
            return 0
        } else if (password.length < 6) {
            Alert.alert('Enter 6 characters', 'Please Enter up to 6 characters as pasword')
            return 0
        } else if (repeat_password === '') {
            Alert.alert('Enter Repeat Password', 'Please Repeat Password')
            return 0
        } else if (password !== repeat_password) {
            Alert.alert('Passwords Must match', 'Please Repeat Password same as Password')
            return 0
        }
        setLoading(true);
        // console.log(values);

        dispatch(register({email, phone_number, password}))
        .unwrap()
        .then(()=>{
            navigation.navigate("VerifyPhone")
        })
        .catch(()=>{
            setLoading(false)
        })

    }

    // async function createUser() {
    //     const body = {
    //         'email': email,
    //         'phoneNumber': phoneNumber,
    //         'password': password
    //     }
    //     const data = JSON.stringify(body)
    //     try {
    //         const response = await AuthApi.Register(data);
    //         return response;
    //     } catch (error) {
    //         return error;
    //     }
    // }
    return (
        <SafeAreaView style={{ marginVertical: 45, marginHorizontal: 30 }}>
            {error.errorValue == true ? <Text>{error.message}</Text> : <Text></Text>}
            <ScrollView>
                <Button
                    iconSource={backIcon}
                    style={{ width: 44, height: 44 }}
                    color={"#4B4D5A"}
                    backgroundColor={"#F7F7F7"}
                    onPress={() => navigation.navigate("SignUp")}
                />
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <Image style={{ width: 118, height: 84 }} source={logo} />
                </View>
                <Text black text30BL style={{ fontWeight: "bold" }}>Create Password</Text>
                <Text grey30>Create a strong password for {email}</Text>

                <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={handleRegister}
                >
                    {({ handleSubmit, handleBlur, handleChange, values }) => (
                        <View style={{ marginVertical: 20 }}>
                            <TextField textBold title={"Password"} placeholder={"Enter Password"} securePassword={true} value={values.password} onChangeText={handleChange('password')} />
                            <TextField textBold title={"Repeat Password"} placeholder={"Repeat Password"} securePassword={true} value={values.repeat_password} onChangeText={handleChange('repeat_password')} />
                            <Button
                                label="Sign Up"
                                labelStyle={{ fontSize: 18, fontWeight: 'bold' }}
                                style={{ backgroundColor: '#00923f', height: 58, marginVertical: 20, borderRadius: 24 }}
                                onPress={handleSubmit}
                            />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Register
