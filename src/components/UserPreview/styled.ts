import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.grayLight,
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    block: {
        flexDirection: 'row',
    },
    texts: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    image: {
        borderRadius: 30,
        width: 60,
        height: 60,
    },
    text: {
        fontSize: 16,
        color: COLORS.white,
    },
    title: {
        marginBottom: 5,
        fontSize: 20,
        color: COLORS.whiteLight,
    },

    status: {
        padding: 10,
        backgroundColor: COLORS.green,
        borderRadius: 5,
        opacity: 0.9,
    },

    removeStatus: {
        padding: 10,
        backgroundColor: COLORS.red,
        borderRadius: 5,
        opacity: 0.9,
    },

    buttonsWrapper: {
        flexDirection: 'row',
    },

    normalStatus: {
        padding: 10,
        backgroundColor: COLORS.orange,
        borderRadius: 5,
        opacity: 0.9,
    },

    statusText: {
        color: COLORS.whiteLight,
        textTransform: 'uppercase',
        fontWeight: '500',
    },
});
