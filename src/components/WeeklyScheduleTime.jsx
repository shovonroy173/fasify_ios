/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */
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

//correct version

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   useColorScheme,
//   Alert,
// } from 'react-native';
// import TimePicker from './TimePicker';
// import { useFormContext } from 'react-hook-form';
// import { responsiveWidth } from 'react-native-responsive-dimensions';
// import ThemedText from '../utils/ThemedText';
// import ThemedView from '../utils/ThemedView';

// const WeeklyScheduleTime = () => {
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
//     watch,
//     setValue,
//     getValues,
//     setError,
//     clearErrors,
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

//   const bookingTime = watch('bookingTime') || {};

//   const formatTimeValue = val => {
//     // If val is a Date object, format to "HH:mm"
//     if (val instanceof Date) {
//       const h = val.getHours().toString().padStart(2, '0');
//       const m = val.getMinutes().toString().padStart(2, '0');
//       return `${h}:${m}`;
//     }
//     // if val is string, just return trimmed string
//     if (typeof val === 'string') {
//       return val.trim();
//     }
//     // else return empty string as fallback
//     return '';
//   };

//   // Defensive and trimmed timeToMinutes function
//   // const timeToMinutes = timeVal => {
//   //   const timeStr = formatTimeValue(timeVal);
//   //   if (!timeStr || !timeStr.includes(':')) {
//   //     return -1;
//   //   }
//   //   const parts = timeStr.split(':');
//   //   if (parts.length !== 2) return -1;

//   //   const hours = parseInt(parts[0], 10);
//   //   const minutes = parseInt(parts, 10);

//   //   if (
//   //     isNaN(hours) ||
//   //     isNaN(minutes) ||
//   //     hours < 0 ||
//   //     hours > 23 ||
//   //     minutes < 0 ||
//   //     minutes > 59
//   //   )
//   //     return -1;

//   //   return hours * 60 + minutes;
//   // };

//   const timeToMinutes = timeVal => {
//     const timeStr = formatTimeValue(timeVal);
//     if (!timeStr || !timeStr.includes(':')) {
//       return -1;
//     }
//     const parts = timeStr.split(':');
//     if (parts.length !== 2) return -1;

//     const hours = parseInt(parts[0], 10);
//     const minutes = parseInt(parts[1], 10); // ✅ fixed

//     if (
//       isNaN(hours) ||
//       isNaN(minutes) ||
//       hours < 0 ||
//       hours > 23 ||
//       minutes < 0 ||
//       minutes > 59
//     )
//       return -1;

//     return hours * 60 + minutes;
//   };

//   const timesOverlap = (start1, end1, start2, end2) => {
//     const s1 = timeToMinutes(start1);
//     const e1 = timeToMinutes(end1);
//     const s2 = timeToMinutes(start2);
//     const e2 = timeToMinutes(end2);
//     if (s1 === -1 || e1 === -1 || s2 === -1 || e2 === -1) {
//       return false;
//     }
//     if (s1 >= e1 || s2 >= e2) {
//       return false;
//     }
//     return s1 < e2 && s2 < e1;
//   };

//   useEffect(() => {
//     const updatedSlots = {};
//     Object.keys(selectedDays).forEach(day => {
//       if (selectedDays[day]) {
//         const slotsFromForm = bookingTime[day];
//         if (
//           slotsFromForm &&
//           Array.isArray(slotsFromForm) &&
//           slotsFromForm.length > 0
//         ) {
//           updatedSlots[day] = slotsFromForm;
//         } else {
//           updatedSlots[day] = [{ start: '', end: '' }];
//         }
//       } else {
//         updatedSlots[day] = [{ start: '', end: '' }];
//       }
//     });
//     setTimeSlots(updatedSlots);
//   }, [bookingTime, selectedDays]);

//   useEffect(() => {
//     if (!bookingTime) return;

//     Object.keys(selectedDays).forEach(day => {
//       if (!selectedDays[day]) return;

//       const slots = bookingTime[day] || [];

//       slots.forEach((_, idx) => {
//         clearErrors([
//           `bookingTime.${day}.${idx}.start`,
//           `bookingTime.${day}.${idx}.end`,
//         ]);
//       });

//       let hasError = false;

//       for (let i = 0; i < slots.length; i++) {
//         const slot = slots[i];
//         const startMin = timeToMinutes(slot?.start);
//         const endMin = timeToMinutes(slot?.end);

//         if (!slot?.start || !slot?.end) {
//           setError(`bookingTime.${day}.${i}.start`, {
//             type: 'manual',
//             message: 'Start time is required',
//           });
//           setError(`bookingTime.${day}.${i}.end`, {
//             type: 'manual',
//             message: 'End time is required',
//           });
//           hasError = true;
//           continue;
//         }

//         if (startMin === -1) {
//           setError(`bookingTime.${day}.${i}.start`, {
//             type: 'manual',
//             message: 'Invalid start time',
//           });
//           hasError = true;
//         }
//         if (endMin === -1) {
//           setError(`bookingTime.${day}.${i}.end`, {
//             type: 'manual',
//             message: 'Invalid end time',
//           });
//           hasError = true;
//         }
//         if (!hasError && startMin >= endMin) {
//           setError(`bookingTime.${day}.${i}.start`, {
//             type: 'manual',
//             message: 'Start must be before end',
//           });
//           setError(`bookingTime.${day}.${i}.end`, {
//             type: 'manual',
//             message: 'End must be after start',
//           });
//           hasError = true;
//         }
//       }
//       if (hasError) return;

//       for (let i = 0; i < slots.length; i++) {
//         for (let j = i + 1; j < slots.length; j++) {
//           if (
//             slots[i]?.start &&
//             slots[i]?.end &&
//             slots[j]?.start &&
//             slots[j]?.end &&
//             timesOverlap(
//               slots[i].start,
//               slots[i].end,
//               slots[j].start,
//               slots[j].end,
//             )
//           ) {
//             setError(`bookingTime.${day}.${i}.start`, {
//               type: 'manual',
//               message: `Overlaps with slot ${j + 1}`,
//             });
//             setError(`bookingTime.${day}.${i}.end`, {
//               type: 'manual',
//               message: `Overlaps with slot ${j + 1}`,
//             });
//             setError(`bookingTime.${day}.${j}.start`, {
//               type: 'manual',
//               message: `Overlaps with slot ${i + 1}`,
//             });
//             setError(`bookingTime.${day}.${j}.end`, {
//               type: 'manual',
//               message: `Overlaps with slot ${i + 1}`,
//             });
//           }
//         }
//       }
//     });
//   }, [bookingTime, selectedDays, setError, clearErrors]);

//   const handleAddSlot = day => {
//     const existingSlots = getValues(`bookingTime.${day}`) || [];

//     console.log(`Slots before adding for ${day}:`, existingSlots);

//     for (let i = 0; i < existingSlots.length; i++) {
//       const slot = existingSlots[i];
//       console.log(`Validating slot ${i + 1}:`, slot);

//       if (!slot?.start || !slot?.end) {
//         Alert.alert(
//           'Incomplete Slot',
//           `Slot ${i + 1} is incomplete. Please enter both start and end time.`,
//         );
//         return;
//       }

//       const startMin = timeToMinutes(slot.start);
//       const endMin = timeToMinutes(slot.end);

//       if (startMin === -1 || endMin === -1) {
//         Alert.alert(
//           'Invalid Time',
//           `Slot ${i + 1} has an invalid time format.`,
//         );
//         return;
//       }
//       if (startMin >= endMin) {
//         Alert.alert(
//           'Invalid Range',
//           `Slot ${i + 1} start time must be before end time.`,
//         );
//         return;
//       }
//     }

//     for (let i = 0; i < existingSlots.length; i++) {
//       for (let j = i + 1; j < existingSlots.length; j++) {
//         if (
//           timesOverlap(
//             existingSlots[i].start,
//             existingSlots[i].end,
//             existingSlots[j].start,
//             existingSlots[j].end,
//           )
//         ) {
//           Alert.alert(
//             'Overlap Detected',
//             `Slot ${i + 1} overlaps with slot ${
//               j + 1
//             }. Please adjust the times.`,
//           );
//           return;
//         }
//       }
//     }

