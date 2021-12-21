import React, { useState, useEffect } from 'react';
import { View } from 'react-native-ui-lib';
import { TextInput, Text } from 'react-native';


const TextField = (props) => {
    const { title, textBold, securePassword, placeholder, textStyle, placeholderTextColor, inputStyle, value, onChangeText, error } = props;
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
                {...props}
                secureTextEntry={securePassword}
                placeholder={placeholder ? placeholder : title}
                style={{
                    height: 58,
                    borderWidth: 1,
                    paddingHorizontal: 20,
                    paddingTop: 10,
                    paddingBottom: 5,
                    marginVertical: 5,
                    borderColor: `${error ? "#e90000" : "#D6D6D6"}`,
                    borderRadius: 24,
                    fontSize: 18,
                    // fontStyle: 'italic',
                    color: `${error ? "#e90000" : "#00923F"}`,
                    ...inputStyle
                }}
                placeholderTextColor={placeholderTextColor}
                value={value}
            />
        </View>
    )
}

export default TextField
