import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

export enum ButtonType {
    DEFAULT = 'DEFAULT',
    DANGER = 'DANGER',
    AGREE = 'AGREE',
    SECONDARY = 'SECONDARY'
}

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        color: COLORS.whiteLight,
        width: '100%',
    },
    [ButtonType.DEFAULT]: {
        backgroundColor: COLORS.orange,
    },
    [ButtonType.DANGER]: {
        backgroundColor: COLORS.red,
    },
    [ButtonType.AGREE]: {
        backgroundColor: COLORS.green,
    },
    [ButtonType.SECONDARY]: {
        backgroundColor: COLORS.gray,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontSize: 20,
        color: COLORS.whiteLight,
    }
});
