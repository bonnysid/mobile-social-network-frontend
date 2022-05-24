import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export const instance = axios.create({
    baseURL: 'http://192.168.0.107:5000/api',
    withCredentials: true,
});

instance.interceptors.request.use(async (req) => {
    try {
        let token = '';
        if (await SecureStore.isAvailableAsync()) {
            token = await SecureStore.getItemAsync('token') || '';
        }
        req.headers = {
            ...req.headers,
            Authorization: `Bearer ${token}`,
        }
        return req;
    } catch (e) {
        console.log(e);
    }
});
