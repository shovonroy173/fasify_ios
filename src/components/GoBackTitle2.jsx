// import {View, Text, Pressable} from 'react-native';
// import React from 'react';
// import ThemedView from '../utils/ThemedView';
// // import Octicons from 'react-native-vector-icons/Octicons';
// import {useThemeColor} from '../utils/useThemeColor';
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import ThemedText from '../utils/ThemedText';
// import ThemedText2 from '../utils/ThemeText2';

// const GoBackTitle2 = ({ navigation, navigationRef, title}) => {
//   const {icon2} = useThemeColor();
//   return (
//     <View
//       className=" relative justify-center items-center"
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
//       <ThemedText styles="text-xl font-SemiBold text-center">{title}</ThemedText>
//     </View>
//   );
// };

// export default GoBackTitle2;

import React from 'react';
import { View, Pressable } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useThemeColor } from '@/utils/useThemeColor';
import ThemedText from '@/utils/ThemedText';

const GoBackTitle2 = ({ navigation, navigationRef, title }) => {
  const { icon2 } = useThemeColor();

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack();
    } else if (navigationRef) {
      navigationRef();
    }
  };

  return (
    <View className="relative justify-center items-center">
      {/* Back Button - Absolute Left */}
      <Pressable onPress={handleGoBack} className="absolute left-0 p-2">
        <ArrowLeft size={24} color={icon2} strokeWidth={2.2} />
      </Pressable>

      {/* Title - Centered */}
      <ThemedText styles="text-xl font-SemiBold text-center">
        {title}
      </ThemedText>
    </View>
  );
};

export default GoBackTitle2;
