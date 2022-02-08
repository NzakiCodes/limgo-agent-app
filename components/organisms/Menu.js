import React, { useState, useRef, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, Image, Animated, Dimensions, Pressable } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import Avatar from '../molecules/Avatar';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';


const cancelIcon = require('../../assets/icons/cancel.png');
const historyIcon = require('../../assets/icons/history.png');
const notificationsIcon = require('../../assets/icons/notifications.png');
const settingsIcon = require('../../assets/icons/settings.png');
const chatIcon = require('../../assets/icons/chat.png');
const tutorialsIcon = require('../../assets/icons/tutorials.png');
const supportIcon = require('../../assets/icons/user.png');
const chevronForwardLightIcon = require('../../assets/icons/icons-chevron-light.png');
const logoutIcon = require('../../assets/icons/logout.png');


const Menu = ({ isNavOpen, onClose, userData }) => {
    const slideAnim = useRef(new Animated.Value(-300)).current;
    const animationDuration = 300;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const { user } = useSelector((state) => state.auth)
    // console.log(user.token);


    const slideInLeftAnimation = () => {
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false
        }).start();
    }
    const slideOutLeftAnimation = () => {
        Animated.timing(slideAnim, {
            toValue: -350,
            duration: animationDuration,
            useNativeDriver: false
        }).start();
    }
    const fadeInAnimation = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false
        }).start();
    }
    const fadeOutAnimation = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start();
    }



    const closeFromTap = (e) => {
        e.preventDefault();
        closeMenu();
    }
    const closeFromTouch = (e) => {
        e.stopPropagation()
    }
    const closeMenu = () => {
        setTimeout(() => {
            fadeOutAnimation();
        }, 200);

        slideOutLeftAnimation();

        setTimeout(() => {
            onClose();
        }, 600)
    }
    const openMenu = () => {
        setTimeout(() => {
            slideInLeftAnimation();
        }, 100);
        fadeInAnimation();
    }

    useEffect(() => {
        openMenu();
    }, []);

    return (
        <>
            {isNavOpen ?
                <Animated.View style={[styles.container, { opacity: fadeAnim }]} onTouchStart={(e) => closeFromTap(e)}>
                    <Animated.View style={[styles.menu, { left: slideAnim }]} onTouchStart={(e) => closeFromTouch(e)}>
                        <View style={styles.userInfo}>
                            <View style={styles.cancelIconContainer}>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => closeMenu()}>
                                    <Image source={cancelIcon} style={styles.cancelIcon} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.user}>
                                <Avatar edit={true} onEdit={() => console.log('Edit Avaatr')} />
                                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                                    <View style={styles.userDetails}>
                                        <Text style={styles.userName}>{user && (user.first_name == null && user.user.email)}</Text>
                                        <Text style={styles.userPhoneNumber}>{user && (user.first_name == null && user.user.phone_number)}</Text>
                                        <Text style={styles.editProfile}>Edit Profile</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.menuNavigation}>
                            <View style={styles.menuNavList}>
                                <TouchableOpacity style={styles.menuNavListItem} onPress={() => navigation.navigate("History")}>
                                    <View style={styles.menuNavListItemGroup}>
                                        <Image source={historyIcon} style={styles.menuNavListItemIcon} />
                                        <Text style={styles.menuNavListItemText}>History</Text>
                                    </View>
                                    <Image source={chevronForwardLightIcon} style={styles.chevronForwardLightIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuNavListItem} onPress={() => navigation.navigate("Notifications")}>
                                    <View style={styles.menuNavListItemGroup}>
                                        <Image source={notificationsIcon} style={styles.menuNavListItemIcon} />
                                        <Text style={styles.menuNavListItemText}>Notification</Text>
                                    </View>
                                    <Image source={chevronForwardLightIcon} style={styles.chevronForwardLightIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuNavListItem} onPress={() => navigation.navigate("ChatWithUs")}>
                                    <View style={styles.menuNavListItemGroup}>
                                        <Image source={chatIcon} style={styles.menuNavListItemIcon} />
                                        <Text style={styles.menuNavListItemText}>Chat with us</Text>
                                    </View>
                                    <Image source={chevronForwardLightIcon} style={styles.chevronForwardLightIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuNavListItem} onPress={() => navigation.navigate("Settings")}>
                                    <View style={styles.menuNavListItemGroup}>
                                        <Image source={settingsIcon} style={styles.menuNavListItemIcon} />
                                        <Text style={styles.menuNavListItemText}>Settings</Text>
                                    </View>
                                    <Image source={chevronForwardLightIcon} style={styles.chevronForwardLightIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuNavListItem} onPress={() => navigation.navigate("Tutorials")}>
                                    <View style={styles.menuNavListItemGroup}>
                                        <Image source={tutorialsIcon} style={styles.menuNavListItemIcon} />
                                        <Text style={styles.menuNavListItemText}>Tutorials</Text>
                                    </View>
                                    <Image source={chevronForwardLightIcon} style={styles.chevronForwardLightIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuNavListItem} onPress={() => navigation.navigate("Support")}>
                                    <View style={styles.menuNavListItemGroup}>
                                        <Image source={supportIcon} style={styles.menuNavListItemIcon} />
                                        <Text style={styles.menuNavListItemText}>Support</Text>
                                    </View>
                                    <Image source={chevronForwardLightIcon} style={styles.chevronForwardLightIcon} />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.logoutItem}>
                                    <View style={styles.logoutItemGroup}>
                                        <Image source={logoutIcon} style={styles.logoutItemIcon} />
                                        <Text style={styles.logoutItemText}>Logout</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View></View>
                        </View>
                    </Animated.View>
                </Animated.View>
                :
                <></>
            }
        </>

    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    menu: {
        backgroundColor: '#ffff',
        width: '83.53%',
        height: '100%',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        position: 'absolute',
        top: 0,
        // left: -350
    },
    menuNavigation: {
        backgroundColor: 'rgba(247, 247, 247, 0.6)',
        height: '73%',
        borderBottomRightRadius: 30
    },
    user: {
        flex: 1,
        alignContent: 'space-between',
        flexDirection: 'row'
    },
    userInfo: {
        height: '27%',
        backgroundColor: '#fff',
        paddingHorizontal: 18,
        paddingVertical: 40,
        borderTopRightRadius: 30,
    },
    userDetails: {
        marginVertical: 18,
        marginLeft: 16
    },
    userName: {
        color: '#2E384D',
        fontSize: 20,
        lineHeight: 32,
        fontWeight: 'bold'
    },
    userPhoneNumber: {
        color: '#333333',
        fontSize: 14,
        lineHeight: 32,
    },
    editProfile: {
        color: 'red',
        fontSize: 12,
        lineHeight: 30,
    },
    cancelIconContainer: {
        flex: 1,
    },
    cancelButton: {
        alignSelf: 'flex-end',
    },
    cancelIcon: {
        width: 46,
        height: 44
    },
    menuNavList: {
        paddingRight: 10,
        paddingLeft: 25,
        paddingVertical: 34
    },
    menuNavListItem: {
        borderBottomColor: 'rgba(112, 112, 112, 0.2)',
        borderBottomWidth: 0.4,
        marginVertical: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 45
    },
    menuNavListItemGroup: {
        flex: 1,
        alignContent: 'space-between',
        flexDirection: 'row'
    },
    menuNavListItemIcon: {
        width: 34,
        height: 33
    },
    menuNavListItemText: {
        fontSize: 16,
        fontWeight: "500",
        color: 'rgba(75, 77, 90, 1)',
        paddingVertical: 7,
        marginVertical: 'auto',
        paddingHorizontal: 15
    },
    chevronForwardLightIcon: {
        width: 24,
        height: 24
    },
    logoutItem: {
        marginVertical: 30,
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 45
    },
    logoutItemGroup: {
        flex: 1,
        alignContent: 'space-between',
        flexDirection: 'row'
    },
    logoutItemIcon: {
        width: 34,
        height: 33
    },
    logoutItemText: {
        fontSize: 16,
        fontWeight: "500",
        color: 'rgba(75, 77, 90, 1)',
        paddingVertical: 7,
        marginVertical: 'auto',
        paddingHorizontal: 15
    },
})

export default Menu;