//     const newSlots = [...existingSlots, { start: '', end: '' }];
//     setValue(`bookingTime.${day}`, newSlots, {
//       shouldValidate: true,
//       shouldDirty: true,
//     });
//     setTimeSlots(prev => ({ ...prev, [day]: newSlots }));
//   };

//   const handleRemoveSlot = (day, index) => {
//     const existingSlots = getValues(`bookingTime.${day}`) || [];

//     if (existingSlots.length <= 1) {
//       return;
//     }

//     const updatedSlots = existingSlots.filter((_, idx) => idx !== index);
//     setValue(`bookingTime.${day}`, updatedSlots, {
//       shouldValidate: true,
//       shouldDirty: true,
//     });
//     setTimeSlots(prev => ({ ...prev, [day]: updatedSlots }));

//     clearErrors([
//       `bookingTime.${day}.${index}.start`,
//       `bookingTime.${day}.${index}.end`,
//     ]);
//   };

//   const toggleDay = day => {
//     setSelectedDays(prev => {
//       const newVal = !prev[day];
//       if (!newVal) {
//         setValue(`bookingTime.${day}`, [], {
//           shouldValidate: true,
//           shouldDirty: true,
//         });
//         setTimeSlots(prev => ({ ...prev, [day]: [{ start: '', end: '' }] }));
//         clearErrors(`bookingTime.${day}`);
//       } else {
//         const currentSlots = getValues(`bookingTime.${day}`) || [];
//         if (currentSlots.length === 0) {
//           setValue(`bookingTime.${day}`, [{ start: '', end: '' }], {
//             shouldValidate: true,
//             shouldDirty: true,
//           });
//           setTimeSlots(prev => ({ ...prev, [day]: [{ start: '', end: '' }] }));
//         }
//       }
//       return { ...prev, [day]: newVal };
//     });
//   };

//   const DayRow = ({ day, displayName }) => {
//     const isSelected = selectedDays[day];
//     const isWeekend = day === 'sunday';

//     const slots = bookingTime[day] ||
//       timeSlots[day] || [{ start: '', end: '' }];

//     return (
//       <ThemedView styles="rounded-xl p-4 mb-3 shadow-sm">
//         <View className="flex-row justify-between items-center mb-3">
//           <ThemedText styles="text-base font-SemiBold flex-1">
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
//             {slots.map((slot, index) => (
//               <View key={index} className="flex-row items-center gap-3 mb-3">
//                 <View>
//                   <View
//                     className="bg-gray-100 px-3 py-2 rounded-md mb-2"
//                     style={{ width: responsiveWidth(50) }}
//                   >
//                     <TimePicker
//                       name={`bookingTime.${day}.${index}.start`}
//                       control={control}
//                       label="From"
//                       error={
//                         errors?.bookingTime?.[day]?.[index]?.start?.message
//                       }
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

//                 <View className="flex-row items-center gap-3">
//                   {slots.length > 1 && (
//                     <TouchableOpacity
//                       className="w-8 h-8 rounded-full bg-gray-200 justify-center items-center ml-auto"
//                       onPress={() => handleRemoveSlot(day, index)}
//                     >
//                       <Text className="text-lg text-gray-500 font-light">
//                         —
//                       </Text>
//                     </TouchableOpacity>
//                   )}
//                   {index === slots.length - 1 && (
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
//     <View
//       className={`flex-1 ${theme === 'dark' ? 'bg-gray-500' : 'bg-gray-100'}`}
//     >
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

// export default WeeklyScheduleTime;

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   Alert,
// } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';

// const WeeklySchedule = () => {
//   const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
//     defaultValues: {
//       monday: [{ start: '', end: '' }],
//       tuesday: [{ start: '', end: '' }],
//       wednesday: [{ start: '', end: '' }],
//       thursday: [{ start: '', end: '' }],
//       friday: [{ start: '', end: '' }],
//       saturday: [{ start: '', end: '' }],
//       sunday: [],
//     }
//   });

//   const [activeDays, setActiveDays] = useState({
//     monday: true,
//     tuesday: true,
//     wednesday: true,
//     thursday: true,
//     friday: true,
//     saturday: true,
//     sunday: false,
//   });

//   const toggleDay = (day) => {
//     setActiveDays(prev => ({
//       ...prev,
//       [day]: !prev[day]
//     }));
//   };

//   // Convert time to minutes for comparison
//   const timeToMinutes = (timeStr) => {
//     if (!timeStr) return 0;

//     const [time, modifier] = timeStr.split(' ');
//     let [hours, minutes] = time.split(':');

//     hours = parseInt(hours);
//     minutes = parseInt(minutes);

//     if (modifier?.toUpperCase() === 'PM' && hours !== 12) {
//       hours += 12;
//     }
//     if (modifier?.toUpperCase() === 'AM' && hours === 12) {
//       hours = 0;
//     }

//     return hours * 60 + minutes;
//   };

//   // Check if two time ranges overlap
//   const hasTimeOverlap = (start1, end1, start2, end2) => {
//     const s1 = timeToMinutes(start1);
//     const e1 = timeToMinutes(end1);
//     const s2 = timeToMinutes(start2);
//     const e2 = timeToMinutes(end2);

//     return Math.max(s1, s2) < Math.min(e1, e2);
//   };

//   // Check for time collisions in a day
//   const checkTimeCollisions = (day, currentIndex) => {
//     const slots = getValues(day) || [];

//     for (let i = 0; i < slots.length; i++) {
//       if (i === currentIndex) continue;

//       for (let j = i + 1; j < slots.length; j++) {
//         if (j === currentIndex) continue;

//         if (slots[i].start && slots[i].end && slots[j].start && slots[j].end) {
//           if (hasTimeOverlap(slots[i].start, slots[i].end, slots[j].start, slots[j].end)) {
//             return `Time slots ${i + 1} and ${j + 1} overlap`;
//           }
//         }
//       }
//     }

//     return null;
//   };

//   const validateTimeFormat = (value) => {
//     if (!value) return 'Time is required';

//     const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
//     return timeRegex.test(value) || 'Invalid time format (e.g., 9:00 AM)';
//   };

//   const validateTimeOrder = (start, end) => {
//     if (!start || !end) return true;

//     const startMinutes = timeToMinutes(start);
//     const endMinutes = timeToMinutes(end);

//     return startMinutes < endMinutes || 'End time must be after start time';
//   };

//   const addTimeSlot = (day) => {
//     const currentSlots = getValues(day) || [];
//     setValue(day, [...currentSlots, { start: '', end: '' }]);
//   };

//   const removeTimeSlot = (day, index) => {
//     const currentSlots = getValues(day) || [];
//     if (currentSlots.length <= 1) return;

//     const updatedSlots = currentSlots.filter((_, i) => i !== index);
//     setValue(day, updatedSlots);
//   };

//   // const onSubmit = (data) => {
//   //   // Check for empty required fields
//   //   let hasEmptyFields = false;
//   //   let hasCollisions = false;

//   //   Object.keys(data).forEach(day => {
//   //     if (activeDays[day] && data[day] && data[day].length > 0) {
//   //       data[day].forEach((slot, index) => {
//   //         if (!slot.start || !slot.end) {
//   //           hasEmptyFields = true;
//   //         }
//   //       });

//   //       const collision = checkTimeCollisions(day, -1);
//   //       if (collision) {
//   //         Alert.alert('Time Conflict', `${day.charAt(0).toUpperCase() + day.slice(1)}: ${collision}`);
//   //         hasCollisions = true;
//   //       }
//   //     }
//   //   });

//   //   if (hasEmptyFields) {
//   //     Alert.alert('Missing Information', 'Please fill in all time slots for active days');
//   //     return;
//   //   }

//   //   if (!hasCollisions) {
//   //     Alert.alert('Success', 'Schedule saved successfully!');
//   //     console.log(data);
//   //   }
//   // };

// const onSubmit = (data) => {
//   // Filter out days that don't have time values or are not active
//   const filteredData = {};
//   let hasEmptyFields = false;
//   let hasCollisions = false;

//   Object.keys(data).forEach(day => {
//     // Check if day is active and has valid time slots
//     if (activeDays[day] && data[day] && data[day].length > 0) {
//       const validSlots = data[day].filter(slot => slot.start && slot.end);

