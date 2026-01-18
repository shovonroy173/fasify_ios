// // import React, { useState } from 'react';
// // import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// // import TimePicker from './TimePicker';
// // import { useFormContext } from 'react-hook-form';
// // import { responsiveWidth } from 'react-native-responsive-dimensions';
// // import DropdownBox from './DropdownBox';
// // import { dayOptions } from '../../assets/data/data';
// // import ThemedText from '../utils/ThemedText';

// // const WeeklySchedule = () => {
// //   const [selectedDays, setSelectedDays] = useState({
// //     sunday: false,
// //     monday: true,
// //     tuesday: true,
// //     wednesday: true,
// //     thursday: true,
// //     friday: true,
// //   });

// //   const [timeSlots, setTimeSlots] = useState({
// //     monday: { start: '9:00 AM', end: '2:00 PM' },
// //     tuesday: { start: '9:00 AM', end: '2:00 PM' },
// //     wednesday: { start: '9:00 AM', end: '2:00 PM' },
// //     thursday: { start: '9:00 AM', end: '2:00 PM' },
// //     friday: { start: '9:00 AM', end: '2:00 PM' },
// //   });

// //   const toggleDay = day => {
// //     setSelectedDays(prev => ({
// //       ...prev,
// //       [day]: !prev[day],
// //     }));
// //   };

// //   const {
// //     control,
// //     formState: { errors },
// //   } = useFormContext();

// //   const DayRow = ({ day, displayName, isAvailable = true }) => {
// //     const isSelected = selectedDays[day];

// //     return (
// //       <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
// //         <View className="flex-row justify-between items-center mb-3">
// //           <Text className="text-base font-semibold text-gray-800 flex-1">
// //             {displayName}
// //           </Text>
// //           {!isAvailable && (
// //             <Text className="text-sm text-gray-400 mr-3">Not Available</Text>
// //           )}
// //           <TouchableOpacity
// //             className={`w-6 h-6 rounded-full border-2 ${
// //               isSelected
// //                 ? 'bg-blue-500 border-blue-500'
// //                 : 'border-gray-300 bg-white'
// //             }`}
// //             onPress={() => toggleDay(day)}
// //           />
// //         </View>

// //         {isAvailable && (
// //           <View className="flex-row items-center gap-3">
// //             <View>
// //               <View
// //                 className="bg-gray-100 px-3 py-2 rounded-md "
// //                 style={{
// //                   width: responsiveWidth(50),
// //                 }}
// //               >
// //                 {/* <Text className="text-sm text-gray-600 text-center">
// //                 {timeSlots[day]?.start}
// //               </Text> */}
// //                 <TimePicker
// //                   name="bookingTime"
// //                   control={control}
// //                   label="From"
// //                   error={errors?.bookingTime?.message}
// //                 />
// //               </View>
// //               <View
// //                 className="bg-gray-100 px-3 py-2 rounded-md "
// //                 style={{
// //                   width: responsiveWidth(50),
// //                 }}
// //               >
// //                 {/* <Text className="text-sm text-gray-600 text-center">
// //                 {timeSlots[day]?.end}
// //               </Text> */}
// //                 <TimePicker
// //                   name="bookingTime"
// //                   control={control}
// //                   label="To"
// //                   error={errors?.bookingTime?.message}
// //                 />
// //               </View>
// //             </View>

// //             <View className="flex-row items-center gap-3">
// //               <TouchableOpacity className="w-8 h-8 rounded-full bg-gray-200 justify-center items-center ml-auto">
// //                 <Text className="text-lg text-gray-500 font-light">—</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity className="w-8 h-8 rounded-full bg-blue-500 justify-center items-center">
// //                 <Text className="text-lg text-white font-light">+</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         )}
// //       </View>
// //     );
// //   };

