import React, { useState } from 'react'
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
    const { phoneNumber } = route.params;

    useEffect(async () => {
        try {
            const res = await AuthApi.ForgotPassword();
        } catch (error) {

        }
    }, [])

    const onFulfill = () => {
        data.append('verification_code', code);
        data.append('phone_number', phoneNumber);


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
                        animated={false}
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
                        autoFocus={true}
                        codeLength={4}
                        value={code}
                        onTextChange={code => setCode(code)}
                        onFulfill={() => onFulfill()}
                    />
                </View>
                <View style={{ alignItems: 'center', justifyContent: "center", flexDirection: 'row', position: 'absolute', bottom: 0 }}>
                    <Text style={{ color: '#FDFDFD', opacity: 0.59, fontSize: 15 }}>
                        Didn&apos;t receive it? {' '}

                    </Text>
                    <Button link linkColor="#FDFDFD" onPress={() => navigation.navigate("ForgotPassword", { resend: true })} label="Resend Code" />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RecoveryCode
