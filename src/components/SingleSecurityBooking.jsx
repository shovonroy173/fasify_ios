// import { View, Text, useColorScheme, Image, Pressable } from 'react-native';
// import React from 'react';
// import ThemedText from '../utils/ThemedText';
// import ThemedText3 from '../utils/ThemedText3';
// import ThemedText2 from '../utils/ThemeText2';
// import { useNavigation } from '@react-navigation/native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const SingleSecurityBooking = ({ name, booking, path, screen }) => {
//   const theme = useColorScheme();
//   const navigation = useNavigation();
//   // console.log(path);

//   return (

//     <Pressable
//       onPress={() => navigation.navigate(path, { screen: screen })}

//       className={`${
//         theme === 'dark' ? 'bg-zinc-600' : 'bg-zinc-200'
//       }  rounded-lg p-3  flex-row items-center`}
//     >
//       <Image
//         source={{ uri: booking?.securityImages[0] }}
//         className="w-12 h-12 rounded-full mr-3"
//       />
//       <View className="flex-1 gap-1">
//         <ThemedText styles="font-SemiBold text-sm">
//           {booking?.securityName}
//         </ThemedText>
//         <View className="flex-row items-center gap-4">
//           <View className="flex-row items-center gap-2">
//             <FontAwesome name="star" size={14} color="#FE8814" />
//             <ThemedText3 styles="text-sm font-Regular">
//               {booking.securityRating}
//             </ThemedText3>
//           </View>
//           <View className="flex-row items-center gap-2">
//             <FontAwesome name="dollar" size={14} color="gray" />

//             <ThemedText3 styles="text-sm font-Regular">
//               {booking?.securityPriceDay}
//             </ThemedText3>
//           </View>
//         </View>
//       </View>
//       <View className="items-end">
//         {/* <Text className="text-xs text-gray-500 mb-2">{booking.timeAgo}</Text> */}
//         <View className="bg-green-500 px-2 py-1 rounded-md">
//           <ThemedText2 styles=" text-xs font-Medium">
//             {booking?.isBooked}
//           </ThemedText2>
//         </View>
//       </View>
//     </Pressable>
//   );
// };

// export default SingleSecurityBooking;

import { View, Image, Pressable, useColorScheme } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Controller } from 'react-hook-form';
import ThemedText from '../utils/ThemedText';
import ThemedText3 from '../utils/ThemedText3';
import ThemedText2 from '../utils/ThemeText2';
import { MapPin, Star } from 'lucide-react-native';

const SingleSecurityBooking = ({ name, booking, path, screen, control }) => {
  const theme = useColorScheme();
  const navigation = useNavigation();
  console.log('LINE AT 74', booking);

  return (
    <Controller
      // name={name}
      name="selectedSecurity"
      control={control}
      render={({ field: { value, onChange } }) => (
        <Pressable
          onPress={() => {
            onChange(booking); // update selected booking
            navigation.navigate(path, { screen: screen });
          }}
          className={`${
            theme === 'dark' ? 'bg-zinc-600' : 'bg-zinc-200'
          }  rounded-lg p-3 flex-row items-center`}
        >
          <Image
            source={{
              uri:
                booking?.securityImages[0] ||
                'https://images.pexels.com/photos/7714702/pexels-photo-7714702.jpeg',
            }}
            className="w-12 h-12 rounded-full mr-3"
          />
          <View className="flex-1 gap-1">
            <ThemedText styles="font-SemiBold text-sm">
              {booking?.securityGuardName}
            </ThemedText>
            <View className="flex-row items-center gap-4">
              <View className="flex-row items-center gap-1">
                <Star size={14} color="#FE8814" />
                <ThemedText3 styles="text-sm font-Regular">
                  {booking?.securityRating}
                </ThemedText3>
              </View>
              <View className="flex-row items-center gap-1">
                <ThemedText3 styles="text-sm font-Regular">
                  {booking?.displayCurrency} {booking?.convertedPrice}
                </ThemedText3>
              </View>
            </View>
            <View className="flex-row items-center gap-4">
              <View className="flex-row items-center gap-1">
                <MapPin size={14} color="#FE8814" />
                <ThemedText3 styles="text-sm font-Regular w-2/3">
                  {booking?.securityAddress}, {booking?.securityCity},{' '}
                  {booking?.securityCountry}
                </ThemedText3>
              </View>
              {/* <View className="flex-row items-center gap-1">
                <FontAwesome name="dollar" size={14} color="gray" />
                <ThemedText3 styles="text-sm font-Regular">
                  {booking?.securityPriceDay}
                </ThemedText3>
              </View> */}
            </View>
          </View>
          <View className="items-end">
            <View className="bg-green-500 px-2 py-1 rounded-md">
              <ThemedText2 styles=" text-xs font-Medium">
                {/* {booking?.isBooked} */}
                AVAILABLE
              </ThemedText2>
            </View>
          </View>
        </Pressable>
      )}
    />
  );
};

export default SingleSecurityBooking;