// //   return (
// //     <View className="flex-1 bg-gray-100">
// //       <View className="flex-row justify-between items-center py-4 gap-3 bg-white border-b border-gray-200">
// //         <ThemedText>Update Weekend</ThemedText>
// //         <DropdownBox name="dayOptions" options={dayOptions} zIndex={3000} />
// //       </View>

// //       <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
// //         <DayRow day="sunday" displayName="Sunday" isAvailable={false} />
// //         <DayRow day="monday" displayName="Monday" />
// //         <DayRow day="tuesday" displayName="Tuesday" />
// //         <DayRow day="wednesday" displayName="Wednesday" />
// //         <DayRow day="thursday" displayName="Thursday" />
// //         <DayRow day="friday" displayName="Friday" />
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // export default WeeklySchedule;

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import TimePicker from './TimePicker';
// import { useFormContext, Controller } from 'react-hook-form';
// import { responsiveWidth } from 'react-native-responsive-dimensions';
// import DropdownBox from './DropdownBox';
// import { dayOptions } from '../../assets/data/data';
// import ThemedText from '../utils/ThemedText';

// const WeeklySchedule = () => {
//   const [selectedDays, setSelectedDays] = useState({
//     sunday: false,
//     monday: true,
//     tuesday: true,
//     wednesday: true,
//     thursday: true,
//     friday: true,
//     saturday: true,
//   });

//   const [selectedWeekend, setSelectedWeekend] = useState('sunday');

//   const toggleDay = day => {
//     setSelectedDays(prev => ({
//       ...prev,
//       [day]: !prev[day],
//     }));
//   };

//   const {
//     control,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useFormContext();

//   // Watch dropdown selection
//   const watchedWeekend = watch('dayOptions') || selectedWeekend;

//   // Update internal state when dropdown changes
//   const handleWeekendChange = value => {
//     setSelectedWeekend(value);

//     // Mark selected weekend as unavailable
//     setSelectedDays(prev => ({
//       ...prev,
//       [value]: false,
//     }));
//   };

//   const DayRow = ({ day, displayName }) => {
//     const isSelected = selectedDays[day];
//     const isWeekend = day === watchedWeekend;

//     return (
//       <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
//         <View className="flex-row justify-between items-center mb-3">
//           <Text className="text-base font-semibold text-gray-800 flex-1">
//             {displayName}
//           </Text>
//           {isWeekend && (
//             <Text className="text-sm text-gray-400 mr-3">
//               Not Available (Weekend)
//             </Text>
//           )}
//           {!isWeekend && (
//             <TouchableOpacity
//               className={`w-6 h-6 rounded-full border-2 ${
//                 isSelected
//                   ? 'bg-blue-500 border-blue-500'
//                   : 'border-gray-300 bg-white'
//               }`}
//               onPress={() => toggleDay(day)}
//             />
//           )}
//         </View>

//         {!isWeekend && isSelected && (
//           <View className="flex-row items-center gap-3">
//             {/* schedule section */}
//             <View>
//               <View
//                 className="bg-gray-100 px-3 py-2 rounded-md mb-2"
//                 style={{ width: responsiveWidth(50) }}
//               >
//                 <TimePicker
//                   name={`bookingTime.${day}.start`}
//                   control={control}
//                   label="From"
//                   error={errors?.bookingTime?.[day]?.start?.message}
//                 />
//               </View>
//               <View
//                 className="bg-gray-100 px-3 py-2 rounded-md"
//                 style={{ width: responsiveWidth(50) }}
//               >
//                 <TimePicker
//                   name={`bookingTime.${day}.end`}
//                   control={control}
//                   label="To"
//                   error={errors?.bookingTime?.[day]?.end?.message}
//                 />
//               </View>
//             </View>
//             {/* add/move section */}
//             <View className="flex-row items-center gap-3">
//               <TouchableOpacity className="w-8 h-8 rounded-full bg-gray-200 justify-center items-center ml-auto">
//                 <Text className="text-lg text-gray-500 font-light">—</Text>
//               </TouchableOpacity>
//               <TouchableOpacity className="w-8 h-8 rounded-full bg-blue-500 justify-center items-center">
//                 <Text className="text-lg text-white font-light">+</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       </View>
//     );
//   };

