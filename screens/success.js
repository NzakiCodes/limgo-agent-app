import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


const backIcon = require("../assets/icons/backIcon.png");

const successSparks = require("../assets/images/success/successSparks.png");
const successCircle = require("../assets/images/successCircle.png");


export default function CompletedTask({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navigatorContainer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Image source={backIcon} style={styles.backButton} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{ opacity: 0 }}>Completed</Text>
                </View>
                <View>
                    <Text style={{ opacity: 0 }}>Ride Successfully Completed</Text>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.successSparksContainer}>
                    <Image source={successCircle} style={styles.successSparks} />
                    <Image source={successSparks} style={styles.successSparks} />
                </View>
                <View style={styles.successTextContainer}>
                    <Text style={styles.successText}>Nice Work!</Text>
                    <Text style={styles.successDetailsText}>Tasks Completed</Text>
                </View>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#00923F', textAlign: 'center', marginTop: 20 }]} onPress={() => navigation.navigate("Home")}>
                    <Text style={[styles.buttonText, { textAlign: 'center', color: '#ffffff' }]}>Go Home</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    successTextContainer:{
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign:'center',
        maxWidth:174,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom:20

    },
    successText:{
        fontSize:28,
        fontWeight:'bold',
        textAlign:'center'

    },
    successDetailsText:{
        fontSize:13,
        textAlign:'center',
        marginVertical:10

    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        height: '100%'

    },
    paymentMethodText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    paymentMethodSubText: {
        fontSize: 12,
        color: 'rgba(75, 77, 90, 0.5)',
    },
    subHeading: {
        fontSize: 26,
        fontWeight: 'bold',


    },
    successSparksContainer: {
        position: 'relative',
        height: 210,
        marginVertical:39
    },
    successSparks: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: 'contain',
        width: '100%',
        height: '100%',

    },
    totalCostText: {
        fontSize: 40,
        fontWeight: '100',
        color: '#4B4D5A'
    },
    savedCardsText: {
        fontSize: 12,
        color: 'rgba(112, 112, 112, 0.6)',
        // marginBottom: 18,
    },
    navigatorContainer: {
        // flex: 2,
        // justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 5,
        height: 40,
        alignItems: 'center'
    },
    backButton: {
        width: 30,
        height: 30,
        marginRight: 10
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
    paymentMethodContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        // flexDirection: 'row',
        paddingBottom: 20,
        marginTop: 18
    },
    paymentMethod: {
        marginRight: 20
    },
    main: {
        // height: '100%'
        marginVertical: 10

    },
    button: {
        backgroundColor: '#F7F7F7',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 15,
        marginVertical: 12
    },
    buttonSelected: {
        backgroundColor: '#4B4D5A',

    },
    buttonText: {
        color: '#38393D',
        fontSize: 14,
        fontWeight: 'bold'
    },
    buttonTextSelected: {
        color: '#FFFFFF',
    }
})