import { FC } from 'react';
import { styles, ButtonType } from './styled';
import { Text, TouchableOpacity, View } from 'react-native';

export interface IButtonProps {
    text: string;
    mt?: number;
    mb?: number;
    ml?: number;
    mr?: number;
    pl?: number;
    pr?: number
    disabled?: boolean;
    type?: ButtonType;
    onClick: () => void | Promise<void>;
    isLogin?: boolean;
}

export const Button: FC<IButtonProps> = ({
                                             disabled,
                                             onClick,
                                             text,
                                             mt = 0,
                                             mr = 0,
                                             mb = 0,
                                             ml = 0,
                                             pl = 15,
                                             pr = 15,
                                             type = ButtonType.DEFAULT,
                                             isLogin,
                                         }) => {
    return (
        <TouchableOpacity style={{...(isLogin ? {} : {width: '100%', paddingRight: pr, paddingLeft: pl})}}
                          onPress={onClick} disabled={disabled}>
            <View style={{
                ...styles.container,
                ...styles[type],
                marginTop: mt,
                marginBottom: mb,
                marginLeft: ml,
                marginRight: mr,
                ...(disabled ? styles.disabled : {}),
            }}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}
