import { FC, useCallback, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useUser } from '../../api';
import * as SecureStore from 'expo-secure-store';
import { IUser } from '../../types';

export const AuthProvider: FC = ({ children }) => {
    const [user, setUser] = useState<IUser | undefined>();
    const [isAuth, setIsAuth] = useState(false);
    const { check, login, registration, isError, error, resetError, isLoading, updatePhoto, updateUsername, updatePassword } = useUser();

    useEffect(() => {
        initialCheck();
    }, []);

    const uploadAvatar = useCallback(async (uri: string) => {
        const res = await updatePhoto(uri);
        setUser(res);
    }, []);

    const changeUsername = useCallback(async (username: string) => {
        const res = await updateUsername(username);
        if (res?.user) {
            setUser(res.user);
            await SecureStore.setItemAsync('token', res.token);
        }
    }, []);

    const changePassword = useCallback(async (newPassword: string, password: string) => {
        const res = await updatePassword(newPassword, password);
        if (res) {
            setUser(res);
        }
    }, []);

    const initialCheck = async () => {
        const token = await SecureStore.getItemAsync('token')
        if (token) {
            const res = await check();
            if (res?.token) {
                await SecureStore.setItemAsync('token', res.token);
                setIsAuth(true);
                setUser(res.user);
            } else {
                setIsAuth(false);
            }
        } else {
           setIsAuth(false);
        }
    }

    const onLogin = async (username: string, password: string) => {
        if (username && password) {
            const res = await login(username, password);
            if (res?.token) {
                setIsAuth(true);
                setUser(res.user);
                await SecureStore.setItemAsync('token', res.token);
            } else {
                setIsAuth(false);
                await SecureStore.deleteItemAsync('token');
            }
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync('token');
        setIsAuth(false);
    }

    const onRegistration = async (username: string, password: string) => {
        if (username && password) {
            const res = await registration(username, password);
            if (res?.token) {
                setIsAuth(true);
                setUser(res.user);
                await SecureStore.setItemAsync('token', res.token);
            } else {
                setIsAuth(false);
                await SecureStore.deleteItemAsync('token');
            }
        }
    }

    return (
        <AuthContext.Provider value={{ changeUsername, changePassword, user, isAuth, onLogin, onRegistration, isError, error, resetError, isLoading, logout, uploadAvatar }}>
            {children}
        </AuthContext.Provider>
    )
}
