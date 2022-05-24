import React, { FC, useMemo } from 'react';
import { IAnotherUser, IMusic, IUser } from '../../types';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styled';

export interface IUserPreviewDialogsProps {
    user: IAnotherUser;
    onClick: () => void;
    isSelected?: boolean;
}

export const UserPreviewDialog: FC<IUserPreviewDialogsProps> = ({ user, onClick, isSelected }) => {
    return (
        <TouchableOpacity style={{ width: '100%' }} onPress={onClick}>
            <View style={styles.container}>
                {/* @ts-ignore */}
                <View style={styles.block}>
                    {user.photo
                        ? <Image source={{ uri: user.photo }} style={styles.image}/>
                        : <Image source={require('./avatar.png')} style={styles.image}/>
                    }
                    <View style={styles.texts}>
                        <Text style={{ ...styles.text, ...styles.title }}>{user.username}</Text>
                    </View>
                </View>

                <View style={isSelected ? styles.selectedStatus : styles.status}>
                    <Text style={isSelected ? styles.statusText : styles.unselectedStatusText}>{isSelected ? 'Selected' : 'Not selected'}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
