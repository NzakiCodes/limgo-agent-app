import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native-ui-lib';
import { TextInput, Text, Pressable } from 'react-native';

const passwordHidden = require("../../assets/images/hidden.png");
const passwordvisible = require("../../assets/images/visibility.png");
const lockedKey = require("../../assets/icons/padlock-lock-svgrepo-com.png");


const TextField = (props) => {
    const { title, textBold, securePassword, placeholder,noBorder, textStyle, placeholderTextColor, inputStyle, value, onChangeText, error, locked, controlBoder: controlBorder } = props;
    const [securePasswordState, setSecurePassword] = useState(securePassword ? securePassword : false);

    // useEffect(() => {
    //     setSecurePassword(securePassword ? securePassword : false);
    // })
    const [borderWidth,setBorderWidth] = useState(controlBorder?0:1)

    const changeVisibility = () => {
        setSecurePassword(!securePasswordState)
    }

    return (
        <View style={{ marginVertical: 15 }}>
            <Text
                style={{
                    fontWeight: textBold ? 'bold' : 'normal',
                    fontSize: 14,
                    lineHeight: 30,
                    ...textStyle
                }}>{title}</Text>
            <View>
                <TextInput
                    {...props}
                    secureTextEntry={securePasswordState}
                    placeholder={placeholder ? placeholder : title}
                    
                    style={{
                        height: 58,
                        borderWidth: borderWidth,
                        paddingHorizontal: 20,
                        paddingTop: 5,
                        paddingBottom: 5,
                        marginVertical: 1,
                        borderColor: `${error ? "#e90000" : "#D6D6D6"}`,
                        borderRadius: 9999,
                        fontSize: 14,
                        // fontStyle: 'italic',
                        color: `${error ? "#e90000" : "#000000"}`,
                        ...inputStyle
                    }}
                    editable={locked ? false : true}
                    pointerEvents={locked ? 'none' : 'auto'}
                    placeholderTextColor={placeholderTextColor}
                    value={value}
                    onFocus={()=>setBorderWidth(1)}
                    onBlur={()=>setBorderWidth(controlBorder?0:1)}
                />
                {
                    securePassword ?
                        <Pressable style={{ top: 18, right: 18, position: 'absolute', }} onPress={changeVisibility}>
                            {
                                securePasswordState === true ? <Image style={{ width: 25, height: 19 }} source={passwordHidden} /> : <Image style={{ width: 23, height: 16, marginTop: 3, marginRight: 2.5 }} source={passwordvisible} />
                            }
                        </Pressable> : null
                }
                {
                    locked &&
                    <View style={{ top: 24, right: 16, position: 'absolute', }}>
                        <Image style={{ width: 12.07, height: 16.3 }} source={lockedKey} />
                    </View>
                }
            </View>
            {/* <Image style={{ width: 24.23, height: 18.97 }} source={passwordHidden} />  */}
        </View>
    )
}

export default TextField
