import React, { useState, useEffect, FC } from 'react';
import { Button, Image, View, Platform, TouchableOpacity } from 'react-native';
import * as ImagePickerExpo from 'expo-image-picker';
import { styles } from './styled';
import { EditIcon } from '../icons';
import { COLORS } from '../../utils/colors';

export interface IImagePickerProps {
    image?: string;
    onPick: (uri: string) => void;
    placeholder: string;
    withEdit?: boolean;
}

export const ImagePicker: FC<IImagePickerProps> = ({ image, onPick, placeholder, withEdit = true }) => {
    const pickImage = async () => {
        let result = await ImagePickerExpo.launchImageLibraryAsync({
            mediaTypes: ImagePickerExpo.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.cancelled) {
            onPick(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {image ?
                    <Image source={{uri: image}} style={styles.image}/>
                    // @ts-ignore
                    : <Image source={placeholder} style={styles.image}/>
                }
            </View>
            {Boolean(withEdit) && <TouchableOpacity onPress={pickImage}>
                <View style={styles.edit}>
                    <EditIcon fill={COLORS.whiteLight} />
                </View>
            </TouchableOpacity>}
        </View>
    );
}
