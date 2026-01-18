// import { View, Pressable, Text, useColorScheme } from 'react-native';
// import React from 'react';
// import { Controller } from 'react-hook-form';
// import ThemedText from './ThemedText';
// import ThemedText3 from './ThemedText3';
// import { CheckCircle2, XCircle } from 'lucide-react-native';

// const ThemedCheckbox = ({ label, name, control, error, defaultChecked }) => {
//   const theme = useColorScheme();

//   console.log("LINE AT 152", defaultChecked);
  

//   // Function to determine the icon color based on the selected state
//   const iconColor = (selected, isYes) => {
//     if (selected) return isYes ? '#22c55e' : '#ef4444'; // Green for Yes, Red for No
//     return theme === 'dark' ? '#aaa' : '#888'; // Default color for inactive state
//   };

//   // Label color adjustment based on theme
//   const labelColor = theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400';

//   return (
//     <Controller
//       control={control}
//       name={name}
//       // defaultValue={defaultChecked} // Ensuring the default value is passed properly
//       render={({ field: { value, onChange } }) => (
//         <View className="mb-3">
//           {label && (
//             <ThemedText3 styles={`${labelColor} font-Medium text-md mb-1`}>
//               {label}
//             </ThemedText3>
//           )}
//           <View className="flex-row items-center gap-6">
//             {/* Yes Option */}
//             <Pressable
//               onPress={() => onChange(true)} // Sets value to true for "Yes"
//               className="flex-row items-center gap-2"
//               hitSlop={10}
//             >
//               <CheckCircle2
//                 size={20}
//                 color={iconColor(value === true, true)} // Change color based on the value
//                 fill="transparent"
//               />
//               <ThemedText styles="text-base font-SemiBold">Yes</ThemedText>
//             </Pressable>

//             {/* No Option */}
//             <Pressable
//               onPress={() => onChange(false)} // Sets value to false for "No"
//               className="flex-row items-center gap-2"
//               hitSlop={10}
//             >
//               <XCircle
//                 size={20}
//                 color={iconColor(value === false, false)} // Change color based on the value
//                 fill="transparent"
//               />
//               <ThemedText styles="text-base font-SemiBold">No</ThemedText>
//             </Pressable>
//           </View>

//           {/* Error Handling */}
//           {error && (
//             <Text className="text-red-500 text-xs font-Regular mt-1">
//               {error.message}
//             </Text>
//           )}
//         </View>
//       )}
//     />
//   );
// };

// export default ThemedCheckbox;



import { View, Pressable, Text, useColorScheme } from 'react-native';
import React from 'react';
import { Controller } from 'react-hook-form';
import ThemedText from './ThemedText';
import ThemedText3 from './ThemedText3';
import { CheckCircle2, XCircle } from 'lucide-react-native';

const ThemedCheckbox = ({ label, name, control, error, defaultChecked = false }) => {
  const theme = useColorScheme();

  // Function to determine the icon color based on the selected state
  const iconColor = (selected, isYes) => {
    if (selected) return isYes ? '#22c55e' : '#ef4444'; // Green for Yes, Red for No
    return theme === 'dark' ? '#aaa' : '#888'; // Default color for inactive state
  };

  // Label color adjustment based on theme
  const labelColor = theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400';

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultChecked} // Ensuring the default value is passed properly
      render={({ field: { value, onChange } }) => {
        // If the value is undefined or null, fall back to the defaultChecked value
        const currentValue = value !== undefined && value !== null ? value : defaultChecked;

        return (
          <View className="mb-3">
            {label && (
              <ThemedText3 styles={`${labelColor} font-Medium text-md mb-1`}>
                {label}
              </ThemedText3>
            )}
            <View className="flex-row items-center gap-6">
              {/* Yes Option */}
              <Pressable
                onPress={() => onChange(true)} // Sets value to true for "Yes"
                className="flex-row items-center gap-2"
                hitSlop={10}
              >
                <CheckCircle2
                  size={20}
                  color={iconColor(currentValue === true, true)} // Change color based on the value
                  fill="transparent"
                />
                <ThemedText styles="text-base font-SemiBold">Yes</ThemedText>
              </Pressable>

              {/* No Option */}
              <Pressable
                onPress={() => onChange(false)} // Sets value to false for "No"
                className="flex-row items-center gap-2"
                hitSlop={10}
              >
                <XCircle
                  size={20}
                  color={iconColor(currentValue === false, false)} // Change color based on the value
                  fill="transparent"
                />
                <ThemedText styles="text-base font-SemiBold">No</ThemedText>
              </Pressable>
            </View>

            {/* Error Handling */}
            {error && (
              <Text className="text-red-500 text-xs font-Regular mt-1">
                {error.message}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
};

export default ThemedCheckbox;
