import React from 'react'
import { Text } from 'react-native'
import styles from './Styles'
export default function Header(props) {
  return <Text style={styles.header} {...props} />
}
