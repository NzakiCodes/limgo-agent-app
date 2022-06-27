import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

export default async function authHeader() {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
        return {
            'Accept': 'application/json',
            Authorization: `Bearer ${token}` ,
        };
    } else {
        return {};
    }
}
