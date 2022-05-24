import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.gray,
        paddingRight: 20,
        paddingLeft: 20,
    },
    wrapper: {
        paddingTop: 20,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },

    emptyText: {
        fontSize: 20,
        color: COLORS.white,
        marginTop: 20,
    },
    modal: {
        width: '100%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: COLORS.grayLight,
    },

    modalQuestion: {
        fontSize: 16,
        color: COLORS.whiteLight,
    },

    modalButtons: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        // width: '100%'
    }
});
