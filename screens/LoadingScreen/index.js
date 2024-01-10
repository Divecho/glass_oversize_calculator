import React, { useState, useCallback } from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Paragraph from '../../components/Paragraph'
import styles from './Styles'
import { Pressable, Linking, View } from 'react-native'

export default function LoadingScreen({ navigation, route }) {
    const [appLoading ,setAppLoading] = useState(route.params.checkLoadingApi);

    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(appLoading.link);
      if (supported) {
        await Linking.openURL(appLoading.link);
      }
    }, [appLoading.link]);

  return (
    <Background style={styles.container}>
      <Logo />
      <Header>{ appLoading == 2 ?(
        'Upgarde App'
      ) : (
        'Smothing Went Wrong'
      )}</Header>
      <Paragraph style={styles.inline}>
        Contact to Admin.
         <Pressable onPress={handlePress}><Paragraph>Click here</Paragraph></Pressable>
      </Paragraph>
    </Background>
  )
}