//   return (
//     <View className="flex-1 bg-gray-100">
//       {/* Dropdown to change weekend */}
//       <View className="flex-row justify-between items-center py-4 px-4 bg-white border-b border-gray-200">
//         <ThemedText>Update Weekend</ThemedText>
//         <Controller
//           control={control}
//           name="dayOptions"
//           defaultValue={selectedWeekend}
//           render={({ field: { onChange, value } }) => (
//             <DropdownBox
//               name="dayOptions"
//               value={value}
//               options={dayOptions}
//               zIndex={3000}
//               onChange={val => {
//                 onChange(val);
//                 handleWeekendChange(val);
//               }}
//             />
//           )}
//         />
//       </View>

//       <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
//         {Object.keys(selectedDays).map(dayKey => (
//           <DayRow
//             key={dayKey}
//             day={dayKey}
//             displayName={dayKey.charAt(0).toUpperCase() + dayKey.slice(1)}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default WeeklySchedule;

// version 2

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import TimePicker from './TimePicker';
// import { useFormContext } from 'react-hook-form';
// import { responsiveWidth } from 'react-native-responsive-dimensions';
// import DropdownBox from './DropdownBox';
// import { dayOptions } from '../../assets/data/data';
// import ThemedText from '../utils/ThemedText';

// const WeeklySchedule = () => {
//   const [selectedDays, setSelectedDays] = useState({
//     sunday: false,
//     monday: true,
//     tuesday: true,
//     wednesday: true,
//     thursday: true,
//     friday: true,
//     saturday: true,
//   });

//   const [selectedWeekend, setSelectedWeekend] = useState('sunday');

//   const {
//     control,
//     formState: { errors },
//     watch,
//     setValue,
//     getValues,
//   } = useFormContext();

//   // Watch selected weekend from form
//   const watchedWeekend = watch('dayOptions') || selectedWeekend;

//   console.log('Current selected dayOption:', getValues().dayOptions);

//   const handleWeekendChange = value => {
//     setSelectedWeekend(value);
//     setValue('dayOptions', value); // Update react-hook-form value
//     setSelectedDays(prev => ({
//       ...prev,
//       [value]: false,
//     }));
//   };

//   const toggleDay = day => {
//     setSelectedDays(prev => ({
//       ...prev,
//       [day]: !prev[day],
//     }));
//   };

//   const DayRow = ({ day, displayName }) => {
//     const isSelected = selectedDays[day];
//     const isWeekend = day === watchedWeekend;

//     return (
//       <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
//         <View className="flex-row justify-between items-center mb-3">
//           <Text className="text-base font-semibold text-gray-800 flex-1">
//             {displayName}
//           </Text>
//           {isWeekend && (
//             <Text className="text-sm text-gray-400 mr-3">
//               Not Available (Weekend)
//             </Text>
//           )}
//           {!isWeekend && (
//             <TouchableOpacity
//               className={`w-6 h-6 rounded-full border-2 ${
//                 isSelected
//                   ? 'bg-blue-500 border-blue-500'
//                   : 'border-gray-300 bg-white'
//               }`}
//               onPress={() => toggleDay(day)}
//             />
//           )}
//         </View>

