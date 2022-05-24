import { FC } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS } from '../../utils/colors';

export enum InputScheme {
    LIGHT = 'LIGHT',
    DARK = 'DARK',
}

export interface IInputProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    marginBottom?: number;
    width?: number | string;
    secureTextEntry?: boolean;
    scheme?: InputScheme;
    onFocus?: () => void;
    onBlur?: () => void;
}

export const Input: FC<IInputProps> = ({
                                           scheme = InputScheme.LIGHT,
                                           value,
                                           onChange,
                                           label,
                                           marginBottom = 0,
                                           width = 300,
                                           secureTextEntry,
                                           onBlur,
                                           onFocus
                                       }) => {
    return (
        <View style={{...styles.container, marginBottom, width}}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                onFocus={onFocus}
                onBlur={onBlur}
                secureTextEntry={secureTextEntry}
                style={{...styles.input, ...styles[scheme]}}
                value={value}
                onChangeText={onChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    label: {
        color: COLORS.white,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        backgroundColor: COLORS.grayLight,
        color: COLORS.whiteLight,
        padding: 10,
    },
    [InputScheme.LIGHT]: {
        backgroundColor: COLORS.grayLight,
        color: COLORS.whiteLight,
    },
    [InputScheme.DARK]: {
        backgroundColor: COLORS.grayDark,
        color: COLORS.whiteLight,
    }
});