//       // Only include days with valid time slots
//       if (validSlots.length > 0) {
//         filteredData[day] = validSlots;

//         // Check for collisions
//         const collision = checkTimeCollisions(day, -1);
//         if (collision) {
//           Alert.alert('Time Conflict', `${day.charAt(0).toUpperCase() + day.slice(1)}: ${collision}`);
//           hasCollisions = true;
//         }
//       } else {
//         // Day is active but has no valid time slots
//         hasEmptyFields = true;
//       }
//     }
//   });

//   // Check if there are any active days with empty time slots
//   const activeDayKeys = Object.keys(activeDays).filter(day => activeDays[day]);
//   const hasActiveDaysWithoutSlots = activeDayKeys.some(day =>
//     !filteredData[day] || filteredData[day].length === 0
//   );

//   if (hasActiveDaysWithoutSlots) {
//     Alert.alert('Missing Information', 'Please fill in all time slots for active days');
//     return;
//   }

//   if (!hasCollisions) {
//     Alert.alert('Success', 'Schedule saved successfully!');
//     console.log('Filtered Schedule Data:', filteredData);
//   }
// };

//   const DaySchedule = ({ day, displayName, isActive, onToggle }) => {
//     const isWeekend = day === 'sunday';

//     return (
//       <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
//         <View className="flex-row justify-between items-center mb-3">
//           <Text className="text-lg font-semibold text-gray-800">
//             {displayName}
//           </Text>
//           {isWeekend ? (
//             <Text className="text-sm text-gray-500">Not Available</Text>
//           ) : (
//             <TouchableOpacity
//               onPress={onToggle}
//               className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
//                 isActive ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
//               }`}
//             >
//               {isActive && <Text className="text-white text-xs">✓</Text>}
//             </TouchableOpacity>
//           )}
//         </View>

//         {isActive && !isWeekend && (
//           <View className="space-y-4">
//             <Text className="text-sm text-gray-500 mb-1">
//               Add your available time slots (e.g., 9:00 AM)
//             </Text>

//             <Controller
//               control={control}
//               name={day}
//               render={({ field: { value } }) => (
//                 <>
//                   {value.map((slot, index) => (
//                     <View key={index} className="flex-row items-center space-x-2">
//                       <View className="flex-1">
//                         <View className="flex-row items-center space-x-2">
//                           <View className="flex-1">
//                             <Controller
//                               control={control}
//                               name={`${day}[${index}].start`}
//                               rules={{
//                                 required: 'Start time is required',
//                                 validate: validateTimeFormat
//                               }}
//                               render={({ field: { onChange, value } }) => (
//                                 <View>
//                                   <TextInput
//                                     className={`border rounded-md p-3 text-gray-800 ${
//                                       errors[day]?.[index]?.start ? 'border-red-500' : 'border-gray-200'
//                                     }`}
//                                     value={value}
//                                     onChangeText={onChange}
//                                     placeholder="e.g., 9:00 AM"
//                                   />
//                                   {errors[day]?.[index]?.start && (
//                                     <Text className="text-red-500 text-xs mt-1">
//                                       {errors[day][index].start.message}
//                                     </Text>
//                                   )}
//                                 </View>
//                               )}
//                             />
//                           </View>

//                           <View className="flex-1">
//                             <Controller
//                               control={control}
//                               name={`${day}[${index}].end`}
//                               rules={{
//                                 required: 'End time is required',
//                                 validate: (value, formValues) => {
//                                   const formatResult = validateTimeFormat(value);
//                                   if (formatResult !== true) return formatResult;

//                                   const startTime = formValues[day][index].start;
//                                   return validateTimeOrder(startTime, value);
//                                 }
//                               }}
//                               render={({ field: { onChange, value } }) => (
//                                 <View>
//                                   <TextInput
//                                     className={`border rounded-md p-3 text-gray-800 ${
//                                       errors[day]?.[index]?.end ? 'border-red-500' : 'border-gray-200'
//                                     }`}
//                                     value={value}
//                                     onChangeText={onChange}
//                                     placeholder="e.g., 5:00 PM"
//                                   />
//                                   {errors[day]?.[index]?.end && (
//                                     <Text className="text-red-500 text-xs mt-1">
//                                       {errors[day][index].end.message}
//                                     </Text>
//                                   )}
//                                 </View>
//                               )}
//                             />
//                           </View>

//                           {value.length > 1 && (
//                             <TouchableOpacity
//                               onPress={() => removeTimeSlot(day, index)}
//                               className="w-10 h-10 rounded-full bg-red-100 items-center justify-center"
//                             >
//                               <Text className="text-red-600 font-bold">-</Text>
//                             </TouchableOpacity>
//                           )}
//                         </View>

//                         {/* Check for collisions with other slots */}
//                         {checkTimeCollisions(day, index) && (
//                           <Text className="text-red-500 text-xs mt-1">
//                             {checkTimeCollisions(day, index)}
//                           </Text>
//                         )}
//                       </View>
//                     </View>
//                   ))}
//                 </>
//               )}
//             />

//             <TouchableOpacity
//               onPress={() => addTimeSlot(day)}
//               className="flex-row items-center justify-center bg-blue-100 p-3 rounded-md"
//             >
//               <Text className="text-blue-600 font-semibold">+ Add Another Time Slot</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     );
//   };

//   return (
//     <View className="flex-1 bg-gray-100">
//       <ScrollView className="flex-1 p-4">
//         <Text className="text-2xl font-bold text-gray-800 mb-2">Weekly Schedule</Text>
//         <Text className="text-gray-500 mb-6">Please set your available time slots for each day</Text>

//         <DaySchedule
//           day="sunday"
//           displayName="Sunday"
//           isActive={activeDays.sunday}
//           onToggle={() => toggleDay('sunday')}
//         />

//         <DaySchedule
//           day="monday"
//           displayName="Monday"
//           isActive={activeDays.monday}
//           onToggle={() => toggleDay('monday')}
//         />

//         <DaySchedule
//           day="tuesday"
//           displayName="Tuesday"
//           isActive={activeDays.tuesday}
//           onToggle={() => toggleDay('tuesday')}
//         />

//         <DaySchedule
//           day="wednesday"
//           displayName="Wednesday"
//           isActive={activeDays.wednesday}
//           onToggle={() => toggleDay('wednesday')}
//         />

//         <DaySchedule
//           day="thursday"
//           displayName="Thursday"
//           isActive={activeDays.thursday}
//           onToggle={() => toggleDay('thursday')}
//         />

//         <DaySchedule
//           day="friday"
//           displayName="Friday"
//           isActive={activeDays.friday}
//           onToggle={() => toggleDay('friday')}
//         />

//         <DaySchedule
//           day="saturday"
//           displayName="Saturday"
//           isActive={activeDays.saturday}
//           onToggle={() => toggleDay('saturday')}
//         />

//         <TouchableOpacity
//           className="bg-blue-500 rounded-lg p-4 mt-6"
//           onPress={handleSubmit(onSubmit)}
//         >
//           <Text className="text-white text-center font-semibold text-lg">
//             Save Schedule
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// export default WeeklySchedule;

//final version #6666

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   Alert,
// } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';

// const WeeklySchedule = ({ name, setFlag }) => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     getValues,
//   } = useForm({
//     defaultValues: {
//       monday: [{ start: '', end: '' }],
//       tuesday: [{ start: '', end: '' }],
//       wednesday: [{ start: '', end: '' }],
//       thursday: [{ start: '', end: '' }],
//       friday: [{ start: '', end: '' }],
//       saturday: [{ start: '', end: '' }],
//       sunday: [],
//     },
//   });

//   console.log('LINE AT 1600', name);

//   const [activeDays, setActiveDays] = useState({
//     monday: true,
//     tuesday: false,
//     wednesday: false,
//     thursday: false,
//     friday: false,
//     saturday: false,
//     sunday: false,
//   });

//   // Function to capitalize day names
//   const capitalizeDay = day => {
//     return day.charAt(0).toUpperCase() + day.slice(1);
//   };

//   const toggleDay = day => {
//     setActiveDays(prev => ({
//       ...prev,
//       [day]: !prev[day],
//     }));
//   };

//   // Convert time to minutes for comparison
//   const timeToMinutes = timeStr => {
//     if (!timeStr) return 0;

