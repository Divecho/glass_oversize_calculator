import { StyleSheet } from 'react-native';
import { theme } from '../../../core/theme'

const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal:30,
        backgroundColor:'#3893e5',
        borderRadius:50,
        marginTop:20,
    },
    buttonText: {
        fontSize: 25,
        textAlign:'center',
        color: theme.colors.card
    },
});

export default styles;