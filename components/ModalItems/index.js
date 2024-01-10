import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Paragraph from '../Paragraph';

import styles from './Styles';
export default function ModalItems(props) {
    const [values, setValues] = React.useState({
        width: '',
        height: '',
        qty: '1',
        variety: 'Glass(कांच)',
    });
    const itemInputHandler = (name, value) => {
        if(value.match(/^(\d*\.{0,1}\d{0,50}$)/) || name == 'variety'){
            setValues({
                ...values,
                [name]: value,
            });
        }
    }
    
    const addItemHandler = () => {
        props.onAddItem(values);
        setValues({
            width: '',
            height: '',
            qty: '1',
            variety: values.variety,
        });
    }
    return (
        <View style={styles.container}>
            
            <View style={styles.rowContainer}>
                <View style={styles.itemRow}>
                    <Paragraph style={styles.itemLabel}>Height</Paragraph>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => itemInputHandler('height', text)}
                        value={values.height}
                        placeholder="ऊंचाई"
                        keyboardType="decimal-pad"
                        returnKeyType='done'
                    />
                </View>
                <View style={styles.itemRow}>
                    <Paragraph style={styles.itemLabel}>Width</Paragraph>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => itemInputHandler('width', text)}
                        value={values.width}
                        placeholder="चौड़ाई"
                        keyboardType="decimal-pad"
                        returnKeyType='done'
                    />
                </View>
                <View style={styles.itemRow}>
                    <Paragraph style={styles.itemLabel}>Qty.</Paragraph>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => itemInputHandler('qty', text)}
                        value={values.qty}
                        placeholder="मात्रा"
                        keyboardType="number-pad"
                        returnKeyType='done'
                    />
                </View>
            </View>
            <View style={[styles.rowContainer, {
                alignItems:'flex-end',
            }]}>
                <View style={styles.itemRow}>
                    <Paragraph style={styles.itemLabel}>Variety</Paragraph>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => itemInputHandler('variety', text)}
                        value={values.variety}
                        placeholder="कांच का प्रकार"
                        keyboardType="default"
                        returnKeyType='done'
                    />
                </View>
                <View style={styles.itemRow}>
                    <TouchableOpacity
                        onPress={addItemHandler}
                        style={styles.button}>
                        <Paragraph style={styles.buttonText}>Add</Paragraph>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}