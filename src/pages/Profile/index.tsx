import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { useAuth } from '../../providers';
import { Button, ButtonType, ImagePicker, Input, InputScheme, LoadingModal, Navbar } from '../../components';
import { useRouter } from '../../router/useRouter';
import { IAnotherUser } from '../../types';
import { useFriends, useUser } from '../../api';

const avatarPlaceholder = require('./avatar.png');

export const ProfilePage: FC = () => {
    const { data } = useRouter();
    const [inFocus, setInFocus] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [anotherUser, setAnotherUser] = useState<IAnotherUser>();
    const { getUser } = useUser();
    const { acceptRequest, sendRequest, declineRequest, unfriend, isLoading } = useFriends();
    const { user, uploadAvatar, changeUsername, changePassword, isLoading: isLoadingAuth } = useAuth();

    useEffect(() => {
        loadUser();
    }, []);

    const onFocus = useCallback(() => {
        setInFocus(true);
    }, []);

    const onBlur = useCallback(() => {
        setInFocus(false);
    }, []);

    const loadUser = async () => {
        if (data.userId) {
            setAnotherUser(await getUser(data.userId));
        }
    }

    const buttonSettings = useMemo(() => {
        if (anotherUser) {
            if (anotherUser.isWandToAddYou) {
                return [
                    {
                        type: ButtonType.AGREE,
                        text: 'Accept',
                        onClick: async () => {
                            const res = await acceptRequest(anotherUser.id);
                            if (res) {
                                setAnotherUser(prev => prev && ({ ...prev, isFriend: true, isFriendRequested: false, isWandToAddYou: false }))
                            }
                        },
                    },
                    {
                        type: ButtonType.DANGER,
                        text: 'Decline',
                        onClick: async () => {
                            if (user) {
                                const res = await declineRequest(anotherUser.id, user.id);

                                if (res) {
                                    setAnotherUser(prev => prev && ({ ...prev, isFriend: false, isFriendRequested: false, isWandToAddYou: false }))
                                }
                            }
                        }
                    }
                ];
            }

            if (anotherUser.isFriendRequested) {
                return [{
                    type: ButtonType.DEFAULT,
                    text: 'Decline request',
                    onClick: async () => {
                        if (user) {
                            const res = await declineRequest(user.id, anotherUser.id);

                            if (res) {
                                setAnotherUser(prev => prev && ({ ...prev, isFriend: false, isFriendRequested: false, isWandToAddYou: false }))
                            }
                        }
                    }
                }]
            }

            if (anotherUser.isFriend) {
                return [{
                    type: ButtonType.DANGER,
                    text: 'Remove',
                    onClick: async () => {
                        const res = await unfriend(anotherUser.id);
                        if (res) {
                            setAnotherUser(prev => prev && ({ ...prev, isFriend: false, isFriendRequested: false, isWandToAddYou: false }))
                        }
                    }
                }]
            }

            return [{
                type: ButtonType.AGREE,
                text: 'Add',
                onClick: async () => {
                    const res = await sendRequest(anotherUser.id);
                    if (res) {
                        setAnotherUser(prev => prev && ({ ...prev, isFriend: false, isFriendRequested: true, isWandToAddYou: false }))
                    }
                }
            }]
        }
    }, [anotherUser, user]);

    const content = useMemo(() => {
        if (anotherUser && buttonSettings) {
            return (
                <>
                    <Button text={buttonSettings[0].text} type={buttonSettings[0].type} onClick={buttonSettings[0].onClick} />
                    {buttonSettings[1] && (
                        <Button mt={20} text={buttonSettings[1].text} type={buttonSettings[1].type} onClick={buttonSettings[0].onClick} />
                    )}
                </>
            )
        }

        return (
            <>
                <Input
                    marginBottom={10}
                    value={username}
                    onChange={setUsername}
                    label={'New Username'}
                    scheme={InputScheme.DARK}
                />
                <Button
                    type={ButtonType.AGREE}
                    mb={20}
                    text={'Change username'}
                    onClick={() => changeUsername(username)}
                    disabled={!username}
                />
                <Input
                    marginBottom={10}
                    value={password}
                    onChange={setPassword}
                    label={'Password'}
                    scheme={InputScheme.DARK}
                    secureTextEntry={true}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                <Input
                    value={newPassword}
                    onChange={setNewPassword}
                    label={'New password'}
                    scheme={InputScheme.DARK}
                    secureTextEntry={true}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                <Button
                    type={ButtonType.AGREE}
                    mt={10}
                    text={'Change password'}
                    onClick={() => changePassword(newPassword, password)}
                    disabled={!newPassword || !password}
                />
            </>
        );
    }, [data.userId, user, anotherUser]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.wrapper}>
                <Navbar />
                <ScrollView style={{ width: '100%' }}>
                    <View style={styles.avatarContainer}>
                        <ImagePicker withEdit={!data.userId} image={anotherUser ? anotherUser.photo : user?.photo} onPick={uploadAvatar} placeholder={avatarPlaceholder} />
                        <Text style={styles.username}>{anotherUser ? anotherUser.username : user?.username}</Text>
                    </View>

                    <View style={{ ...styles.block, ...(inFocus ? styles.focused : {})}}>
                        {content}
                    </View>
                </ScrollView>
            </SafeAreaView>
            <LoadingModal isLoading={isLoadingAuth || isLoading} />
        </View>
    )
}
