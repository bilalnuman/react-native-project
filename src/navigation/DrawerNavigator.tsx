import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ROUTES } from './routes';
import CustomDrawerContent from '@shared/components/CustomDrawerContent';
import HomeScreen from '@features/home/screens/HomeScreen';
import SignUpScreen from '@features/auth/screens/SignUpScreen';
import SignInScreen from '@features/auth/screens/SignInScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName={ROUTES.HOME}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{headerTitle:""}}
        >
            <Drawer.Screen name={ROUTES.HOME} component={HomeScreen}/>
            <Drawer.Screen name={ROUTES.SignIn} component={SignInScreen} />
            <Drawer.Screen name={ROUTES.SignUp} component={SignUpScreen} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
