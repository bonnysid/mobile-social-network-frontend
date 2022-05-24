import { useRequest } from './useRequest';
import { useCallback } from 'react';
import { IMessage, IRoom, IRoomWithoutId, IUser } from '../types';

export const useRooms = () => {
    const { get, put, remove, post, ...rest } = useRequest();

    const createRoom = useCallback(async (data: IRoomWithoutId) => {
        return post<IRoom, IRoomWithoutId>('/rooms', data);
    }, []);

    const getRooms = useCallback(async () => {
        return get<IRoom[]>('/rooms');
    }, []);

    const deleteRoom = useCallback(async (roomId: number) => {
        return remove<boolean>(`/rooms/${roomId}`);
    }, []);

    const changeAvatar = useCallback(async (avatar: string) => {
        return post<IRoom, { avatar: string }>(`/rooms/avatar`, { avatar });
    }, []);

    const changeTitle = useCallback(async (title: string) => {
        return post<IRoom, { title: string }>(`/rooms/title`, { title });
    }, []);

    const inviteUser = useCallback(async (userId: number, roomId: number) => {
        return post<boolean, { userId: number, roomId: number }>(`/rooms/invite`, { userId, roomId });
    }, []);

    const removeUser = useCallback(async (userId: number, roomId: number) => {
        return post<boolean, { userId: number, roomId: number }>(`/rooms/remove`, { userId, roomId });
    }, []);

    const getMessages = useCallback(async (roomId: number) => {
        return get<IMessage[]>(`/rooms/messages/${roomId}`);
    }, []);

    const getUsers = useCallback(async (roomId: number) => {
        return get<IUser[]>(`/rooms/users/${roomId}`);
    }, []);

    const getRoom = useCallback(async (roomId: number) => {
        return get<IRoom>(`/rooms/${roomId}`);
    }, []);

    const deleteMessage = useCallback(async (messageId: number) => {
        return remove<boolean>(`/rooms/message/${messageId}`);
    }, []);

    const updateRoom = useCallback(async (roomId: number, title: string, avatar: string, userIds: number[]) => {
        return put<IRoom, { title: string, avatar: string, roomId: number, userIds: number[] }>('/rooms', { title, avatar, userIds, roomId });
    }, []);

    return {
        ...rest,
        createRoom,
        getRooms,
        deleteRoom,
        changeAvatar,
        changeTitle,
        inviteUser,
        removeUser,
        getMessages,
        getUsers,
        getRoom,
        updateRoom,
        deleteMessage,
    };
}
