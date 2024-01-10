import { StyleSheet, Dimensions } from "react-native";
const screen = Dimensions.get("window");
const btnWidth = (screen.width - 30) / 5;
const Styles = StyleSheet.create({
    btnStyle: {
        width: btnWidth,
        height: 55,
        // justifyContent: "center",
        // alignItems: "center",
        marginVertical: 4,
        borderRadius: 12,
        // paddingVertical: 16,
        // paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 12,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 4,
    },
    doubble:{
        width: btnWidth*2+6,
    },
    default: {
        backgroundColor: '#222222',
        borderColor: '#333',
        backgroundGradientStart: '#000000',
        backgroundGradientEnd: '#999999',
        shadowColor: '#999',
    },
    orange: {
        backgroundColor: '#FF9933',
        borderColor: '#CC7F00',
        backgroundGradientStart: '#FF9933',
        backgroundGradientEnd: '#FFA500',
        shadowColor: '#CC7F00',
    },
    blue: {
        backgroundColor: '#003366',
        borderColor: '#001e33',
        backgroundGradientStart: '#0099FF',
        backgroundGradientEnd: '#0055CC',
        shadowColor: '#001e33',
    },
    smallTextLight: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    smallTextHeading:{
        fontSize: 12,
        color: '#FFFFFF',
    },
    smallTextDark: {
        fontSize: 20,
        color: '#000000',
    },

});

export default Styles;