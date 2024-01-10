
import { TouchableOpacity, Text } from "react-native";
import Styles from "./Styles";

export default function CalculatorButton({ title, onPress, subtitle, sign, theme, doubble }) {
    let bgColor =Styles.default;
    if(theme == 'orange'){
        bgColor = Styles.orange;
    }
    if(theme == 'blue'){
        bgColor = Styles.blue;
    }
    
    return (
        <TouchableOpacity 
            style={[Styles.btnStyle, bgColor, doubble ? Styles.doubble : '']} 
            onPress={onPress}>
            {sign && (
                <Text style={Styles.smallTextLight}>{sign}</Text>
            )}
            <Text style={Styles.smallTextLight}>{title}</Text>
            { subtitle && (
                <Text style={Styles.smallTextHeading}>{subtitle}</Text>
            )}
        </TouchableOpacity>
    );
}