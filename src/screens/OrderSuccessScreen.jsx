import { View,  Image } from 'react-native'
import React from 'react'
import ThemedViewBlue from '@/utils/ThemedViewBlue'
import ThemedText2 from '@/utils/ThemeText2'
import ThemedPressableWhite from '@/utils/ThemedPressableWhite'
import ThemedText from '@/utils/ThemedText'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'

const OrderSuccessScreen = () => {
  const navigation = useNavigation();
  return (
    <ThemedViewBlue styles="flex-1 justify-center items-center"
    style={{
            paddingHorizontal: responsiveWidth(6),
            paddingVertical: responsiveHeight(5),
            gap: responsiveHeight(5),
          }}
    >
      <Image
      source={require("assets/images/success.webp")}
      />
      <View >

      <ThemedText2 styles="text-center font-SemiBold text-2xl mb-1">
        Transaction Successful
      </ThemedText2>
      <ThemedText2 styles="text-center font-Medium text-md">
        Thank you for your order. You will receive email confirmation shortly.
      </ThemedText2>
      </View>
      <ThemedPressableWhite onPress={()=> navigation.navigate('UserHome')} styles="rounded-lg p-3 w-full">
        <ThemedText styles="text-center font-SemiBold text-md">Back to Home</ThemedText>
      </ThemedPressableWhite>
    </ThemedViewBlue>
  )
}

export default OrderSuccessScreen