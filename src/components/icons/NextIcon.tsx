import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './AddIcon';

export const NextIcon: FC<IconProps> = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" height={40} width={40} {...props}>
            <Path d="M6.458 28.5q-.708.5-1.437.104-.729-.396-.729-1.229v-14.75q0-.833.729-1.229.729-.396 1.437.104l10.75 7.333q.625.417.625 1.167t-.625 1.167Zm16.834 0q-.667.5-1.417.104t-.75-1.229v-14.75q0-.833.75-1.229.75-.396 1.417.104l10.75 7.333q.666.417.666 1.167t-.666 1.167Z" />
        </Svg>
    )
}
