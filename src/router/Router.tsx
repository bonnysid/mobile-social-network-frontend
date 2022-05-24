import { FC, useEffect, useMemo } from 'react';
import { useRouter } from './useRouter';
import { PublicRoutes, Routes } from './routes';
import { View } from 'react-native';
import { useAuth } from '../providers';

export const Router: FC = () => {
    const { isAuth } = useAuth();
    const { currentPage, goTo } = useRouter();

    useEffect(() => {
        if (isAuth && currentPage === Routes.LOGIN) {
            goTo(Routes.PROFILE);
        } else if (currentPage !== Routes.LOGIN) {
            goTo(Routes.LOGIN);
        }
    }, [isAuth]);

    const renderedPage = useMemo(() => {
        const page = PublicRoutes.find(route => route.name === currentPage);
        return page?.component;
    }, [currentPage]);

    return (
        <View>
            {/* @ts-ignore */}
            {renderedPage}
        </View>
    )
}
