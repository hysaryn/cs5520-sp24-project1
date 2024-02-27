import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function PressableButton({commonStyle, onPressFunc, children}) {
  return (
    <Pressable 
        style={({pressed})=> [styles.defaultStyle, commonStyle, pressed && styles.pressed]} 
        onPress={onPressFunc}>
        {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
    defaultStyle: {
        padding: 10,
        borderRadius: 10,
    },

    pressed:{
        opacity: 0.5
    }
})