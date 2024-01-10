import React, { useState } from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import CommonButton from '../../components/Button'
import Paragraph from '../../components/Paragraph'
import BottomModal from '../../components/Modal/BottamModal'
import styles from './Styles'
import { TouchableOpacity, Linking, View, Image } from 'react-native'

const socialIcon = [
  {
    url: 'youtube',
    image: require('../../assets/youtube.png')
  },
  {
    url: 'https://www.facebook.com/profile.php?id=100091211108389',
    image: require('../../assets/facebook.png')
  },
  {
    url: 'https://www.instagram.com/oversizeglasscalculator/',
    image: require('../../assets/instagram.png')
  },
  {
    url: 'https://in.pinterest.com/oversizeglass/',
    image: require('../../assets/pinterest.png')
  },
  {
    url: 'mailto:oversizeglass@gmail.com',
    image: require('../../assets/gmail.png')
  },
  {
    url: 'whatsapp://send?text=Hello&phone=919358193897',
    image: require('../../assets/whatsapp.png')
  },
  {
    url: 'https://www.google.com/maps?q=26.8142559,75.7804554&z=17&hl=en',
    image: require('../../assets/location.png')
  }
];

const youtubeChannel = [
  {
    url: 'https://youtube.com/@Oversize_Glass_Calculator',
    name: 'Oversize Glass Calculator'
  },
  {
    url: 'https://youtube.com/@Oversize_mirror',
    name: 'Oversize Mirror'
  },
  {
    url: 'https://youtube.com/@Aluminium_Oversize',
    name: 'Aluminium Oversize'
  },
  {
    url: 'https://youtube.com/@oversize_glass_art',
    name: 'oversize Glass Art'
  },
  {
    url: 'https://youtube.com/@Stainless_Steel_Fabrication',
    name: 'Stainless Steel Fabrication'
  },
];

export default function WelcomeScreen({ navigation }) {
  const [show, setShow] = useState(false)
  return (
    <Background >
      <View style={styles.container}>
        <Logo />
        <Header>Join & Contact us</Header>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 50,
          paddingHorizontal: 70,
        }}>
          {
            socialIcon.map((icon, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    paddingHorizontal: 7,
                    marginBottom: 10
                  }}
                  onPress={() => icon.url == 'youtube' ? setShow(true) : Linking.openURL(icon.url)}>
                  <Image source={icon.image} style={{
                    width: 40,
                    height: 40,
                    resizeMode: 'contain'
                  }} />
                  {/* <Paragraph>www.oversizeglasscalculator.com</Paragraph> */}
                </TouchableOpacity>
              );
            })
          }
        </View>
        <CommonButton
          mode="contained"
          onPress={() => navigation.navigate('Calculator')}
          text="Get start"
        />
      </View>
      <BottomModal show={show} onDismiss={() => {
        setShow(false);
      }} >
        <View style={{
          paddingVertical:15,
          paddingHorizontal:20,
          alignItems:'flex-start'
        }}>
          { youtubeChannel.map((item, index) => {
            return(
              <TouchableOpacity
                  key={index}
                  style={{
                    paddingHorizontal: 7,
                    marginBottom: 10
                  }}
                  onPress={() => Linking.openURL(item.url)}>
                  
                  <Paragraph>{item.name}</Paragraph>
                </TouchableOpacity>
            );
          })

          }
        </View>
      </BottomModal>
    </Background>
  )
}
