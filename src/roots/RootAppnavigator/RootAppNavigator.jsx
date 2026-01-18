import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import ClientTypeHomeScreen from '../ClientTypeHomeScreen';
// import UserEditProfileScreen from '../../screens/profile/userProfile/UserEditProfileScreen';
import { useDispatch, useSelector } from 'react-redux';
// 
import AuthStack from '@/stack/AuthStack';
import { clearAuth, setFCMToken } from '@/redux/reducers/authReducer';
import { isTokenExpired } from '@/utils/isTokenExpired';
import { initializeFCM } from '@/utils/notificationService';
import ClientTypeHomeScreen from '../ClientTypeHomeScreen';
import UserEditProfileScreen from '@/screens/profile/userProfile/UserEditProfileScreen';

const RootAppNavigator = () => {
  const Stack = createNativeStackNavigator();
  // const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state?.auth?.token);
  // console.log('LINE AT 12', token);
  const dispatch = useDispatch();


  // useEffect(() => {
  //   let cleanupFunction = null;

  //   const initFCM = async () => {
  //     try {
  //       const result = await initializeFCM();
  //       if (result) {
  //         cleanupFunction = result.cleanup;
  //         // console.log('FCM Token:', result.token);
  //         dispatch(setFCMToken(result.token));
  //         // Send token to your backend
  //         // if (result.token) {
  //         //   // await api.saveFCMToken(userId, result.token);
  //         // }
  //       }
  //     } catch (error) {
  //       console.error('FCM initialization failed:', error);
  //     }
  //   };

  //   initFCM();

  //   // Cleanup on unmount
  //   return () => {
  //     if (cleanupFunction) {
  //       cleanupFunction();
  //     }
  //   };
  // }, [dispatch]);

  useEffect(() => {
    // Check immediately
    if (token && isTokenExpired(token)) {
      dispatch(clearAuth());
    }

    // Set up interval to check token expiration every second
    const interval = setInterval(() => {
      if (token && isTokenExpired(token)) {
        dispatch(clearAuth());
        // console.log('Token expired, redirecting to login');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [token, dispatch]);



  return (
    // <SafeAreaView className="flex-1">
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token && !isTokenExpired(token)  ? (
          <>
            <Stack.Screen
              name="ClientTypeHome"
              component={ClientTypeHomeScreen}
            />

            <Stack.Screen
              name="ProfileEdit"
              component={UserEditProfileScreen}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
         )} 
         {/* <Stack.Screen name="Auth" component={AuthStack} />*/}
        {/* <Stack.Screen name="ClientTypeHome" component={ClientTypeHomeScreen} />  */}
      </Stack.Navigator>
    // </SafeAreaView>
  );
};

export default RootAppNavigator;
