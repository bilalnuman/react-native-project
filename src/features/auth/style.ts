import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        paddingRight:50,
        borderRadius: 6,
    },
    label: { marginBottom: 5, marginTop: 16 },
    passworContainer: {
        position: "relative"
    },
    iconContainer: {
        position: "absolute",
        right: 0,
        top: 0,
        paddingRight:5,
        height: 42,
        width: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#fff"
    },
    eyeIcon: {
        fontSize: 24,
        color: "#ccc",
    },
    button: {
        height: 45,
        lineHeight: 45,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: 500,
        fontSize: 16,
        textAlign: "center"
    },
    heading: {
        fontSize: 30,
        fontWeight: 500,
        paddingBottom: 30
    },
    error: { color: 'red' },
});