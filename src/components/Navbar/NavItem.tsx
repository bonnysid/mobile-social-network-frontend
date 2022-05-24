import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../utils/colors';

export interface NavItemProps {
    onClick: () => void;
    icon: JSX.Element;
    text?: string;
    isActive?: boolean;
}

export const NavItem: FC<NavItemProps> = ({ isActive, icon, onClick, text, children }) => {
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.container}>
                {icon}
                {text && <Text style={isActive ? styles.activeText : styles.text}>{text}</Text>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    text: {
        fontSize: 15,
        color: COLORS.white,
    },
    activeText: {
        fontSize: 15,
        color: COLORS.whiteLight,
        fontWeight: '500',
    }
})
