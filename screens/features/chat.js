import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
const backIcon = require("../assets/icons/backIcon.png");
import { API_SERVER } from '../config/constants';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import TextField from '../components/atoms/TextField';
import { Button } from 'react-native-ui-lib';

const Chat = ({ navigation, route }) => {
    const [chats, setChats] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const { shipment_id } = route.params;
    const [newMessage, setNewMessage] = useState('');

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${user.token}`);

    const receiveMessage = () => {
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };


        fetch(`${API_SERVER}/customer/chat/${shipment_id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                const res = JSON.parse(result);
                // console.log(result);
                setChats(res.data)
            })
            .catch(error => console.log('error', error));
    }

    const sendMessage = (message) => {
        var formdata = new FormData();
        formdata.append("sender_id", user.user.id);
        formdata.append("shipment_id", shipment_id);
        formdata.append("message", message);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${API_SERVER}/customer/chat/`, requestOptions)
            .then(response => response.text())
            .then(result => {
                const res = JSON.parse(result);
                // var vv = chats;
                // vv.push(res.data);
                setChats([...chats, res.data])
                // console.log(res.data);
                // receiveMessage();
            })
            .catch(error => console.log('error', error));
    }
    const handleSendMessage = (e) => {
        sendMessage(newMessage);
            setNewMessage('')
        // console.log(e);


    }
    useEffect(() => {
        receiveMessage();
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navigatorContainer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={backIcon} style={styles.backButton} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.heading}>Chat</Text>
                </View>
                <View>
                    <Text style={{ opacity: 0 }}>Calendar</Text>
                </View>
            </View>
            <ScrollView style={{ padding: 1, minHeight: 100 }}>
                <View style={styles.chatView}>
                    {
                        !!chats && chats.map((chat) => {
                            if (chat.sender_id !== user.user.id) {
                                return (
                                    <View key={chat.id} style={[styles.chatBox, styles.chatBoxSend]}>
                                        <Text>{chat.message}</Text>
                                    </View>

                                )
                            } else {
                                return (
                                    <View key={chat.id} style={[styles.chatBox, styles.chatBoxReceive]}>
                                        <Text style={{color:'#ffff'}}>{chat.message}</Text>
                                    </View>
                                )
                            }
                        })
                    }
                </View>
            </ScrollView>
            <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', height: 58, alignItems: 'center' }}>
                <TextField style={{ width: '80%' }} onChangeText={(e) => setNewMessage(e)} value={newMessage} />

                <Button
                    label={"Send"}
                    labelStyle={{ fontSize: 14, fontWeight: 'bold' }}
                    style={{
                        borderRadius: 24, width: '28%', height: '100%', marginVertical: 5, paddingHorizontal: 20, paddingTop: 10,
                        paddingBottom: 5,
                    }}
                    backgroundColor="#00923f"
                    // disabled={loading}
                    disabledBackgroundColor="#a1a1a1"
                    // iconOnRight={false}
                    // iconSource={callIcon}
                    onPress={handleSendMessage}
                />
            </View>

        </SafeAreaView>
    );
};
const HR = (color, width) => (
    <View style={{ borderTopColor: color ? color : 'gray', borderTopWidth: width ? width : 1 }} />
)

export default Chat;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        height: '100%'

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
        width: 38,
        height: 36,
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

    },
    chatView: {
        display: 'flex'
    },
    chatBox: {
        maxWidth: 230,
        minWidth: 200,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginVertical: 15,
        borderRadius: 10,

    },
    chatBoxSend: {
        backgroundColor: '#F7F7F7',

    },
    chatBoxReceive: {
        backgroundColor: '#00923F',
        alignSelf: 'flex-end',

    }
})