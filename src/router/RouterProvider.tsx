import { FC, useCallback, useState } from 'react';
import { RouterContext } from './RouterContext';

interface IProps {
    initialPage: string;
}

export const RouterProvider: FC<IProps> = ({ initialPage, children }) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [prevPage, setPrevPage] = useState('');
    const [data, setData] = useState<any>({});

    const goBack = useCallback(() => {
        setCurrentPage(prevPage);
    }, [prevPage]);

    const goTo = useCallback((page: string, data?: any) => {
        setPrevPage(currentPage);
        setCurrentPage(page);
        setData(data || {});
    }, [currentPage]);

    return (
        <RouterContext.Provider value={{
            currentPage,
            prevPage,
            goBack,
            goTo,
            data,
        }}>
            {children}
        </RouterContext.Provider>
    )
}
