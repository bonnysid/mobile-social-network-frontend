import { FC, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { Button, ButtonType, DialogPreview, LoadingModal, Navbar } from '../../components';
import { useRooms } from '../../api';
import { IRoom } from '../../types';
import { useRouter } from '../../router/useRouter';
import { Routes } from '../../router/routes';
import Modal from 'react-native-modal';

export const RoomsPage: FC = () => {
    const { goTo } = useRouter();
    const [selectedRoom, setSelectedRoom] = useState<number | undefined>();
    const [rooms, setRooms] = useState<IRoom[]>([])
    const { getRooms, deleteRoom, isLoading } = useRooms();

    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = async () => {
        setRooms(await getRooms() || []);
    }
    return (
        <>
            <View style={styles.container}>
                <SafeAreaView style={styles.wrapper}>
                    <Navbar />
                    <Button pl={0} pr={0} mt={20} text={'Creat room'} onClick={() => goTo(Routes.CREATE_ROOM)} type={ButtonType.AGREE} />
                    {!rooms.length && <Text style={styles.emptyText}>Not yet rooms</Text>}
                    <ScrollView style={{ width: '100%' }}>
                        {rooms.map(it => (
                            <DialogPreview
                                key={it.id}
                                room={it}
                                onClick={() => goTo(Routes.ROOM, { roomId: it.id })}
                                onDelete={() => setSelectedRoom(it.id)}
                            />
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </View>
            <Modal
                isVisible={Boolean(selectedRoom)}
                onBackdropPress={() => setSelectedRoom(undefined)}
            >
                <View style={styles.modal}>
                    <Text style={styles.modalQuestion}>Do you want delete the room?</Text>
                    <View style={styles.modalButtons}>
                        <Button pl={0} pr={0} text={'Yes'} type={ButtonType.AGREE} onClick={async () => {
                            const res = await deleteRoom(selectedRoom as number);
                            if (res) {
                                setRooms(prev => prev.filter(it => it.id !== selectedRoom));
                            }
                            setSelectedRoom(undefined);
                        }} />
                        <Button pl={0} pr={0} mt={10} text={'No'} type={ButtonType.DANGER} onClick={() => {
                            setSelectedRoom(undefined);
                        }} />
                    </View>
                </View>
            </Modal>
            <LoadingModal isLoading={isLoading} />
        </>
    )
}
