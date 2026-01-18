// // /* eslint-disable react-native/no-inline-styles */
// // import React from 'react';
// // import { useColorScheme, View } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// // import FontAwesome from 'react-native-vector-icons/FontAwesome';
// // import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// // import Feather from 'react-native-vector-icons/Feather';

// // import ThemedViewYellow from '../utils/ThemedViewYellow';
// // import ThemedText3 from '../utils/ThemedText3';
// // import ThemedText from '../utils/ThemedText';
// // import { responsiveWidth } from 'react-native-responsive-dimensions';
// // import ThemedText4 from '../utils/ThemeText4';

// // const iconLibraries = {
// //   Ionicons,
// //   MaterialCommunityIcons,
// //   FontAwesome,
// //   FontAwesome5,
// //   Feather,
// // };

// // const CarSpecification = ({ iconName, iconLibrary, label, value }) => {
// //   const IconComponent = iconLibraries[iconLibrary] || Feather;
// //   const theme = useColorScheme();

// //   return (
// //     <View
// //       style={{
// //         width: responsiveWidth(27),
// //         paddingVertical: 10,
// //         backgroundColor: theme === 'dark' ? '#fef08a' : '#fefce8',
// //       }}
// //       className="rounded-xl items-center border p-2 border-primary"
// //     >
// //       <IconComponent name={iconName} size={22} color="#6B7280" />
// //       <ThemedText3 styles="text-xs font-Medium mt-2 mb-1">{label}</ThemedText3>
// //       <ThemedText4 styles="font-SemiBold text-sm text-center">
// //         {value}
// //       </ThemedText4>
// //     </View>
// //   );
// // };

// // export default CarSpecification;


// /* eslint-disable react-native/no-inline-styles */
// import React from 'react';
// import { useColorScheme, View } from 'react-native';
// import { responsiveWidth } from 'react-native-responsive-dimensions';
// import ThemedText3 from '../utils/ThemedText3';
// import ThemedText4 from '../utils/ThemeText4';
// import { Car, Fuel, Gauge, Settings, Calendar, Cog, Info } from 'lucide-react-native'; // ✅ Lucide icons

// const iconMap = {
//   car: Car,
//   fuel: Fuel,
//   speed: Gauge,
//   settings: Settings,
//   year: Calendar,
//   engine: Cog,
//   info: Info,
// };

// const CarSpecification = ({ iconName = 'car', label, value }) => {
//   const theme = useColorScheme();
//   const IconComponent = iconMap[iconName] || Info; // fallback

//   return (
//     <View
//       style={{
//         width: responsiveWidth(27),
//         paddingVertical: 10,
//         backgroundColor: theme === 'dark' ? '#fef08a' : '#fefce8',
//       }}
//       className="rounded-xl items-center border p-2 border-primary"
//     >
//       <IconComponent size={22} color="#6B7280" strokeWidth={2} />
//       <ThemedText3 styles="text-xs font-Medium mt-2 mb-1">{label}</ThemedText3>
//       <ThemedText4 styles="font-SemiBold text-sm text-center">{value}</ThemedText4>
//     </View>
//   );
// };

// export default CarSpecification;


/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useColorScheme, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import ThemedText3 from '../utils/ThemedText3';
import ThemedText4 from '../utils/ThemeText4';
import { 
  Car, 
  Fuel, 
  Gauge, 
  Settings, 
  Calendar, 
  Cog, 
  Info, 
  Zap,
  Transmission,
  Palette,
  GaugeCircle,
  HardDrive
} from 'lucide-react-native';

const iconMap = {
  // Default fallback
  default: Info,
  
  // Specification-specific icons
  engine: Cog,
  transmission: Transmission,
  mileage: GaugeCircle,
  horsepower: Zap,
  drivetrain: HardDrive,
  color: Palette,
  
  // Alternative mappings if needed
  car: Car,
  fuel: Fuel,
  speed: Gauge,
  settings: Settings,
  year: Calendar,
  info: Info,
};

const CarSpecification = ({ iconName = 'default', label, value }) => {
  const theme = useColorScheme();
  const IconComponent = iconMap[iconName] || iconMap.default;
console.log('LINE ATY ', iconName);

  return (
    <View
      style={{
        width: responsiveWidth(27),
        paddingVertical: 10,
        backgroundColor: theme === 'dark' ? '#fef08a' : '#fefce8',
      }}
      className="rounded-xl items-center border p-2 border-primary"
    >
      <IconComponent size={22} color="#6B7280" strokeWidth={2} />
      <ThemedText3 styles="text-xs font-Medium mt-2 mb-1">{label}</ThemedText3>
      <ThemedText4 styles="font-SemiBold text-sm text-center">{value}</ThemedText4>
    </View>
  );
};

export default CarSpecification;