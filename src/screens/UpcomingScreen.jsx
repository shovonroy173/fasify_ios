import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Upcoming from '@/components/Upcoming';

const UpcomingScreen = () => {
    const navigation = useNavigation();
  return (
    <View className='flex-1'>

      <Upcoming navigation={navigation}/>
    </View>
  )
}

export default UpcomingScreen