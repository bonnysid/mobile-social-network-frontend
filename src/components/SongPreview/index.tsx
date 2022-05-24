import { FC } from 'react';
import { IMusic } from '../../types';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styled';

export interface ISongPreviewProps {
    onClick: () => void;
    song: IMusic;
    isPlaying: boolean;
}

export const SongPreview: FC<ISongPreviewProps> = ({ song, onClick, isPlaying }) => {
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.container}>
                {/* @ts-ignore */}
                <View style={styles.block}>
                    <Image style={styles.image} source={song.avatar} />
                    <View style={styles.texts}>
                        <Text style={{ ...styles.text, ...styles.title }}>{song.title}</Text>
                        <Text style={styles.text}>{song.artist}</Text>
                    </View>
                </View>
                {isPlaying && (
                    <View style={styles.status}>
                        <Text style={styles.statusText}>Playing</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}
