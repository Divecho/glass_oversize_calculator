import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, View, Pressable, Image } from 'react-native';
import styles from './Styles';
export default function BottomModal({ show, onDismiss, children }) {
    const bottomSheetHeight = Dimensions.get('window').height * 0.5;
    const deviceWidth = Dimensions.get('window').width;
    const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;
    const [open, setOpen] = useState(show);
    useEffect(() => {
        if (show) {
            setOpen(show);
            Animated.timing(bottom, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(bottom, {
                toValue: -bottomSheetHeight,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                setOpen(false);
            });
        }
    }, [show])
    if (!open) {
        return null;
    }
    return (
        <Animated.View
            style={[
                styles.root,
                {
                    //height: bottomSheetHeight,
                    bottom: bottom,
                    shadowOffset: {
                        height: -3,
                    }
                },
                styles.common
            ]}
        >
            <View style={[
                styles.header,
                styles.common,
                {
                    position: 'relative',
                    shadowOffset: {
                        height: 3,
                    }
                }
            ]}>
                <View
                    style={{
                        width: 60,
                        height: 3,
                        borderRadius: 1.5,
                        position: 'absolute',
                        top: 8,
                        left: (deviceWidth - 60) / 2,
                        zIndex: 10,
                        backgroundColor: '#ccc',
                    }}>

                </View>
                <Pressable
                    style={[styles.closeIcon]}
                    onPress={onDismiss}>
                    <Image source={require('../../assets/cancel.png')} />
                </Pressable>
            </View>
            {children}
        </Animated.View>
    );
}