import React, { FC, useMemo } from 'react';
import { IAnotherUser, IMusic, IUser } from '../../types';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styled';

export interface IUserPreviewProps {
    user: IAnotherUser;
    onClick: () => void;
    onAdd: () => void;
    onDecline?: () => void;
}

export const UserPreview: FC<IUserPreviewProps> = ({ user, onClick, onAdd, onDecline }) => {
    const renderedStatusButton = useMemo(() => {
        if (user.isWandToAddYou) {
            return (
                <View style={styles.buttonsWrapper}>
                    <TouchableOpacity onPress={onAdd}>
                        <View style={[styles.status, { marginRight: 20 }]}>
                            <Text style={styles.statusText}>Accept</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDecline}>
                        <View style={styles.removeStatus}>
                            <Text style={styles.statusText}>Decline</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }

        if (user.isFriendRequested) {
            return (
                <TouchableOpacity onPress={onAdd}>
                    <View style={styles.normalStatus}>
                        <Text style={styles.statusText}>Requested</Text>
                    </View>
                </TouchableOpacity>
            );
        }

        if (user.isFriend) {
            return (
                <TouchableOpacity onPress={onAdd}>
                    <View style={styles.removeStatus}>
                        <Text style={styles.statusText}>Remove</Text>
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity onPress={onAdd}>
                <View style={styles.status}>
                    <Text style={styles.statusText}>Add</Text>
                </View>
            </TouchableOpacity>
        );
    }, [onClick, user.isFriend, user.isFriendRequested]);
    return (
        <View style={styles.container}>
            {/* @ts-ignore */}
            <TouchableOpacity onPress={onClick}>
                <View style={styles.block}>
                    {user.photo
                        ? <Image source={{ uri: user.photo }} style={styles.image}/>
                        : <Image source={require('./avatar.png')} style={styles.image}/>
                    }
                    <View style={styles.texts}>
                        <Text style={{ ...styles.text, ...styles.title }}>{user.username}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {renderedStatusButton}
        </View>
    );
}
