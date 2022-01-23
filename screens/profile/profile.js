import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Image, TouchableOpacity } from 'react-native-ui-lib';
import ProfileApi from '../../api/profile';
import TextField from '../../components/atoms/TextField';
import Avatar from '../../components/molecules/Avatar';
import Axios from 'axios';


const backIcon = require("../../assets/icons/backIcon.png");
const loadingGif = require("../../assets/images/Pulse-1.3s-58px.gif");


const Profile = () => {
    const navigation = useNavigation();
    const [userData, setUserdata] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
       /*  const fetchUser = async () => {
            try {
                const userInfo = await ProfileApi.ViewProfile();
                setUserdata(userInfo.data);
                // console.log(userInfo);
                return userInfo;
            } catch (error) {
                setError(error);
            }
        }
        fetchUser(); */
    }, [])

    const editProfile = async () => {
        var data = JSON.stringify({
            "firstName": userData.firstName,
            "lastName": userData.lastName,
        });

        setLoading(true)
       /*  try {
            const res = await ProfileApi.EditProfile(data);
            setUserdata(res.data);
            console.log(res.data);
            setLoading(false)   
        } catch (error) {
            setError(error);
        } */

        // var data = JSON.stringify({
        //     "firstName": userData.firstName,
        //     "lastName": userData.lastName,
        //   });

        //   var config = {
        //     method: 'patch',
        //     url: 'https://limgo-server.herokuapp.com/api/user/editProfile',
        //     headers: { 
        //       'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzMxZmE4NWM5ZTBmMDUzODBkYWQ3MCIsImlhdCI6MTY0MTc1NTc5OCwiZXhwIjoxNjQxODQyMTk4fQ.VuDezbYccu1H5f7LhgvXMNVqKa5sxC3SSvW0HvpfIAo', 
        //       'Content-Type': 'application/json'
        //     },
        //     data : data
        //   };

        //   Axios(config)
        //   .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

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
                    <Text style={styles.heading}>Profile</Text>
                </View>
                <View>
                    <Text style={{ opacity: 0 }}>Profile</Text>
                </View>
            </View>
            <ScrollView style={styles.main}>
                {
                    error !== null && <Text>{error}</Text>
                }
                <View style={styles.avatar}>
                    <Avatar />
                </View>
                <View style={{ marginTop: 20 }}>
                    <TextField inputStyle={{ backgroundColor: '#F7F7F7', borderWidth: 0, marginBottom: -20, color: '#4B4D5A' }} title={"First Name"} textStyle={{ marginLeft: 15, fontSize: 14, marginBottom: -2, color: 'rgba(51, 51, 51, 1)' }} value={userData ? userData.firstName : ''} onChangeText={(text) => setUserdata({ ...userData, firstName: text })} />
                    <TextField inputStyle={{ backgroundColor: '#F7F7F7', borderWidth: 0, marginBottom: -20, color: '#4B4D5A' }} title={"Last Name"} textStyle={{ marginLeft: 15, fontSize: 14, marginBottom: -2, color: 'rgba(51, 51, 51, 1)' }} value={userData ? userData.lastName : ''} onChangeText={(text) => setUserdata({ ...userData, lastName: text })} />
                    <TextField inputStyle={{ backgroundColor: '#F7F7F7', borderWidth: 0, marginBottom: -20, color: '#4B4D5A' }} title={"Email Address"} textStyle={{ marginLeft: 15, fontSize: 14, marginBottom: -2, color: 'rgba(51, 51, 51, 1)' }} locked value={userData ? userData.email : ''} />
                    <TextField inputStyle={{ backgroundColor: '#F7F7F7', borderWidth: 0, marginBottom: -20, color: '#4B4D5A' }} title={"Phone Number"} textStyle={{ marginLeft: 15, fontSize: 14, marginBottom: -2, color: 'rgba(51, 51, 51, 1)' }} locked value={userData ? userData.phoneNumber : ''} />

                    <View style={{
                        marginVertical: 40, justifyContent: 'space-between',
                        flexDirection: 'row',
                    }}>
                        <Button
                            label={"Change Password"}
                            labelStyle={{ fontSize: 14, fontWeight: 'bold' }}
                            style={{ height: 58, borderRadius: 24, width: '48.9%' }}
                            onPress={() => navigation.navigate("ChangePassword")}
                            // disabled={loading}
                            backgroundColor="#4B4D5A"
                            disabledBackgroundColor="#a1a1a1"
                        // iconSource={loading ? loadingGif : ""}
                        // iconStyle={{ width: 50, height: 30 }}
                        />
                        <Button
                            label={"Edit Profile"}
                            labelStyle={{ fontSize: 14, fontWeight: 'bold' }}
                            style={{ height: 58, borderRadius: 24, width: '48.9%' }}
                            onPress={() => editProfile()}
                            disabled={loading}
                            backgroundColor="#00923f"
                            disabledBackgroundColor="#a1a1a1"
                            iconSource={loading ? loadingGif : ""}
                            iconStyle={{ width: 50, height: 30 }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        // paddingVertical: 10,
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
        // height: '100%'

    }
})
