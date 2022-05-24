import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Image, ImageSourcePropType } from 'react-native';
import { styles } from './styles';
import { Navbar, NextIcon, PauseIcon, PlayIcon, PrevIcon } from '../../components';
import { useRouter } from '../../router/useRouter';
import { COLORS } from '../../utils/colors';
import { useAudio } from '../../providers';
import Slider from '@react-native-community/slider';

export const PlayerPage: FC = () => {
    const {
        play,
        playPrev,
        playNext,
        isPrevDisabled,
        isNextDisabled,
        isPlaying,
        pause,
        updateSoundObj,
        currentMusic,
        soundStatus,
        updateTime,
    } = useAudio();
    const { data } = useRouter();

    useEffect(() => {
        updateSoundObj(data.song);
    }, []);

    const statusOfTruck = useMemo(() => {
        if (soundStatus?.isLoaded) {
            return soundStatus;
        }
    }, [soundStatus]);

    const sliderValue = useMemo(() => {
        if (statusOfTruck) {
            return statusOfTruck.positionMillis / (statusOfTruck.durationMillis || statusOfTruck.playableDurationMillis || 1);
        }
    }, [statusOfTruck]);

    const onSliderComplete = useCallback(async (value: number) => {
        const time = value * (statusOfTruck?.durationMillis || statusOfTruck?.playableDurationMillis || 1);
        await updateTime(time);
    }, []);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.wrapper}>
                <Navbar/>
                <View style={styles.songWrapper}>
                    <Image style={styles.avatar} source={currentMusic?.avatar as ImageSourcePropType} />

                    <View style={styles.texts}>
                        <Text style={styles.title}>{currentMusic?.title}</Text>
                        <Text style={styles.artist}>{currentMusic?.artist}</Text>
                    </View>
                    <Slider
                        style={styles.slider}
                        value={sliderValue}
                        minimumValue={0}
                        maximumValue={1}
                        onSlidingComplete={onSliderComplete}
                        minimumTrackTintColor={COLORS.whiteLight}
                    />
                    <View style={styles.controllers}>
                        <TouchableOpacity disabled={isPrevDisabled} onPress={playPrev}>
                            <PrevIcon fill={isPrevDisabled ? COLORS.whiteDark : COLORS.whiteLight} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={isPlaying ? pause : play}>
                            {isPlaying ? <PauseIcon fill={COLORS.whiteLight} /> : <PlayIcon fill={COLORS.whiteLight} />}
                        </TouchableOpacity>
                        <TouchableOpacity disabled={isNextDisabled} onPress={playNext}>
                            <NextIcon fill={isNextDisabled ? COLORS.whiteDark : COLORS.whiteLight} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}
