import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './AddIcon';

export const PauseIcon: FC<IconProps> = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" height={40} width={40} {...props}>
            <Path d="M24.292 30.833q-.875 0-1.48-.625-.604-.625-.604-1.458v-17.5q0-.833.604-1.458.605-.625 1.48-.625h4.458q.833 0 1.458.625t.625 1.458v17.5q0 .833-.625 1.458t-1.458.625Zm-13.042 0q-.833 0-1.458-.625t-.625-1.458v-17.5q0-.833.625-1.458t1.458-.625h4.458q.875 0 1.5.625t.625 1.458v17.5q0 .833-.625 1.458t-1.5.625Z" />
        </Svg>
    )
}
