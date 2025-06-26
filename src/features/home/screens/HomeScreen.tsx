import { View, Text } from 'react-native'
import React from 'react'
import useHome from '../hooks/useHome'

export default function HomeScreen() {
  const { name } = useHome()
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}