//         {!isWeekend && isSelected && (
//           <View className="flex-row items-center gap-3">
//             {/* time schedule */}
//             <View>
//               <View
//                 className="bg-gray-100 px-3 py-2 rounded-md mb-2"
//                 style={{ width: responsiveWidth(50) }}
//               >
//                 <TimePicker
//                   name={`bookingTime.${day}.start`}
//                   control={control}
//                   label="From"
//                   error={errors?.bookingTime?.[day]?.start?.message}
//                 />
//               </View>
//               <View
//                 className="bg-gray-100 px-3 py-2 rounded-md"
//                 style={{ width: responsiveWidth(50) }}
//               >
//                 <TimePicker
//                   name={`bookingTime.${day}.end`}
//                   control={control}
//                   label="To"
//                   error={errors?.bookingTime?.[day]?.end?.message}
//                 />
//               </View>
//             </View>
//             {/* add/remove section */}
//             <View className="flex-row items-center gap-3">
//               <TouchableOpacity className="w-8 h-8 rounded-full bg-gray-200 justify-center items-center ml-auto">
//                 <Text className="text-lg text-gray-500 font-light">—</Text>
//               </TouchableOpacity>
//               <TouchableOpacity className="w-8 h-8 rounded-full bg-blue-500 justify-center items-center">
//                 <Text className="text-lg text-white font-light">+</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       </View>
//     );
//   };

//   return (
//     <View className="flex-1 bg-gray-100">
//       <View className="py-4 px-4 bg-white border-b border-gray-200 space-y-2">
//         <View className="flex-row justify-between items-center gap-4">
//           <ThemedText styles="font-SemiBold ">Update Weekend</ThemedText>
//           <DropdownBox name="dayOptions" options={dayOptions} zIndex={3000} />
//         </View>

//         {/* <Text className="text-sm text-gray-600">
//           Selected weekend:{' '}
//           <Text className="font-semibold capitalize text-gray-800">
//             {dayOptions.find(opt => opt.value === watchedWeekend)?.label ||
//               'None'}
//           </Text>
//         </Text> */}
//       </View>

//       <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
//         {Object.keys(selectedDays).map(dayKey => (
//           <DayRow
//             key={dayKey}
//             day={dayKey}
//             displayName={dayKey.charAt(0).toUpperCase() + dayKey.slice(1)}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default WeeklySchedule;

// version 3

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
// import TimePicker from './TimePicker';
// import { useFormContext } from 'react-hook-form';
// import { responsiveWidth } from 'react-native-responsive-dimensions';
// import DropdownBox from './DropdownBox';
// import { dayOptions } from '../../assets/data/data';
// import ThemedText from '../utils/ThemedText';
// import ThemedView from '../utils/ThemedView';

// const WeeklySchedule = () => {
//   const [selectedDays, setSelectedDays] = useState({
//     sunday: false,
//     monday: true,
//     tuesday: true,
//     wednesday: true,
//     thursday: true,
//     friday: true,
//     saturday: true,
//   });

//   const [selectedWeekend, setSelectedWeekend] = useState('sunday');

//   const {
//     control,
//     formState: { errors },
//     watch,
//     setValue,
//   } = useFormContext();

//   const theme = useColorScheme();

//   // Manage time slots per day
//   const [timeSlots, setTimeSlots] = useState({
//     monday: [{ start: '', end: '' }],
//     tuesday: [{ start: '', end: '' }],
//     wednesday: [{ start: '', end: '' }],
//     thursday: [{ start: '', end: '' }],
//     friday: [{ start: '', end: '' }],
//     saturday: [{ start: '', end: '' }],
//     sunday: [{ start: '', end: '' }],
//   });

//   const watchedWeekend = watch('dayOptions') || selectedWeekend;

//   const handleAddSlot = (day) => {
//     setTimeSlots(prev => ({
//       ...prev,
//       [day]: [...prev[day], { start: '', end: '' }],
//     }));
//   };

//   const handleRemoveSlot = (day, index) => {
//     setTimeSlots(prev => ({
//       ...prev,
//       [day]: prev[day].filter((_, i) => i !== index),
//     }));
//   };

//   const toggleDay = day => {
//     setSelectedDays(prev => ({
//       ...prev,
//       [day]: !prev[day],
//     }));
//   };

