import { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../utils/colors';

interface IProps {
    text: string;
    textColor: string;
    top: number;
}

export const Notification: FC<IProps> = ({ text, textColor, top }) => {
    return (
        <View style={{ ...styles.container, top }}>
            <Text style={{ ...styles.text, color: textColor }}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        padding: 20,
        opacity: 0.9,
        borderRadius: 10,
        backgroundColor: COLORS.grayLight,
    },
    text: {
        fontSize: 15,
    }
});
