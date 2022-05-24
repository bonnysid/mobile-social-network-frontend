import React, { FC, useMemo } from 'react';
import { IAnotherUser, IMusic, IRoom, IUser } from '../../types';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styled';
import { DeleteIcon } from '../../components/icons';
import { COLORS } from '../../utils/colors';

export interface IDialogPreviewProps {
    room: IRoom;
    onClick: () => void;
    onDelete: () => void;
}

export const DialogPreview: FC<IDialogPreviewProps> = ({ onClick, room, onDelete }) => {
    return (
        <View style={styles.container}>
            {/* @ts-ignore */}
            <TouchableOpacity onPress={onClick}>
                <View style={styles.block}>
                    {room.avatar
                        ? <Image source={{ uri: room.avatar }} style={styles.image}/>
                        : <Image source={require('./avatar.png')} style={styles.image}/>
                    }
                    <View style={styles.texts}>
                        <Text style={{ ...styles.text, ...styles.title }}>{room.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
                <DeleteIcon fill={COLORS.lightRed} />
            </TouchableOpacity>
        </View>
    );
}
