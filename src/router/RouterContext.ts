import { createContext } from 'react';

export interface IRouterContext {
    currentPage: string;
    prevPage: string;
    goTo: (page: string, data?: any) => void;
    goBack: () => void;
    data: any;
}

export const RouterContext = createContext<IRouterContext>({
    currentPage: '',
    prevPage: '',
    goTo: () => {},
    goBack: () => {},
    data: {}
});
