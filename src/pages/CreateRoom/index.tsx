import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { Button, ButtonType, ImagePicker, Input, Navbar, UserPreviewDialog } from '../../components';
import { useFriends, useRooms } from '../../api';
import { IAnotherUser } from '../../types';
import { useRouter } from '../../router/useRouter';
import { Routes } from '../../router/routes';

export const CreateRoomPage: FC = () => {
    const { getFriends } = useFriends();
    const { goTo, data } = useRouter();
    const { createRoom, isLoading, updateRoom } = useRooms();
    const [avatarUri, setAvatarUri] = useState(data?.room?.avatar || '');
    const [title, setTitle] = useState(data?.room?.title || '');
    const [friends, setFriends] = useState<IAnotherUser[]>([]);
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>(data?.users?.map((it: IAnotherUser) => it.id) || []);

    const loadFriends = async () => {
        setFriends(await getFriends() || []);
    }

    const toggleUser = useCallback((id: number) => {
        if (selectedUserIds.includes(id)) {
            setSelectedUserIds(prev => prev.filter(it => it !== id));
        } else {
            setSelectedUserIds(prev => [...prev, id]);
        }
    }, [selectedUserIds]);

    useEffect(() => {
        loadFriends();
    }, []);

    const renderedFriends = useMemo(() => {
        return friends.map(it =>  (
            <UserPreviewDialog key={it.id} user={it} onClick={() => toggleUser(it.id)} isSelected={selectedUserIds.includes(it.id)} />
        ));
    }, [friends, selectedUserIds]);

    const handleCreate = useCallback(async () => {
        if (data?.room) {
            const room = await updateRoom(
                data.room.id,
                title,
                avatarUri,
                selectedUserIds,
            );
            if (room) goTo(Routes.ROOM, { roomId: room.id });
        } else {
            await createRoom({
                title,
                avatar: avatarUri,
                userIds: selectedUserIds,
            });
            goTo(Routes.ROOMS);
        }

    }, [selectedUserIds, title, avatarUri, data]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.wrapper}>
                <Navbar />
                <View style={styles.avatarBlock}>
                    <ImagePicker image={avatarUri} onPick={setAvatarUri} placeholder={require('./avatar.png')} />
                    <Input width={'100%'} value={title} onChange={setTitle} label={'Title'} />
                </View>
                <View style={styles.block}>
                    {!friends.length && <Text>Not yet friends</Text>}
                    <Text style={styles.text}>Select users to group</Text>
                    <ScrollView style={{ width: '100%' }}>
                        {renderedFriends}
                    </ScrollView>
                </View>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', padding: 0 }}>
                    <Button
                        disabled={!title || isLoading}
                        mt={20}
                        text={data?.room ? 'Update' : 'Create'}
                        pr={0}
                        pl={0}
                        onClick={handleCreate}
                        type={ButtonType.AGREE}
                    />
                </View>
            </SafeAreaView>
        </View>
    )
}
