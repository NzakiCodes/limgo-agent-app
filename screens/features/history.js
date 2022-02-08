import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Image, TouchableOpacity } from 'react-native-ui-lib';

const backIcon = require("../../assets/icons/backIcon.png");
const loadingGif = require("../../assets/images/Pulse-1.3s-58px.gif");
const HistoryPNG = require("../../assets/images/historyIcon.png");


const History = () => {
    const navigation = useNavigation();
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [historyList, setHistory] = React.useState(null)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navigatorContainer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Image source={backIcon} style={styles.backButton} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.heading}>History</Text>
                </View>
                <TouchableOpacity disabled={historyList===null?true:false}>
                   { historyList === null?(<Text style={{ color: '#D6D6D6', fontSize: 12, fontWeight: 'bold' }}>[chatIcon   ]</Text>):
                    (<Text style={{ color: '#000000', fontSize: 12, fontWeight: 'bold' }}>[chatIcon ]</Text>)}
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.main}>
                {historyList === null && <View style={{ justifyContent: 'center', alignItems: 'center', height: 500, alignContent: 'center' }}>
                    <Image source={HistoryPNG} />
                    <Text style={{ color: '#4B4D5A', fontSize: 34, fontWeight: 'bold', }}>All Clear</Text>
                    <Text style={{ color: '#4B4D5A', fontSize: 14, fontWeight: 'bold', opacity: 0.8 }}>Looks like you have no history</Text>
                </View>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default History

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
