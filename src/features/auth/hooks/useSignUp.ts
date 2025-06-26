import { useSignup } from './useApi'
import { showMessage } from 'react-native-flash-message';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { signUpSchema, SignUpSchemaFormValues } from '../schema/signUpSchema';
import { useFocusEffect } from '@react-navigation/native';

export const useSignUp = (navigate: any) => {
    const { mutateAsync: signIn, isPending } = useSignup()
    const [showPassword, setShowPassword] = useState(true)

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<SignUpSchemaFormValues>({
        resolver: zodResolver(signUpSchema),
        mode: "onChange"
    });
    useFocusEffect(
        useCallback(() => {
            return () => {
               reset()
            };
        }, [])
    );
    const signUp = (data: SignUpSchemaFormValues) => {
        signIn(data, {
            onSuccess: async (data) => {
                showMessage({ message: "Your successfully registerd", type: "success" })
                reset()
                navigate("SignIn")
            },
            onError: (error: any) => {
                console.log(error.errors)
                const message = JSON.stringify(error?.errors)?.replaceAll("{", "")?.replaceAll("}", "")?.replaceAll('"', "")
                showMessage({ message, type: 'danger', position: "bottom" });
            }
        })
    }
    return { signUp, isPending, errors, handleSubmit, setShowPassword, showPassword, control, Controller }
}