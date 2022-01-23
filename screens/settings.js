import React from 'react'
import { StyleSheet, Switch as Switcher } from 'react-native'
import { Text, View, Picker, Image, Switch } from 'react-native-ui-lib';
import PageLayout from '../components/templates/PageLayout';



const Settings = () => {
    const [error, setError] = React.useState(null);
    const [vehicleType, setVehicleType] = React.useState('');
    const [alwaysOn, setAlwaysOn] = React.useState(false);
    const [repeatNotification, setRepeatNotification] = React.useState(false);

    const [showTraffic, setShowTraffic] = React.useState(false);
    const [keepScreenOn, setKeepScreenOn] = React.useState(false);

    return (
        <PageLayout title={"Settings"}>
            {
                error !== null && <Text>{error}</Text>
            }
            <View style={{ marginTop: 20 }}>
                <View style={{ paddingHorizontal: 5, }}>
                    <Text style={styles.pickerText}>vehicle</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={vehicleType}
                            style={styles.picker}
                            onValueChange={setVehicleType}
                            prompt="Choose Vehicle Type"
                            // mode="SINGLE"
                            accessibilityHint="Choose Vehicle Type"
                            placeholder="Choose Vehicle Type"
                            itemStyle={{ width: 300 }}
                        // enabled={false}
                        >

                            <Picker.Item label="Choose Vehicle Type" value={null} />
                            <Picker.Item label="Java" value="java" enabled={false} />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 5, marginVertical: 20 }}>
                    <Text style={styles.pickerText}>Notifications</Text>
                    <View style={styles.pickerContainer}>
                        <View style={[styles.switchContainer, { borderBottomColor: 'rgba(112, 112, 112, 0.3)', borderBottomWidth: 0.5 }]}>
                            <View style={styles.switchContainer}>
                                <Text style={[styles.switchText]}>Always On</Text>
                            </View>
                            <View style={styles.switchButton}>
                                <Switch
                                    onColor={'#00923F'}
                                    offColor={'#ffff'}
                                    // style={{backgroundColor:'#00923F7D'}}
                                    value={alwaysOn}
                                    onValueChange={() => setAlwaysOn(!alwaysOn)}
                                // style={{ marginBottom: 20 }}
                                />
                            </View>
                        </View>
                        <View style={[styles.switchContainer, { borderBottomColor: 'rgba(112, 112, 112, 0.3)', borderBottomWidth: 0.5 }]}>
                            <View style={styles.switchContainer}>
                                <Text style={[styles.switchText]}>Ring Tone</Text>
                            </View>
                            <View style={styles.switchButton}>
                                <View style={styles.switchContainer}>
                                    <Text style={[styles.switchText]}>Default</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.switchContainer, { borderBottomColor: 'rgba(112, 112, 112, 0.3)', borderBottomWidth: 0.5 }]}>
                            <View style={styles.switchContainer}>
                                <Text style={[styles.switchText]}>vibration</Text>
                            </View>
                            <View style={styles.switchButton}>
                                <View style={styles.switchContainer}>
                                    <Text style={[styles.switchText]}>Long</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.switchContainer]}>
                            <View style={styles.switchContainer}>
                                <Text style={[styles.switchText]}>Repeat</Text>
                            </View>
                            <View style={styles.switchButton}>
                                <Switch
                                    onColor={'#00923F'}
                                    offColor={'#ffff'}
                                    // style={{backgroundColor:'#00923F7D'}}
                                    value={repeatNotification}
                                    onValueChange={() => setRepeatNotification(!repeatNotification)}
                                // style={{ marginBottom: 20 }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 5, marginVertical: 24 }}>
                    <Text style={styles.pickerText}>Advance</Text>
                    <View style={styles.pickerContainer}>
                        <View style={[styles.switchContainer, { borderBottomColor: 'rgba(112, 112, 112, 0.3)', borderBottomWidth: 0.5 }]}>
                            <View style={styles.switchContainer}>
                                <Text style={[styles.switchText]}>Language</Text>
                            </View>
                            <View style={styles.switchButton}>
                                <View style={styles.switchContainer}>
                                    <Text style={[styles.switchText]}>English</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.switchContainer, { borderBottomColor: 'rgba(112, 112, 112, 0.3)', borderBottomWidth: 0.5 }]}>
                            <View style={styles.switchContainer}>
                                <Text style={[styles.switchText]}>Navigation</Text>
                            </View>
                            <View style={styles.switchButton}>
                                <View style={styles.switchContainer}>
                                    <Text style={[styles.switchText]}>Google Map</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.switchContainer, { borderBottomColor: 'rgba(112, 112, 112, 0.3)', borderBottomWidth: 0.5 }]}>
                            <View style={styles.switchContainer}>
                                <Text style={[styles.switchText]}>Map Style</Text>
                            </View>
                            <View style={styles.switchButton}>
                                <View style={styles.switchContainer}>
                                    <Text style={[styles.switchText]}>Dark Map</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.switchContainer, { borderBottomColor: 'rgba(112, 112, 112, 0.3)', borderBottomWidth: 0.5 }]}>
                            <View style={styles.switchContainer}>
                                <Text style={[styles.switchText]}>Show Traffic</Text>
                            </View>
                            <View style={styles.switchButton}>
                                <Switch
                                    onColor={'#00923F'}
                                    offColor={'#ffff'}
                                    // style={{backgroundColor:'#00923F7D'}}
                                    value={showTraffic}
                                    onValueChange={() => setShowTraffic(!showTraffic)}
                                // style={{ marginBottom: 20 }}
                                />
                            </View>
                        </View>
                        <View style={[styles.switchContainer]}>
                            <View style={styles.switchContainer}>
                                <Text style={[styles.switchText]}>Keep Screen On</Text>
                            </View>
                            <View style={styles.switchButton}>
                                <Switcher
                                    onColor={'#66be8c'}
                                    offColor={'#a1a1a1'}
                                    trackColor={{ false: "#00000061", true: "#66be8c" }}
                                    thumbColor={keepScreenOn ? "#00923F" : "#f4f3f4"}
                                    // style={{backgroundColor:'#00923F7D'}}
                                    value={keepScreenOn}
                                    onValueChange={() => setKeepScreenOn(!keepScreenOn)}
                                // style={{ marginBottom: 20 }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </PageLayout>
    )
}

export default Settings


const styles = StyleSheet.create({
    pickerContainer: {
        paddingHorizontal: 14,
        paddingVertical: 5,
        backgroundColor: '#F7F7F7',
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#F7F7F7',
        padding: 10,
        color: '#4B4D5A'
    },
    pickerText: {
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 32,
        color: '#4B4D5A',
        opacity: 0.8,
        textAlign: 'left'
    },
    switchContainer: {
        //   height: 60,
        width: '100%',
        //   marginVertical: 29,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        //   paddingHorizontal: 22,
        paddingVertical: 7,

    },
    switchTextContainer: {
        alignSelf: 'center'
    },
    switchText: {
        color: 'rgba(75, 77, 90, 1)',
        fontSize: 14,
        lineHeight: 32,
        textTransform: 'capitalize'
    },
    switchButton: {
        // width: '100%'
    },
})
