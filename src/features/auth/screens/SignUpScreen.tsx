import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSignUp } from '../hooks/useSignUp';
import { styles } from '../style';
import LinearGradient from 'react-native-linear-gradient';
import InputField from '@shared/components/InputField';
import { SignUpScreenProps } from '../../../types/navigation/types';

export default function SignUpScreen({ navigation }: SignUpScreenProps) {
  const { control, Controller, signUp, isPending, errors, handleSubmit, showPassword, setShowPassword } = useSignUp(navigation.navigate);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Sign Up</Text>
      </View>
      <Controller
        name='username'
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            onChangeText={field.onChange}
            value={field.value}
            label="Name"
            placeholder="Enter your name"
            errors={errors.username?.message}
          />
        )}
      />
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
      <Controller
        name='confirmPassword'
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            onChangeText={field.onChange}
            value={field.value}
            label="Confirm password"
            placeholder="Enter confirm password"
            errors={errors.confirmPassword?.message}
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
        <TouchableOpacity style={styles.button} onPress={handleSubmit(signUp)}>
          <Text style={styles.buttonText}>Login</Text>
          {isPending && <ActivityIndicator size="small" color="#007bff" />}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}


