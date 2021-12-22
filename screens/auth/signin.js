import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, Button } from 'react-native-ui-lib';
import TextField from '../../components/atoms/TextField';
import AuthApi from '../../api/auth';
var FormData = require('form-data');

const logo = require("../../assets/images/logo_icon.png");


const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');




    const signIn = async() => {
        // var data = new FormData();

        // data.append('email', email);
        // data.append('password', password);

        const data1 = {
            email,
            password
        }

        try {
            const response = await AuthApi.Login(data1)
            console.log(await response.data);
        } catch (error) {
            console.log(error);
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

                <View style={{ marginVertical: 20 }}>
                    <TextField textBold title={"Email Address"} onTextChange={(text) => setEmail(text)} />
                    <TextField textBold title={"Password"} securePassword={true} onTextChange={(text) => setPassword(text)} />
                    <Button onPress={() => navigation.navigate("ForgotPassword")} link linkColor="#00923F" style={{ color: '#00923F', alignSelf: 'flex-end' }} label="Forgot Passwords?" />
                    <Button
                        label="Login"
                        labelStyle={{ fontSize: 18, fontWeight: 'bold' }}
                        style={{ backgroundColor: '#00923f', height: 58, marginVertical: 20, borderRadius: 24 }}
                        onPress={() => signIn()}
                    />
                </View>
                <View style={{ alignItems: 'center', justifyContent: "center", flexDirection: 'row', position: 'absolute', bottom: 0, left: '20%' }}>
                    <Text style={{ color: '#4B4D5A', fontSize: 15, textAlign: 'center' }}>
                        Don't have an account? {''}
                    </Text>
                    <Button onPress={() => navigation.navigate("SignUp")} link linkColor="#00923F" label="Sign Up" />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn
