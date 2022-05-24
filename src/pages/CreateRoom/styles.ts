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
    avatarBlock: {
        paddingTop: 20,
        width: '100%',
        alignItems: 'center',
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
    text: {
        fontSize: 16,
        color: COLORS.white,
        marginBottom: 20,
    },
});
