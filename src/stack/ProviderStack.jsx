import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProviderSelectBusinessType from "@/screens/home/buisnessHome/ProviderSelectBusinessType";
import ProviderHotelSetupStack from "./ProviderHotelSetupStack";
import ProviderCarSetupStack from "./ProviderCarSetupStack";
import ProviderSecuritySetupStack from "./ProviderSecuritySetupStack";
import BottomTabNavigatorProvider from "@/screens/home/buisnessHome/BottomTabNavigatorProvider";
import ProviderEditProfileScreen from "@/screens/profile/providerProfile/ProviderEditProfileScreen";
import UserSettingStack from "./UserSettingStack";
import UpcomingScreen from "@/screens/UpcomingScreen";
import NotificationScreen from "@/screens/NotificationScreen";
import UserMyVoucherScreen from "@/screens/userSetting/UserMyVoucherScreen";
import ProviderAttractionSetupStack from "./ProviderAttractionSetupStack";
import { getBusinessType } from "@/utils/getBusinessType";
import { useSelector } from "react-redux";

const ProviderStack = () => {
  const Stack = createNativeStackNavigator();
  const res = useSelector((state) => state.auth.res);
  const user = useSelector((state) => state.auth.user);
  // console.log("LINE AT 18", res, getBusinessType(res), user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {getBusinessType(res) ? (
        <>
          <Stack.Screen
            name="ProviderBottomTab"
            component={BottomTabNavigatorProvider}
          />
          <Stack.Screen
            name="ProviderEditProfile"
            component={ProviderEditProfileScreen}
          />
          <Stack.Screen name="UserSetting" component={UserSettingStack} />
          {/* default */}
          <Stack.Screen name="UserUpcoming" component={UpcomingScreen} />

          <Stack.Screen
            name="UserNotification"
            component={NotificationScreen}
          />

          <Stack.Screen name="UserVoucher" component={UserMyVoucherScreen} />
        </>
      ) : (
        <>
    
       
          <Stack.Screen
            name="ProviderHome"
            component={ProviderSelectBusinessType}
          />
          <Stack.Screen
            name="ProviderHotelSetup"
            component={ProviderHotelSetupStack}
          />
          <Stack.Screen
            name="ProviderCarSetup"
            component={ProviderCarSetupStack}
          />
          <Stack.Screen
            name="ProviderSecuritySetup"
            component={ProviderSecuritySetupStack}
          />
          <Stack.Screen
            name="ProviderAttractionSetup"
            component={ProviderAttractionSetupStack}
          />
          
          <Stack.Screen
            name="ProviderBottomTab"
            component={BottomTabNavigatorProvider}
          />
          <Stack.Screen
            name="ProviderEditProfile"
            component={ProviderEditProfileScreen}
          />
          <Stack.Screen name="UserSetting" component={UserSettingStack} />
          {/* default */}
          <Stack.Screen name="UserUpcoming" component={UpcomingScreen} />

          <Stack.Screen
            name="UserNotification"
            component={NotificationScreen}
          />

          <Stack.Screen name="UserVoucher" component={UserMyVoucherScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ProviderStack;

// import React, { useState, useEffect } from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useSelector } from "react-redux";
// import { View, ActivityIndicator } from "react-native";
// import ProviderSelectBusinessType from "@/screens/home/buisnessHome/ProviderSelectBusinessType";
// import ProviderHotelSetupStack from "./ProviderHotelSetupStack";
// import ProviderCarSetupStack from "./ProviderCarSetupStack";
// import ProviderSecuritySetupStack from "./ProviderSecuritySetupStack";
// import BottomTabNavigatorProvider from "@/screens/home/buisnessHome/BottomTabNavigatorProvider";
// import ProviderEditProfileScreen from "@/screens/profile/providerProfile/ProviderEditProfileScreen";
// import UserSettingStack from "./UserSettingStack";
// import UpcomingScreen from "@/screens/UpcomingScreen";
// import NotificationScreen from "@/screens/NotificationScreen";
// import UserMyVoucherScreen from "@/screens/userSetting/UserMyVoucherScreen";
// import ProviderAttractionSetupStack from "./ProviderAttractionSetupStack";
// import { getBusinessType } from "@/utils/getBusinessType";

// const ProviderStack = () => {
//   const Stack = createNativeStackNavigator();
//   const res = useSelector((state) => state.auth.res);
//   const user = useSelector((state) => state.auth.user);

//   // ✅ Local loading state management
//   const [isLoading, setIsLoading] = useState(true);

//   console.log("LINE AT 18", res, getBusinessType(res), user);

//   // ✅ Handle loading state based on res availability
//   useEffect(() => {
//     // If res exists (even with empty values), we're not loading anymore
//     if (res !== undefined && res !== null) {
//       setIsLoading(false);
//     } else {
//       // If res is null/undefined, wait a bit then show content
//       const timer = setTimeout(() => {
//         setIsLoading(false);
//       }, 1000); // 1 second fallback

//       return () => clearTimeout(timer);
//     }
//   }, [res]);

//   // ✅ Show loading indicator only briefly
//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   // ✅ Check if user has completed business setup
//   // Using safe check in case res is null/undefined
//   const hasBusinessType = res && (res.isHotel || res.isCar || res.isSecurity || res.isAttraction);

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {/* If user has completed business setup, show main app */}
//       {hasBusinessType ? (
//         <>
//           <Stack.Screen
//             name="ProviderBottomTab"
//             component={BottomTabNavigatorProvider}
//           />
//           <Stack.Screen
//             name="ProviderEditProfile"
//             component={ProviderEditProfileScreen}
//           />
//           <Stack.Screen name="UserSetting" component={UserSettingStack} />
//           <Stack.Screen name="UserUpcoming" component={UpcomingScreen} />
//           <Stack.Screen
//             name="UserNotification"
//             component={NotificationScreen}
//           />
//           <Stack.Screen name="UserVoucher" component={UserMyVoucherScreen} />
//         </>
//       ) : (
//         // User needs to complete business setup
//         // This will handle both cases: res exists but no business type, and res is null/undefined
//         <>
//           <Stack.Screen
//             name="ProviderHome"
//             component={ProviderSelectBusinessType}
//           />
//           <Stack.Screen
//             name="ProviderHotelSetup"
//             component={ProviderHotelSetupStack}
//           />
//           <Stack.Screen
//             name="ProviderCarSetup"
//             component={ProviderCarSetupStack}
//           />
//           <Stack.Screen
//             name="ProviderSecuritySetup"
//             component={ProviderSecuritySetupStack}
//           />
//           <Stack.Screen
//             name="ProviderAttractionSetup"
//             component={ProviderAttractionSetupStack}
//           />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// };

// export default ProviderStack;