//     const [time, modifier] = timeStr.split(' ');
//     let [hours, minutes] = time.split(':');

//     hours = parseInt(hours);
//     minutes = parseInt(minutes);

//     if (modifier?.toUpperCase() === 'PM' && hours !== 12) {
//       hours += 12;
//     }
//     if (modifier?.toUpperCase() === 'AM' && hours === 12) {
//       hours = 0;
//     }

//     return hours * 60 + minutes;
//   };

//   // Check if two time ranges overlap
//   const hasTimeOverlap = (start1, end1, start2, end2) => {
//     const s1 = timeToMinutes(start1);
//     const e1 = timeToMinutes(end1);
//     const s2 = timeToMinutes(start2);
//     const e2 = timeToMinutes(end2);

//     return Math.max(s1, s2) < Math.min(e1, e2);
//   };

//   // Check for time collisions in a day
//   const checkTimeCollisions = (day, currentIndex) => {
//     const slots = getValues(day) || [];

//     for (let i = 0; i < slots.length; i++) {
//       if (i === currentIndex) continue;

//       for (let j = i + 1; j < slots.length; j++) {
//         if (j === currentIndex) continue;

//         if (slots[i].start && slots[i].end && slots[j].start && slots[j].end) {
//           if (
//             hasTimeOverlap(
//               slots[i].start,
//               slots[i].end,
//               slots[j].start,
//               slots[j].end,
//             )
//           ) {
//             return `Time slots ${i + 1} and ${j + 1} overlap`;
//           }
//         }
//       }
//     }

//     return null;
//   };

//   const validateTimeFormat = value => {
//     if (!value) return 'Time is required';

//     const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
//     return timeRegex.test(value) || 'Invalid time format (e.g., 9:00 AM)';
//   };

//   const validateTimeOrder = (start, end) => {
//     if (!start || !end) return true;

//     const startMinutes = timeToMinutes(start);
//     const endMinutes = timeToMinutes(end);

//     return startMinutes < endMinutes || 'End time must be after start time';
//   };

//   const addTimeSlot = day => {
//     const currentSlots = getValues(day) || [];
//     setValue(day, [...currentSlots, { start: '', end: '' }]);
//   };

//   const removeTimeSlot = (day, index) => {
//     const currentSlots = getValues(day) || [];
//     if (currentSlots.length <= 1) return;

//     const updatedSlots = currentSlots.filter((_, i) => i !== index);
//     setValue(day, updatedSlots);
//   };

//   // const onSubmit = data => {
//   //   // Filter out days that don't have time values or are not active
//   //   const filteredData = {};
//   //   let hasEmptyFields = false;
//   //   let hasCollisions = false;

//   //   Object.keys(data).forEach(day => {
//   //     // Check if day is active and has valid time slots
//   //     if (activeDays[day] && data[day] && data[day].length > 0) {
//   //       const validSlots = data[day].filter(slot => slot.start && slot.end);

//   //       // Only include days with valid time slots
//   //       if (validSlots.length > 0) {
//   //         // Use capitalized day name in the output
//   //         filteredData[capitalizeDay(day)] = validSlots;

//   //         // Check for collisions
//   //         const collision = checkTimeCollisions(day, -1);
//   //         if (collision) {
//   //           Alert.alert('Time Conflict', `${capitalizeDay(day)}: ${collision}`);
//   //           hasCollisions = true;
//   //         }
//   //       } else {
//   //         // Day is active but has no valid time slots
//   //         hasEmptyFields = true;
//   //       }
//   //     }
//   //   });

//   //   // Check if there are any active days with empty time slots
//   //   const activeDayKeys = Object.keys(activeDays).filter(
//   //     day => activeDays[day],
//   //   );
//   //   const hasActiveDaysWithoutSlots = activeDayKeys.some(
//   //     day =>
//   //       !filteredData[capitalizeDay(day)] ||
//   //       filteredData[capitalizeDay(day)].length === 0,
//   //   );

//   //   if (hasActiveDaysWithoutSlots) {
//   //     Alert.alert(
//   //       'Missing Information',
//   //       'Please fill in all time slots for active days',
//   //     );
//   //     return;
//   //   }

//   //   if (!hasCollisions) {
//   //     Alert.alert('Success', 'Schedule saved successfully!');

//   //     // Convert filtered data object to array format
//   //     const filteredDataArray = Object.keys(filteredData).map(day => ({
//   //       day,
//   //       timeSlots: filteredData[day],
//   //     }));

//   //     console.log('Filtered Schedule Data (Array Format):', filteredDataArray);
//   //   }
//   // };

//   const onSubmit = data => {
//     // Filter out days that don't have time values or are not active
//     const filteredData = {};
//     let hasEmptyFields = false;
//     let hasCollisions = false;

//     Object.keys(data).forEach(day => {
//       // Check if day is active and has valid time slots
//       if (activeDays[day] && data[day] && data[day].length > 0) {
//         const validSlots = data[day].filter(slot => slot.start && slot.end);

//         // Only include days with valid time slots
//         if (validSlots.length > 0) {
//           // Store with original day name
//           filteredData[day] = validSlots;

//           // Check for collisions
//           const collision = checkTimeCollisions(day, -1);
//           if (collision) {
//             Alert.alert('Time Conflict', `${capitalizeDay(day)}: ${collision}`);
//             hasCollisions = true;
//           }
//         } else {
//           // Day is active but has no valid time slots
//           hasEmptyFields = true;
//         }
//       }
//     });

//     // Check if there are any active days with empty time slots
//     const activeDayKeys = Object.keys(activeDays).filter(
//       day => activeDays[day],
//     );
//     const hasActiveDaysWithoutSlots = activeDayKeys.some(
//       day => !filteredData[day] || filteredData[day].length === 0,
//     );

//     if (hasActiveDaysWithoutSlots) {
//       Alert.alert(
//         'Missing Information',
//         'Please fill in all time slots for active days',
//       );
//       return;
//     }

//     if (!hasCollisions) {
//       Alert.alert('Success', 'Schedule saved successfully!');

//       // Convert time format from "9:00 AM" to "09:00:00"
//       const convertTo24HourFormat = timeStr => {
//         if (!timeStr) return '';

//         const [time, modifier] = timeStr.split(' ');
//         let [hours, minutes] = time.split(':');

//         hours = parseInt(hours);
//         minutes = parseInt(minutes);

//         if (modifier?.toUpperCase() === 'PM' && hours !== 12) {
//           hours += 12;
//         }
//         if (modifier?.toUpperCase() === 'AM' && hours === 12) {
//           hours = 0;
//         }

//         // Format to HH:MM:SS
//         return `${hours.toString().padStart(2, '0')}:${minutes
//           .toString()
//           .padStart(2, '0')}:00`;
//       };

//       // Format data for backend
//       const backendData = Object.entries(filteredData).map(([day, slots]) => ({
//         day: day.toUpperCase(), // Convert to uppercase (MONDAY, TUESDAY, etc.)
//         slots: slots.map(slot => ({
//           from: convertTo24HourFormat(slot.start),
//           to: convertTo24HourFormat(slot.end),
//         })),
//       }));

//       console.log('Backend Data:', backendData);

//       setValue(name, backendData);



//       // Here you would typically send the data to your backend
//       // Example: axios.post('/api/schedule', backendData)
//     }
//   };

//   // eslint-disable-next-line react/no-unstable-nested-components
//   const DaySchedule = ({ day, displayName, isActive, onToggle }) => {
//     const isWeekend = day === 'sunday';

//     return (
//       <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
//         <View className="flex-row justify-between items-center mb-3">
//           <Text className="text-lg font-semibold text-gray-800">
//             {capitalizeDay(displayName)}
//           </Text>
//           {isWeekend ? (
//             <Text className="text-sm text-gray-500">Not Available</Text>
//           ) : (
//             <TouchableOpacity
//               onPress={onToggle}
//               className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
//                 isActive ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
//               }`}
//             >
//               {isActive && <Text className="text-white text-xs">✓</Text>}
//             </TouchableOpacity>
//           )}
//         </View>

//         {isActive && !isWeekend && (
//           <View className="space-y-4">
//             <Text className="text-sm text-gray-500 mb-1">
//               Add your available time slots (e.g., 9:00 AM)
//             </Text>

