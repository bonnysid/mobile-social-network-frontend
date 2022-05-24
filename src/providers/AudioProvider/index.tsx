import { Audio, AVPlaybackStatus } from 'expo-av';
import { IMusic } from '../../types';
import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';
import { musics as musicsData } from '../../pages/Main/data';

export interface IAudioContext {
    soundObj: Audio.Sound;
    soundStatus?: AVPlaybackStatus;
    updateSoundObj: (music: IMusic) => void;
    play: () => void;
    pause: () => void;
    playNext: () => void,
    playPrev: () => void,
    updateTime: (miliSec: number) => Promise<void>,
    musics: IMusic[];
    currentMusic: IMusic | null;
    currentMusicIndex: number;
    isNextDisabled: boolean;
    isPrevDisabled: boolean;
    isLoading: boolean;
    isPlaying: boolean;
}

export const AudionContext = createContext<IAudioContext>({
    currentMusic: null,
    currentMusicIndex: 0,
    isNextDisabled: false,
    isPrevDisabled: false,
    isPlaying: false,
    pause: () => {},
    play: () => {},
    playNext: () => {},
    playPrev: () => {},
    updateTime: async () => {},
    musics: [],
    soundObj: new Audio.Sound(),
    updateSoundObj: () => {},
    isLoading: false,
    soundStatus: undefined,
});

export const useAudio = () => {
    return useContext(AudionContext);
}

export const AudioProvider: FC = ({ children }) => {
    const [musics, setMusics] = useState(musicsData);
    const [soundObj, setSoundObj] = useState(new Audio.Sound());
    const [soundStatus, setSoundStatus] = useState<AVPlaybackStatus>();
    const [lastPosition, setLastPosition] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isPrevDisabled, setIsPrevDisabled] = useState(false);
    const [currentMusic, setCurrentMusic] = useState<IMusic | null>(null);
    const [currentMusicIndex, setCurrentMusicIndex] = useState(0);

    const setupCurrentMusic = (music: IMusic) => {
        const index = musics.findIndex(it => it.id === music.id);
        setCurrentMusicIndex(index);
        setCurrentMusic(music);
        return index;
    }

    const updateSoundObj = useCallback(async (music: IMusic) => {
        try {
            if (currentMusic?.id !== music.id || !isPlaying) {
                setIsLoading(true);
                setupCurrentMusic(music);
                if (soundObj._loaded) {
                    await soundObj.stopAsync();
                    await soundObj.unloadAsync();
                }

                if (lastPosition) {
                    await soundObj.loadAsync(music.url, { shouldPlay: true, progressUpdateIntervalMillis: 1000 });
                    await soundObj.playFromPositionAsync(lastPosition);
                } else {
                    await soundObj.loadAsync(music.url, { shouldPlay: true, progressUpdateIntervalMillis: 1000 });
                }
                setIsPlaying(true);
            }
        } catch (e) {
            console.log('updateSoundObj:', e.message);
        } finally {
            setIsLoading(false);
        }
    }, [musics, currentMusic]);

    const pause = useCallback(async () => {
        try {
            setIsLoading(true);
            await soundObj.setStatusAsync({
                shouldPlay: false,
            });
            await soundObj.pauseAsync();
            setIsPlaying(false);
        } catch (e) {
            console.log('pause:', e.message);
        } finally {
            setIsLoading(false);
        }
    }, [soundObj]);

    const play = useCallback(async () => {
        try {
            setIsLoading(true);
            await soundObj.setStatusAsync({
                shouldPlay: true,
            });
            await soundObj.playAsync();
            setIsPlaying(true);
        } catch (e) {
            console.log('play:', e.message);
        } finally {
            setIsLoading(false);
        }
    }, [soundObj]);

    const playNext = useCallback(async () => {
        try {
            setIsLoading(true);
            if (!isNextDisabled) {
                const nextMusic = musics[currentMusicIndex + 1];
                await updateSoundObj(nextMusic);
            }
        } catch (e) {
            console.log('playNext:', e.message);
        } finally {
            setIsLoading(false);
        }
    }, [soundObj, isNextDisabled, musics, updateSoundObj]);

    const playPrev = useCallback(async () => {
        try {
            setIsLoading(true);
            if (!isPrevDisabled) {
                const nextMusic = musics[currentMusicIndex - 1];
                await updateSoundObj(nextMusic);
            }
        } catch (e) {
            console.log('playNext:', e.message);
        } finally {
            setIsLoading(false);
        }
    }, [soundObj, isPrevDisabled, musics, updateSoundObj]);

    const updateTime = useCallback(async (positionMillis: number) => {
        try {
            if (soundObj) {
                await soundObj.setStatusAsync({
                    positionMillis,
                });
            }
        } catch (e) {
            console.log('updateTime:', e.message);
        }
    }, [soundObj]);

    useEffect(() => {
        setIsNextDisabled(currentMusicIndex >= musics.length - 1);
        setIsPrevDisabled(currentMusicIndex === 0);
    }, [musics, currentMusicIndex]);

    useEffect(() => {
        soundObj.setOnPlaybackStatusUpdate(status => {
            setSoundStatus(status);
        });
    }, []);

    useEffect(() => {
        if (soundStatus?.isLoaded) {
            if (soundStatus.didJustFinish) {
                playNext();
            }
        }
    }, [soundStatus, playNext]);

    return (
        <AudionContext.Provider value={{
            musics,
            soundObj,
            isPlaying,
            isPrevDisabled,
            isNextDisabled,
            isLoading,
            currentMusic,
            currentMusicIndex,
            updateSoundObj,
            pause,
            play,
            playNext,
            playPrev,
            soundStatus,
            updateTime,
        }}>
            {children}
        </AudionContext.Provider>
    )
}
