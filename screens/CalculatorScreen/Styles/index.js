import { StyleSheet, Dimensions } from "react-native";
const screen = Dimensions.get("window");
const btnWidth = screen.width / 5;
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    innerContainer:{
        flex:1,
        justifyContent: "flex-end"
    },
    row: {
        flexDirection: 'row',
        justifyContent:'space-between',
        flexWrap:'wrap',
    },
    
    btnText: {
        fontSize: 25,
        fontSize: 22,
        textAlign: 'center',
        color:'#f2f2f2'
    },
    
    output: {
        // height: 161,
        textAlign: 'right',
        flexDirection: 'column',
        alignItems:'flex-end',
    },
    backSpaceAndCalc:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
    backSpace:{
        width:40,
        height:40,
        marginLeft:10,
    },
    backSpaceImage:{
        resizeMode:'contain',
        height:40,
        width:40
    }
})

export default Styles;