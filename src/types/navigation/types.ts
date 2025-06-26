import { StackNavigationProp } from "@react-navigation/stack";
export type RootStackParamList = {
    SignUp: undefined; // No parameters for SignUp screen
    SignIn: undefined;  // Example: Login screen
    Home: undefined;   // Example: Home screen
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

export interface SignUpScreenProps {
    navigation: SignUpScreenNavigationProp;
}