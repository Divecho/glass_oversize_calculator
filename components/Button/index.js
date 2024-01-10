import React from 'react'
import { TouchableOpacity } from 'react-native'
import Paragraph from '../Paragraph'
import { theme } from '../../core/theme'
import styles from './Styles'
export default function CommonButton({ onPress, mode, style, text }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        style
      ]}
      onPress={onPress}
    >
      <Paragraph style={styles.buttonText}>{text}</Paragraph>
      </TouchableOpacity>
  )
}
