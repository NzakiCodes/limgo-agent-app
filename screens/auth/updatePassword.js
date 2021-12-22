import React, { useState } from 'react'
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, Button } from 'react-native-ui-lib';
import TextField from '../../components/atoms/TextField';

const logo = require("../../assets/images/logo_icon.png");
const backIcon = require("../../assets/icons/chevron-left.png");


const UpdatePassword = ({ route, navigation }) => {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const { email, phoneNumber } = route.params;

    const onSubmit = () => {
        if (password === '') {
            Alert.alert('Enter Password', 'Please Enter a Password')
            return 0
        } else if (password !== repeatPassword) {
            Alert.alert('Passwords Must match', 'Please Repeat Password same as Password')
            return 0
        }
        else {
            console.log(signUp)
            // navigation.navigate("VerifyPhone")
        }
    }

    const signUp = () => {
        data.append('email', email);
        data.append('phone_number', phoneNumber);
        data.append('password', password);

        var config = {
            method: 'post',
            url: 'https://morning-waters-16532.herokuapp.com/api/auth/register',
            headers: {
                ...data.getHeaders()
            },
            data: data
        };

        return axios(config)
            .then(function (response) {
                return JSON.stringify(response.data);
            })
            .catch(function (error) {
                return error;
            });

    }

    return (
        <SafeAreaView style={{ marginVertical: 45, marginHorizontal: 30 }}>
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
                <Text black text30BL style={{ fontWeight: "bold" }}>Create New Password</Text>
                <Text grey30>Create a strong password for {email}</Text>

                <View style={{ marginVertical: 20 }}>
                    <TextField textBold title={"Password"} placeholder={"Enter Password"} securePassword={true} value={password} onChangeText={(text) => setPassword(text)} />
                    <TextField textBold title={"Repeat Password"} placeholder={"Repeat Password"} securePassword={true} value={repeatPassword} onChangeText={(text) => setRepeatPassword(text)} />
                    <Button
                        label="Sign Up"
                        labelStyle={{ fontSize: 18, fontWeight: 'bold' }}
                        style={{ backgroundColor: '#00923f', height: 58, marginVertical: 20, borderRadius: 24 }}
                        onPress={() => onSubmit()}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default UpdatePassword
