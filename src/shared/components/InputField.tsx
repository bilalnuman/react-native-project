import React from 'react';
import { View, Text, TextInput, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
interface InputFieldProps {
    label?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    passwordVisibility?: () => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    errors?: string;
    icon?: string;
    customStyles?: {
        container?: ViewStyle;
        label?: TextStyle;
        input?: ViewStyle;
        error?: TextStyle;
    };
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    onChangeText,
    passwordVisibility,
    placeholder,
    secureTextEntry = false,
    errors,
    icon,
    customStyles = {},
}) => {
    return (
        <View style={[styles.container, customStyles.container]}>
            {label && <Text style={[styles.label, customStyles.label]}>{label}</Text>}
            <TextInput
                style={[styles.input, customStyles.input]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
                keyboardType={placeholder?.toLowerCase().includes('email') ? 'email-address' : 'default'}
            />
            {icon && (
                <View style={styles.iconContainer}>
                    <Icon
                        style={styles.eyeIcon}
                        onPress={passwordVisibility}
                        name={icon}
                    />
                </View>
            )}
            {errors && <Text style={[styles.error, customStyles.error]}>{errors}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position:"relative"
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        paddingRight: 50,
        borderRadius: 6,
    },
    label: { marginBottom: 5, marginTop: 16 },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
    iconContainer: {
        position: "absolute",
        right: 2,
        borderRadius: 6,
        top: 42,
        paddingRight: 4,
        height: 42,
        width: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    eyeIcon: {
        fontSize: 24,
        color: "#ccc",
    },
});

export default InputField;
