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

// const GoBackTitle = ({ navigation, navigationRef, title}) => {
//   const {icon} = useThemeColor();
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
//         {/* <Octicons name="arrow-left" size={24} color={icon} /> */}
//       </Pressable>

//       {/* Title - Centered */}
//       <ThemedText2 styles="text-xl font-SemiBold text-center">{title}</ThemedText2>
//     </View>
//   );
// };

// export default GoBackTitle;


import React from 'react';
import { View, Pressable } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useThemeColor } from '../utils/useThemeColor';
import ThemedText2 from '../utils/ThemeText2';

const GoBackTitle = ({ navigation, navigationRef, title }) => {
  const { icon } = useThemeColor();

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
        <ArrowLeft size={24} color={icon} strokeWidth={2.2} />
      </Pressable>

      {/* Title - Centered */}
      <ThemedText2 styles="text-xl font-SemiBold text-center">
        {title}
      </ThemedText2>
    </View>
  );
};

export default GoBackTitle;
