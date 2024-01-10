import { StyleSheet, Dimensions } from 'react-native';
let tabelColWidth = Dimensions.get('screen').width;
tabelColWidth = ( tabelColWidth - 220 ) / 3;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        //alignItems: 'center',
        // justifyContent: 'center'
    },
    headerButton:{
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
    headerButtonText:{
        textAlign: 'center'
    },
    addButton:{
        marginRight:10
    },
    listHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:10,
        backgroundColor:'white',
        paddingVertical:10,
        paddingHorizontal:10,
        marginTop:10,
    },
    listHeaderText:{
        width:tabelColWidth,
        fontWeight:'700',
        textAlign:'center',
    },
    nameContainer:{
        paddingHorizontal:20,
        backgroundColor:'#fff',
        paddingVertical:10,
    },
    nameLabel:{
        textAlign:'left',
    },
    input: {
        height: 40,
        borderWidth: 2,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5
    },
});

export default styles;