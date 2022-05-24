import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import { Navbar, SongPreview } from '../../components';
import { useRouter } from '../../router/useRouter';
import { Routes } from '../../router/routes';
import { useAudio } from '../../providers';

export const MainPage: FC = () => {
    const { musics, currentMusic } = useAudio();
    const { goTo } = useRouter();

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.wrapper}>
                <Navbar/>
                <ScrollView>
                    {musics.map(it => (
                        <SongPreview
                            key={it.id}
                            onClick={() => goTo(Routes.PLAYER, { song: it, songs: musics })}
                            song={it}
                            isPlaying={it.id === currentMusic?.id}
                        />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
