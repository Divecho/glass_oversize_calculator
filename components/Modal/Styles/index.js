import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 16,
        overflow: 'hidden',
    },
    header: {
        height: 44,
        backgroundColor: '#fff',
    },
    common: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0
        },
        shadowOpacity: 0.24,
        shadowRadius: 4,
        elevation: 3,
    },
    closeIcon: {
        position: 'absolute',
        right: 20,
        top: 10,
        zIndex: 10,
    }
});
export default styles;