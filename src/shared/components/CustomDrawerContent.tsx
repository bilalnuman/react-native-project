import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { Text, TouchableOpacity } from "react-native";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const { state, navigation } = props;
    const currentRoute = state.routeNames[state.index];

    const drawerItems = [
        { name: 'Home', label: 'Home' },
        { name: 'SignIn', label: 'SignIn' },
        { name: 'SignUp', label: 'SignUp' },
    ];

    return (
        <DrawerContentScrollView {...props}>
            {drawerItems.map((item) => {
                const isActive = currentRoute === item.name;

                return (
                    <TouchableOpacity
                        key={item.name}
                        onPress={() => navigation.navigate(item.name)}
                        style={{
                            padding: 16,
                            backgroundColor: isActive ? '#e0e0e0' : 'transparent',
                            borderLeftWidth: 4,
                            borderLeftColor: isActive ? '#007bff' : 'transparent',
                        }}
                    >
                        <Text style={{ fontSize: 16, color: isActive ? '#007bff' : '#000' }}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;
