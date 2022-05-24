import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: COLORS.grayLight,
        height: 70,
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    block: {
        flexDirection: 'row',
    },
    addIcon: {
        marginTop: 10,
    }
});
