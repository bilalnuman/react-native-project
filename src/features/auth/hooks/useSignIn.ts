import { useSignin } from './useApi'
import { showMessage } from 'react-native-flash-message';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormValues, loginSchema } from '../schema/SignInSchema';
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export const useLogin = () => {
    const { mutateAsync: signIn, isPending } = useSignin()
    const [showPassword, setShowPassword] = useState(true)

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onChange"
    });
    useFocusEffect(
        useCallback(() => {
            return () => {
                reset()
            };
        }, [])
    );

    const login = (data: LoginFormValues) => {
        signIn(data, {
            onSuccess: async (data) => {
                if (data?.data?.access_token) {
                    await AsyncStorage.setItem('token', data?.data?.access_token);
                }
                showMessage({ message: "Your logged in successfully", type: "success" })
                reset()
            },
            onError: (error: any) => {
                const message = error?.errors?.non_field_errors?.toString()
                showMessage({ message, type: 'danger', position: "bottom" });
            }
        })
    }
    return { login, isPending, errors, handleSubmit, setShowPassword, showPassword, control, Controller }
}