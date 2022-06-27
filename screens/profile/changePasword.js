import React, { useState } from 'react'
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, Button } from 'react-native-ui-lib';
import TextField from '../../components/atoms/TextField';
import AuthApi from '../../api/auth';


const logo = require("../../assets/images/logo_icon.png");
const backIcon = require("../../assets/icons/backIcon.png");


const ChangePassword = ({ route, navigation }) => {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const { email } = route.params || {};
    const [error, setError] = useState({
        errorValue: false,
        message: ""
    })

    const onSubmit = async () => {
        if (password === '') {
            Alert.alert('Enter Password', 'Please Enter a Password')
            return 0
        } else if (password !== repeatPassword) {
            Alert.alert('Passwords Must match', 'Please Repeat Password same as Password')
            return 0
        }
        else if (password < 10) {
            Alert.alert('Passwords too short', 'Please enter up to 3 characters.')
            return 0
        }
        else {
            var res = await updatePassword();
            if (res.status === 200) {
                setError({
                    errorValue: false,
                    message: ""
                })
                navigation.navigate("SignIn")
            }
            else {
                setError({
                    errorValue: true,
                    message: "Wrong Code"
                })
            }
        }
    }
    async function updatePassword() {
        const body = {
            'email': email,
            'password': password
        }
        const data = JSON.stringify(body)
        try {
            const res = await AuthApi.UpdatePassword(data);
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
        <SafeAreaView style={{ paddingVertical: 15, paddingHorizontal: 25, backgroundColor: 'rgba(255, 255, 255, 1)', height: '100%' }}>
            <View style={styles.navigatorContainer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Image source={backIcon} style={styles.backButton} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.heading}>Change Password</Text>
                </View>
                <View>
                    <Text style={{ opacity: 0 }}>assword</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.formContainer}>
                <View style={{ marginVertical: 20 }}>
                    <TextField textBold
                        textStyle={{ marginLeft: 15, fontSize: 14, marginBottom: -2, color: 'rgba(51, 51, 51, 1)', fontWeight: 'normal' }}
                        inputStyle={{ backgroundColor: 'rgba(247, 247, 247, 1)', borderWidth: 0, marginBottom: -20, color: '#4B4D5A' }}
                        title={"Enter Old Password"}
                        securePassword={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TextField
                        extBold
                        title={"Enter New Password"}
                        textStyle={{ marginLeft: 15, fontSize: 14, marginBottom: -2, color: 'rgba(51, 51, 51, 1)', fontWeight: 'normal' }}
                        inputStyle={{ backgroundColor: 'rgba(247, 247, 247, 1)', borderWidth: 0, marginBottom: -20, color: '#4B4D5A' }}
                        securePassword={true} value={repeatPassword}
                        onChangeText={(text) => setRepeatPassword(text)}
                    />

                </View>
                <View>
                    <Button
                        label="Change Password"
                        labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                        style={{ backgroundColor: '#00923f', height: 54, marginVertical: 20, borderRadius: 24 }}
                        onPress={() => navigation.navigate("Home")}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    navigatorContainer: {
        // flex: 2,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 5,
        height: 40
    },
    backButton: {
        width: 38,
        height: 36
    },
    heading: {
        color: '#4B4D5A',
        fontSize: 18,
        flex: 1,
        fontWeight: 'bold',
        alignContent: 'center',
        flexDirection: 'row',
        marginTop: 5,
        textAlign: 'center'
    },
    formContainer: {
        flex: 1,
        justifyContent: 'space-between',
        // flexDirection: 'column',
        // alignContent: 'space-between',

    }
})

export default ChangePassword
