import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Image, TouchableOpacity } from 'react-native-ui-lib';

const backIcon = require("../assets/icons/backIcon.png");
const loadingGif = require("../assets/images/Pulse-1.3s-58px.gif");
const OrdersPNG = require("../assets/images/notification-new-svgrepo-com.png");


const Orders = () => {
    const navigation = useNavigation();
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [OrdersList, setOrderss] = React.useState([
        {
            id: 1,
            title: 'New Ride Request'
        },
        {
            id: 2,
            title: 'Payment'
        }
    ]);
    const [OrdersModal, setOrdersModal] = React.useState(false);

    const clearOrders = () => {
        setOrderss(null);
        setOrdersModal(false)
    }

    return (
        <SafeAreaView style={styles.container}> 
            <View style={styles.navigatorContainer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Image source={backIcon} style={styles.backButton} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.heading}>Orders</Text>
                </View>
                <Text style={{ opacity:0 }}>orders</Text>
            </View>
            <ScrollView style={styles.main}>
               
            </ScrollView>
        </SafeAreaView>
    )
}

export default Orders


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
        backgroundColor: '#2E384D',
        // width:343,
        // height:143,
        borderRadius: 12,
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 22
    },
    modalMessage: {
        color: 'rgba(255, 255, 255, 0.68)'
    },
    buttonsContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 28
    },
    modalButton: {
        paddingHorizontal: 50,
        paddingVertical: 17,
        borderRadius: 8,
        marginHorizontal: 7
    },
    buttonText: {
        color: '#FFFFFF'
    }
})
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        height: '100%'

    },
    navigatorContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 5,
        height: 40,
        alignContent: 'center',
        alignItems: 'center'
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
    avatar: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 25,
        height: 89,
        width: '100%'
    },
    main: {
        // height: '100%'

    }
})