//             <Controller
//               control={control}
//               name={day}
//               render={({ field: { value } }) => (
//                 <>
//                   {value.map((slot, index) => (
//                     <View
//                       key={index}
//                       className="flex-row items-center space-x-2"
//                     >
//                       <View className="flex-1">
//                         <View className="flex-row items-center space-x-2">
//                           <View className="flex-1">
//                             <Controller
//                               control={control}
//                               name={`${day}[${index}].start`}
//                               rules={{
//                                 required: 'Start time is required',
//                                 validate: validateTimeFormat,
//                               }}
//                               render={({ field: { onChange, value } }) => (
//                                 <View>
//                                   <TextInput
//                                     className={`border rounded-md p-3 text-gray-800 ${
//                                       errors[day]?.[index]?.start
//                                         ? 'border-red-500'
//                                         : 'border-gray-200'
//                                     }`}
//                                     value={value}
//                                     onChangeText={onChange}
//                                     placeholder="e.g., 9:00 AM"
//                                   />
//                                   {errors[day]?.[index]?.start && (
//                                     <Text className="text-red-500 text-xs mt-1">
//                                       {errors[day][index].start.message}
//                                     </Text>
//                                   )}
//                                 </View>
//                               )}
//                             />
//                           </View>

//                           <View className="flex-1">
//                             <Controller
//                               control={control}
//                               name={`${day}[${index}].end`}
//                               rules={{
//                                 required: 'End time is required',
//                                 validate: (value, formValues) => {
//                                   const formatResult =
//                                     validateTimeFormat(value);
//                                   if (formatResult !== true)
//                                     return formatResult;

//                                   const startTime =
//                                     formValues[day][index].start;
//                                   return validateTimeOrder(startTime, value);
//                                 },
//                               }}
//                               render={({ field: { onChange, value } }) => (
//                                 <View>
//                                   <TextInput
//                                     className={`border rounded-md p-3 text-gray-800 ${
//                                       errors[day]?.[index]?.end
//                                         ? 'border-red-500'
//                                         : 'border-gray-200'
//                                     }`}
//                                     value={value}
//                                     onChangeText={onChange}
//                                     placeholder="e.g., 5:00 PM"
//                                   />
//                                   {errors[day]?.[index]?.end && (
//                                     <Text className="text-red-500 text-xs mt-1">
//                                       {errors[day][index].end.message}
//                                     </Text>
//                                   )}
//                                 </View>
//                               )}
//                             />
//                           </View>

//                           {value.length > 1 && (
//                             <TouchableOpacity
//                               onPress={() => removeTimeSlot(day, index)}
//                               className="w-10 h-10 rounded-full bg-red-100 items-center justify-center"
//                             >
//                               <Text className="text-red-600 font-bold">-</Text>
//                             </TouchableOpacity>
//                           )}
//                         </View>

//                         {/* Check for collisions with other slots */}
//                         {checkTimeCollisions(day, index) && (
//                           <Text className="text-red-500 text-xs mt-1">
//                             {checkTimeCollisions(day, index)}
//                           </Text>
//                         )}
//                       </View>
//                     </View>
//                   ))}
//                 </>
//               )}
//             />

//             <TouchableOpacity
//               onPress={() => addTimeSlot(day)}
//               className="flex-row items-center justify-center bg-blue-100 p-3 rounded-md"
//             >
//               <Text className="text-blue-600 font-semibold">
//                 + Add Another Time Slot
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     );
//   };

//   return (
//     <View className="flex-1 bg-gray-100">
//       <ScrollView className="flex-1 p-4">
//         <Text className="text-2xl font-bold text-gray-800 mb-2">
//           Weekly Schedule
//         </Text>
//         <Text className="text-gray-500 mb-6">
//           Please set your available time slots for each day
//         </Text>

//         <DaySchedule
//           day="sunday"
//           displayName="sunday"
//           isActive={activeDays.sunday}
//           onToggle={() => toggleDay('sunday')}
//         />

//         <DaySchedule
//           day="monday"
//           displayName="monday"
//           isActive={activeDays.monday}
//           onToggle={() => toggleDay('monday')}
//         />

//         <DaySchedule
//           day="tuesday"
//           displayName="tuesday"
//           isActive={activeDays.tuesday}
//           onToggle={() => toggleDay('tuesday')}
//         />

//         <DaySchedule
//           day="wednesday"
//           displayName="wednesday"
//           isActive={activeDays.wednesday}
//           onToggle={() => toggleDay('wednesday')}
//         />

//         <DaySchedule
//           day="thursday"
//           displayName="thursday"
//           isActive={activeDays.thursday}
//           onToggle={() => toggleDay('thursday')}
//         />

//         <DaySchedule
//           day="friday"
//           displayName="friday"
//           isActive={activeDays.friday}
//           onToggle={() => toggleDay('friday')}
//         />

//         <DaySchedule
//           day="saturday"
//           displayName="saturday"
//           isActive={activeDays.saturday}
//           onToggle={() => toggleDay('saturday')}
//         />

//         <TouchableOpacity
//           className="bg-blue-500 rounded-lg p-4 mt-6"
//           onPress={handleSubmit(onSubmit)}
//         >
//           <Text className="text-white text-center font-semibold text-lg">
//             Save Schedule
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// export default WeeklySchedule;


// final version #7777

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   Alert,
// } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';

// const WeeklyScheduleTime = ({ name, setFlag, onScheduleSave }) => {
//   const {
//     control,
//     formState: { errors },
//     setValue,
//     getValues,
//     trigger, // Add trigger for manual validation
//   } = useForm({
//     defaultValues: {
//       monday: [{ start: '', end: '' }],
//       tuesday: [{ start: '', end: '' }],
//       wednesday: [{ start: '', end: '' }],
//       thursday: [{ start: '', end: '' }],
//       friday: [{ start: '', end: '' }],
//       saturday: [{ start: '', end: '' }],
//       sunday: [],
//     },
//   });

//   const [activeDays, setActiveDays] = useState({
//     monday: true,
//     tuesday: false,
//     wednesday: false,
//     thursday: false,
//     friday: false,
//     saturday: false,
//     sunday: false,
//   });

//   // Function to capitalize day names
//   const capitalizeDay = day => {
//     return day.charAt(0).toUpperCase() + day.slice(1);
//   };

//   const toggleDay = day => {
//     setActiveDays(prev => ({
//       ...prev,
//       [day]: !prev[day],
//     }));
//   };

//   // Convert time to minutes for comparison
//   const timeToMinutes = timeStr => {
//     if (!timeStr) return 0;

//     const [time, modifier] = timeStr.split(' ');
//     let [hours, minutes] = time.split(':');

//     hours = parseInt(hours);
//     minutes = parseInt(minutes);

//     if (modifier?.toUpperCase() === 'PM' && hours !== 12) {
//       hours += 12;
//     }
//     if (modifier?.toUpperCase() === 'AM' && hours === 12) {
//       hours = 0;
//     }

//     return hours * 60 + minutes;
//   };

//   // Check if two time ranges overlap
//   const hasTimeOverlap = (start1, end1, start2, end2) => {
//     const s1 = timeToMinutes(start1);
//     const e1 = timeToMinutes(end1);
//     const s2 = timeToMinutes(start2);
//     const e2 = timeToMinutes(end2);

//     return Math.max(s1, s2) < Math.min(e1, e2);
//   };

//   // Check for time collisions in a day
//   const checkTimeCollisions = (day, currentIndex) => {
//     const slots = getValues(day) || [];

//     for (let i = 0; i < slots.length; i++) {
//       if (i === currentIndex) continue;

//       for (let j = i + 1; j < slots.length; j++) {
//         if (j === currentIndex) continue;

//         if (slots[i].start && slots[i].end && slots[j].start && slots[j].end) {
//           if (
//             hasTimeOverlap(
//               slots[i].start,
//               slots[i].end,
//               slots[j].start,
//               slots[j].end,
//             )
//           ) {
//             return `Time slots ${i + 1} and ${j + 1} overlap`;
//           }
//         }
//       }
//     }

//     return null;
//   };

//   const validateTimeFormat = value => {
//     if (!value) return 'Time is required';

