import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './AddIcon';

export const CancelIcon: FC<IconProps> = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" height={40} width={40} {...props}>
            <Path d="M20 21.958 11.458 30.5q-.416.417-.979.417-.562 0-.979-.417-.417-.417-.417-.979 0-.563.417-.979L18.042 20 9.5 11.458q-.417-.416-.417-.979 0-.562.417-.979.417-.417.979-.417.563 0 .979.417L20 18.042 28.542 9.5q.416-.417.979-.417.562 0 .979.417.417.417.417.979 0 .563-.417.979L21.958 20l8.542 8.542q.417.416.417.979 0 .562-.417.979-.417.417-.979.417-.563 0-.979-.417Z" />
        </Svg>
    )
}
