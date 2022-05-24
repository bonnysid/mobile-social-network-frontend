import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './AddIcon';

export const PlayIcon: FC<IconProps> = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" height={40} width={40} {...props}>
            <Path d="M15.458 30.25q-.708.458-1.416.042-.709-.417-.709-1.25v-18.25q0-.834.709-1.25.708-.417 1.416.041l14.375 9.167q.625.417.625 1.167t-.625 1.166Z" />
        </Svg>
    )
}
