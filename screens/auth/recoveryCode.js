import React, { useState, useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Button } from 'react-native-ui-lib';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import TextField from '../../components/atoms/TextField';

import { API_SERVER } from '../../config/constants';
import AuthApi from '../../api/auth';
var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();

const backIcon = require("../../assets/icons/chevron-left.png");


const RecoveryCode = ({ navigation }) => {
    const [code, setCode] = useState('');
    const codeInput = useRef(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState({
        errorValue: false,
        message: ""
    })


    const onFulfill = async () => {
        const res = await requestPasswordOTP();
        const response = JSON.parse(res)
        console.log("response")
        console.log(response)
        if (response.status === "success") {
            navigation.navigate('SignIn')
        }
    }

    async function requestPasswordOTP() {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");

            var formdata = new FormData();
            formdata.append("otp", code);
            formdata.append("password", password);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

           return fetch(`${API_SERVER}/auth/reset-password`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    // console.log(result)
                    return result;
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            return error;
        }
    }
    return (
        <SafeAreaView style={{ paddingVertical: 45, paddingHorizontal: 25, backgroundColor: '#00923F', height: '100%' }}>
            <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', }}>
                <View>
                    <Button
                        iconSource={backIcon}
                        style={{ width: 44, height: 44, marginLeft: -15, marginBottom: 18 }}
                        color={"#ffffff"}
                        backgroundColor={"#00923F"}
                        onPress={() => navigation.goBack()}
                    />
                    <Text white text20BL style={{ fontWeight: "bold", width: 255, marginBottom: 16 }}>Enter 4-digit recovery code</Text>
                    <Text color="#FDFDFD" style={{ opacity: 0.7, fontSize: 14 }}  >The recovery code was sent to your email. Please enter the code:</Text>

                </View>
                {error.errorValue === true &&
                    <View style={{ backgroundColor: "#e90000", color: "#ffffff", borderRadius: 14, marginBottom: -23 }}>
                        {error.errorValue === true ? <Text style={{ color: "#ffffff", padding: 12, fontSize: 18 }}>{error.message} !</Text> : <Text>""</Text>}
                    </View>
                }
                <View style={{ marginVertical: 66 }}>
                    <SmoothPinCodeInput
                        cellStyle={{
                            borderWidth: 2,
                            borderColor: 'white',
                            backgroundColor: "#ffffff",
                            borderRadius: 9,
                            marginRight: 13,
                            width: 62,
                            height: 58
                        }}
                        ref={codeInput}
                        // animated={false}
                        containerStyle={{
                            width: '100%'
                        }}
                        textStyle={{
                            color: "#00923F",
                            fontSize: 28,
                            fontWeight: 'bold'
                        }}
                        cellStyleFocused={{
                            borderColor: '#00EC66',
                        }}
                        restrictToNumbers={true}
                        // autoFocus={true}
                        codeLength={4}
                        value={code}
                        onTextChange={code => setCode(code)}
                    // onFulfill={onFulfill}
                    />
                    <TextField textBold title={"New Password"} textStyle={{ color: '#ffffff' }} inputStyle={{ backgroundColor: '#ffffff' }} placeholder={"Enter New Password"} securePassword={true} value={password} onChangeText={(text) => setPassword(text)} />
                    <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
                        <Button
                            label="Update Password"
                            labelStyle={{ fontSize: 18, fontWeight: 'bold', color: '#00923f' }}
                            style={{ backgroundColor: '#ffffff', height: 58, marginVertical: 20, borderRadius: 24 }}
                            onPress={() => onFulfill()}
                        />
                    </View>
                </View>

                <View style={{ alignItems: 'center', justifyContent: "center", flexDirection: 'row', position: 'absolute', bottom: 0 }}>
                    <Text style={{ color: '#FDFDFD', opacity: 0.59, fontSize: 15 }}>
                        Didn&apos;t receive it? {' '}

                    </Text>
                    <Button link linkColor="#FDFDFD" onPress={() => onFulfill()} label="Resend Code" />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RecoveryCode
