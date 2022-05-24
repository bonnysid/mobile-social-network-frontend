import { FC } from 'react';
import Modal from 'react-native-modal';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from '../../utils/colors';

interface ILoadingModalProps {
    isLoading?: boolean;
}

export const LoadingModal: FC<ILoadingModalProps> = ({ isLoading }) => {
    return (
        <Modal
            isVisible={isLoading}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            style={{ alignItems: 'center', justifyContent: 'center' }}
        >
            <View style={{ padding: 10, backgroundColor: COLORS.grayLight, borderRadius: 10, width: 100, height: 100, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={COLORS.whiteLight} />
            </View>
        </Modal>
    )
}
