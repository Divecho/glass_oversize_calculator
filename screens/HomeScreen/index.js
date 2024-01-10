import React, { useEffect, useState } from 'react'
import { View, Pressable, FlatList, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native'
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import Background from '../../components/Background'
import { PdfData } from '../../components/PDF';
import Paragraph from '../../components/Paragraph'
import BottomModal from '../../components/Modal/BottamModal'
import ModalItems from '../../components/ModalItems'
import ItemLists from '../../components/ItemLists'
import Dropdown from '../../components/DropDown';
import matchData from '../../core/matchData';
import styles from './Styles'
export default function HomeScreen({ navigation }) {
    const [itemList, setItemList] = useState([]);
    const [show, setShow] = useState(true);
    const [nameHandle, nameHandleShow] = useState(false);
    const [name, setName] = useState('');
    const [mode, setMode] = useState('3, 6 Inch');

    const options = ['MM Mode', '3, 6 Inch', '6 Inch', '3 Inch', '2 Inch', '+1 Inch', 'GST Calculator'];
    function handleOptions(item){
        if(itemList.length > 0 &&  item == 'MM Mode' || itemList.length > 0 &&  item == '3, 6 Inch' &&  item == '6 Inch'){
            alert('Please clear all entries and than change mode');
            return;
        }
        //navigation.navigate('Calculator')
        item === 'GST Calculator' ? navigation.navigate('Calculator') : itemList.length > 0 ? null : setMode(item)
    }
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    {/* <Pressable style={{
                        paddingHorizontal: 10,
                    }} onPress={() => itemList.length > 0 ? null : setMode(mode === 'Inch' ? 'MM' : 'Inch')}>
                        <Paragraph style={{
                            color: mode === 'MM' ? 'red' :"#034694",
                            fontWeight: '700',
                            opacity: itemList.length > 0 ? .5 : 1
                        }}>Mode {(mode === 'Inch') ? 'MM' : 'Inch'}</Paragraph>
                    </Pressable> */}
                    <Dropdown options={options} onSelectOption={ (item) => handleOptions(item) } />
                    <Pressable style={{
                        paddingHorizontal: 10,
                    }} onPress={() => nameHandleShow(true)}>
                        <Paragraph style={{
                            color: "#034694",
                            fontWeight: '700'
                        }}>Name</Paragraph>
                    </Pressable>
                    <Pressable style={{
                        paddingHorizontal: 10,
                    }} onPress={() => setShow(true)}>
                        <Paragraph style={{
                            color: "#034694",
                            fontWeight: '700'
                        }}>Add</Paragraph>
                    </Pressable>
                    <Pressable style={{
                        paddingHorizontal: 10,
                    }} onPress={() => generatePdf()}>
                        <Paragraph style={{
                            color: "#034694",
                            fontWeight: '700'
                        }}>PDF</Paragraph>
                    </Pressable>
                </>
            ),
        });
    }, [navigation, itemList, name, mode]);

    function addItemHandler(values) {
        setItemList((currentItemLists) => [
            ...currentItemLists,
            {
                width: values.width,
                height: values.height,
                qty: values.qty,
                variety: values.variety,
                id: Math.random().toString()
            },
        ]);
    }

    function deleteItemHandler(id) {
        setItemList((currentItemLists) => {
            return currentItemLists.filter((goal) => goal.id !== id);
        });
    }

    async function generatePdf() {
        //console.log("name", name);
        // if (name == '') {
        //     alert('Please Add recipent name');
        //     return;
        // }
        const htmlData = PdfData(itemList, name, mode);
        const file = await printToFileAsync({
            html: htmlData,
            base64: false,
        });
        const readableDate = new Date();
        const pdfName = `${file.uri.slice(
            0,
            file.uri.lastIndexOf('/') + 1
        )}oversize-calculator-${name}_${readableDate.getTime()}.pdf`

        await FileSystem.moveAsync({
            from: file.uri,
            to: pdfName,
        })

        await shareAsync(pdfName);
    }

    function convertMmToInch(mm) {
        return (mm * 0.03937).toFixed(2);
    }

    function getTotal() {
        const totalSqFt = itemList.reduce(function (a, b) {
            let bHeight = b.height;
            let bWidth = b.width;
            if (mode === 'MM Mode') {
                bHeight = convertMmToInch(b.height)
                bWidth = convertMmToInch(b.width)
            }

            const bData = matchData(mode, bHeight, bWidth);
            const sqFt = bData.height * bData.width * b.qty / 144;
            return a + (sqFt)
        }, 0);

        const totalQty = itemList.reduce(function (a, b) {
            return a + (parseFloat(b.qty))
        }, 0);

        return {
            totalSqFt: totalSqFt,
            totalQty: totalQty
        }
    }


    return (
        <Background>
            <View style={[styles.container, {
                justifyContent: 'space-between',
            }]}>
                
                <View style={styles.goalsContainer}>
                    {nameHandle && (
                        <View style={styles.nameContainer}>
                            <Paragraph style={styles.nameLabel}>Name</Paragraph>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setName(text)}
                                value={name}
                                placeholder="नाम"
                                keyboardType="default"
                                returnKeyType='done'
                            />
                        </View>
                    )}
                    <FlatList
                        data={itemList}
                        renderItem={(itemData, index) => {
                            //console.log(itemData);
                            return (
                                <ItemLists
                                    mode={mode}
                                    data={itemData.item}
                                    id={itemData.item.id}
                                    sno={itemData.index + 1}
                                    onDeleteItem={deleteItemHandler}
                                />
                            );
                        }}
                        keyExtractor={(item, index) => {
                            return item.id;
                        }}
                        alwaysBounceVertical={false}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={() => (
                            <>
                                <View style={styles.listHeader}>
                                    <Paragraph>Total Qty. {getTotal().totalQty}</Paragraph>
                                    <Paragraph>Total Sq.ft. {getTotal().totalSqFt}</Paragraph>
                                </View>
                                <View style={styles.listHeader}>
                                    <Paragraph style={[styles.listHeaderText, {
                                        width: 40,
                                    }]}>S.No.</Paragraph>
                                    <Paragraph style={styles.listHeaderText}>Height</Paragraph>
                                    <Paragraph style={styles.listHeaderText}>Width</Paragraph>
                                    <Paragraph style={[styles.listHeaderText, {
                                        width: 30,
                                    }]}>Qty</Paragraph>
                                    <Paragraph style={styles.listHeaderText}>Sq.ft.</Paragraph>
                                    <Paragraph style={[styles.listHeaderText, {
                                        width: 80,
                                    }]}>Variety</Paragraph>
                                    <Paragraph style={[styles.listHeaderText, {
                                        width: 30,
                                    }]}></Paragraph>
                                </View>
                            </>
                        )}

                    />
                </View>
                <BottomModal show={show} onDismiss={() => {
                    setShow(false);
                }} >
                    <ModalItems onAddItem={addItemHandler} />
                </BottomModal>
            </View>
        </Background>
    )
}
