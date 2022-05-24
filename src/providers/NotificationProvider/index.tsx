import { createContext, FC, useCallback, useContext, useRef, useState } from 'react';
import { COLORS } from '../../utils/colors';
import { Notification } from '../../components';

export interface INotificationContext {
    push: (text: string, textColor: string) => void;
}

export const NotificationContext = createContext<INotificationContext>({
    push: () => {},
})

export const useNotifications = () => {
    return useContext(NotificationContext);
}

export const NotificationProvider: FC = ({ children }) => {
    const [text, setText] = useState('');
    const [textColor, setTextColor] = useState(COLORS.white);
    const [top, setTop] = useState(-100);
    const intervalRef = useRef<NodeJS.Timer>();

    const push = useCallback((text: string, textColor: string) => {
        setText(text);
        setTextColor(textColor);
        intervalRef.current = setInterval(() => {
            if (top > 100) {
                // @ts-ignore
                clearInterval(intervalRef.current);
                intervalRef.current = setInterval(() => {
                    if (top <= -100) {
                        // @ts-ignore
                        clearInterval(intervalRef.current)
                    } else {
                        setTop(prev => prev - 1);
                    }
                }, 1)
            } else {
                setTop(prev => prev + 1);
            }
        }, 1);
    }, [top]);

    return (
        <NotificationContext.Provider value={{ push }}>
            <Notification text={text} textColor={textColor} top={top} />
            {children}
        </NotificationContext.Provider>
    )
}
