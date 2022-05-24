import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10,
    },

    otherContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginBottom: 10,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.grayLight,
        marginRight: 10,
    },

    date: {
        fontSize: 16,
        color: COLORS.white,
    },

    username: {
        fontSize: 16,
        color: COLORS.whiteLight,
    },

    message: {
        fontSize: 16,
        color: COLORS.white,
        marginTop: 5,
    },

    rightContent: {
        display: 'flex',
        width: '100%',
    },

    topContent: {
        display: 'flex',
        width: '80%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
});
