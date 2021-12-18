import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Button} from 'react-native-ui-lib';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

const backIcon = require("../../assets/icons/chevron-left.png");


const RecoveryCode = () => {
    const [code, setCode] = useState('');

    return (
        <SafeAreaView style={{ paddingVertical: 45, paddingHorizontal: 25, backgroundColor: '#00923F', height: '100%' }}>
            <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', }}>
                <View>
                    <Button
                        iconSource={backIcon}
                        style={{ width: 44, height: 44, marginLeft: -15, marginBottom: 18 }}
                        color={"#ffffff"}
                        backgroundColor={"#00923F"}
                    />
                    <Text white text20BL style={{ fontWeight: "bold", width: 255, marginBottom: 16 }}>Enter 4-digit recovery code</Text>
                    <Text color="#FDFDFD" style={{ opacity: 0.7, fontSize: 14 }}  >The recovery code was sent to your email. Please enter the code:</Text>

                </View>
                <View style={{ marginVertical: 66 }}>
                    <SmoothPinCodeInput
                        cellStyle={{
                            borderWidth: 2,
                            borderColor: 'white',
                            backgroundColor: "#ffffff",
                            borderRadius: 9,
                            marginRight: 13,
                            width: 62,
                            height: 58
                        }}
                        animated={false}
                        containerStyle={{
                            width: '100%'
                        }}
                        textStyle={{
                            color: "#00923F",
                            fontSize: 28,
                            fontWeight: 'bold'
                        }}
                        cellStyleFocused={{
                            borderColor: '#00EC66',
                        }}
                        restrictToNumbers={true}
                        autoFocus={true}
                        codeLength={4}
                        value={code}
                        onTextChange={code => setCode(code)}
                    />
                </View>
                <View style={{ alignItems: 'center', justifyContent: "center", flexDirection: 'row', position: 'absolute', bottom: 0 }}>
                    <Text style={{color:'#FDFDFD', opacity:0.59, fontSize:15}}>
                        Didn&apos;t receive it? {' '}

                    </Text>
                    <Button link linkColor="#FDFDFD" label="Resend Code" />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RecoveryCode
