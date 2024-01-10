import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:20,
        marginRight:20,
    },
    buttonCallUs:{
        marginHorizontal:10,
        marginVertical:15,
    },
    buttonLabel:{
        color:'#FF9933',
        fontWeight:'700',
        fontSize:15,
    },
    input: {
        height: 40,
        borderWidth: 2,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5
    },
    error:{
        color:'red',
    },
    bold:{
        fontWeight:'700',
        marginTop:10,
    },
    whatsApp:{
        color:'green'
    }
});

export default styles;