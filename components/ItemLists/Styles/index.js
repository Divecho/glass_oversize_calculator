import { StyleSheet, Dimensions } from 'react-native';
let tabelColWidth = Dimensions.get('window').width;
tabelColWidth = ( tabelColWidth - 220 ) / 3;

const styles = StyleSheet.create({
    goalItem: {
        marginHorizontal: 10,
        marginVertical:5,
        borderRadius: 5,
        paddingVertical:10,
        backgroundColor: '#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        alignItems:'center'
    },
    pressedItem: {
        opacity: 0.5,
    },
    goalText: {
        color: '#000',
        padding: 8,
    },
    tabelColText:{
        width: tabelColWidth,
        textAlign:'center',
    },
});

export default styles;