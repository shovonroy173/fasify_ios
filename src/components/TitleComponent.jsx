import { View, Text } from 'react-native'
import React from 'react'
import ThemedText from '../utils/ThemedText'
import ThemedText3 from '../utils/ThemedText3'

const TitleComponent = ({title, subTitle}) => {
  return (
   <View>
          <ThemedText styles="text-3xl font-Bold pb-2">{title}</ThemedText>
          <ThemedText3 styles="font-Regular">
            {subTitle}
          </ThemedText3>
        </View>
  )
}

export default TitleComponent