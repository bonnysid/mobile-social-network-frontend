import { FC } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { IMessage, IUser, MessageType } from '../../types';
import { styles } from './styled';

interface IMessageProps {
    message: IMessage;
    user?: IUser;
    onClick: () => void;
}

export const Message: FC<IMessageProps> = ({ message, user, onClick }: IMessageProps) => {
    const date = new Date(message.createdAt);

    switch (message.event) {
        case MessageType.MESSAGE:
            return (
                <TouchableOpacity onPress={onClick}>
                    <View style={styles.container}>
                        <Image source={{ uri: user?.photo }} style={styles.avatar} />
                        <View style={styles.rightContent}>
                            <View style={styles.topContent}>
                                <Text style={styles.username}>{user?.username}</Text>
                                <Text style={styles.date}>
                                    {String(date.getHours()).length === 1 ? `0${date.getHours()}` : date.getHours()}:{String(date.getMinutes()).length === 1 ? `0${date.getMinutes()}` : date.getMinutes()}
                                </Text>
                            </View>
                            <Text style={styles.message}>{message.message}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        case MessageType.REMOVE_USER:
        case MessageType.INVITE_USER:
            return (
                <View style={styles.otherContainer}>
                    <Text style={styles.message}>{message.message}</Text>
                </View>
            )
        default: return null;
    }
}
