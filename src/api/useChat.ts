import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../providers';
import { IMessage, IMessageCreateData, IRoom, IUser, MessageType } from '../types';
import { useRooms } from './useRooms';

export const WEBSOCKET_URL = 'ws://192.168.0.107:5500';

const isContains = (messages: IMessage[], id: number) => {
    const candidate = messages.find(it => it.id === id);
    return Boolean(candidate);
}

export const useChat = (roomId: number) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [room, setRoom] = useState<IRoom>();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const { getMessages, inviteUser, removeUser, getUsers, getRoom, deleteMessage, isLoading } = useRooms();
    const [isConnected, setIsConnected] = useState(false);
    const { user } = useAuth();
    const socket = useRef<WebSocket>();

    useEffect(() => {
        loadMessages();
        loadUsers();
        loadRoom();
        connect();
    }, []);

    const loadMessages = async () => {
        if (roomId) {
            const loadedMessages = await getMessages(roomId);
            if (Array.isArray(loadedMessages)) {
                setMessages(prev => [...prev, ...loadedMessages.filter(it => !isContains(messages, it.id))]);
            }
        }
    }

    const loadUsers = async () => {
        if (roomId) {
            setUsers(await getUsers(roomId) || []);
        }
    }

    const loadRoom = async () => {
        if (roomId) {
            setRoom(await getRoom(roomId));
        }
    }

    const connect = useCallback(() => {
        socket.current = new WebSocket(WEBSOCKET_URL);

        if (socket.current && user) {
            socket.current.onopen = () => {
                console.log('socket: open');
                const message: IMessageCreateData = {
                    message: `${user.username} connected to chat`,
                    event: MessageType.CONNECTION,
                    roomId,
                    userId: user.id,
                }
                setIsConnected(true);
                socket.current?.send(JSON.stringify(message));
            }

            socket.current.onmessage = (event) => {
                const message = JSON.parse(event.data) as IMessage;
                if (message.event !== MessageType.CONNECTION && !isContains(messages, message.id)) {
                    setMessages(prev => [...prev, message]);
                }
            }

            socket.current.onclose = () => {
                console.log('socket: closed')
                setIsConnected(false);
            }

            socket.current.onerror = () => {
                console.log('socket: error')
            }
        }
    }, [user]);

    const sendMessage = useCallback((text: string) => {
        if (socket.current && user) {
            const message: IMessageCreateData = {
                message: text,
                roomId,
                userId: user.id,
                event: MessageType.MESSAGE,
            }

            socket.current?.send(JSON.stringify(message));
        }
    }, [socket.current, user]);

    const inviteUserToChat = useCallback(async (userId: number) => {
        await inviteUser(userId, roomId);
    }, [socket.current]);

    const removeUserFromChat = useCallback(async (userId: number) => {
        await removeUser(userId, roomId);
    }, [socket.current]);

    const removeMessage = useCallback(async (messageId: number) => {
        const res = await deleteMessage(messageId);

        if (res) {
            setMessages(prev => prev.filter(it => it.id !== messageId));
        }
    }, []);

    return {
        isConnected,
        messages,
        sendMessage,
        inviteUserToChat,
        removeUserFromChat,
        users,
        room,
        removeMessage,
        isLoading,
        user,
    }
}
