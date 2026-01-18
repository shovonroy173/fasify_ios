// /* eslint-disable react-native/no-inline-styles */
// import React, { useState } from 'react';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { useColorScheme, View } from 'react-native';
// import { Controller, useFormContext } from 'react-hook-form';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { responsiveHeight } from 'react-native-responsive-dimensions';

// const DropdownBox = ({ name, options, flex = 1, zIndex = 1000 }) => {
//   const [open, setOpen] = useState(false);
//   const theme = useColorScheme();
//   const { control } = useFormContext();

//   return (
//     <View style={{zIndex: open ? zIndex : 1, position: 'relative' }}>
//       <Controller
//         name={name}
//         control={control}
//         defaultValue={options[0]?.value}
//         render={({ field: { onChange, value } }) => (
//           <DropDownPicker
//             open={open}
//             value={value}
//             items={options}
//             setOpen={setOpen}
//             listMode="MODAL" // Changed from SCROLLVIEW to MODAL
//             dropDownDirection="BOTTOM"
//             setValue={val => {
//               // console.log('LINE AT 24', val());
//               onChange(val());
//             }}
//             theme={theme === 'dark' ? 'DARK' : 'LIGHT'}
//             showTickIcon={false}
//             style={{
//               borderWidth: 1,
//               borderColor: '#e4e4e7',
//               gap: 0,
//               height: responsiveHeight(6),
//               backgroundColor: 'red'

//             }}
//             dropDownContainerStyle={{
//               borderRadius: 8,
//               borderColor: '#e4e4e7',
//               zIndex: zIndex + 1, // Add zIndex here
//               backgroundColor: 'red'
//             }}
//             textStyle={{
//               fontSize: 12,
//               fontFamily: 'Inter_18pt-SemiBold',
//             }}
//             labelStyle={{
//               fontSize: 12,
//               fontFamily: 'Inter_18pt-SemiBold',
//             }}
//             listItemLabelStyle={{
//               fontFamily: 'Inter_18pt-SemiBold',
//             }}
//             selectedItemLabelStyle={{
//               fontFamily: 'Inter_18pt-SemiBold',
//             }}
//             selectedItemContainerStyle={{
//               backgroundColor: '#f0f0f0',
//             }}
//             arrowIconStyle={{
//               width: 13,
//               height: 13,
//               padding: 0,
//             }}
//             modalProps={{
//               animationType: 'fade',
//             }}
//             modalContentContainerStyle={{
//               // backgroundColor: theme === 'dark' ? '#000' : '#fff',
//               backgroundColor: 'red'

//             }}
//           />
//         )}
//       />
//     </View>
//   );
// };

// export default DropdownBox;

/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useColorScheme, View } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context"; // Import useSafeAreaInsets
import { responsiveHeight } from "react-native-responsive-dimensions";

const DropdownBox = ({ name, options, flex = 1, zIndex = 1000 }) => {
  const [open, setOpen] = useState(false);
  const theme = useColorScheme();
  const { control } = useFormContext();
  const insets = useSafeAreaInsets(); // Get the safe area insets

  return (
    <View style={{ zIndex: open ? zIndex : 1, position: "relative" }}>
      <Controller
        name={name}
        control={control}
        defaultValue={options[0]?.value}
        render={({ field: { onChange, value } }) => (
          <DropDownPicker
            open={open}
            value={value}
            items={options}
            setOpen={setOpen}
            listMode="MODAL" // Keep listMode as MODAL
            dropDownDirection="BOTTOM"
            setValue={
              (val) => {
                // console.log("LINN E AT", val());

                onChange(val());
              } // Direct value assignment
            }
            theme={theme === "dark" ? "DARK" : "LIGHT"}
            showTickIcon={false}
            style={{
              borderWidth: 1,
              borderColor: "#e4e4e7",
              gap: 0,
              height: responsiveHeight(6),
            }}
            dropDownContainerStyle={{
              borderRadius: 8,
              borderColor: "#e4e4e7",
              zIndex: zIndex + 1, // Add zIndex for dropdown container
            }}
            textStyle={{
              fontSize: 12,
              fontFamily: "Inter_18pt-SemiBold",
            }}
            labelStyle={{
              fontSize: 12,
              fontFamily: "Inter_18pt-SemiBold",
            }}
            listItemLabelStyle={{
              fontFamily: "Inter_18pt-SemiBold",
            }}
            selectedItemLabelStyle={{
              fontFamily: "Inter_18pt-SemiBold",
            }}
            selectedItemContainerStyle={{
              backgroundColor: "#f0f0f0",
            }}
            arrowIconStyle={{
              width: 13,
              height: 13,
              padding: 0,
            }}
            modalProps={{
              animationType: "fade",
            }}
            modalContentContainerStyle={{
              backgroundColor: theme === "dark" ? "#000" : "#fff",
              maxHeight: "80%", // Ensure modal doesn't extend too far down
              marginTop: insets.top, // Add margin to avoid status bar overlap
              marginBottom: insets.bottom, // Add bottom margin to avoid overlap with nav bar
            }}
          />
        )}
      />
    </View>
  );
};

export default DropdownBox;
