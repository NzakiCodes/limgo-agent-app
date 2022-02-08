import React, { useState, useRef, useEffect, useContext } from 'react'
import { Alert, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, Button } from 'react-native-ui-lib';
import TextField from '../../components/atoms/TextField';
import AuthApi from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';
import { Formik } from 'formik';
import { useDispatch, useSelector} from 'react-redux'
import { login } from '../../slices/auth';
import { clearMessage } from '../../slices/authMessage';
import { useNavigation } from '@react-navigation/native';


const logo = require("../../assets/images/logo_icon.png");
const loadingGif = require("../../assets/images/Pulse-1.3s-58px.gif");



const Login = () => {
    const [loading, setLoading] = useState(false);
    // const isloggedIn = useSelector((state)=>state.auth)
    // console.log(isloggedIn.user); 
    const {message} = useSelector((state)=> state.authMessage);
   const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(()=>{
        // dispatch(clearMessage());
    },[dispatch])

    const [error, setError] = useState({
        errorValue: false,
        message: ""
    });

    const handleLogin = (values)=>{
        const {email, password} = values;
        setLoading(true);

        dispatch(login({email, password}))
        .unwrap()
        .then(()=>{
            navigation.navigate("Home")
            console.log("Login Successful");
            
        })
        .catch((e)=>{
            setLoading(false)
            console.log("error:",e);

        })
        
    }
    return (
        <SafeAreaView style={{ marginVertical: 45, marginHorizontal: 30 }}>
            <ScrollView>
                <View style={{ alignItems: 'center', marginVertical: 45 }}>
                    <Image style={{ width: 118, height: 84 }} source={logo} />
                </View>
                <Text black text30BL style={{ fontWeight: "bold" }}>Sign In</Text>
                <Text grey30>Welcome Back to Limgo Logistics</Text>
                {error.errorValue === true &&
                    <View style={{ backgroundColor: "red", color: "#ffffff", padding: 10, borderRadius: 14, marginTop: 10 }}>
                        {error.errorValue === true ? <Text style={{ color: "#ffffff", padding: 10, fontSize: 16 }}>{error.message}</Text> : <Text>""</Text>}
                    </View>
                }
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={handleLogin}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <View>
                            <View style={{ marginVertical: 20 }}>
                                <TextField error={error.errorValue} textBold title={"Email Address"} onChangeText={handleChange('email')} value={values.email} />
                                <TextField error={error.errorValue} textBold title={"Password"} securePassword={true} onChangeText={handleChange('password')}  value={values.password} />
                                <Button onPress={() => navigation.navigate("ForgotPassword")} link linkColor="#00923F" style={{ color: '#00923F', alignSelf: 'flex-end' }} label="Forgot Passwords?" />
                                <Button
                                    label={!loading ? "Login" : " "}
                                    labelStyle={{ fontSize: 18, fontWeight: 'bold' }}
                                    style={{ height: 58, marginVertical: 20, borderRadius: 24 }}
                                    onPress={handleSubmit}
                                    disabled={loading}
                                    backgroundColor="#00923f"
                                    disabledBackgroundColor="#a1a1a1"
                                    iconSource={loading ? loadingGif : ""}
                                    iconStyle={{ width: 50, height: 30 }}
                                />

                            </View>
                            <View style={{ alignItems: 'center', justifyContent: "center", flexDirection: 'row', position: 'absolute', bottom: 0, left: '20%' }}>
                                <Text style={{ color: '#4B4D5A', fontSize: 15, textAlign: 'center' }}>
                                    Don't have an account? {''}
                                </Text>
                                <Button onPress={() => navigation.navigate("SignUp")} link linkColor="#00923F" label="Sign Up" />
                            </View>
                        </View>
                    )}

                </Formik>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Login