//     const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
//     return timeRegex.test(value) || 'Invalid time format (e.g., 9:00 AM)';
//   };

//   const validateTimeOrder = (start, end) => {
//     if (!start || !end) return true;

//     const startMinutes = timeToMinutes(start);
//     const endMinutes = timeToMinutes(end);

//     return startMinutes < endMinutes || 'End time must be after start time';
//   };

//   const addTimeSlot = day => {
//     const currentSlots = getValues(day) || [];
//     setValue(day, [...currentSlots, { start: '', end: '' }]);
//   };

//   const removeTimeSlot = (day, index) => {
//     const currentSlots = getValues(day) || [];
//     if (currentSlots.length <= 1) return;

//     const updatedSlots = currentSlots.filter((_, i) => i !== index);
//     setValue(day, updatedSlots);
//   };

//   const validateAllFields = async () => {
//     let isValid = true;
    
//     // Validate all active days
//     for (const day of Object.keys(activeDays)) {
//       if (activeDays[day]) {
//         const daySlots = getValues(day) || [];
        
//         for (let i = 0; i < daySlots.length; i++) {
//           // Validate start time
//           const startIsValid = await trigger(`${day}.${i}.start`);
//           // Validate end time
//           const endIsValid = await trigger(`${day}.${i}.end`);
          
//           if (!startIsValid || !endIsValid) {
//             isValid = false;
//           }
//         }
//       }
//     }
    
//     return isValid;
//   };

//   const saveSchedule = async () => {
//     // First validate all fields
//     const isValid = await validateAllFields();
//     if (!isValid) {
//       Alert.alert('Validation Error', 'Please fix all validation errors before saving.');
//       return;
//     }

//     // Get all current values
//     const data = getValues();
    
//     // Filter out days that don't have time values or are not active
//     const filteredData = {};
//     let hasEmptyFields = false;
//     let hasCollisions = false;

//     Object.keys(data).forEach(day => {
//       // Check if day is active and has valid time slots
//       if (activeDays[day] && data[day] && data[day].length > 0) {
//         const validSlots = data[day].filter(slot => slot.start && slot.end);

//         // Only include days with valid time slots
//         if (validSlots.length > 0) {
//           // Store with original day name
//           filteredData[day] = validSlots;

//           // Check for collisions
//           const collision = checkTimeCollisions(day, -1);
//           if (collision) {
//             Alert.alert('Time Conflict', `${capitalizeDay(day)}: ${collision}`);
//             hasCollisions = true;
//           }
//         } else {
//           // Day is active but has no valid time slots
//           hasEmptyFields = true;
//         }
//       }
//     });

//     // Check if there are any active days with empty time slots
//     const activeDayKeys = Object.keys(activeDays).filter(
//       day => activeDays[day],
//     );
//     const hasActiveDaysWithoutSlots = activeDayKeys.some(
//       day => !filteredData[day] || filteredData[day].length === 0,
//     );

//     if (hasActiveDaysWithoutSlots) {
//       Alert.alert(
//         'Missing Information',
//         'Please fill in all time slots for active days',
//       );
//       return;
//     }

//     if (hasCollisions) {
//       return; // Don't proceed if there are collisions
//     }

//     // Convert time format from "9:00 AM" to "09:00:00"
//     const convertTo24HourFormat = timeStr => {
//       if (!timeStr) return '';

//       const [time, modifier] = timeStr.split(' ');
//       let [hours, minutes] = time.split(':');

//       hours = parseInt(hours);
//       minutes = parseInt(minutes);

//       if (modifier?.toUpperCase() === 'PM' && hours !== 12) {
//         hours += 12;
//       }
//       if (modifier?.toUpperCase() === 'AM' && hours === 12) {
//         hours = 0;
//       }

//       // Format to HH:MM:SS
//       return `${hours.toString().padStart(2, '0')}:${minutes
//         .toString()
//         .padStart(2, '0')}:00`;
//     };

//     // Format data for backend
//     const backendData = Object.entries(filteredData).map(([day, slots]) => ({
//       day: day.toUpperCase(), // Convert to uppercase (MONDAY, TUESDAY, etc.)
//       slots: slots.map(slot => ({
//         from: convertTo24HourFormat(slot.start),
//         to: convertTo24HourFormat(slot.end),
//       })),
//     }));

//     console.log('Backend Data:', backendData);

//     // Set the value directly
//     setValue(name, backendData);
    
//     // Call the callback if provided
//     if (onScheduleSave) {
//       onScheduleSave(backendData);
//     }
    
//     // If you need to set a flag too
//     if (setFlag) {
//       setFlag(true);
//     }

//     Alert.alert('Success', 'Schedule saved successfully!');
//   };

//   // eslint-disable-next-line react/no-unstable-nested-components
//   const DaySchedule = ({ day, displayName, isActive, onToggle }) => {
//     const isWeekend = day === 'sunday';

//     return (
//       <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
//         <View className="flex-row justify-between items-center mb-3">
//           <Text className="text-lg font-semibold text-gray-800">
//             {capitalizeDay(displayName)}
//           </Text>
//           {isWeekend ? (
//             <Text className="text-sm text-gray-500">Not Available</Text>
//           ) : (
//             <TouchableOpacity
//               onPress={onToggle}
//               className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
//                 isActive ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
//               }`}
//             >
//               {isActive && <Text className="text-white text-xs">✓</Text>}
//             </TouchableOpacity>
//           )}
//         </View>

//         {isActive && !isWeekend && (
//           <View className="space-y-4">
//             <Text className="text-sm text-gray-500 mb-1">
//               Add your available time slots (e.g., 9:00 AM)
//             </Text>

//             <Controller
//               control={control}
//               name={day}
//               render={({ field: { value } }) => (
//                 <>
//                   {value.map((slot, index) => (
//                     <View
//                       key={index}
//                       className="flex-row items-center space-x-2"
//                     >
//                       <View className="flex-1">
//                         <View className="flex-row items-center space-x-2">
//                           <View className="flex-1">
//                             <Controller
//                               control={control}
//                               name={`${day}.${index}.start`}
//                               rules={{
//                                 required: 'Start time is required',
//                                 validate: validateTimeFormat,
//                               }}
//                               render={({ field: { onChange, value } }) => (
//                                 <View>
//                                   <TextInput
//                                     className={`border rounded-md p-3 text-gray-800 ${
//                                       errors[day]?.[index]?.start
//                                         ? 'border-red-500'
//                                         : 'border-gray-200'
//                                     }`}
//                                     value={value}
//                                     onChangeText={onChange}
//                                     placeholder="e.g., 9:00 AM"
//                                   />
//                                   {errors[day]?.[index]?.start && (
//                                     <Text className="text-red-500 text-xs mt-1">
//                                       {errors[day][index].start.message}
//                                     </Text>
//                                   )}
//                                 </View>
//                               )}
//                             />
//                           </View>

//                           <View className="flex-1">
//                             <Controller
//                               control={control}
//                               name={`${day}.${index}.end`}
//                               rules={{
//                                 required: 'End time is required',
//                                 validate: (value, formValues) => {
//                                   const formatResult = validateTimeFormat(value);
//                                   if (formatResult !== true) return formatResult;

//                                   const startTime = formValues[day][index].start;
//                                   return validateTimeOrder(startTime, value) || true;
//                                 },
//                               }}
//                               render={({ field: { onChange, value } }) => (
//                                 <View>
//                                   <TextInput
//                                     className={`border rounded-md p-3 text-gray-800 ${
//                                       errors[day]?.[index]?.end
//                                         ? 'border-red-500'
//                                         : 'border-gray-200'
//                                     }`}
//                                     value={value}
//                                     onChangeText={onChange}
//                                     placeholder="e.g., 5:00 PM"
//                                   />
//                                   {errors[day]?.[index]?.end && (
//                                     <Text className="text-red-500 text-xs mt-1">
//                                       {errors[day][index].end.message}
//                                     </Text>
//                                   )}
//                                 </View>
//                               )}
//                             />
//                           </View>

//                           {value.length > 1 && (
//                             <TouchableOpacity
//                               onPress={() => removeTimeSlot(day, index)}
//                               className="w-10 h-10 rounded-full bg-red-100 items-center justify-center"
//                             >
//                               <Text className="text-red-600 font-bold">-</Text>
//                             </TouchableOpacity>
//                           )}
//                         </View>

