// /* eslint-disable react-native/no-inline-styles */
// // import { View, Text } from 'react-native';
// import React from 'react';
// import ThemedView from '../utils/ThemedView';
// import ThemedText3 from '../utils/ThemedText3';
// // import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { useThemeColor } from '../utils/useThemeColor';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import {
//   Coffee,
//   Tv,
//   Bed,
//   Utensils,
//   Clock,
//   Paw,
//   MugHot,
//   // any others you can find in Lucide
//   // Some icons might not exist; you'll need alternatives
// } from "lucide-react-native"; // or "lucide-react" for web

// const iconMap = {
//   coffee: Coffee,
//   tv: Tv,
//   bed: Bed,
//   utensils: Utensils,
//   clock: Clock,
//   paw: Paw,
//   "mug-hot": MugHot,
//   // fallback icons or alternatives:
//   "parking": Tv,           // example fallback
//   "swimming-pool": Bed,    // example fallback
//   "concierge-bell": Clock,
//   tshirt: Coffee,
//   spa: Utensils,
//   "shuttle-van": Clock,
//   "ban": Tv,
//   "smoking-ban": Tv,
//   "times-circle": Clock,
// };

// const Feature = ({ item }) => {
//   const { icon3 } = useThemeColor();
// console.log(item);
//  const IconComponent = iconMap[feature.icon] || Tv; // default icon
//   return (
//     <ThemedView
//       styles="border border-zinc-100 px-1 rounded-3xl  justify-center items-center"
//       style={{
//         shadowColor: '#a1a1aa',
//         shadowOffset: {
//           width: 0,
//           height: 4,
//         },
//         shadowOpacity: 0.3,
//         shadowRadius: 4,

//         // Android shadow
//         elevation: 8,
//         width: responsiveWidth(24),
//         height: responsiveHeight(12),
//         gap: responsiveHeight(1)
//       }}
//     >
//       {/* <FontAwesome5 name={item.icon} size={20} color={icon3} /> */}
//       <ThemedText3 styles="text-center">{item.title}</ThemedText3>
//     </ThemedView>
//   );
// };

// export default Feature;

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import ThemedView from '../utils/ThemedView';
import ThemedText3 from '../utils/ThemedText3';
import { useThemeColor } from '../utils/useThemeColor';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  Coffee,
  Tv,
  Bed,
  Utensils,
  Clock,
  Paw,
  MugHot,
  Car,
  Waves,
  Shirt,
  Sprout,
  Ban,
  XCircle,
  Bell,
  Snowflake,
} from 'lucide-react-native';

// Improved icon mapping with more appropriate icons
const iconMap = {
  snowflake: Snowflake,
  coffee: Coffee,
  tv: Tv,
  bed: Bed,
  utensils: Utensils,
  clock: Clock,
  paw: Paw,
  'mug-hot': MugHot,
  parking: Car, // More appropriate icon for parking
  'swimming-pool': Waves, // More appropriate icon for pool
  'concierge-bell': Bell,
  tshirt: Shirt, // More appropriate icon for laundry
  spa: Sprout, // More appropriate icon for spa
  'shuttle-van': Car, // Using Car as alternative for shuttle
  ban: Ban,
  'smoking-ban': Ban,
  'times-circle': XCircle,
};

const Feature = ({ item }) => {
  const { icon3 } = useThemeColor();

  // Use item.icon instead of feature.icon
  const IconComponent = iconMap[item.icon] || Tv; // default to Tv if icon not found

  return (
    <ThemedView
      styles="border border-zinc-100 px-1 rounded-3xl justify-center items-center"
      style={{
        shadowColor: '#a1a1aa',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
        width: responsiveWidth(26),
        height: responsiveHeight(14),
        gap: responsiveHeight(1),
      }}
    >
      {/* Render the Lucide icon */}
      <IconComponent size={20} color={icon3} />
      <ThemedText3 styles="text-center">{item.title}</ThemedText3>
    </ThemedView>
  );
};

export default Feature;
