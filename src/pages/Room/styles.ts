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
    chat: {
        width: '100%',
        marginTop: 20,
    },
    wrapper: {
        paddingTop: 20,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },

    bottomContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },

    topContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: COLORS.grayLight,
        borderRadius: 10,
        padding: 10,
    },

    messages: {
        marginTop: 10,
        height: '70%',
    },

    avatar: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 30,
        backgroundColor: COLORS.grayLight,
    },

    title: {
        fontSize: 20,
        color: COLORS.whiteLight
    },

    titleContainer: {
        width: '65%',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    focusedBottom: {
        position: 'absolute',
        bottom: -50,
        left: 0,
        backgroundColor: COLORS.gray,
        borderRadius: 5,
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