//                         {/* Check for collisions with other slots */}
//                         {checkTimeCollisions(day, index) && (
//                           <Text className="text-red-500 text-xs mt-1">
//                             {checkTimeCollisions(day, index)}
//                           </Text>
//                         )}
//                       </View>
//                     </View>
//                   ))}
//                 </>
//               )}
//             />

//             <TouchableOpacity
//               onPress={() => addTimeSlot(day)}
//               className="flex-row items-center justify-center bg-blue-100 p-3 rounded-md"
//             >
//               <Text className="text-blue-600 font-semibold">
//                 + Add Another Time Slot
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     );
//   };

//   return (
//     <View className="flex-1 bg-gray-100">
//       <ScrollView className="flex-1 p-4">
//         <Text className="text-2xl font-bold text-gray-800 mb-2">
//           Weekly Schedule
//         </Text>
//         <Text className="text-gray-500 mb-6">
//           Please set your available time slots for each day
//         </Text>

//         <DaySchedule
//           day="sunday"
//           displayName="sunday"
//           isActive={activeDays.sunday}
//           onToggle={() => toggleDay('sunday')}
//         />

//         <DaySchedule
//           day="monday"
//           displayName="monday"
//           isActive={activeDays.monday}
//           onToggle={() => toggleDay('monday')}
//         />

//         <DaySchedule
//           day="tuesday"
//           displayName="tuesday"
//           isActive={activeDays.tuesday}
//           onToggle={() => toggleDay('tuesday')}
//         />

//         <DaySchedule
//           day="wednesday"
//           displayName="wednesday"
//           isActive={activeDays.wednesday}
//           onToggle={() => toggleDay('wednesday')}
//         />

//         <DaySchedule
//           day="thursday"
//           displayName="thursday"
//           isActive={activeDays.thursday}
//           onToggle={() => toggleDay('thursday')}
//         />

//         <DaySchedule
//           day="friday"
//           displayName="friday"
//           isActive={activeDays.friday}
//           onToggle={() => toggleDay('friday')}
//         />

//         <DaySchedule
//           day="saturday"
//           displayName="saturday"
//           isActive={activeDays.saturday}
//           onToggle={() => toggleDay('saturday')}
//         />

//         <TouchableOpacity
//           className="bg-blue-500 rounded-lg p-4 mt-6"
//           onPress={saveSchedule}
//         >
//           <Text className="text-white text-center font-semibold text-lg">
//             Save Schedule
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// export default WeeklyScheduleTime;


import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  useColorScheme,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

// Custom hook for theme colors
const useThemeColor = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return {
    isDarkMode,
    colors: {
      background: isDarkMode ? '#121212' : '#f3f4f6',
      card: isDarkMode ? '#1e1e1e' : '#ffffff',
      text: isDarkMode ? '#e5e7eb' : '#1f2937',
      textSecondary: isDarkMode ? '#9ca3af' : '#6b7280',
      border: isDarkMode ? '#374151' : '#e5e7eb',
      primary: isDarkMode ? '#3b82f6' : '#3b82f6',
      success: isDarkMode ? '#10b981' : '#10b981',
      danger: isDarkMode ? '#ef4444' : '#ef4444',
      inputBg: isDarkMode ? '#2d2d2d' : '#ffffff',
      toggleActive: isDarkMode ? '#3b82f6' : '#3b82f6',
      toggleInactive: isDarkMode ? '#4b5563' : '#d1d5db',
      addButtonBg: isDarkMode ? '#1e3a8a' : '#dbeafe',
      addButtonText: isDarkMode ? '#93c5fd' : '#2563eb',
      removeButtonBg: isDarkMode ? '#7f1d1d' : '#fee2e2',
      removeButtonText: isDarkMode ? '#fca5a5' : '#dc2626',
      saveButtonBg: isDarkMode ? '#1d4ed8' : '#3b82f6',
    },
  };
};

