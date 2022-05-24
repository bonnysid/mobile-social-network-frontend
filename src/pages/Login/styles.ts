import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.gray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        color: COLORS.whiteLight,
        textTransform: 'uppercase',
        fontWeight: '500',
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30,
    },
    errorContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
    },
    error: {
        color: COLORS.red,
        maxWidth: 300,
    },
    separator: {
        height: 1,
        width: 130,
        backgroundColor: COLORS.white,
    },
    separatorsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        width: '100%'
    },
    separatorsText: {
        color: COLORS.white,
        marginRight: 10,
        marginLeft: 10
    },
});
