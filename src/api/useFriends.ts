import { useRequest } from './useRequest';
import { useCallback } from 'react';
import { IAnotherUser, IUser } from '../types';

export const useFriends = () => {
    const { get, put, remove, post, ...rest } = useRequest();

    const getFriends = useCallback(async () => {
        return get<IAnotherUser[]>('/friends');
    }, []);

    const sendRequest = useCallback(async (userId: number) => {
        return post<boolean, { userId: number }>('/friends', { userId });
    }, []);

    const acceptRequest = useCallback(async (userFrom: number) => {
        return post<boolean, { userFrom: number }>('/friends/accept', { userFrom });
    }, []);

    const declineRequest = useCallback(async (userFrom: number, userTo: number) => {
        return post<boolean, { userFrom: number, userTo: number }>('/friends/decline', { userFrom, userTo });
    }, []);

    const checkIsFriend = useCallback(async (userId: number) => {
        return post<boolean, { userId: number }>('/friends/is_friend', { userId });
    }, []);

    const checkIsFriendRequest = useCallback(async (userId: number) => {
        return post<boolean, { userId: number }>('/friends/is_friend_request', { userId });
    }, []);

    const unfriend = useCallback(async (userId: number) => {
        return post<boolean, { userId: number }>('/friends/unfriend', { userId });
    }, []);

    return {
        ...rest,
        getFriends,
        sendRequest,
        acceptRequest,
        declineRequest,
        checkIsFriend,
        checkIsFriendRequest,
        unfriend,
    }
}
