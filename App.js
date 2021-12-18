import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CreatePassword from './screens/auth/createpassword';
import ForgotPassword from './screens/auth/forgotPassword';
import RecoveryCode from './screens/auth/recoveryCode';
import SignIn from './screens/auth/signin';
import SignUp from './screens/auth/signup';
import VerifyPhone from './screens/auth/verifyPhoneNumber';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <SignUp/> */}
      {/* <SignIn/> */}
      {/* <CreatePassword/> */}
      <VerifyPhone/>
      {/* <ForgotPassword/> */}
      {/* <RecoveryCode/> */}
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}