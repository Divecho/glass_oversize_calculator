import { View, Pressable, Image } from 'react-native';
import matchData from '../../core/matchData';
import Paragraph from '../Paragraph';
import styles from './Styles';

function convertMmToInch(mm) {
  return (mm * 0.03937).toFixed(2);
}

function ItemLists(props) {
  let bHeight = props.data.height;
  let bWidth = props.data.width;
  if (props.mode === 'MM Mode') {
    bHeight = convertMmToInch(props.data.height)
    bWidth = convertMmToInch(props.data.width)
  }
  
  const bData = matchData(props.mode, bHeight, bWidth);
  const sqFt = bData.height * bData.width * props.data.qty / 144;
  //sqFt = matchData.find((item) => item > sqFt);
  return (
    <View style={styles.goalItem}>
      <Paragraph style={[styles.tabelColText, {
        width: 40,
      }]}>{props.sno}</Paragraph>
      <Paragraph style={styles.tabelColText}>{props.data.height}</Paragraph>
      <Paragraph style={styles.tabelColText}>{props.data.width}</Paragraph>
      <Paragraph style={[styles.tabelColText, {
        width: 30,
      }]}>{props.data.qty}</Paragraph>
      <Paragraph style={styles.tabelColText}>{sqFt}</Paragraph>
      <Paragraph style={[styles.tabelColText, {
        width: 80,
      }]}>{props.data.variety}</Paragraph>
      <Pressable
        android_ripple={{ color: '#210644' }}
        onPress={props.onDeleteItem.bind(this, props.id)}
        style={[styles.tabelColText, {
          width: 30,
        }]}
      >
        <Image source={require('../../assets/cancel.png')} />
      </Pressable>
    </View>
  );
}

export default ItemLists;
