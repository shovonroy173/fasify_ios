// import { View, Text, Image } from 'react-native'
// import React from 'react'
// import ThemedPressablePayment from '../utils/ThemedPressablePayment'
// import ThemedText from '../utils/ThemedText'
// import ThemedText3 from '../utils/ThemedText3'

// const PaymentOption = ({item}) => {
//   return (
//     <ThemedPressablePayment styles="flex-row rounded-lg p-2 gap-3 items-center">
//         <Image
//         source={item.uri}
//         className='w-10 h-10 rounded-lg'
//         />
//         <View>

//         <ThemedText styles="font-SemiBold">{item.number}</ThemedText>
//         {/* <ThemedText3>Expires: {item.date}</ThemedText3> */}
//         </View>
//     </ThemedPressablePayment>
//   )
// }

// export default PaymentOption

import { View, Image } from 'react-native';
import React from 'react';
import ThemedPressablePayment from '../utils/ThemedPressablePayment';
import ThemedText from '../utils/ThemedText';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PaymentOption = ({ item, selected, onPress }) => {
  return (
    <ThemedPressablePayment
      styles={`flex-row rounded-lg p-3 gap-3 items-center border ${
        selected ? 'border-primary bg-primary/10' : 'border-gray-300'
      }`}
      onPress={onPress}
    >
      {/* Icon / Logo */}
      <Image source={item.uri} className="w-10 h-10 rounded-lg" />

      {/* Card Info */}
      <View className="flex-1">
        <ThemedText styles="font-SemiBold">{item.number}</ThemedText>
        {/* <ThemedText3>Expires: {item.date}</ThemedText3> */}
      </View>

      {/* Checkmark when selected */}
      {/* {selected && (
        // <MaterialIcons name="check-circle" size={24} color="#16a34a" />
      )} */}
    </ThemedPressablePayment>
  );
};

export default PaymentOption;
