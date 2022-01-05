import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Image, TouchableOpacity } from 'react-native-ui-lib';
import TextField from '../../components/atoms/TextField';
import Avatar from '../../components/molecules/Avatar';


const backIcon = require("../../assets/icons/backIcon.png");


const Profile = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navigatorContainer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={backIcon} style={styles.backButton} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.heading}>Profile</Text>
                </View>
                <View>
                    <Text style={{ opacity: 0 }}>Profile</Text>
                </View>
            </View>
            <ScrollView style={styles.main}>
                <View style={styles.avatar}>
                    <Avatar />
                </View>
                <View>
                    <TextField inputStyle={{ backgroundColor: '#F7F7F7' }} title={"First Name"} />
                    <TextField />
                    <TextField />
                    <TextField />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        height: '100%'

    },
    navigatorContainer: {
        // flex: 2,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 5,
        height: 40
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
        height: '100%'
    }
})
