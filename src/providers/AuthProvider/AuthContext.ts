import { createContext } from 'react';
import { IRequestData } from '../../api';
import { IUser } from '../../types';

export interface IAuthContext extends IRequestData {
    isAuth: boolean;
    onLogin: (username: string, password: string) => Promise<void>;
    onRegistration: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    uploadAvatar: (uri: string) => Promise<void>;
    changeUsername: (username: string) => Promise<void>;
    changePassword: (newPassword: string, password: string) => Promise<void>;
    user?: IUser;
}

const initialState: IAuthContext = {
    isAuth: false,
    isError: false,
    error: '',
    isLoading: false,
    resetError: () => {},
    onLogin: async () => {},
    onRegistration: async () => {},
    logout: async () => {},
    uploadAvatar: async () => {},
    changeUsername: async () => {},
    changePassword: async () => {},
}

export const AuthContext = createContext(initialState);
