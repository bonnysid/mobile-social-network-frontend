import { FC, useCallback, useMemo, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { styles } from './styles';
import { useAuth } from '../../providers';
import { Button, Input, ButtonType } from '../../components';

export const Login: FC = () => {
    const [isRegistration, setIsRegistration] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, onRegistration, isError, error, resetError } = useAuth();

    const handleChangeUsername = useCallback((value: string) => {
        isError && resetError();
        setUsername(value);
    }, [isError]);

    const handleChangePassword = useCallback((value: string) => {
        isError && resetError();
        setPassword(value);
    }, [isError]);

    const disabledRegistrationButton = useMemo(() => {
        if (isRegistration) {
            return !username || !password;
        }

        return false;
    }, [isRegistration, username, password]);

    const disabledLoginButton = useMemo(() => {
        if (isRegistration) {
            return false;
        }

        return !username || !password;
    }, [isRegistration, username, password]);

    const openRegistration = useCallback(() => {
        setIsRegistration(true);
    }, []);

    const closeRegistration = useCallback(() => {
        setIsRegistration(false);
    }, []);

    const handleClickLogin = useCallback(async () => {
        if (isRegistration) {
            closeRegistration();
        } else {
            await onLogin(username, password);
        }
    }, [isRegistration, username, password]);

    const handleClickRegistration = useCallback(async () => {
        if (isRegistration) {
            await onRegistration(username, password);
        } else {
            openRegistration();
        }
    }, [isRegistration, username, password]);

    const upButton = useMemo(() => {
        if (isRegistration) {
            return (
                <Button
                    text="Registration"
                    onClick={handleClickRegistration}
                    disabled={disabledRegistrationButton}
                    type={ButtonType.AGREE}
                    mt={40}
                    isLogin
                />
            );
        }

        return (
            <Button
                text="Login"
                onClick={handleClickLogin}
                disabled={disabledLoginButton}
                mt={40}
                isLogin
            />
        )
    }, [isRegistration, handleClickRegistration, handleClickLogin, disabledRegistrationButton, disabledLoginButton]);

    const bottomButton = useMemo(() => {
        if (isRegistration) {
            return (
                <Button
                    text="Login"
                    onClick={handleClickLogin}
                    disabled={disabledLoginButton}
                    mt={20}
                    isLogin
                />
            );
        }

        return (
            <Button
                text="Registration"
                onClick={handleClickRegistration}
                disabled={disabledRegistrationButton}
                type={ButtonType.AGREE}
                mt={20}
                isLogin
            />
        )
    }, [isRegistration, handleClickRegistration, handleClickLogin, disabledRegistrationButton, disabledLoginButton]);

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{isRegistration ? 'Registration' : 'Login'}</Text>
                </View>
                <Input label="Username" value={username} onChange={handleChangeUsername} marginBottom={20}/>
                <Input label="Password" value={password} onChange={handleChangePassword} secureTextEntry />
                {isError && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.error}>{error}</Text>
                    </View>
                )}
                {upButton}
                <View style={styles.separatorsContainer}>
                    <View style={styles.separator} />
                    <Text style={styles.separatorsText}>OR</Text>
                    <View style={styles.separator} />
                </View>
                {bottomButton}
            </SafeAreaView>
        </View>
    );
}
