import { StyleSheet, Dimensions } from 'react-native';
let tabelColWidth = Dimensions.get('screen').width;
tabelColWidth = ( tabelColWidth - 220 ) / 3;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    nameContainer:{
        paddingHorizontal:20,
        paddingVertical:15,
        backgroundColor:'#fff',
        marginVertical:10,
    },
    nameLabel:{
        fontWeight:"bold",
        textAlign:'left',
        fontSize:20,
    },
    input: {
        width:60,
        height: 50,
        borderWidth: 2,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        textAlign:'center'
    },
});

export default styles;