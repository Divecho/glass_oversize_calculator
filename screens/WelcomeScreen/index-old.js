import React, { useEffect, useState } from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import CommonButton from '../../components/Button'
import Paragraph from '../../components/Paragraph'
import styles from './Styles'
import { TouchableOpacity, Linking, View, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function WelcomeScreen({ navigation }) {
  const staticPassword = "BRAHMABHATT1993@#9829167550";
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [alreadyDone, setAlreadyDone] = useState(false);

  const saveData = async (value) => {
    try {
      await AsyncStorage.setItem('@MyApp_user', JSON.stringify(value))
    } catch (e) {

    }
  }

  const getData = async () => {
    try {
      const userRegisterData = await AsyncStorage.getItem('@MyApp_user')

      if (userRegisterData !== null) {
        const userDate = JSON.parse(userRegisterData);
        const expireDate = new Date(userDate.expireDate);
        //console.log("grhjkg", userDate.password );
        if (dataData().currentDate > expireDate || userDate.password == staticPassword) {
          setAlreadyDone(true);
        }
      }
    } catch (e) {

    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@MyApp_user')
    } catch (e) {
    }
  }

  const dataData = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const expireDate = new Date(year, month, day + 180);
    return {
      currentDate: currentDate,
      year: year,
      month: month,
      day: day,
      expireDate: expireDate,
    }
  }

  useEffect(() => {
    getData();
    if (alreadyDone) {
      setAlreadyDone(false)
      removeValue();
    }

  }, [navigation])
  //console.log(alreadyDone);
  const checkPassword = () => {
    setError();
    if (password != staticPassword) {
      setError('Wrong password !');
      return;
    }

    const userRegisterData = {
      password: password,
      registerDate: dataData().currentDate,
      expireDate: dataData().expireDate,
    }
    saveData(userRegisterData);
    navigation.navigate('Home');
  }
  const dialCall = (number) => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    }
    else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  };
  return (
    <Background style={styles.container}>
      <Logo />
      <TouchableOpacity 
        onPress={ () => Linking.openURL('http://oversizeglasscalculator.com/')}>
          <Header>www.oversizeglasscalculator.com</Header>
      {/* <Paragraph>www.oversizeglasscalculator.com</Paragraph> */}
      </TouchableOpacity>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Paragraph style={styles.buttonLabel}>Call us : </Paragraph>
        <TouchableOpacity style={styles.buttonCallUs} onPress={() => dialCall(9358193897)}>
          <Paragraph>9358193897</Paragraph>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCallUs} onPress={() => dialCall(6377257595)}>
          <Paragraph>6377257595</Paragraph>
        </TouchableOpacity>
      </View>
      {
        alreadyDone ? (
          <CommonButton
            mode="contained"
            onPress={() => navigation.navigate('Home')}
            text="Get start"
          />
        ) : (
          <>
            <View style={{
              width: '100%'
            }}>
              <Paragraph style={styles.itemLabel}>Enter Key</Paragraph>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="पासवर्ड दर्ज करें"
                keyboardType="default"
                returnKeyType='done'
                secureTextEntry={true}
              />
              <Paragraph style={[styles.itemLabel, styles.error]}>{error}</Paragraph>
            </View>
            <CommonButton
              mode="contained"
              onPress={() => checkPassword()}
              text="Get start"
            />
          </>

        )
      }
      <TouchableOpacity style={{
        position:'absolute',
        bottom:80
      }} onPress={ () => Linking.openURL('https://divecho.com/')}>
      <Paragraph>Powered By - DivEcho.Com</Paragraph>
      </TouchableOpacity>
    </Background>
  )
}
