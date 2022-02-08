import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Image, TouchableOpacity } from 'react-native-ui-lib';

const backIcon = require("../assets/icons/backIcon.png");
const loadingGif = require("../assets/images/Pulse-1.3s-58px.gif");
const NotificationPNG = require("../assets/images/notification-new-svgrepo-com.png");


const Notifications = () => {
    const navigation = useNavigation();
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [notificationsList, setNotifications] = React.useState([
        {
            id: 1,
            title: 'New Ride Request'
        },
        {
            id: 2,
            title: 'Payment'
        }
    ]);
    const [notificationModal, setNotificationModal] = React.useState(false);

    const clearNotification = () => {
        setNotifications(null);
        setNotificationModal(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                notificationModal && <ClearNotificationModal cancelModal={()=>setNotificationModal(false)} closeModal={() => clearNotification()} />
            }
            <View style={styles.navigatorContainer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Image source={backIcon} style={styles.backButton} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.heading}>Notifications</Text>
                </View>
                <TouchableOpacity onPress={() => setNotificationModal(true)} disabled={notificationsList === null ? true : false}>
                    {notificationsList === null ? (<Text style={{ color: '#D6D6D6', fontSize: 12, fontWeight: 'bold' }}>Clear All</Text>) :
                        (<Text style={{ color: '#000000', fontSize: 12, fontWeight: 'bold' }}>Clear All</Text>)}
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.main}>
                {notificationsList === null ? <View style={{ justifyContent: 'center', alignItems: 'center', height: 500, alignContent: 'center' }}>
                    <Image source={NotificationPNG} />
                    <Text style={{ color: '#4B4D5A', fontSize: 34, fontWeight: 'bold', }}>All Clear</Text>
                    <Text style={{ color: '#4B4D5A', fontSize: 14, fontWeight: 'bold', opacity: 0.8 }}>Looks like you have no notification</Text>
                </View>:
                (
                    <View>
                        {
                            notificationsList.map((notification)=>(
                                <View key={notification.id}>
                                    <Text>{notification.title}</Text>
                                </View>
                            ))
                        }
                    </View>
                )}
               
            </ScrollView>
        </SafeAreaView>
    )
}

export default Notifications

const ClearNotificationModal = ({ closeModal,cancelModal }) => {

    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;

    const onClose = () => {
        closeModal()
    }

    return (
        <View style={[modalStyles.modalContainer, { width: width, height: height }]}>
            <View style={modalStyles.container}>
                <Text style={modalStyles.modalMessage}>Clear All Notifications?</Text>
                <View style={modalStyles.buttonsContainer}>
                    <TouchableOpacity activeOpacity={0.7} onPress={cancelModal} style={[modalStyles.modalButton, { backgroundColor: '#E90000' }]}>
                        <Text style={modalStyles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={onClose} style={[modalStyles.modalButton, { backgroundColor: '#00923F' }]}>
                        <Text style={modalStyles.buttonText}>Clear</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
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
