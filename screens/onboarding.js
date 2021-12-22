import React, { useState, useEffect, useRef } from 'react'
import { Animated, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { View, Text, Image, Button } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './home';

const logo = require("../assets/images/logo.png");
const deliveryImage = require("../assets/images/experimental-delivery-11.png");
// const background = require("../assets/images/bckground.png");
const backgroundTop = require("../assets/images/backgroundTop.png");
const backgroundBottom = require("../assets/images/backgroundBottom.png");


const OnBoarding = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, [])

    if (isLoading) {
        return <Loading />
    }
    else {
        if (isAuthenticated) {
            return <HomeScreen />
        } else {
            return <OnBoardingScreen navigation={navigation} />
        }
    }
}

const Loading = () => {
    return (
        <SafeAreaView style={{ height: '100%' }}>
            <View style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center'
            }}>
                <Image style={{ width: 154, height: 100 }} source={logo} />
            </View>
        </SafeAreaView>
    )
}

const OnBoardingScreen = ({ navigation }) => {
    const slideInAnim = useRef(new Animated.Value(-400)).current;
    const slideInBottomAnim = useRef(new Animated.Value(-400)).current;


    // const windowWidth = Dimensions.get('window').width;
    // const screenWidth = Dimensions.get('screen').width;
    const windowHeight = Dimensions.get('window').height;
    const animationDuration = 1000;
    useEffect(() => {
        slideInRight();
        slideInBottom();
    }, [])

    const slideInRight = () => {
        Animated.timing(slideInAnim, {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: false
        }).start();
    }
    const slideInBottom = () => {
        Animated.timing(slideInBottomAnim, {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: false
        }).start();
    }

    return (
        <SafeAreaView style={{ paddingVertical: 120, paddingHorizontal: 25, backgroundColor: '#00923F', height: '100%', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <Image style={{ width: 660, height: 430, position: 'absolute', top: -160 }} source={backgroundTop} />
            <Image style={{ width: 485, height: 690, position: 'absolute', bottom: -260, left: 0 }} source={backgroundBottom} />

            <View style={{ width: 222 }}>
                <Text style={{ color: '#FFFFFF', fontSize: 30, textAlign: 'center' }}>
                    Your one stop {"\n"} for your pick-up and delivery
                </Text>
            </View>
            <View style={{ position: 'relative', }}>
                <View style={{ backgroundColor: '#26b865', height: 188, width: 188, borderRadius: 9999, position: 'absolute', left: '10%' }}></View>
                <Animated.View
                    style={[
                        styles.deliveryManContainer,
                        {
                            right: slideInAnim
                        }
                    ]}
                >
                    <Image style={{ width: 247, height: 247 }} source={deliveryImage} />
                </Animated.View>
            </View>
            <Animated.View style={{ alignItemsiew: 'center', bottom: slideInBottomAnim }}>
                <Button

                    link
                    linkColor="#00923F"
                    onPress={() => navigation.navigate("SignUp")}
                    label="Get Started"
                    style={{
                        backgroundColor: '#ffffff',
                        height: 55,
                        width: 170,
                        marginVertical: 20,
                        borderRadius: 24,
                        fontWeight: 'bold',
                        shadowColor: "#00000029",
                        shadowOffset: {
                            width: 0,
                            height: 12,
                        },
                        shadowOpacity: 0,
                        shadowRadius: 4.65,

                        elevation: 8,
                    }}
                />
            </Animated.View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    deliveryManContainer: {
        // position: 'absolute'
    }
})

export default OnBoarding
