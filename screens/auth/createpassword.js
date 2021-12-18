import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, Button } from 'react-native-ui-lib';
import TextField from '../../components/atoms/TextField';

const logo = require("../../assets/images/logo_icon.png");
const backIcon = require("../../assets/icons/chevron-left.png");


const CreatePassword = () => {
    return (
        <SafeAreaView style={{ marginVertical: 45, marginHorizontal: 30 }}>
            <ScrollView>
            <Button
                iconSource={backIcon}
                style={{width: 44, height: 44}}
                color={"#4B4D5A"}
                backgroundColor={"#F7F7F7"}
              />
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <Image style={{ width: 118, height: 84 }} source={logo} />
                </View>
                <Text black text30BL style={{ fontWeight: "bold" }}>Create Password</Text>
                <Text grey30>Create a strong password</Text>

                <View style={{ marginVertical: 20 }}>
                    <TextField textBold title={"Password"} placeholder={"Enter Password"} securePassword={true} />
                    <TextField textBold title={"Repeat Password"} securePassword={true} />
                    <Button
                        label="Sign Up"
                        labelStyle={{ fontSize: 18, fontWeight: 'bold' }}
                        style={{ backgroundColor: '#00923f', height: 58, marginVertical: 20, borderRadius: 24 }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreatePassword
