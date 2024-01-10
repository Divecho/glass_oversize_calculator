import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image, Vibration, SafeAreaView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import CalculatorButton from "../../components/CalculatorButton";
import Styles from "./Styles";

function CalculatorScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [calculation, setCalculation] = useState('')
  const [output, setOutput] = useState('')
  const actions = ['/', '*', '+', '-']
  const [gst, setGst] = useState({ cgst: 0, sgst: 0, rateofCgstSgst: 0, gst: 0, text: '' });
  const [history, setHistory] = useState([]);
  const [lastValue, seLatValue] = useState();
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [showHistor, setShowHistory] = useState(false);
  const [plusGst, setPlusGst] = useState({
    1: "3",
    2: "5",
    3: "12",
    4: "18",
    5: "28"
  });
  const [minusGst, setMinusGst] = useState({
    1: "3",
    2: "5",
    3: "12",
    4: "18",
    5: "28"
  });


  const updateCalculation = value => {
    Vibration.vibrate(35);

    if (actions.includes(value) && calculation === '') {
      // Ignore operators if calculation is empty
      return;
    }

    if (actions.includes(value) && actions.includes(calculation.slice(-1))) {
      // Replace the last operator with the new one
      const operatorRemoved = calculation.slice(0, -1);
      setCalculation(operatorRemoved + value);
      return;
    }

    if (actions.includes(value)) {
      // Evaluate the previous calculation and store the result
      const result = eval(calculation);
      setHistory([...history, { value: calculation }]);
      setCalculation(result.toString() + value);
      setOutput(result.toString());
    } else {
      // Append the value to the calculation
      setCalculation(calculation + value);
      setOutput(eval(calculation + value).toString());
    }
  };


  const calculate = () => {
    Vibration.vibrate(35);
    const result = eval(calculation).toString();
    setCalculation(result)
    setHistory([...history, { value: calculation }]);
  }

  const calculatePer = () => {
    const operators = ['+', '-', '*', '/'];
    for (let operator of operators) {
      const index = calculation.indexOf(operator);

      if (index !== -1) {
        const value = parseFloat(calculation.slice(0, index));
        const percentage = parseFloat(calculation.slice(index + 1)) / 100;

        if (!isNaN(value) && !isNaN(percentage)) {
          const result = value + (value * percentage);
          setCalculation(result.toString())
          setOutput(result)
          setHistory([...history, { value: result.toString() }]);
          return
        }
      }
    }
    const percentage = (parseFloat(output, 10) / 100)
    const resultSingle = percentage + output;
    setCalculation(resultSingle.toString())
    setOutput(resultSingle)
    setHistory([...history, { value: resultSingle }]);
  }
  const clear = () => {
    Vibration.vibrate(35);
    if (calculation === '') {
      return
    }
    setGst({ cgst: 0, sgst: 0, rateofCgstSgst: 0, gst: 0, text: '' });
    const value = calculation.slice(0, -1)
    setCalculation(value)
  }

  const clearButton = () => {
    Vibration.vibrate(35);
    setGst({ cgst: 0, sgst: 0, rateofCgstSgst: 0, gst: 0, text: '' });
    setCalculation('')
    setOutput('')
    setHistory([]);
    setCurrentHistoryIndex(0)
    setShowHistory(false)
  }


  const calculateGST = (rate) => {
    const gstValue = (parseFloat(output, 10) * (rate / 100)).toFixed(2);
    const cgst = (gstValue / 2).toFixed(2);
    const sgst = cgst;
    const rateofCgstSgst = rate / 2
    const text = `GST ${rate}%`;
    setOutput(parseFloat(output, 10) + parseFloat(gstValue, 10))
    setGst({ cgst, sgst, rateofCgstSgst: rateofCgstSgst, gst: gstValue, text });
  };

  const calculateGSTSubtract = (rate) => {
    const gstValue = (parseFloat(output, 10) * (rate / 100)).toFixed(2);
    const cgst = (gstValue / 2).toFixed(2);
    const sgst = cgst;
    const rateofCgstSgst = rate / 2
    const text = `GST ${rate}%`;
    setOutput(eval(parseFloat(output, 10) - gstValue))
    setGst({ cgst: -cgst, sgst: -sgst, rateofCgstSgst: rateofCgstSgst, gst: -gstValue, text });
  };

  const renderGSTInfo = () => {
    if (gst && gst.text) {
      return (
        <>
          <Text style={Styles.btnText}>{gst.text} = {gst.gst}</Text>
          <Text style={Styles.btnText}>CGST {gst.rateofCgstSgst} = {gst.cgst}</Text>
          <Text style={Styles.btnText}>SGST {gst.rateofCgstSgst} = {gst.sgst}</Text>
        </>
      );
    }
    return null;
  };

  const additionalFunction = (value) => {
    if (value === '10.764') {
      setCalculation((parseFloat(output, 10) * 10.764).toFixed(2).toString())
      setOutput((parseFloat(output, 10) * 10.764).toFixed(2).toString())
    }
    if (value === '144') {
      setCalculation((parseFloat(output, 10) / 144).toFixed(2).toString())
      setOutput((parseFloat(output, 10) / 144).toFixed(2).toString())
    }
  }

  const getHistory = () => {
    if (history.length > 0) {
      //if (currentHistoryIndex < history.length) {
      const currentObject = history[currentHistoryIndex];
      let nextIndex = currentHistoryIndex + 1;
      if (history.length <= nextIndex) {
        nextIndex = 0;
      }
      setCurrentHistoryIndex(nextIndex);
      setCalculation(currentObject.value.toString())
      setShowHistory(true);
      //}
    }
  }

  useEffect(() => {
    console.log("hello")
    const getData = async () => {
      try {
        const addGstJsonValue = await AsyncStorage.getItem('add-gst');
        if (typeof addGstJsonValue === 'string' && addGstJsonValue !== null) {
          setPlusGst(JSON.parse(addGstJsonValue))
        }

        //
        const minusGstJsonValue = await AsyncStorage.getItem('minus-gst');
        if (typeof minusGstJsonValue === 'string' && minusGstJsonValue !== null) {
          setMinusGst(JSON.parse(minusGstJsonValue))
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();

  }, [navigation, isFocused])
  return (
    <SafeAreaView style={Styles.container}>
      {showHistor && (
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Text style={Styles.btnText}>{currentHistoryIndex == 0 ? history.length : currentHistoryIndex}</Text>
          <Text style={Styles.btnText}>GT Check</Text>
        </View>
      )}
      <View style={Styles.innerContainer}>

        <View style={Styles.output}>
          <Text style={Styles.btnText}>{calculation || '0'}</Text>
          {renderGSTInfo()}
          <View style={Styles.backSpaceAndCalc}>
            {output && (
              <Text style={Styles.btnText}>{output}</Text>
            )}
            <TouchableOpacity style={Styles.backSpace} onPress={clear}>
              <Image source={require('../../assets/backspace.png')} style={Styles.backSpaceImage} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={Styles.row}>
            {Object.keys(plusGst).map(key => {
              return (
                <CalculatorButton theme="orange" title={`+${plusGst[key].toString()}%`} onPress={() => calculateGST(parseFloat(plusGst[key]))
                } />
              );
            })}
            
          </View>
          <View style={Styles.row}>
          {Object.keys(minusGst).map(key => {
              return (
                <CalculatorButton theme="orange" title={`-${minusGst[key].toString()}%`} onPress={() => calculateGSTSubtract(parseFloat(minusGst[key]))
                } />
              );
            })}
          </View>
          <View style={Styles.row}>
            <CalculatorButton doubble theme="blue" title='Check' onPress={() => getHistory()
            } />

            <CalculatorButton subtitle={'change'} theme="blue" title='GST' onPress={() => navigation.navigate('GST')} />
            <CalculatorButton theme="blue" title='%' onPress={() => calculatePer('%')
            } />
            <CalculatorButton theme="blue" title='C' onPress={() => clearButton()
            } />
          </View>
          <View style={Styles.row}>
            <CalculatorButton theme="default" title='1' onPress={() => updateCalculation('1')
            } />
            <CalculatorButton theme="default" title='2' onPress={() => updateCalculation('2')
            } />
            <CalculatorButton theme="default" title='3' onPress={() => updateCalculation('3')
            } />
            <CalculatorButton theme="default" title='÷' onPress={() => updateCalculation('/')
            } />
            <CalculatorButton theme="default" title='=' onPress={() => calculate('=')
            } />
          </View>

          <View style={Styles.row}>
            <CalculatorButton theme="default" title='4' onPress={() => updateCalculation('4')
            } />
            <CalculatorButton theme="default" title='5' onPress={() => updateCalculation('5')
            } />
            <CalculatorButton theme="default" title='6' onPress={() => updateCalculation('6')
            } />
            <CalculatorButton theme="default" title='x' onPress={() => updateCalculation('*')
            } />
            <CalculatorButton theme="default" title='-' onPress={() => updateCalculation('-')
            } />

          </View>
          <View style={Styles.row}>
            <CalculatorButton theme="default" title='7' onPress={() => updateCalculation('7')
            } />
            <CalculatorButton theme="default" title='8' onPress={() => updateCalculation('8')
            } />
            <CalculatorButton theme="default" title='9' onPress={() => updateCalculation('9')
            } />
            <CalculatorButton doubble theme="default" title='+' onPress={() => updateCalculation('+')
            } />

          </View>
          <View style={Styles.row}>
            <CalculatorButton theme="default" title='0' onPress={() => updateCalculation('0')
            } />
            <CalculatorButton theme="default" title='.' onPress={() => updateCalculation('.')
            } />
            <CalculatorButton theme="blue" sign='x' title='10.764' onPress={() => additionalFunction('10.764')
            } />
            <CalculatorButton theme="blue" sign='÷' title='144' onPress={() => additionalFunction('144')
            } />
            <CalculatorButton theme="blue" title='MODE' onPress={() => navigation.navigate('Home')} />
          </View>
        </View>
      </View>
    </SafeAreaView >
  );
}

export default CalculatorScreen;