//   const DayRow = ({ day, displayName }) => {
//     const isSelected = selectedDays[day];
//     const isWeekend = day === watchedWeekend;

//     return (
//       <ThemedView styles="rounded-xl p-4 mb-3 shadow-sm">
//         <View className="flex-row justify-between items-center mb-3">
//           <ThemedText styles="text-base font-SemiBold  flex-1">
//             {displayName}
//           </ThemedText>
//           {isWeekend && (
//             <Text className="text-sm text-gray-400 mr-3">
//               Not Available (Weekend)
//             </Text>
//           )}
//           {!isWeekend && (
//             <TouchableOpacity
//               className={`w-6 h-6 rounded-full border-2 ${
//                 isSelected
//                   ? 'bg-blue-500 border-blue-500'
//                   : 'border-gray-300 bg-white'
//               }`}
//               onPress={() => toggleDay(day)}
//             />
//           )}
//         </View>

//         {!isWeekend && isSelected && (
//           <>
//             {timeSlots[day]?.map((slot, index) => (
//               <View
//                 key={index}
//                 className="flex-row items-center gap-3 mb-3"
//               >
//                 <View>
//                   <View
//                     className="bg-gray-100 px-3 py-2 rounded-md mb-2"
//                     style={{ width: responsiveWidth(50) }}
//                   >
//                     <TimePicker
//                       name={`bookingTime.${day}.${index}.start`}
//                       control={control}
//                       label="From"
//                       error={errors?.bookingTime?.[day]?.[index]?.start?.message}
//                     />
//                   </View>
//                   <View
//                     className="bg-gray-100 px-3 py-2 rounded-md"
//                     style={{ width: responsiveWidth(50) }}
//                   >
//                     <TimePicker
//                       name={`bookingTime.${day}.${index}.end`}
//                       control={control}
//                       label="To"
//                       error={errors?.bookingTime?.[day]?.[index]?.end?.message}
//                     />
//                   </View>
//                 </View>

//                 {/* Add / Remove Buttons */}
//                 <View className="flex-row items-center gap-3">
//                   {timeSlots[day].length > 1 && (
//                     <TouchableOpacity
//                       className="w-8 h-8 rounded-full bg-gray-200 justify-center items-center ml-auto"
//                       onPress={() => handleRemoveSlot(day, index)}
//                     >
//                       <Text className="text-lg text-gray-500 font-light">—</Text>
//                     </TouchableOpacity>
//                   )}
//                   {index === timeSlots[day].length - 1 && (
//                     <TouchableOpacity
//                       className="w-8 h-8 rounded-full bg-blue-500 justify-center items-center"
//                       onPress={() => handleAddSlot(day)}
//                     >
//                       <Text className="text-lg text-white font-light">+</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               </View>
//             ))}
//           </>
//         )}
//       </ThemedView>
//     );
//   };

//   return (
//     <View className={`flex-1   ${theme === 'dark' ? 'bg-gray-500' : 'bg-gray-100'} `}>
//       {/* <View>
//         <ThemedView styles="flex-row justify-between items-center gap-4">
//           <ThemedText styles="font-SemiBold">Update Weekend</ThemedText>
//           <DropdownBox name="dayOptions" options={dayOptions} zIndex={3000} />
//         </ThemedView>
//       </View> */}

//       <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
//         {Object.keys(selectedDays).map(dayKey => (
//           <DayRow
//             key={dayKey}
//             day={dayKey}
//             displayName={dayKey.charAt(0).toUpperCase() + dayKey.slice(1)}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default WeeklySchedule;

// final version

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   useColorScheme,
// } from 'react-native';
// import TimePicker from './TimePicker';
// import { useFormContext } from 'react-hook-form';
// import { responsiveWidth } from 'react-native-responsive-dimensions';
// import ThemedText from '../utils/ThemedText';
// import ThemedView from '../utils/ThemedView';
// import ThemedText3 from '../utils/ThemedText3';

