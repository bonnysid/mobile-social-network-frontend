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
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: COLORS.grayLight,
    },
    username: {
        fontSize: 20,
        color: COLORS.whiteLight,
        marginTop: 20,
    },

    block: {
        display: 'flex',
        borderRadius: 10,
        backgroundColor: COLORS.grayLight,
        padding: 10,
        width: '100%',
        flexDirection: 'column',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    focused: {
        marginBottom: 300,
    },

    avatarContainer: {
        width: '100%',
        flexDirection: 'column',
        marginTop: 20,
        alignItems: 'center'
    },

    filters: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },

    emptyTodos: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyTodosText: {
        fontSize: 20,
        color: COLORS.whiteLight,
    },

    completedContainer: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.grayLight,
        borderRadius: 5,
        marginRight: 5,
    },

    completedActive: {
        backgroundColor: COLORS.green,
    },
    completedActiveText: {
        color: COLORS.whiteLight,
    },
    completedText: {
        fontSize: 15,
        color: COLORS.whiteDark,
        fontWeight: '500',
    }
});
