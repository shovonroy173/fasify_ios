import { View, Text } from 'react-native'
import React from 'react'
import ThemedView from '../../../utils/ThemedView'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import GoBack from '../../../components/GoBack'
import { securityRecentBookings } from '../../../../assets/data/data'
import SecurityRecentBooking from '../../../components/SecurityRecentBooking'

const DefaultSeeAllScreen = () => {
      const navigation = useNavigation();
    
  return (
        <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      <GoBack navigation={navigation}  />

      <SecurityRecentBooking securityRecentBookings={securityRecentBookings} path="UserSingleSecurity" />
    </ThemedView>
  )
}

export default DefaultSeeAllScreen