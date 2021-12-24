import React, { useState } from 'react'
import { Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, Button } from 'react-native-ui-lib';
import TextField from '../../components/atoms/TextField';
import AuthApi from '../../api/auth';


const logo = require("../../assets/images/logo_icon.png");


const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({
        errorValue: false,
        message: ""
    })

    const onSubmit = async () => {
        if (email === '') {
            Alert.alert('Enter Email', 'Please Enter an Email')
            return 0
        } else if (password == '') {
            Alert.alert('Enter password', 'Please enter a Password')
            return 0
        }
        else {
            var res = await getUser()
            if (res.status === 200) {
                setError({
                    errorValue: false,
                    message: ""
                })
                navigation.navigate("Home")
            }
            else {
                setError({
                    errorValue: true,
                    message: "Invalid Email and password"
                })
            }

        }
    }

    async function getUser() {
        const body = {
            'email': email,
            'password': password
        }
        const data = JSON.stringify(body)
        try {
            const res = await AuthApi.Login(data);
            setError({
                errorValue: false,
                message: ""
            })
            setEmail(body.email)
            setPassword(body.password)
            return res;
        } catch (error) {
            return error;
        }
    }
    return (
        <SafeAreaView style={{ marginVertical: 45, marginHorizontal: 30 }}>
            <ScrollView>
                <View style={{ alignItems: 'center', marginVertical: 45 }}>
                    <Image style={{ width: 118, height: 84 }} source={logo} />
                </View>
                <Text black text30BL style={{ fontWeight: "bold" }}>Sign In</Text>
                <Text grey30>Welcome Back to Limgo Logistics</Text>
                {error.errorValue === true &&
                    <View style={{ backgroundColor: "red", color: "#ffffff",padding:10,borderRadius:14,marginTop:10 }}>
                        {error.errorValue === true ? <Text style={{ color: "#ffffff",padding:10,fontSize:16 }}>{error.message}</Text> : <Text>""</Text>}
                    </View>
                }
                <View style={{ marginVertical: 20 }}>
                    <TextField error={error.errorValue} textBold title={"Email Address"} onChangeText={(text) => setEmail(text)} />
                    <TextField error={error.errorValue} textBold title={"Password"} securePassword={true} onChangeText={(text) => setPassword(text)} />
                    <Button onPress={() => navigation.navigate("ForgotPassword")} link linkColor="#00923F" style={{ color: '#00923F', alignSelf: 'flex-end' }} label="Forgot Passwords?" />
                    <Button
                        label="Login"
                        labelStyle={{ fontSize: 18, fontWeight: 'bold' }}
                        style={{ backgroundColor: '#00923f', height: 58, marginVertical: 20, borderRadius: 24 }}
                        onPress={() => onSubmit()}
                    />
                </View>
                <View style={{ alignItems: 'center', justifyContent: "center", flexDirection: 'row', position: 'absolute', bottom: 0, left: '20%' }}>
                    <Text style={{ color: '#4B4D5A', fontSize: 15, textAlign: 'center' }}>
                        Don't have an account? {''}
                    </Text>
                    <Button onPress={() => navigation.navigate("SignUp")} link linkColor="#00923F" label="Sign Up" />
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default SignIn
