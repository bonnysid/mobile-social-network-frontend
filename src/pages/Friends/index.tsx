import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { useAuth } from '../../providers';
import {
    Button,
    ButtonType,
    ImagePicker,
    Input,
    InputScheme,
    LoadingModal,
    Navbar,
    UserPreview
} from '../../components';
import { IAnotherUser } from '../../types';
import { useFriends, useUser } from '../../api';
import { useRouter } from '../../router/useRouter';
import { Routes } from '../../router/routes';

export const FriendsPage: FC = () => {
    const [users, setUsers] = useState<IAnotherUser[]>([]);
    const { getUsers, isLoading } = useUser();
    const { goTo } = useRouter();
    const { user } = useAuth();
    const { sendRequest, declineRequest, unfriend, acceptRequest } = useFriends();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setUsers(await getUsers() || []);
    }

    const handleUnFriend = useCallback(async (id: number) => {
        const res = await unfriend(id);
        if (res) {
            setUsers(prev => prev.map(it => it.id === id ? { ...it, isFriend: false } : it));
        }
    }, []);

    const handleSendRequest = useCallback(async (id: number) => {
        const res = await sendRequest(id);
        if (res) {
            setUsers(prev => prev.map(it => it.id === id ? { ...it, isFriendRequested: true } : it));
        }
    }, []);

    const handleDeclineRequest = useCallback(async (fromId: number, toId: number) => {
        const res = await declineRequest(fromId, toId);
        if (res) {
            setUsers(prev => prev.map(it => it.id === toId || it.id === fromId ? { ...it, isFriend: false, isWandToAddYou: false, isFriendRequested: false } : it));
        }
    }, []);

    const handleAcceptRequest = useCallback(async (id: number) => {
        const res = await acceptRequest(id);
        if (res) {
            setUsers(prev => prev.map(it => it.id === id ? { ...it, isFriend: true, isWandToAddYou: false, isFriendRequested: false } : it));
        }
    }, []);

    const renderedFriendRequest = useMemo(() => {
        return users
            .filter(it => it.isWandToAddYou)
            .map(it => (
                <UserPreview
                    key={it.id}
                    user={it}
                    onClick={() => goTo(Routes.PROFILE, { userId: it.id })}
                    onAdd={() => handleAcceptRequest(it.id)}
                    onDecline={() => user && handleDeclineRequest(it.id, user?.id)}
                />
            ))
    }, [users]);

    const renderedFriends = useMemo(() => {
        return users
            .filter(it => it.isFriend)
            .map(it => (
                <UserPreview
                    key={it.id}
                    user={it}
                    onClick={() => goTo(Routes.PROFILE, { userId: it.id })}
                    onAdd={() => handleUnFriend(it.id)}
                />
            ))
    }, [users]);

    const renderedFriendRequests = useMemo(() => {
        return users
            .filter(it => it.isFriendRequested)
            .map(it => (
                <UserPreview
                    key={it.id}
                    user={it}
                    onClick={() => goTo(Routes.PROFILE, { userId: it.id })}
                    onAdd={() => user && handleDeclineRequest(user.id, it.id)}
                />
            ))
    }, [users]);

    const renderedUsers = useMemo(() => {
        return users
            .filter(it => !it.isFriendRequested && !it.isFriend && !it.isWandToAddYou)
            .map(it => (
                <UserPreview
                    key={it.id}
                    user={it}
                    onClick={() => goTo(Routes.PROFILE, { userId: it.id })}
                    onAdd={() => handleSendRequest(it.id)}
                />
            ))
    }, [users]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.wrapper}>
                <Navbar />
                <LoadingModal isLoading={isLoading} />
                <ScrollView style={{ width: '100%' }}>
                    {Boolean(renderedFriendRequest.length) && <Text style={styles.textSeparator}>USERS WANT ADD YOU</Text>}
                    {renderedFriendRequest}
                    {Boolean(renderedFriends.length) && <Text style={styles.textSeparator}>FRIENDS</Text>}
                    {renderedFriends}
                    {Boolean(renderedFriendRequests.length) && <Text style={styles.textSeparator}>WAITING REQUESTS</Text>}
                    {renderedFriendRequests}
                    {Boolean(renderedUsers.length) && <Text style={styles.textSeparator}>USERS</Text>}
                    {renderedUsers}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
