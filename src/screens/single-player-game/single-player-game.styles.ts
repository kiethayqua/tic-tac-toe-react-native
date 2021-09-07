import { colors } from "@utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
    },
    head: {
        alignItems: 'center',
        marginBottom: 50
    },
    settingText: {
        fontSize: 30,
        color: '#fff',
    },
    wrapResults: {
        flexDirection: 'row',
        marginTop: 20,
    },
    resultBox: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: colors.lightPurple,
        alignItems: 'center',
        padding: 15,
        marginRight: 5
    },
    normalText: {
        fontSize: 20,
    },
    popup: {
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        backgroundColor: colors.lightPurple,
        borderWidth: 2,
        borderColor: '#fff',
        padding: 20,
    },
    bottomText: {
        marginBottom: 20,
    }
});

export default styles;