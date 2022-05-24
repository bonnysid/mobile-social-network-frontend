import { useRequest } from './useRequest';
import SecureStore from 'expo-secure-store';
import { useCallback } from 'react';
import { IAnotherUser, IUser } from '../types';

export const useUser = () => {
    const { get, post, put, remove, ...rest } = useRequest();

    const login = useCallback(async (username: string, password: string) => {
        const data = await post<{ token: string, user: IUser }, { username: string, password: string }>(
            '/user/login',
            { username, password }
        );

        return data;
    }, []);

    const registration = useCallback(async (username: string, password: string) => {
        const data = await post<{ token: string, user: IUser }, { username: string, password: string }>(
            '/user/registration',
            { username, password }
        );

        return data;
    }, []);

    const check = useCallback(async () => {
        const data = await get<{ token: string, user: IUser }>('/user/auth');

        return data;
    }, []);

    const updatePhoto = useCallback(async (uri: string) => {
        const res = await post<IUser, {}>('/user/upload', { uri }, {
            header: {
                'content-type': 'multipart/form-data',
            },
        })
        return res;
    }, []);

    const updateUsername = useCallback(async (username: string) => {
        const res = await put<{ user: IUser, token: string}, {}>('/user/username', { username })
        return res;
    }, []);

    const updatePassword = useCallback(async (newPassword: string, password: string) => {
        const res = await put<IUser, {}>('/user/password', { password, newPassword })
        return res;
    }, []);

    const getUsers = useCallback(async () => {
        return await get<IAnotherUser[]>('/user');
    }, []);

    const getUser = useCallback(async (id: number) => {
        return await get<IAnotherUser>(`/user/${id}`);
    }, []);

    return {
        ...rest,
        login,
        registration,
        check,
        updatePhoto,
        updateUsername,
        updatePassword,
        getUsers,
        getUser,
    }
}
