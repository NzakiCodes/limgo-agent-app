
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
import UpdatePassword from './screens/auth/updatePassword';
import Support from './screens/support';
import Notification from './screens/features/notification';
import History from './screens/features/history';
import ChatWithUs from './screens/chatWithUs';
import Settings from './screens/settings';
import Tutorials from './screens/tutorials';
import Profile from './screens/profile/profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationMainContainer />
  );
}

const NavigationMainContainer = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Profile' options={{ headerShown: false }} component={Profile} />
          <Stack.Screen name='Home' options={{ title: 'Limgo Agent', headerShown: false }} component={HomeScreen} />
          <Stack.Screen name='OnBoarding' options={{ headerShown: false }} component={OnBoarding} />
          <Stack.Screen name='SignUp' options={{ headerShown: false }} component={SignUp} />
          <Stack.Screen name='CreatePassword' options={{ headerShown: false }} component={CreatePassword} />
          <Stack.Screen name='VerifyPhone' options={{ headerShown: false }} component={VerifyPhone} />
          <Stack.Screen name='SignIn' options={{ headerShown: false }} component={SignIn} />
          <Stack.Screen name='ForgotPassword' options={{ headerShown: false }} component={ForgotPassword} />
          <Stack.Screen name='RecoveryCode' options={{ headerShown: false }} component={RecoveryCode} />
          <Stack.Screen name='UpdatePassword' options={{ headerShown: false }} component={UpdatePassword} />


          <Stack.Screen name='History' options={{ headerShown: true }} component={History} />
          <Stack.Screen name='Notification' options={{ headerShown: true }} component={Notification} />
          <Stack.Screen name='ChatWithUs' options={{ headerShown: true }} component={ChatWithUs} />
          <Stack.Screen name='Settings' options={{ headerShown: true }} component={Settings} />
          <Stack.Screen name='Tutorials' options={{ headerShown: true }} component={Tutorials} />
          <Stack.Screen name='Support' options={{ headerShown: true }} component={Support} />

        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
