import React from 'react'
import { ImageBackground, KeyboardAvoidingView, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './Styles'
import { useHeaderHeight } from '@react-navigation/elements';

export default function Background({ children, style }) {
  const headerHeight = useHeaderHeight();

  return (
    <ImageBackground
      source={require('../../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={[styles.container, style]}
        scrollEnabled={false}
      >
        {children}
      </KeyboardAwareScrollView>
    </ImageBackground >
  )
}
