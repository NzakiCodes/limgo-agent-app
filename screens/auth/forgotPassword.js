import React, { useState } from 'react'
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, Button } from 'react-native-ui-lib';
import TextField from '../../components/atoms/TextField';
import AuthApi from '../../api/auth';

const backIcon = require("../../assets/icons/chevron-left.png");


const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState({
        errorValue: false,
        message: ""
    })
    const onSubmit = async () => {
        if (email === '') {
            Alert.alert('Enter Email', 'Please Enter an Email')
            return 0
        } else {
            var res = await requestPasswordOTP();
            if (res.status === 200) {
                setError({
                    errorValue: false,
                    message: ""
                })
                navigation.navigate("RecoveryCode",{email})
            }
            else {
                setError({
                    errorValue: true,
                    message: "Invalid Email"
                })
            }

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
            setEmail(body.email)
            return res;
        } catch (error) {
            setEmail(body.email)
            return error;
        }
    }
    return (
        <SafeAreaView style={{ paddingVertical: 45, paddingHorizontal: 30, backgroundColor: '#00923F', height: '100%' }}>
            <ScrollView contentContainerStyle={{ display: 'flex', justifyContent: 'space-between' }}>
                <View>
                    <Button
                        iconSource={backIcon}
                        style={{ width: 44, height: 44, marginLeft: -15, marginBottom: 18 }}
                        color={"#ffffff"}
                        backgroundColor={"#00923F"}
                        onPress={() => navigation.goBack()}
                    />
                    <Text white text20BL style={{ fontWeight: "bold", width: 255 }}>Forgot password?</Text>
                    <Text color="#FDFDFD" style={{ opacity: 0.7, fontSize: 14 }}  >The recovery code was sent to your email. Please enter the code:</Text>

                </View>
                <Text></Text>
                <View style={{ marginVertical: 20 }}>
                {error.errorValue === true &&
                    <View style={{ backgroundColor: "#e90000", color: "#ffffff",borderRadius:14,marginBottom:-23 }}>
                        {error.errorValue === true ? <Text style={{ color: "#ffffff",padding:12,fontSize:18 }}>{error.message} !</Text> : <Text>""</Text>}
                    </View>
                }
                    <TextField error={error.errorValue} placeholder={"Enter Email address"} placeholderTextColor={"#2E384D"} inputStyle={{ backgroundColor: '#ffffff', opacity: 0.9 }}  onChangeText={(text) => setEmail(text)} />
                    <Button
                        label="Request"
                        labelStyle={{ fontSize: 18, fontWeight: 'bold', color: "#FDFDFD" }}
                        style={{ backgroundColor: '#333333', height: 58, marginVertical: 20, borderRadius: 24 }}
                        onPress={() => onSubmit()}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ForgotPassword
