// /* eslint-disable react-native/no-inline-styles */
// import React from 'react';
// import {Pressable, useColorScheme, View} from 'react-native';
// import {Controller, useFormContext} from 'react-hook-form';
// import {
//   responsiveHeight,

// } from 'react-native-responsive-dimensions';
// import ThemedText2 from './ThemeText2';
// import useT from './useT';

// const ThemedSelect = ({item, name, navigation, path, role}) => {
//   console.log(item, name,);
//   const {control, watch} = useFormContext();

//   const theme = useColorScheme();

//   const baseStyle =
//     theme === 'dark'
//       ? 'bg-blue-500'
//       : 'bg-blue-200';

//   const selectedStyle =
//     role === item?.id
//       ? theme === 'dark'
//         ? 'bg-blue-700 ' // lighter border for dark mode
//         : 'bg-blue-600' // darker border for light mode
//       : theme === 'dark'
//       ? 'bg-blue-300' // neutral border in dark mode
//       : 'bg-blue-200'; // default light border
// const t = useT();
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({field: {onChange, value}}) => (
//         <View className="relative">
//           <Pressable
//             onPress={() => {
//               // console.log('Selected item', item);

//               onChange(item.id);
//               navigation.navigate(role === item.id ? "Signin" : "ProviderSignin")
//             }}
//             className={` rounded-xl px-4 py-4 ${baseStyle} ${selectedStyle}`}
//             style={{
//               minHeight: responsiveHeight(7),
//               justifyContent: 'center',
//             }}
//             // {...props}
//           >
//             <ThemedText2 styles="font-SemiBold text-center text-lg ">
//               {t(item.title)}
//             </ThemedText2>
//           </Pressable>
//         </View>
//       )}
//     />
//   );
// };

// export default ThemedSelect;

/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Pressable, useColorScheme, View } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { responsiveHeight } from "react-native-responsive-dimensions";
import ThemedText2 from "./ThemeText2";
import useT from "./useT";

const ThemedSelect = ({ item, name, onSelect }) => {
  const { control, watch } = useFormContext();
  const theme = useColorScheme();
  const t = useT();

  // Get current selected role ID
  const roleId = watch(name);
  const isSelected = roleId === item?.id;

  const baseStyle = theme === "dark" ? "bg-blue-500" : "bg-blue-200";
  const selectedStyle = isSelected
    ? theme === "dark"
      ? "bg-blue-700"
      : "bg-blue-600"
    : theme === "dark"
      ? "bg-blue-300"
      : "bg-blue-200";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <View className="relative">
          <Pressable
            onPress={() => {
              console.log("Selecting item ID:", item.id);
              onChange(item.id); // Update the form value

              // Call the onSelect callback if provided
              if (onSelect) {
                onSelect(item.id);
              }
            }}
            className={`rounded-xl px-4 py-4 ${baseStyle} ${selectedStyle}`}
            style={{
              minHeight: responsiveHeight(7),
              justifyContent: "center",
            }}
          >
            <ThemedText2 styles="font-SemiBold text-center text-lg ">
              {t(item.title)}
            </ThemedText2>
          </Pressable>
        </View>
      )}
    />
  );
};

export default ThemedSelect;
