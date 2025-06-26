import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLogin } from '../hooks/useSignIn';
import { styles } from '../style';
import LinearGradient from 'react-native-linear-gradient';
import InputField from '@shared/components/InputField';

export default function SignInScreen() {
  const { control, Controller, login, isPending, errors, handleSubmit, showPassword, setShowPassword } = useLogin();

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Login</Text>
        </View>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              onChangeText={field.onChange}
              value={field.value}
              label="Email"
              placeholder="Enter your email"
              errors={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              onChangeText={field.onChange}
              value={field.value}
              label="Password"
              placeholder="Enter your password"
              errors={errors.password?.message}
              passwordVisibility={() => setShowPassword(!showPassword)}
              secureTextEntry={showPassword}
              icon={showPassword ? 'eye-off' : 'eye'}
            />
          )}
        />
        <LinearGradient
          colors={['#092CA2', '#003BFF']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ borderRadius: 6, marginTop: 24 }}
        >
          <TouchableOpacity style={styles.button} onPress={handleSubmit(login)}>
            <Text style={styles.buttonText}>Login</Text>
            {isPending && <ActivityIndicator size="small" color="#007bff" />}
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </>
  );
}


