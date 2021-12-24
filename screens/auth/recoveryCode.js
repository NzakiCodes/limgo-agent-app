import React, { useState, useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Button } from 'react-native-ui-lib';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import AuthApi from '../../api/auth';
var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();

const backIcon = require("../../assets/icons/chevron-left.png");


const RecoveryCode = ({ route, navigation }) => {
    const [code, setCode] = useState('');
    const codeInput = useRef(null);
    const [error, setError] = useState({
        errorValue: false,
        message: ""
    })
    const { email } = route.params;

    const onFulfill = async () => {
        var res = await verifyPasswordOTP();
        if (res.status === 200) {
            setError({
                errorValue: false,
                message: ""
            })
            navigation.navigate("UpdatePassword", { email })
        }
        else {
            setError({
                errorValue: true,
                message: "Wrong Code"
            })
            codeInput.current.shake()
        }

    }

    async function verifyPasswordOTP() {
        const body = {
            'email': email,
            'code': code
        }
        const data = JSON.stringify(body)
        try {
            const res = await AuthApi.ForgotPasswordVerify(data);
            setError({
                errorValue: false,
                message: ""
            })
            return res;
        } catch (error) {
            return error;
        }
    }
    async function requestPasswordOTP() {
        const body = {
            'email': email
        }
        const data = JSON.stringify(body)
        try {
            const res = await AuthApi.ForgotPasswordRequest(data);
            setError({
                errorValue: false,
                message: ""
            })
            return res;
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
                    <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
                        <Button
                            label="Verify"
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
                    <Button link linkColor="#FDFDFD" onPress={() => requestPasswordOTP()} label="Resend Code" />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RecoveryCode
