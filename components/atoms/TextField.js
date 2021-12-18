import React, { useState, useEffect } from 'react';
import { View } from 'react-native-ui-lib';
import { TextInput, Text } from 'react-native';


const TextField = ({ title, textBold, securePassword, placeholder, textStyle, placeholderTextColor, inputStyle }) => {
    const [securePasswordState, setSecurePassword] = useState(false);

    useEffect(() => {
        setSecurePassword(securePassword ? securePassword : false);
    })

    return (
        <View style={{ marginVertical: 15 }}>
            <Text
                style={{
                    fontWeight: textBold ? 'bold' : 'normal',
                    fontSize: 16,
                    lineHeight: 32,
                    ...textStyle
                }}>{title}</Text>
            <TextInput
                secureTextEntry={securePassword}
                placeholder={placeholder ? placeholder : title}
                style={{
                    height: 58,
                    borderWidth: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    marginVertical: 5,
                    borderColor: "#D6D6D6",
                    borderRadius: 24,
                    fontSize: 18,
                    fontStyle: 'italic',
                    color: '#00923F',
                    ...inputStyle
                }}
                placeholderTextColor={placeholderTextColor}
            />
        </View>
    )
}

export default TextField
