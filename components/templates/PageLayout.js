import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, TouchableOpacity } from 'react-native-ui-lib';
const backIcon = require("../../assets/icons/backIcon.png");

const PageLayout = ({ title, children }) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navigatorContainer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Image source={backIcon} style={styles.backButton} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.heading}>{title || 'Title'}</Text>
                </View>
                <View>
                    <Text style={{ opacity: 0 }}>{title || 'Title'}</Text>
                </View>
            </View>
            <ScrollView style={styles.main}>
                <View style={{ marginTop: 20 }}>
                    {children}
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
export default PageLayout;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        height: '100%'

    },
    navigatorContainer: {
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
    }
})
