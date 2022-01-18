import * as React from 'react';
import * as SecureStore from 'expo-secure-store';


export const OnboardingContext = React.createContext();

export const OnboardingProvider = async ({ children }) => {
    const [isOnborded, setIsOnbord] = useState(await SecureStore.getItemAsync('isOnborded'));
    const setIsOnborded = async () => {
        await SecureStore.setItemAsync('isOnborded', true);
        setIsOnbord(true)
    }
    return (
        <OnboardingContext.Provider value={[isOnborded, setIsOnborded]}>
            {children}
        </OnboardingContext.Provider>
    )
}