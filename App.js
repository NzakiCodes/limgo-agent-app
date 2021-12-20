
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './screens/home';
import CreatePassword from './screens/auth/createpassword';
import ForgotPassword from './screens/auth/forgotPassword';
import RecoveryCode from './screens/auth/recoveryCode';
import SignIn from './screens/auth/signin';
import SignUp from './screens/auth/signup';
import VerifyPhone from './screens/auth/verifyPhoneNumber';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from './screens/onboarding';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='OnBoarding' options={{ headerShown: false }} component={OnBoarding} />
          <Stack.Screen name='SignUp' options={{ headerShown: false }} component={SignUp} />
          <Stack.Screen name='CreatePassword' options={{ headerShown: false }} component={CreatePassword} />
          <Stack.Screen name='VerifyPhone' options={{ headerShown: false }} component={VerifyPhone} />
          <Stack.Screen name='SignIn' options={{ headerShown: false }} component={SignIn} />
          <Stack.Screen name='ForgotPassword' options={{ headerShown: false }} component={ForgotPassword} />
          <Stack.Screen name='RecoveryCode' options={{ headerShown: false }} component={RecoveryCode} />
          <Stack.Screen name='Home' options={{ title:'Limgo Agent' }} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
