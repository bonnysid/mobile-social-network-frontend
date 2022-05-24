import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styled';
import {
    AddIcon,
    CategoriesIcon,
    FriendsIcon,
    HomeIcon,
    LogoutIcon,
    MusicListIcon,
    PersonIcon,
    RoomsIcon
} from '../../components';
import { COLORS } from '../../utils/colors';
import { useAuth } from '../../providers';
import { NavItem } from './NavItem';
import { useRouter } from '../../router/useRouter';
import { Routes } from '../../router/routes';

export const Navbar: FC = () => {
    const { goTo, currentPage } = useRouter();
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.block}>
                <NavItem
                    onClick={() => goTo(Routes.MAIN)}
                    icon={<MusicListIcon fill={currentPage === Routes.MAIN ? COLORS.whiteLight : COLORS.white} />}
                    text={'Music'}
                    isActive={currentPage === Routes.MAIN}
                />
                <NavItem
                    onClick={() => goTo(Routes.PROFILE)}
                    icon={<PersonIcon fill={currentPage === Routes.PROFILE ? COLORS.whiteLight : COLORS.white} />}
                    text={'Profile'}
                    isActive={currentPage === Routes.PROFILE}
                />
                <NavItem
                    onClick={() => goTo(Routes.FRIENDS)}
                    icon={<FriendsIcon fill={currentPage === Routes.FRIENDS ? COLORS.whiteLight : COLORS.white} />}
                    text={'Friends'}
                    isActive={currentPage === Routes.FRIENDS}
                />
                <NavItem
                    onClick={() => goTo(Routes.ROOMS)}
                    icon={<RoomsIcon fill={currentPage === Routes.ROOMS ? COLORS.whiteLight : COLORS.white} />}
                    text={'Dialogs'}
                    isActive={currentPage === Routes.ROOMS}
                />
            </View>
            <View style={styles.block}>
                <TouchableOpacity onPress={logout}>
                    <LogoutIcon fill={COLORS.lightRed} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
