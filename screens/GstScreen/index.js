import React, { useEffect, useState } from 'react'
import { View, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../../components/Background'
import Paragraph from '../../components/Paragraph'
import CommonButton from '../../components/Button';
import Loading from '../../components/Loading';
import styles from './Styles'
export default function GstScreen({ navigation }) {
    const [show, setShow] = useState(false)
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

    const handleInputPlusGST = (key, value) => {
        setPlusGst(prevPlusGst => ({
            ...prevPlusGst,
            [key]: value
        }));
    };
    const handleInputMinusGST = (key, value) => {
        setMinusGst(prevMinusGst => ({
            ...prevMinusGst,
            [key]: value
        }));
    };

    const updateGst = async () => {
        try {
            setShow(true)
            const PlusGstJsonValue = JSON.stringify(plusGst);
            const MinusGstJsonValue = JSON.stringify(minusGst);
            await AsyncStorage.setItem('add-gst', PlusGstJsonValue);
            await AsyncStorage.setItem('minus-gst', MinusGstJsonValue);
            setShow(false)
        } catch (e) {
            // saving error
        }
    };

    useEffect( () => {
        const getData = async () => {
            try {
              const addGstJsonValue = await AsyncStorage.getItem('add-gst');
              if(typeof addGstJsonValue === 'string' && addGstJsonValue !== null){
                setPlusGst(JSON.parse(addGstJsonValue))
              }
    
              //
              const minusGstJsonValue = await AsyncStorage.getItem('minus-gst');
              if(typeof minusGstJsonValue === 'string' && minusGstJsonValue !== null){
                setMinusGst(JSON.parse(minusGstJsonValue))
              }
            } catch (e) {
              // error reading value
            }
          };
          getData();
          
    }, [navigation, show])
    return (
        <Background>
            <View style={styles.container}>
                <Loading loading={show} />
                <View style={styles.nameContainer}>
                    <Paragraph style={styles.nameLabel}>+GST</Paragraph>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        {Object.keys(plusGst).map(key => {
                            return (
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => handleInputPlusGST(key, text)}
                                    value={plusGst[key].toString()}
                                    placeholder=""
                                    keyboardType="numeric"
                                    returnKeyType='done'
                                />
                            );
                        })}
                    </View>
                </View>

                <View style={styles.nameContainer}>
                    <Paragraph style={styles.nameLabel}>-GST</Paragraph>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        {Object.keys(minusGst).map(key => {
                            return (
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => handleInputMinusGST(key, text)}
                                    value={minusGst[key].toString()}
                                    placeholder=""
                                    keyboardType="numeric"
                                    returnKeyType='done'
                                />
                            );
                        })}
                    </View>
                </View>
                <CommonButton
                    mode="contained"
                    onPress={() => updateGst()}
                    text="Submit"
                />
            </View>
        </Background>
    )
}
