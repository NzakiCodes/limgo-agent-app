import React, { useState } from 'react'
import { TextInput, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, Button } from 'react-native-ui-lib';
import TextField from '../../components/atoms/TextField';

const logo = require("../../assets/images/logo_icon.png");


const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState({
        email: {
            errorValue: false,
            message: ""
        },
        phoneNumber: {
            errorValue: false,
            message: ""
        }
    })

    const onSubmit = () => {
        if (email === '' && email.length < 4) {

            setError({
                email: {
                    errorValue: true,
                    message: 'Please enter a correct Email'
                },
                phoneNumber: {
                    errorValue: false,
                    message: ''
                }
            })
            return null;
        } else if (phoneNumber.length < 11) {
            setError({
                email: {
                    errorValue: false,
                    message: ''
                }, phoneNumber: {
                    errorValue: true,
                    message: 'Please enter a correct Phone Number'
                }
            })
            return null;
        } else {
            navigation.navigate("CreatePassword", {
                email,
                phoneNumber
            })
        }
    }
    

    return (
        <SafeAreaView style={{ marginTop: 45, marginBottom: 30, marginHorizontal: 30, height: '100%' }}>
            <ScrollView contentContainerStyle={{ flex: 1, }}>
                <View>
                    <View style={{ alignItems: 'center', marginVertical: 45 }}>
                        <Image style={{ width: 118, height: 84 }} source={logo} />
                    </View>
                    <Text black text30BL style={{ fontWeight: "bold" }}>Sign Up</Text>
                    <Text grey30>Welcome to Limgo Logistics</Text>

                    <View style={{ marginVertical: 20 }}>
                        <TextField error={error.email.errorValue} textBold title={"Email Address"} securePassword={false} value={email} onChangeText={(text) => setEmail(text)} />
                        <Text style={{ color: '#e90000' }}>{error.email.errorValue ? error.email.message : ''}</Text>

                        <TextField error={error.phoneNumber.errorValue} textBold title={"Phone Number"} keyboardType='phone-pad' value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)} />
                        <Text style={{ color: '#e90000' }}>{error.phoneNumber.errorValue ? error.phoneNumber.message : ''}</Text>

                        <Button label="Next" onPress={() => onSubmit()} paddingV style={{ backgroundColor: '#00923f', paddingVertical: 20, marginVertical: 20, }} square></Button>
                    </View>
                </View>
                <View>
                    <View style={{ alignItems: 'center', justifyContent: "center", flexDirection: 'row', position: 'absolute', bottom: 0, left: '20%' }}>
                        <Text style={{ color: '#4B4D5A', fontSize: 15, textAlign: 'center' }}>
                            Already have an account? {''}
                        </Text>
                        <Button onPress={() => navigation.navigate("SignIn")} link linkColor="#00923F" label="Sign In" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp
