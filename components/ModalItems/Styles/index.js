import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        paddingVertical: 20
    },
    rowContainer:{
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    itemRow:{
        flex: 1, 
        paddingHorizontal: 10,
    },
    itemLabel:{
        fontWeight: '700'
    },
    input: {
        height: 40,
        borderWidth: 2,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5
    },
    button:{
        backgroundColor: 'blue',
        borderRadius: 50,
        paddingVertical: 10,
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20,
    }
});

export default styles;