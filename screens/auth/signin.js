import React from 'react'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native-ui-lib';
import TextField from '../../components/atoms/TextField';

const logo = require("../../assets/images/logo_icon.png");


const SignIn = () => {
    return (
        <SafeAreaView style={{ marginVertical: 45, marginHorizontal: 30 }}>
            <ScrollView>
                <View style={{ alignItems: 'center', marginVertical: 45 }}>
                    <Image style={{ width: 118, height: 84 }} source={logo} />
                </View>
                <Text black text30BL style={{ fontWeight: "bold" }}>Sign In</Text>
                <Text grey30>Welcome Back to Limgo Logistics</Text>

                <View style={{ marginVertical: 20 }}>
                    <TextField textBold title={"Email Address"} />
                    <TextField textBold title={"Password"} securePassword={true} />
                    <Text style={{ color: '#00923F', alignSelf: 'flex-end' }}>Forgot Passwords?</Text>
                    <Button
                        label="Login"
                        labelStyle={{ fontSize: 18, fontWeight: 'bold' }}
                        style={{ backgroundColor: '#00923f', height: 58, marginVertical: 20, borderRadius: 24 }}
                    />
                    {/* <Text style={{ color: '#4B4D5A', alignSelf: 'flex-end' }}>
                        Don't have an account?  <TouchableOpacity style={{ color: "#00923F" }}> </TouchableOpacity>
                    </Text> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn
