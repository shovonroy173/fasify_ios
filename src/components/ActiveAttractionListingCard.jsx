// import { Image, Text, View } from 'react-native';
// import React from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { Controller } from 'react-hook-form';
// import ThemedView from '../utils/ThemedView';
// import ThemedText from '../utils/ThemedText';
// import ThemedText3 from '../utils/ThemedText3';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import ThemedPressableWhite from '../utils/ThemedPressableWhite';

// const ActiveAttractionListingCard = ({
//   item,
//   name,
//   path,
//   screen,
//   control,
//   pathListing,
// }) => {
//   // const theme = useColorScheme();
//   const navigation = useNavigation();

// //   console.log('LINE AT 16', item);

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field: { value, onChange } }) => {
//         // const isSelected = value?.id === item?.id;

//         return (
//           <ThemedView styles="flex-row p-3 rounded-md border ">
//             <Image
//               source={{ uri: item?.attractionImages[0] }}
//               className="w-24 h-42 rounded-md"
//               resizeMode="cover"
//             />

//             <View className="flex-1 ml-3 gap-2">
//               <ThemedText styles="font-SemiBold text-base">
//                 {item?.category}
//               </ThemedText>
//               <ThemedText3 styles="text-sm mt-1 font-Regular">
//                 {item?.isBooked}
//               </ThemedText3>
//               <View className="flex-row gap-[0.5] items-center w-2/3">
//                 <Entypo name="location-pin" size={14} color="gray" />
//                 <ThemedText3 styles="text-sm mr-2">
//                   {item.attractionAddress}, {item.attractionCity},{' '}
//                   {item.attractionCountry}
//                 </ThemedText3>
//               </View>

//               <View className="flex-row gap-[0.5] items-center ">
//                 <FontAwesome name="star" size={14} color="#f59e0b" />
//                 <Text className="text-yellow-600 text-xs ml-1 font-Medium">
//                   {item?.attractionRating}
//                 </Text>
//                 <ThemedText3 styles="text-sm font-Medium ml-1">
//                   From ${item.convertedAdultPrice}
//                 </ThemedText3>
//               </View>
//               {/* <ThemedText3 styles="text-xs font-Regular">
//                 Total Attractions: {item?.attractions}
//               </ThemedText3> */}

//               <View className="w-full gap-1">
//                 {/* <ThemedPressableWhite
//                   styles="border rounded-xl p-2  "
//                   onPress={() => {
//                     onChange(item); // set the selected item
//                     navigation.navigate(pathListing, { id: item?.id }); // navigate to next screen
//                   }}
//                 >
//                   <ThemedText styles="font-SemiBold text-center">
//                     View All Attractions
//                   </ThemedText>
//                 </ThemedPressableWhite> */}
//                 <ThemedPressableWhite
//                   styles="border rounded-xl p-2  "
//                   onPress={() => {
//                     onChange(item); // set the selected item
//                     navigation.navigate(path, { screen: screen }); // navigate to next screen
//                   }}
//                 >
//                   <ThemedText styles="font-SemiBold text-center">
//                     Edit
//                   </ThemedText>
//                 </ThemedPressableWhite>
//               </View>
//             </View>
//           </ThemedView>
//         );
//       }}
//     />
//   );
// };

// export default ActiveAttractionListingCard;


import { Image, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Controller } from 'react-hook-form';
import ThemedView from '../utils/ThemedView';
import ThemedText from '../utils/ThemedText';
import ThemedText3 from '../utils/ThemedText3';
import ThemedPressableWhite from '../utils/ThemedPressableWhite';
import { MapPin, Star } from 'lucide-react-native'; // ✅ replaced Entypo & FontAwesome

const ActiveAttractionListingCard = ({
  item,
  name,
  path,
  screen,
  control,
  pathListing,
}) => {
  const navigation = useNavigation();

  console.log('LIN EAT 123', item);
  

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <ThemedView styles="flex-row p-3 rounded-md border">
            <Image
              source={{ uri: item?.attractionImages[0] }}
              className="w-24 h-42 rounded-md"
              resizeMode="cover"
            />

            <View className="flex-1 ml-3 gap-2">
              <ThemedText styles="font-SemiBold text-base">
                {item?.category}
              </ThemedText>

              <ThemedText3 styles="text-sm mt-1 font-Regular">
                {item?.isBooked}
              </ThemedText3>

              {/* ✅ Location Row */}
              <View className="flex-row gap-[0.5] items-center w-2/3">
                <MapPin size={14} color="gray" strokeWidth={2} />
                <ThemedText3 styles="text-sm mr-2">
                  {item.attractionAddress}, {item.attractionCity},{' '}
                  {item.attractionCountry}
                </ThemedText3>
              </View>

              {/* ✅ Rating Row */}
              <View className="flex-row gap-[0.5] items-center">
                <Star size={14} color="#f59e0b" fill="#f59e0b" strokeWidth={1.5} />
                <Text className="text-yellow-600 text-xs ml-1 font-Medium">
                  {item?.attractionRating}
                </Text>
                <ThemedText3 styles="text-sm font-Medium ml-1">
                  From {item?.currency}  {item.attractionAdultPrice}
                </ThemedText3>
              </View>

              {/* ✅ Button Row */}
              <View className="w-full gap-1 mt-1">
                {/* Example for “View All Attractions” (optional)
                <ThemedPressableWhite
                  styles="border rounded-xl p-2"
                  onPress={() => {
                    onChange(item);
                    navigation.navigate(pathListing, { id: item?.id });
                  }}
                >
                  <ThemedText styles="font-SemiBold text-center">
                    View All Attractions
                  </ThemedText>
                </ThemedPressableWhite>
                */}

                <ThemedPressableWhite
                  styles="border rounded-xl p-2"
                  onPress={() => {
                    onChange(item);
                    navigation.navigate(path, { screen: screen });
                  }}
                >
                  <ThemedText styles="font-SemiBold text-center">Edit</ThemedText>
                </ThemedPressableWhite>
              </View>
            </View>
          </ThemedView>
        );
      }}
    />
  );
};

export default ActiveAttractionListingCard;
