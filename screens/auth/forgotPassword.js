import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, Button } from 'react-native-ui-lib';
import TextField from '../../components/atoms/TextField';

const logo = require("../../assets/images/logo_icon.png");
const backIcon = require("../../assets/icons/chevron-left.png");


const ForgotPassword = ({navigation}) => {
    return (
        <SafeAreaView style={{ paddingVertical: 45, paddingHorizontal: 30, backgroundColor:'#00923F', height:'100%' }}>
            <ScrollView contentContainerStyle={{ display: 'flex', justifyContent: 'space-between' }}>
                <View>
                    <Button
                        iconSource={backIcon}
                        style={{ width: 44, height: 44, marginLeft:-15, marginBottom:18 }}
                        color={"#ffffff"}
                        backgroundColor={"#00923F"}
                        onPress={()=>navigation.goBack()}
                    />
                    <Text white text20BL style={{ fontWeight: "bold", width: 255 }}>Forgot password?</Text>
                    <Text color="#FDFDFD" style={{opacity:0.7, fontSize:14}}  >The recovery code was sent to your email. Please enter the code:</Text>

                </View>
                <Text></Text>
                <View style={{ marginVertical: 20 }}>
                    <TextField placeholder={"Enter Email address"} placeholderTextColor={"#2E384D"} inputStyle={{backgroundColor:'#ffffff',opacity:0.9}}/>
                    <Button
                        label="Request"
                        labelStyle={{ fontSize: 18, fontWeight: 'bold', color:"#FDFDFD" }}
                        style={{ backgroundColor: '#333333', height: 58, marginVertical: 20, borderRadius: 24 }}
                        onPress={()=>navigation.navigate('RecoveryCode')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ForgotPassword
