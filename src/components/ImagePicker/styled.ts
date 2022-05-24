import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

export const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        minWidth: 150,
        minHeight: 150,
        borderRadius: 75,
        backgroundColor: COLORS.grayLight,

    },
    imageContainer: {
        zIndex: 0,
        position: 'relative',
    },
    container: {
        position: 'relative',
    },
    edit: {
        padding: 5,
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 20,
        backgroundColor: COLORS.orangeLight,
        zIndex: 2,
    },
})