// const WeeklySchedule = () => {
//   const [selectedDays, setSelectedDays] = useState({
//     sunday: false,
//     monday: true,
//     tuesday: true,
//     wednesday: true,
//     thursday: true,
//     friday: true,
//     saturday: true,
//   });

//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();

//   const theme = useColorScheme();

//   const [timeSlots, setTimeSlots] = useState({
//     monday: [{ start: '', end: '' }],
//     tuesday: [{ start: '', end: '' }],
//     wednesday: [{ start: '', end: '' }],
//     thursday: [{ start: '', end: '' }],
//     friday: [{ start: '', end: '' }],
//     saturday: [{ start: '', end: '' }],
//     sunday: [{ start: '', end: '' }],
//   });

//   const handleAddSlot = day => {
//     setTimeSlots(prev => ({
//       ...prev,
//       [day]: [...prev[day], { start: '', end: '' }],
//     }));
//   };

//   const handleRemoveSlot = (day, index) => {
//     setTimeSlots(prev => ({
//       ...prev,
//       [day]: prev[day].filter((_, i) => i !== index),
//     }));
//   };

//   const toggleDay = day => {
//     setSelectedDays(prev => ({
//       ...prev,
//       [day]: !prev[day],
//     }));
//   };

//   const DayRow = ({ day, displayName }) => {
//     const isSelected = selectedDays[day];

//     return (
//       <ThemedView styles="rounded-xl p-4 mb-3 shadow-sm">
//         <View className="flex-row justify-between items-center mb-3">
//           <ThemedText styles="text-base font-SemiBold flex-1">
//             {displayName}
//           </ThemedText>

//           <TouchableOpacity
//             className={`w-6 h-6 rounded-full border-2 ${
//               isSelected
//                 ? 'bg-blue-500 border-blue-500'
//                 : 'border-gray-300 bg-white'
//             }`}
//             onPress={() => toggleDay(day)}
//           />
//         </View>

//       </ThemedView>
//     );
//   };

//   return (
//     <View
//       className={`flex-1 ${theme === 'dark' ? 'bg-gray-500' : 'bg-gray-100'}`}
//     >
//       <ThemedView>
//         <ThemedText3 styles="font-SemiBold mb-1">Add your Schedule </ThemedText3>
//       </ThemedView>
//       <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
//         {Object.keys(selectedDays).map(dayKey => (
//           <DayRow
//             key={dayKey}
//             day={dayKey}
//             displayName={dayKey.charAt(0).toUpperCase() + dayKey.slice(1)}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default WeeklySchedule;

// WeeklySchedule.js
// import React from 'react';
// import {
//   View,
//   TouchableOpacity,
//   ScrollView,
//   useColorScheme,
// } from 'react-native';
// import { Controller, useFormContext } from 'react-hook-form';
// import ThemedText from '../utils/ThemedText';
// import ThemedView from '../utils/ThemedView';
// import ThemedText3 from '../utils/ThemedText3';

// const WeeklySchedule = ({ name, control }) => {
//   const theme = useColorScheme();

//   const defaultDays = {
//     sunday: false,
//     monday: true,
//     tuesday: true,
//     wednesday: true,
//     thursday: true,
//     friday: true,
//     saturday: true,
//   };

//   return (
//     <Controller
//       control={control}
//       name={name}
//       defaultValue={Object.keys(defaultDays).filter(day => defaultDays[day])}
//       render={({ field: { value, onChange } }) => {
//         const selectedDays = Object.keys(defaultDays).reduce((acc, day) => {
//           acc[day] = value.includes(day);
//           return acc;
//         }, {});

//         const toggleDay = day => {
//           let updated;
//           if (selectedDays[day]) {
//             updated = value.filter(d => d !== day);
//           } else {
//             updated = [...value, day];
//           }
//           onChange(updated);
//         };

