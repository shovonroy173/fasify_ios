/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  useColorScheme,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import SalesChart from '../../../components/DefaultBar';
import ThemedView from '../../../utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useThemeColor } from '../../../utils/useThemeColor';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemedText from '../../../utils/ThemedText';
import ActiveListingCard from '../../../components/ActiveListingCard';
import { useNavigation } from '@react-navigation/native';
import { activeListing } from '../../../../assets/data/data';
import { useFormContext } from 'react-hook-form';

const ProviderDashboardScreen = () => {
  const { icon2 } = useThemeColor();
  const theme = useColorScheme();
  const navigation = useNavigation();
  const { getValues } = useFormContext();
  const { businessType } = getValues();
  console.log(businessType);

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      <ScrollView
        className="flex-1 "
        contentContainerStyle={{
          // paddingHorizontal: responsiveWidth(6),
          // paddingTop: responsiveHeight(5),
          // paddingBottom: responsiveHeight(10), // Ensure bottom space for scrolling
          gap: responsiveHeight(5),
        }}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView styles="flex-row items-center justify-between">
          <ThemedView styles="flex-row items-center gap-3">
            {/* <Pressable onPress={() => navigation.navigate('UserProfile')}> */}
            <Image
              source={require('../../../../assets/images/user.png')}
              style={{
                width: responsiveWidth(13),
                height: responsiveWidth(13),
                borderRadius: 100,
                borderWidth: 1,
                borderColor: theme === 'dark' ? '#000000' : '#ffffff',
              }}
            />

            <ThemedView>
              <ThemedText styles="font-Regular text-md">Hi there,</ThemedText>
              <ThemedText styles="font-Bold text-xl">Welcome Back</ThemedText>
            </ThemedView>
          </ThemedView>

          <Pressable
          //  onPress={() => navigation.navigate('UserNotification')}
          >
            {/* <ThemedViewLightBlue styles="p-2 rounded-full"> */}
            {/* <Ionicons name="notifications-outline" size={24} color={icon2} /> */}
            {/* </ThemedViewLightBlue> */}
          </Pressable>
        </ThemedView>

        <SalesChart />

        <FlatList
          data={activeListing}
          renderItem={({ item }) => (
            <ActiveListingCard
              key={item.id}
              item={item}
              name={'selectedActiveListing'}
              navigation={navigation}
              path="ProviderActiveListingDetail"
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: responsiveHeight(2),
            gap: responsiveHeight(2),
          }}
        />
        {/* <FlatList
        data={carBooking}
        renderItem={({ item }) => (

          <AvailableCarDefault
            key={item.id}
            item={item}
            name="selectedCar"
            navigation={navigation}
            // path="UserCarDetail"
          />
        )}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(4),
          gap: responsiveHeight(5),
        }}
      /> */}
      </ScrollView>
    </ThemedView>
  );
};

export default ProviderDashboardScreen;

// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   useColorScheme,
//   Pressable,
//   ScrollView,
// } from 'react-native';
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import { useNavigation } from '@react-navigation/native';
// import { useFormContext } from 'react-hook-form';

// import SalesChart from '../../../components/DefaultBar';
// import ThemedView from '../../../utils/ThemedView';
// import ThemedText from '../../../utils/ThemedText';
// import ThemedText3 from '../../../utils/ThemedText3';
// import { useThemeColor } from '../../../utils/useThemeColor';
// import { securityRecentBookings } from '../../../../assets/data/data';
// import SingleSecurityBookingDefault from '../../../components/SingleSecurityBookingDefault';

// const ProviderDashboardScreen = () => {
//   const theme = useColorScheme();
//   const { icon2, icon3 } = useThemeColor();
//   const navigation = useNavigation();
//   const { getValues } = useFormContext();
//   const { businessType } = getValues();
//   console.log(businessType);

//   return (
//     <ThemedView
//       styles="flex-1"
//       style={{
//         paddingHorizontal: responsiveWidth(6),
//         paddingVertical: responsiveHeight(5),
//         gap: responsiveHeight(5),
//       }}
//     >
//       <ScrollView
//         className="flex-1 "
//         contentContainerStyle={{
//           // paddingHorizontal: responsiveWidth(6),
//           // paddingTop: responsiveHeight(5),
//           // paddingBottom: responsiveHeight(10), // Ensure bottom space for scrolling
//           gap: responsiveHeight(5),
//         }}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Header */}
//         <View className="flex-row items-center justify-between">
//           <View className="flex-row items-center gap-3">
//             <Image
//               source={require('../../../../assets/images/user.png')}
//               style={{
//                 width: responsiveWidth(13),
//                 height: responsiveWidth(13),
//                 borderRadius: 100,
//                 borderWidth: 1,
//                 borderColor: theme === 'dark' ? '#000000' : '#ffffff',
//               }}
//             />
//             <View>
//               <ThemedText styles="font-Regular text-md">Hi there,</ThemedText>
//               <ThemedText styles="font-Bold text-xl">Welcome Back</ThemedText>
//             </View>
//           </View>

//           <Pressable
//           // onPress={() => navigation.navigate('UserNotification')}
//           >
//             <Ionicons name="notifications-outline" size={24} color={icon2} />
//           </Pressable>
//         </View>

//         {/* Chart */}
//         <SalesChart />

//         {/* Recent Bookings */}
//         <View className="gap-2">
//           <View className="flex-row justify-between items-center">
//             <ThemedText styles="text-lg font-SemiBold">Recent</ThemedText>
//             <View className="flex-row items-center gap-1">
//               <ThemedText3 styles="font-Medium text-sm">See All</ThemedText3>
//               <Entypo name="chevron-small-right" size={24} color={icon3} />
//             </View>
//           </View>

//           {securityRecentBookings.map(item => (
//             <SingleSecurityBookingDefault key={item.id} booking={item} />
//           ))}
//         </View>
//       </ScrollView>
//     </ThemedView>
//   );
// };

// export default ProviderDashboardScreen;
