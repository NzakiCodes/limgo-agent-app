import { StyleSheet, Text, View,Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';

const Alert = ({ type="success", message, dismiss }) => {
    const dismissAlert = (e) => {
        e.preventDefault();
        dismiss();
    }
    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;


    return (
        <View style={[modalStyles.modalContainer, { width: width, height: height }]}>
            <View style={modalStyles.container}>
                <Text style={modalStyles.modalMessage}>{message}</Text>
                <View style={modalStyles.buttonsContainer}>
                    <TouchableOpacity activeOpacity={0.7} onPress={(e)=>dismissAlert(e)} style={[modalStyles.modalButton, { backgroundColor: '#00923F' }]}>
                        <Text style={modalStyles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Alert;

const modalStyles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        zIndex: 60,
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    container: {
        backgroundColor: '#ffffff',
        // width:343,
        // height:143,
        borderRadius: 12,
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 85,
        paddingVertical: 42
    },
    modalMessage: {
        color: '#000000',
        fontSize:30
    },
    buttonsContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 28
    },
    modalButton: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 8,
        marginHorizontal: 7
    },
    buttonText: {
        color: '#FFFFFF',
       
    }
})
