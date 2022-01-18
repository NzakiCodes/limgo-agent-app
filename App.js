
import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
import ChangePassword from './screens/profile/changePasword';

import { AuthContext } from './context/AuthContext';
import { OnboardingContext, OnboardingProvider } from './context/OnboardingContext';
import ProfileApi from './api/profile';
const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationMainContainer />
//   );
// }

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          SecureStore.setItemAsync('userToken', action.token)
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'FETCH_USER':
          return {
            ...prevState,
            userDetails: action.payload
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userDetails: { firstName: '', lastName: '', email: '', phoneNumber: '' }
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        userToken = null;
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({ type: 'SIGN_IN', token: data.accessToken });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      fetchUser: async () => {
        try {
          const res = await ProfileApi.ViewProfile();
          const userDetails = await res.data;

          dispatch({ type: 'FETCH_USER', payload: userDetails });
          return res.data
        } catch (error) {
          console.log(error);
        }
      },
      getUserDetails: () => {
        return state.userDetails;
      }
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            <>
              {/* <Stack.Screen name='OnBoarding' options={{ headerShown: false }} component={OnBoarding} /> */}
              <Stack.Screen name='SignIn' options={{ headerShown: false, animationTypeForReplace: state.isSignout ? 'pop' : 'push', }} component={SignIn} />
              <Stack.Screen name='SignUp' options={{ headerShown: false }} component={SignUp} />
              <Stack.Screen name='CreatePassword' options={{ headerShown: false }} component={CreatePassword} />
              <Stack.Screen name='VerifyPhone' options={{ headerShown: false }} component={VerifyPhone} />
              <Stack.Screen name='ForgotPassword' options={{ headerShown: false }} component={ForgotPassword} />
              <Stack.Screen name='RecoveryCode' options={{ headerShown: false }} component={RecoveryCode} />
              <Stack.Screen name='UpdatePassword' options={{ headerShown: false }} component={UpdatePassword} />
            </>
          ) : (
            <>
              <Stack.Screen name='Home' options={{ title: 'Limgo Agent', headerShown: false }} component={HomeScreen} />
              <Stack.Screen name='Profile' options={{ headerShown: false }} component={Profile} />
              <Stack.Screen name='ChangePassword' options={{ headerShown: false }} component={ChangePassword} />
              <Stack.Screen name='History' options={{ headerShown: true }} component={History} />
              <Stack.Screen name='Notification' options={{ headerShown: true }} component={Notification} />
              <Stack.Screen name='ChatWithUs' options={{ headerShown: true }} component={ChatWithUs} />
              <Stack.Screen name='Settings' options={{ headerShown: false }} component={Settings} />
              <Stack.Screen name='Tutorials' options={{ headerShown: true }} component={Tutorials} />
              <Stack.Screen name='Support' options={{ headerShown: true }} component={Support} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// const NavigationMainContainer = () => {


//   return (
//     <SafeAreaProvider>
//       {/* <OnboardingProvider> */}
//         <NavigationContainer>
//           <Stack.Navigator>

//             <Stack.Screen name='OnBoarding' options={{ headerShown: false }} component={OnBoarding} />
//             <Stack.Screen name='SignUp' options={{ headerShown: false }} component={SignUp} />
//             <Stack.Screen name='CreatePassword' options={{ headerShown: false }} component={CreatePassword} />
//             <Stack.Screen name='VerifyPhone' options={{ headerShown: false }} component={VerifyPhone} />
//             <Stack.Screen name='SignIn' options={{ headerShown: false }} component={SignIn} />
//             <Stack.Screen name='ForgotPassword' options={{ headerShown: false }} component={ForgotPassword} />
//             <Stack.Screen name='RecoveryCode' options={{ headerShown: false }} component={RecoveryCode} />
//             <Stack.Screen name='UpdatePassword' options={{ headerShown: false }} component={UpdatePassword} />

//             <Stack.Screen name='Home' options={{ title: 'Limgo Agent', headerShown: false }} component={HomeScreen} />
//             <Stack.Screen name='Profile' options={{ headerShown: false }} component={Profile} />
//             <Stack.Screen name='ChangePassword' options={{ headerShown: false }} component={ChangePassword} />
//             <Stack.Screen name='History' options={{ headerShown: true }} component={History} />
//             <Stack.Screen name='Notification' options={{ headerShown: true }} component={Notification} />
//             <Stack.Screen name='ChatWithUs' options={{ headerShown: true }} component={ChatWithUs} />
//             <Stack.Screen name='Settings' options={{ headerShown: true }} component={Settings} />
//             <Stack.Screen name='Tutorials' options={{ headerShown: true }} component={Tutorials} />
//             <Stack.Screen name='Support' options={{ headerShown: true }} component={Support} />

//           </Stack.Navigator>
//         </NavigationContainer>
//         <StatusBar style="auto" />
//       {/* </OnboardingProvider> */}
//     </SafeAreaProvider>
//   );
// }
