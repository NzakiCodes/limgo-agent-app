import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native-ui-lib';
import { TextInput, Text, Pressable } from 'react-native';

const passwordHidden = require("../../assets/images/hidden.png");
const passwordvisible = require("../../assets/images/visibility.png");


const TextField = (props) => {
    const { title, textBold, securePassword, placeholder, textStyle, placeholderTextColor, inputStyle, value, onChangeText, error } = props;
    const [securePasswordState, setSecurePassword] = useState(securePassword ? securePassword : false);

    // useEffect(() => {
    //     setSecurePassword(securePassword ? securePassword : false);
    // })

    const changeVisibility = () => {
        setSecurePassword(!securePasswordState)
    }

    return (
        <View style={{ marginVertical: 15 }}>
            <Text
                style={{
                    fontWeight: textBold ? 'bold' : 'normal',
                    fontSize: 16,
                    lineHeight: 32,
                    ...textStyle
                }}>{title}</Text>
            <View>
                <TextInput
                    {...props}
                    secureTextEntry={securePasswordState}
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
                {
                    securePassword ?
                        <Pressable style={{ top: 24, right: 10, position: 'absolute' }} onPress={changeVisibility}>
                            {
                                securePasswordState === true ? <Image style={{ width: 25, height: 19 }} source={passwordHidden} /> : <Image style={{ width: 23, height: 16, marginTop:3,marginRight:2.5 }} source={passwordvisible} />
                            }
                        </Pressable> : null
                }
            </View>
            {/* <Image style={{ width: 24.23, height: 18.97 }} source={passwordHidden} />  */}
        </View>
    )
}

export default TextField