//         const DayRow = ({ day, displayName }) => {
//           const isSelected = selectedDays[day];
//           return (
//             <ThemedView styles="rounded-xl p-4 mb-3 shadow-sm">
//               <View className="flex-row justify-between items-center mb-3">
//                 <ThemedText styles="text-base font-SemiBold flex-1">
//                   {displayName}
//                 </ThemedText>
//                 <TouchableOpacity
//                   className={`w-6 h-6 rounded-full border-2 ${
//                     isSelected
//                       ? 'bg-blue-500 border-blue-500'
//                       : 'border-gray-300 bg-white'
//                   }`}
//                   onPress={() => toggleDay(day)}
//                 />
//               </View>
//             </ThemedView>
//           );
//         };

//         return (
//           <View
//             className={`flex-1 ${
//               theme === 'dark' ? 'bg-gray-500' : 'bg-gray-100'
//             }`}
//           >
//             <ThemedView>
//               <ThemedText3 styles="font-SemiBold mb-1">
//                 Add your Schedule
//               </ThemedText3>
//             </ThemedView>
//             <ScrollView
//               className="flex-1 p-4"
//               showsVerticalScrollIndicator={false}
//             >
//               {Object.keys(defaultDays).map(dayKey => (
//                 <DayRow
//                   key={dayKey}
//                   day={dayKey}
//                   displayName={dayKey.charAt(0).toUpperCase() + dayKey.slice(1)}
//                 />
//               ))}
//             </ScrollView>
//           </View>
//         );
//       }}
//     />
//   );
// };

// export default WeeklySchedule;

import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { Controller,  } from 'react-hook-form';
import ThemedText from '../utils/ThemedText';
import ThemedView from '../utils/ThemedView';
import ThemedText3 from '../utils/ThemedText3';
import ThemedPressableWhite from '../utils/ThemedPressableWhite';

const WeeklySchedule = ({ name, control }) => {
  // const {control} = useFormContext()
  // console.log(name);

  const theme = useColorScheme();

  const defaultDays = {
    sunday: true,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={Object.keys(defaultDays).filter(day => defaultDays[day])} // ensures an array
      render={({ field: { value = [], onChange } }) => {
        // fallback to empty array
        const selectedDays = Object.keys(defaultDays).reduce((acc, day) => {
          acc[day] = value.includes(day);
          return acc;
        }, {});

        const toggleDay = day => {
          let updated;
          if (selectedDays[day]) {
            updated = value.filter(d => d !== day);
          } else {
            updated = [...value, day];
          }
          onChange(updated);
        };

        const DayRow = ({ day, displayName }) => {
          const isSelected = selectedDays[day];
          return (
            <ThemedPressableWhite
              onPress={() => toggleDay(day)}
              styles="rounded-xl p-4 mb-3 shadow-sm"
            >
              <View className="flex-row justify-between items-center mb-3">
                <ThemedText styles="text-base font-SemiBold flex-1">
                  {displayName}
                </ThemedText>
                <TouchableOpacity
                  className={`w-6 h-6 rounded-full border-2 ${
                    isSelected
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300 bg-white'
                  }`}
                />
              </View>
            </ThemedPressableWhite>
          );
        };

        return (
          <View
            className={`flex-1 ${
              theme === 'dark' ? 'bg-gray-500' : 'bg-gray-100'
            }`}
          >
            <ThemedView>
              <ThemedText3 styles="font-SemiBold mb-1">
                Add your Schedule
              </ThemedText3>
            </ThemedView>
            <ScrollView
              className="flex-1 p-4"
              showsVerticalScrollIndicator={false}
            >
              {Object.keys(defaultDays).map(dayKey => (
                <DayRow
                  key={dayKey}
                  day={dayKey}
                  displayName={dayKey.charAt(0).toUpperCase() + dayKey.slice(1)}
                />
              ))}
            </ScrollView>
          </View>
        );
      }}
    />
  );
};

export default WeeklySchedule;
