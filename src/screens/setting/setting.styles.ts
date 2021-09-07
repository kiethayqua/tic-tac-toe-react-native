import { colors } from '@utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30
    },
    wrapDiff: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 30
    },
    title: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    button: {
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 8,
        marginRight: 10
    },
    setting: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    active: {
        color: '#fff',
        backgroundColor: colors.lightPurple,
        borderWidth: 1,
        borderColor: '#fff',
    }
});

export default styles;