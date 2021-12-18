import React from 'react'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, Button } from 'react-native-ui-lib';
import TextField from '../../components/atoms/TextField';

const logo = require("../../assets/images/logo_icon.png");


const SignUp = () => {
    return (
        <SafeAreaView style={{ marginVertical: 45, marginHorizontal: 30 }}>
            <ScrollView>
                <View style={{ alignItems: 'center', marginVertical: 45 }}>
                    <Image style={{ width: 118, height: 84 }} source={logo} />
                </View>
                <Text black text30BL style={{ fontWeight: "bold" }}>Sign Up</Text>
                <Text grey30>Welcome to Limgo Logistics</Text>

                <View style={{ marginVertical: 20 }}>
                    <TextField title={"Email Address"} securePassword={true} />
                    <TextField title={"Phone Number"} />
                    <Button label="Next" paddingV style={{ backgroundColor: '#00923f', paddingVertical: 20, marginVertical: 20, }} square></Button>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp
