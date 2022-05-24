import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './AddIcon';

export const SendIcon: FC<IconProps> = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" height={40} width={40} {...props}>
            <Path d="M5 31.25V8.75q0-.75.625-1.146.625-.396 1.333-.104l26.667 11.208q.833.375.833 1.292t-.833 1.292L6.958 32.5q-.708.292-1.333-.104Q5 32 5 31.25Zm2.792-2.167L29.458 20 7.792 10.833v6.625L17.833 20 7.792 22.5Zm0-9.083v-9.167 18.25Z" />
        </Svg>
    )
}
