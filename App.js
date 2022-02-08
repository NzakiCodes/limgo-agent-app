
import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import HomeScreen from './screens/home';
import CreatePassword from './screens/auth/createpassword';
import ForgotPassword from './screens/auth/forgotPassword';
import RecoveryCode from './screens/auth/recoveryCode';
import SignIn from './screens/auth/signin';
import SignUp from './screens/auth/signup';
import VerifyPhone from './screens/auth/verifyPhoneNumber';
import Profile from './screens/profile/profile';
import ChangePassword from './screens/profile/changePasword';
import AsyncStorage from "@react-native-async-storage/async-storage";




import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from './screens/onboarding';
import UpdatePassword from './screens/auth/updatePassword';
import Support from './screens/support';
import Notifications from './screens/notifications';
import History from './screens/features/history';
import ChatWithUs from './screens/chatWithUs';
import Settings from './screens/settings';
import Tutorials from './screens/tutorials';
import Orders from './screens/order';

import { useDispatch, useSelector } from "react-redux"
import { AuthContext } from './context/AuthContext';
import { OnboardingContext, OnboardingProvider } from './context/OnboardingContext';
import ProfileApi from './api/profile';
import Login from './screens/auth/login';
import store from './stores/store';
import Register from './screens/auth/register';
import CalendarScreen from './screens/calendar';
const Stack = createNativeStackNavigator();
import { getUserInfo } from './slices/auth';



// export default function App() {
//   return (
//     <NavigationMainContainer />
//   );
// }

export default function App() {

  return (
    <Provider store={store}>
      <NavigationMainContainer />
      <StatusBar style='auto' />


      {/* </SafeAreaProvider> */}
    </Provider>
  );
}

const NavigationMainContainer = () => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();


  const { isLoggedIn, user } = useSelector((state) => state.auth);

  React.useEffect(() => {
    const cleanUp = () => {
    if (isLoggedIn) {
      setLoading(true);

      dispatch(getUserInfo())
        .unwrap()
        .then(() => {
        })
        .catch(() => {
          setLoading(false)
        })
      }
    }
      cleanUp()
    
  }, [isLoggedIn, dispatch, user]);

  if (loading) {
    return (
      <OnBoarding />
    )
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {
            !isLoggedIn ? (
              <>
                <Stack.Screen name='OnBoarding' options={{ headerShown: false }} component={OnBoarding} />
                <Stack.Screen name='SignIn' options={{ headerShown: false }} component={Login} />
                <Stack.Screen name='SignUp' options={{ headerShown: false }} component={SignUp} />
                <Stack.Screen name='CreatePassword' options={{ headerShown: false }} component={Register} />
                <Stack.Screen name='VerifyPhone' options={{ headerShown: false }} component={VerifyPhone} />
                <Stack.Screen name='ForgotPassword' options={{ headerShown: false }} component={ForgotPassword} />
                <Stack.Screen name='RecoveryCode' options={{ headerShown: false }} component={RecoveryCode} />
                <Stack.Screen name='UpdatePassword' options={{ headerShown: false }} component={UpdatePassword} />
              </>) :
              (<>
                <Stack.Screen name='Home' options={{ title: 'Limgo Agent', headerShown: false }} component={HomeScreen} />
                <Stack.Screen name='Notifications' options={{ headerShown: false }} component={Notifications} />
                <Stack.Screen name='CalendarScreen' options={{ headerShown: false }} component={CalendarScreen} />
                <Stack.Screen name='Profile' options={{ headerShown: false }} component={Profile} />
                <Stack.Screen name='ChangePassword' options={{ headerShown: false }} component={ChangePassword} />
                <Stack.Screen name='History' options={{ headerShown: false }} component={History} />
                <Stack.Screen name='ChatWithUs' options={{ headerShown: true }} component={ChatWithUs} />
                <Stack.Screen name='Settings' options={{ headerShown: true }} component={Settings} />
                <Stack.Screen name='Tutorials' options={{ headerShown: true }} component={Tutorials} />
                <Stack.Screen name='Support' options={{ headerShown: true }} component={Support} />
                <Stack.Screen name='Orders' options={{ headerShown: false }} component={Orders} />
              </>)
          }
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider >
  );


}
