// import {View, Text, Pressable} from 'react-native';
// import React from 'react';
// import ThemedView from '../utils/ThemedView';
// // import Octicons from 'react-native-vector-icons/Octicons';
// import {useThemeColor} from '../utils/useThemeColor';
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import ThemedText2 from '../utils/ThemeText2';

// const GoBack = ({ navigation, navigationRef}) => {
//   const {icon2} = useThemeColor();
//   return (
//     <ThemedView
//       styles=" relative justify-center items-center"
//       style={{
//         // paddingHorizontal: responsiveWidth(5),
//         // paddingVertical: responsiveHeight(3),
//       }}>
//       {/* Back Button - Absolute Left */}
//       <Pressable
//         onPress={() => navigation ?  navigation.goBack() : navigationRef()}
//         className="absolute left-0">
//         {/* <Octicons name="arrow-left" size={24} color={icon2} /> */}
//       </Pressable>

//       {/* Title - Centered */}
//       {/* <ThemedText2 styles="text-xl font-SemiBold">{title}</ThemedText2> */}
//     </ThemedView>
//   );
// };

// export default GoBack;


import {  Pressable } from 'react-native';
import React from 'react';
import ThemedView from '../utils/ThemedView';
import { useThemeColor } from '../utils/useThemeColor';
import { ArrowLeft } from 'lucide-react-native'; // ✅ Lucide icon
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedText2 from '../utils/ThemeText2';

const GoBack = ({ navigation, navigationRef, title }) => {
  const { icon2 } = useThemeColor();

  return (
    <ThemedView
      styles="relative justify-center items-center"
      style={{
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveHeight(2),
      }}
    >
      {/* ✅ Back Button - Absolute Left */}
      <Pressable
        onPress={() => (navigation ? navigation.goBack() : navigationRef?.())}
        className="absolute left-0"
      >
        <ArrowLeft size={24} color={icon2} strokeWidth={2.5} />
      </Pressable>

      {/* ✅ Optional Title - Centered */}
      {title && (
        <ThemedText2 styles="text-xl font-SemiBold">{title}</ThemedText2>
      )}
    </ThemedView>
  );
};

export default GoBack;
