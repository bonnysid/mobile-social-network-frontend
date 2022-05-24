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
    },

    songWrapper: {
        marginTop: 40,
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
    },

    avatar: {
        width: 350,
        height: 350,
        borderRadius: 10,
    },

    texts: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },

    slider: {
        width: '100%',
    },

    title: {
        fontSize: 30,
        color: COLORS.whiteLight
    },

    artist: {
        fontSize: 20,
        color: COLORS.white,
    },

    controllers: {
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