const WeeklyScheduleTime = ({ name, setFlag, onScheduleSave }) => {
  const theme = useThemeColor();
  const colors = theme.colors;
  const isDarkMode = theme.isDarkMode;

  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm({
    defaultValues: {
      monday: [{ start: '', end: '' }],
      tuesday: [{ start: '', end: '' }],
      wednesday: [{ start: '', end: '' }],
      thursday: [{ start: '', end: '' }],
      friday: [{ start: '', end: '' }],
      saturday: [{ start: '', end: '' }],
      sunday: [{ start: '', end: '' }],
    },
  });

  const [activeDays, setActiveDays] = useState({
    monday: true,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  // Function to capitalize day names
  const capitalizeDay = day => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  const toggleDay = day => {
    setActiveDays(prev => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  // Convert time to minutes for comparison
  const timeToMinutes = timeStr => {
    if (!timeStr) return 0;

    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');

    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (modifier?.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (modifier?.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  };

  // Check if two time ranges overlap
  const hasTimeOverlap = (start1, end1, start2, end2) => {
    const s1 = timeToMinutes(start1);
    const e1 = timeToMinutes(end1);
    const s2 = timeToMinutes(start2);
    const e2 = timeToMinutes(end2);

    return Math.max(s1, s2) < Math.min(e1, e2);
  };

  // Check for time collisions in a day
  const checkTimeCollisions = (day, currentIndex) => {
    const slots = getValues(day) || [];

    for (let i = 0; i < slots.length; i++) {
      if (i === currentIndex) continue;

      for (let j = i + 1; j < slots.length; j++) {
        if (j === currentIndex) continue;

        if (slots[i].start && slots[i].end && slots[j].start && slots[j].end) {
          if (
            hasTimeOverlap(
              slots[i].start,
              slots[i].end,
              slots[j].start,
              slots[j].end,
            )
          ) {
            return `Time slots ${i + 1} and ${j + 1} overlap`;
          }
        }
      }
    }

    return null;
  };

  const validateTimeFormat = value => {
    if (!value) return 'Time is required';

    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
    return timeRegex.test(value) || 'Invalid time format (e.g., 9:00 AM)';
  };

  const validateTimeOrder = (start, end) => {
    if (!start || !end) return true;

    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);

    return startMinutes < endMinutes || 'End time must be after start time';
  };

  const addTimeSlot = day => {
    const currentSlots = getValues(day) || [];
    setValue(day, [...currentSlots, { start: '', end: '' }]);
  };

  const removeTimeSlot = (day, index) => {
    const currentSlots = getValues(day) || [];
    if (currentSlots.length <= 1) return;

    const updatedSlots = currentSlots.filter((_, i) => i !== index);
    setValue(day, updatedSlots);
  };

  const validateAllFields = async () => {
    let isValid = true;
    
    // Validate all active days
    for (const day of Object.keys(activeDays)) {
      if (activeDays[day]) {
        const daySlots = getValues(day) || [];
        
        for (let i = 0; i < daySlots.length; i++) {
          // Validate start time
          const startIsValid = await trigger(`${day}.${i}.start`);
          // Validate end time
          const endIsValid = await trigger(`${day}.${i}.end`);
          
          if (!startIsValid || !endIsValid) {
            isValid = false;
          }
        }
      }
    }
    
    return isValid;
  };

  const saveSchedule = async () => {
    // First validate all fields
    const isValid = await validateAllFields();
    if (!isValid) {
      Alert.alert('Validation Error', 'Please fix all validation errors before saving.');
      return;
    }

    // Get all current values
    const data = getValues();
    
    // Filter out days that don't have time values or are not active
    const filteredData = {};
    let hasEmptyFields = false;
    let hasCollisions = false;

    Object.keys(data).forEach(day => {
      // Check if day is active and has valid time slots
      if (activeDays[day] && data[day] && data[day].length > 0) {
        const validSlots = data[day].filter(slot => slot.start && slot.end);

        // Only include days with valid time slots
        if (validSlots.length > 0) {
          // Store with original day name
          filteredData[day] = validSlots;

          // Check for collisions
          const collision = checkTimeCollisions(day, -1);
          if (collision) {
            Alert.alert('Time Conflict', `${capitalizeDay(day)}: ${collision}`);
            hasCollisions = true;
          }
        } else {
          // Day is active but has no valid time slots
          hasEmptyFields = true;
        }
      }
    });

    // Check if there are any active days with empty time slots
    const activeDayKeys = Object.keys(activeDays).filter(
      day => activeDays[day],
    );
    const hasActiveDaysWithoutSlots = activeDayKeys.some(
      day => !filteredData[day] || filteredData[day].length === 0,
    );

    if (hasActiveDaysWithoutSlots) {
      Alert.alert(
        'Missing Information',
        'Please fill in all time slots for active days',
      );
      return;
    }

    if (hasCollisions) {
      return; // Don't proceed if there are collisions
    }

    // Convert time format from "9:00 AM" to "09:00:00"
    const convertTo24HourFormat = timeStr => {
      if (!timeStr) return '';

      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':');

      hours = parseInt(hours);
      minutes = parseInt(minutes);

      if (modifier?.toUpperCase() === 'PM' && hours !== 12) {
        hours += 12;
      }
      if (modifier?.toUpperCase() === 'AM' && hours === 12) {
        hours = 0;
      }

      // Format to HH:MM:SS
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:00`;
    };

    // Format data for backend
    const backendData = Object.entries(filteredData).map(([day, slots]) => ({
      day: day.toUpperCase(), // Convert to uppercase (MONDAY, TUESDAY, etc.)
      slots: slots.map(slot => ({
        from: convertTo24HourFormat(slot.start),
        to: convertTo24HourFormat(slot.end),
      })),
    }));

    // console.log('Backend Data:', backendData);

    // Set the value directly
    setValue(name, backendData);
    
    // Call the callback if provided
    if (onScheduleSave) {
      onScheduleSave(backendData);
    }
    
    // If you need to set a flag too
    if (setFlag) {
      setFlag(true);
    }

    Alert.alert('Success', 'Schedule saved successfully!');
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const DaySchedule = ({ day, displayName, isActive, onToggle }) => {
    // const isWeekend = day === 'sunday';

    return (
      <View style={{ 
        backgroundColor: colors.card, 
        borderRadius: 8, 
        padding: 16, 
        marginBottom: 16,
        shadowColor: isDarkMode ? '#000' : '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: isDarkMode ? 0.3 : 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}>
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 12 
        }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: colors.text 
          }}>
            {capitalizeDay(displayName)}
          </Text>
          {/* {isWeekend ? (
            <Text style={{ 
              fontSize: 14, 
              color: colors.textSecondary 
            }}>
              Not Available
            </Text> */}
          {/* ) : ( */}
            <TouchableOpacity
              onPress={onToggle}
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isActive ? colors.toggleActive : 'transparent',
                borderColor: isActive ? colors.toggleActive : colors.toggleInactive,
              }}
            >
              {isActive && <Text style={{ color: '#fff', fontSize: 12 }}>✓</Text>}
            </TouchableOpacity>
          {/* )} */}
        </View>

        {/* {isActive && !isWeekend && ( */}


          <View style={{ gap: 16 }}>
            <Text style={{ 
              fontSize: 14, 
              color: colors.textSecondary, 
              marginBottom: 4 
            }}>
              Add your available time slots (e.g., 9:00 AM)
            </Text>

            <Controller
              control={control}
              name={day}
              render={({ field: { value } }) => (
                <>
                  {value.map((slot, index) => (
                    <View
                      key={index}
                      style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                    >
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <View style={{ flex: 1 }}>
                            <Controller
                              control={control}
                              name={`${day}.${index}.start`}
                              rules={{
                                required: 'Start time is required',
                                validate: validateTimeFormat,
                              }}
                              render={({ field: { onChange, value } }) => (
                                <View>
                                  <TextInput
                                    style={{
                                      borderWidth: 1,
                                      borderRadius: 6,
                                      padding: 12,
                                      color: colors.text,
                                      backgroundColor: colors.inputBg,
                                      borderColor: errors[day]?.[index]?.start
                                        ? colors.danger
                                        : colors.border,
                                    }}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="e.g., 9:00 AM"
                                    placeholderTextColor={colors.textSecondary}
                                  />
                                  {errors[day]?.[index]?.start && (
                                    <Text style={{ color: colors.danger, fontSize: 12, marginTop: 4 }}>
                                      {errors[day][index].start.message}
                                    </Text>
                                  )}
                                </View>
                              )}
                            />
                          </View>

                          <View style={{ flex: 1 }}>
                            <Controller
                              control={control}
                              name={`${day}.${index}.end`}
                              rules={{
                                required: 'End time is required',
                                validate: (value, formValues) => {
                                  const formatResult = validateTimeFormat(value);
                                  if (formatResult !== true) return formatResult;

                                  const startTime = formValues[day][index].start;
                                  return validateTimeOrder(startTime, value) || true;
                                },
                              }}
                              render={({ field: { onChange, value } }) => (
                                <View>
                                  <TextInput
                                    style={{
                                      borderWidth: 1,
                                      borderRadius: 6,
                                      padding: 12,
                                      color: colors.text,
                                      backgroundColor: colors.inputBg,
                                      borderColor: errors[day]?.[index]?.end
                                        ? colors.danger
                                        : colors.border,
                                    }}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="e.g., 5:00 PM"
                                    placeholderTextColor={colors.textSecondary}
                                  />
                                  {errors[day]?.[index]?.end && (
                                    <Text style={{ color: colors.danger, fontSize: 12, marginTop: 4 }}>
                                      {errors[day][index].end.message}
                                    </Text>
                                  )}
                                </View>
                              )}
                            />
                          </View>

                          {value.length > 1 && (
                            <TouchableOpacity
                              onPress={() => removeTimeSlot(day, index)}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: colors.removeButtonBg,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Text style={{ color: colors.removeButtonText, fontWeight: 'bold' }}>-</Text>
                            </TouchableOpacity>
                          )}
                        </View>

                        {/* Check for collisions with other slots */}
                        {checkTimeCollisions(day, index) && (
                          <Text style={{ color: colors.danger, fontSize: 12, marginTop: 4 }}>
                            {checkTimeCollisions(day, index)}
                          </Text>
                        )}
                      </View>
                    </View>
                  ))}
                </>
              )}
            />

            <TouchableOpacity
              onPress={() => addTimeSlot(day)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.addButtonBg,
                padding: 12,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: colors.addButtonText, fontWeight: '600' }}>
                + Add Another Time Slot
              </Text>
            </TouchableOpacity>
          </View>

        {/* // )} */}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Text style={{ 
          fontSize: 24, 
          fontWeight: 'bold', 
          color: colors.text, 
          marginBottom: 8 
        }}>
          Weekly Schedule
        </Text>
        <Text style={{ 
          color: colors.textSecondary, 
          marginBottom: 24 
        }}>
          Please set your available time slots for each day
        </Text>

        <DaySchedule
          day="sunday"
          displayName="sunday"
          isActive={activeDays.sunday}
          onToggle={() => toggleDay('sunday')}
        />

        <DaySchedule
          day="monday"
          displayName="monday"
          isActive={activeDays.monday}
          onToggle={() => toggleDay('monday')}
        />

        <DaySchedule
          day="tuesday"
          displayName="tuesday"
          isActive={activeDays.tuesday}
          onToggle={() => toggleDay('tuesday')}
        />

        <DaySchedule
          day="wednesday"
          displayName="wednesday"
          isActive={activeDays.wednesday}
          onToggle={() => toggleDay('wednesday')}
        />

        <DaySchedule
          day="thursday"
          displayName="thursday"
          isActive={activeDays.thursday}
          onToggle={() => toggleDay('thursday')}
        />

        <DaySchedule
          day="friday"
          displayName="friday"
          isActive={activeDays.friday}
          onToggle={() => toggleDay('friday')}
        />

        <DaySchedule
          day="saturday"
          displayName="saturday"
          isActive={activeDays.saturday}
          onToggle={() => toggleDay('saturday')}
        />

        <TouchableOpacity
          style={{
            backgroundColor: colors.saveButtonBg,
            borderRadius: 8,
            padding: 16,
            marginTop: 24,
          }}
          onPress={saveSchedule}
        >
          <Text style={{ 
            color: '#fff', 
            textAlign: 'center', 
            fontWeight: '600', 
            fontSize: 18 
          }}>
            Save Schedule
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default WeeklyScheduleTime;