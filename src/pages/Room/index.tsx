import { FC, useCallback, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Button, ButtonType, EditIcon, Input, LoadingModal, Message, Navbar, SendIcon } from '../../components';
import { useRouter } from '../../router/useRouter';
import { useChat } from '../../api';
import { COLORS } from '../../utils/colors';
import Modal from 'react-native-modal';
import { Routes } from '../../router/routes';

export const RoomPage: FC = () => {
    const { data, goTo } = useRouter();
    const [selectedMessage, setSelectedMessage] = useState<number | undefined>();
    const [message, setMessage] = useState('');
    const [inFocus, setInFocus] = useState(false);
    const { removeUserFromChat, inviteUserToChat, user, messages, sendMessage, users, room, removeMessage, isLoading } = useChat(data.roomId || data?.room.id);

    const handleFocus = useCallback(() => {
        setInFocus(true);
    }, []);

    const handleBlur = useCallback(() => {
        setInFocus(false);
    }, []);

    if (!room) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.wrapper}>
                    <LoadingModal isLoading={true} />
                </SafeAreaView>
            </View>
        )
    }
    return (
        <>
            <View style={styles.container}>
                <SafeAreaView style={[styles.wrapper, inFocus ? { height: '45%' } : {}]}>
                    <Navbar />
                    <View style={styles.chat}>
                        <View style={styles.topContent}>
                            <Image source={{ uri: room.avatar }} style={styles.avatar} />
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{room.title}</Text>
                            </View>
                            {user?.id === room.ownerId && <TouchableOpacity onPress={() => goTo(Routes.CREATE_ROOM, { room, users })}>
                                <EditIcon fill={COLORS.whiteLight} />
                            </TouchableOpacity>}
                        </View>
                        <ScrollView style={styles.messages}>
                            {messages.map(message => {
                                const messageUser = users.find(it => it.id === message.userId);

                                return <Message key={message.id} message={message} user={messageUser} onClick={() => setSelectedMessage(message.id)} />
                            })}
                        </ScrollView>
                        <View style={[styles.bottomContent, inFocus ? styles.focusedBottom : {}]}>
                            <Input value={message} onChange={setMessage} onFocus={handleFocus} onBlur={handleBlur} />
                            <TouchableOpacity style={{ marginLeft: 10, }} onPress={() => {
                                if (message) {
                                    sendMessage(message);
                                    setMessage('');
                                }
                            }}>
                                <SendIcon fill={COLORS.whiteLight} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
            <Modal
                isVisible={Boolean(selectedMessage)}
                onBackdropPress={() => setSelectedMessage(undefined)}
            >
                <View style={styles.modal}>
                    <Text style={styles.modalQuestion}>Do you want delete the message?</Text>
                    <View style={styles.modalButtons}>
                        <Button pl={0} pr={0} text={'Yes'} type={ButtonType.AGREE} onClick={() => {
                            removeMessage(selectedMessage as number);
                            setSelectedMessage(undefined);
                        }} />
                        <Button pl={0} pr={0} mt={10} text={'No'} type={ButtonType.DANGER} onClick={() => {
                            setSelectedMessage(undefined);
                        }} />
                    </View>
                </View>
            </Modal>
            <LoadingModal isLoading={isLoading} />
        </>
    )
}
