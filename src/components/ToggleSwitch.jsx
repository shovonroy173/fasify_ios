/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react';
// import { View, Pressable, Text } from 'react-native';
// import { Controller } from 'react-hook-form';
// import { useColorScheme } from 'react-native';

// const ToggleSwitch = ({ name, control, label }) => {
//   const theme = useColorScheme();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       defaultValue={false}
//       render={({ field: { value, onChange } }) => (
//         <View className="flex-row items-center justify-between ">

//           <Pressable
//             onPress={() => onChange(!value)}
//             className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
//               value ? 'bg-blue-500' : 'bg-zinc-300'
//             }`}
//           >
//             <View
//               className={`w-4 h-4 rounded-full bg-white transform ${
//                 value ? 'translate-x-6' : 'translate-x-0'
//               }`}
//             />
//           </Pressable>
//         </View>
//       )}
//     />
//   );
// };

// export default ToggleSwitch;

// import React from 'react';
// import { View, Pressable, Text, Linking, Alert, Platform } from 'react-native';
// import { Controller } from 'react-hook-form';
// import { useColorScheme } from 'react-native';

// const ToggleSwitch = ({ name, control, label }) => {
//   const theme = useColorScheme();

//   const openLocationSettings = async () => {
//     try {
//       if (Platform.OS === 'ios') {
//         // For iOS
//         await Linking.openURL('App-Prefs:Privacy&path=LOCATION');
//       } else {
//         // For Android
//         await Linking.openSettings();
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to open settings');
//       console.error('Error opening settings:', error);
//     }
//   };

//   const handleToggle = (value, onChange) => {
//     if (!value) {
//       // If turning on, request to open location settings
//       Alert.alert(
//         'Location Access Required',
//         'This app needs location access to function properly. Would you like to open settings to enable location?',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Open Settings', onPress: openLocationSettings }
//         ]
//       );
//     }
//     onChange(!value);
//   };

//   return (
//     <Controller
//       name={name}
//       control={control}
//       defaultValue={false}
//       render={({ field: { value, onChange } }) => (
//         <View className="flex-row items-center justify-between">
//           <Text className="text-base text-gray-800 dark:text-gray-200">{label}</Text>

//           <Pressable
//             onPress={() => handleToggle(value, onChange)}
//             className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
//               value ? 'bg-blue-500' : 'bg-zinc-300'
//             }`}
//           >
//             <View
//               className={`w-4 h-4 rounded-full bg-white transform ${
//                 value ? 'translate-x-6' : 'translate-x-0'
//               }`}
//             />
//           </Pressable>
//         </View>
//       )}
//     />
//   );
// };

// export default ToggleSwitch;

// import React from 'react';
// import {
//   View,
//   Pressable,
//   Text,
//   Linking,
//   Alert,
//   PermissionsAndroid,
// } from 'react-native';
// import { Controller } from 'react-hook-form';
// import { useColorScheme } from 'react-native';

// const ToggleSwitch = ({ name, control, label }) => {
//   const theme = useColorScheme();

//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Location Permission',
//           message:
//             'This app needs access to your location to function properly.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );

//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         return true;
//       } else {
//         Alert.alert(
//           'Permission Required',
//           'Please enable location permissions in settings.',
//           [
//             { text: 'Cancel', style: 'cancel' },
//             {
//               text: 'Open Settings',
//               onPress: () => Linking.openSettings(),
//             },
//           ],
//         );
//         return false;
//       }
//     } catch (error) {
//       console.error('Error requesting location permission:', error);
//       return false;
//     }
//   };

//   const handleToggle = async (value, onChange) => {
//     if (!value) {
//       console.log(value);

//       const granted = await requestLocationPermission();
//       onChange(granted);
//       console.log("LINE AT 161", granted);

//     } else {
//       onChange(false);
//     }
//   };

//   return (
//     <Controller
//       name={name}
//       control={control}
//       defaultValue={false}
//       render={({ field: { value, onChange } }) => (
//         <View className="flex-row items-center justify-between">
//           <Text className="text-base text-gray-800 dark:text-gray-200">
//             {label}
//           </Text>

//           <Pressable
//             onPress={() => handleToggle(value, onChange)}
//             className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
//               value ? 'bg-blue-500' : 'bg-zinc-300'
//             }`}
//           >
//             <View
//               className={`w-4 h-4 rounded-full bg-white transform ${
//                 value ? 'translate-x-6' : 'translate-x-0'
//               }`}
//             />
//           </Pressable>
//         </View>
//       )}
//     />
//   );
// };

// export default ToggleSwitch;

// import React from 'react';
// import {
//   View,
//   Pressable,
//   Text,
//   Linking,
//   Alert,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import { Controller } from 'react-hook-form';
// import { useColorScheme } from 'react-native';

// const ToggleSwitch = ({ name, control, label }) => {
//   const theme = useColorScheme();

//   const checkLocationServices = async () => {
//     try {
//       // For Android, we need to check if location services are enabled
//       // This is a simplified approach - you might need a more robust solution
//       const isLocationEnabled = await checkAndroidLocationServices();
//       return isLocationEnabled;
//     } catch (error) {
//       console.error('Error checking location services:', error);
//       return false;
//     }
//   };

//   const checkAndroidLocationServices = async () => {
//     // This is a basic check - you might want to use a library like
//     // react-native-location-enabler for more reliable detection
//     try {
//       // Try to get current position as a way to check if location services are enabled
//       // This will fail if location services are disabled
//       return new Promise((resolve) => {
//         navigator.geolocation.getCurrentPosition(
//           () => resolve(true),
//           (error) => {
//             if (error.code === error.PERMISSION_DENIED || error.code === error.POSITION_UNAVAILABLE) {
//               resolve(false);
//             } else {
//               resolve(false);
//             }
//           },
//           { enableHighAccuracy: false, timeout: 1000, maximumAge: 10000 }
//         );
//       });
//     } catch (error) {
//       return false;
//     }
//   };

//   const openLocationSettings = () => {
//     // Open location settings for Android
//     Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS')
//       .catch(() => {
//         // Fallback to general settings if specific intent fails
//         Linking.openSettings();
//       });
//   };

//   const requestLocationPermission = async () => {
//     try {
//       // First check if we have permission
//       const hasPermission = await PermissionsAndroid.check(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//       );

//       if (hasPermission) {
//         // Check if location services are enabled
//         const isLocationEnabled = await checkLocationServices();

//         if (!isLocationEnabled) {
//           Alert.alert(
//             'Location Services Disabled',
//             'Please enable location services (GPS) on your device to use this feature.',
//             [
//               { text: 'Cancel', style: 'cancel' },
//               {
//                 text: 'Enable Location',
//                 onPress: openLocationSettings,
//               },
//             ]
//           );
//           return false;
//         }
//         return true;
//       }

//       // Request permission if we don't have it
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Location Permission',
//           message: 'This app needs access to your location to function properly.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         }
//       );

//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         // Check if location services are enabled after getting permission
//         const isLocationEnabled = await checkLocationServices();

//         if (!isLocationEnabled) {
//           Alert.alert(
//             'Location Services Disabled',
//             'Please enable location services (GPS) on your device.',
//             [
//               { text: 'Cancel', style: 'cancel' },
//               {
//                 text: 'Enable Location',
//                 onPress: openLocationSettings,
//               },
//             ]
//           );
//           return false;
//         }
//         return true;
//       } else {
//         Alert.alert(
//           'Permission Required',
//           'Please enable location permissions in settings.',
//           [
//             { text: 'Cancel', style: 'cancel' },
//             {
//               text: 'Open Settings',
//               onPress: () => Linking.openSettings(),
//             },
//           ]
//         );
//         return false;
//       }
//     } catch (error) {
//       console.error('Error requesting location permission:', error);
//       return false;
//     }
//   };

//   const handleToggle = async (value, onChange) => {
//     if (!value) {
//       const granted = await requestLocationPermission();
//       onChange(granted);
//     } else {
//       onChange(false);
//     }
//   };

//   return (
//     <Controller
//       name={name}
//       control={control}
//       defaultValue={false}
//       render={({ field: { value, onChange } }) => (
//         <View className="flex-row items-center justify-between">
//           <Text className="text-base text-gray-800 dark:text-gray-200">
//             {label}
//           </Text>

//           <Pressable
//             onPress={() => handleToggle(value, onChange)}
//             className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
//               value ? 'bg-blue-500' : 'bg-zinc-300'
//             }`}
//           >
//             <View
//               className={`w-4 h-4 rounded-full bg-white transform ${
//                 value ? 'translate-x-6' : 'translate-x-0'
//               }`}
//             />
//           </Pressable>
//         </View>
//       )}
//     />
//   );
// };

// export default ToggleSwitch;

// import React from 'react';
// import {
//   View,
//   Pressable,
//   Text,
//   Linking,
//   Alert,
//   PermissionsAndroid,
// } from 'react-native';
// import { Controller } from 'react-hook-form';
// import { useColorScheme } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';

// const ToggleSwitch = ({ name, control, label }) => {
//   const theme = useColorScheme();

//   const checkLocationServices = () => {
//     return new Promise((resolve) => {
//       Geolocation.getCurrentPosition(
//         () => resolve(true), // Success - GPS is enabled
//         (error) => {
//           // Error - GPS might be disabled
//           console.log('GPS error code:', error.code);
//           resolve(false);
//         },
//         {
//           enableHighAccuracy: false,
//           timeout: 2000,
//           maximumAge: 1000
//         }
//       );
//     });
//   };

//   const openLocationSettings = () => {
//     Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS')
//       .catch(() => {
//         Linking.openSettings();
//       });
//   };

//   const enableGPSAndRequestPermission = async () => {
//     try {
//       // First check if we already have permission
//       const hasPermission = await PermissionsAndroid.check(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//       );

//       if (hasPermission) {
//         // Check if GPS is enabled
//         const isGPSEnabled = await checkLocationServices();

//         if (isGPSEnabled) {
//           return true; // Both permission and GPS are enabled
//         } else {
//           // GPS is off but we have permission
//           Alert.alert(
//             'GPS Required',
//             'Please turn on GPS to use location features.',
//             [
//               { text: 'Cancel', style: 'cancel' },
//               {
//                 text: 'Turn On GPS',
//                 onPress: openLocationSettings,
//               },
//             ]
//           );
//           return false;
//         }
//       }

//       // Request location permission
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Location Permission',
//           message: 'This app needs access to your location to function properly.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         }
//       );

//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         // Check if GPS is enabled after getting permission
//         const isGPSEnabled = await checkLocationServices();

//         if (isGPSEnabled) {
//           return true; // Both permission and GPS are enabled
//         } else {
//           // We have permission but GPS is off
//           Alert.alert(
//             'GPS Required',
//             'Location permission granted! Now please turn on GPS to use location features.',
//             [
//               { text: 'Cancel', style: 'cancel' },
//               {
//                 text: 'Turn On GPS',
//                 onPress: openLocationSettings,
//               },
//             ]
//           );
//           return false;
//         }
//       } else {
//         // Permission denied
//         Alert.alert(
//           'Permission Required',
//           'Location permission is needed to use this feature.',
//           [
//             { text: 'Cancel', style: 'cancel' },
//             {
//               text: 'Open Settings',
//               onPress: () => Linking.openSettings(),
//             },
//           ]
//         );
//         return false;
//       }
//     } catch (error) {
//       console.error('Error in location setup:', error);
//       return false;
//     }
//   };

//   const handleToggle = async (value, onChange) => {
//     if (!value) {
//       // Trying to turn ON - check if GPS is actually enabled
//       const isGPSEnabled = await checkLocationServices();

//       if (isGPSEnabled) {
//         // GPS is on, check permission
//         const hasPermission = await PermissionsAndroid.check(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );

//         if (hasPermission) {
//           onChange(true); // Both GPS and permission are enabled
//         } else {
//           // GPS is on but no permission - request it
//           const granted = await enableGPSAndRequestPermission();
//           onChange(granted);
//         }
//       } else {
//         // GPS is off - guide user to enable it
//         const success = await enableGPSAndRequestPermission();
//         onChange(success);
//       }
//     } else {
//       // Turning OFF - just update the state
//       onChange(false);
//     }
//   };

//   return (
//     <Controller
//       name={name}
//       control={control}
//       defaultValue={false}
//       render={({ field: { value, onChange } }) => (
//         <View className="flex-row items-center justify-between">
//           <Text className="text-base text-gray-800 dark:text-gray-200">
//             {label}
//           </Text>

//           <Pressable
//             onPress={() => handleToggle(value, onChange)}
//             className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
//               value ? 'bg-blue-500' : 'bg-zinc-300'
//             }`}
//           >
//             <View
//               className={`w-4 h-4 rounded-full bg-white transform ${
//                 value ? 'translate-x-6' : 'translate-x-0'
//               }`}
//             />
//           </Pressable>
//         </View>
//       )}
//     />
//   );
// };

// export default ToggleSwitch;

// import React, { useEffect, useRef } from 'react';
// import {
//   View,
//   Pressable,
//   Text,
//   Linking,
//   Alert,
//   PermissionsAndroid,
//   AppState,
// } from 'react-native';
// import { Controller } from 'react-hook-form';
// import { useColorScheme } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';

// const ToggleSwitch = ({ name, control, label }) => {
//   const theme = useColorScheme();
//   const appState = useRef(AppState.currentState);
//   const pendingOnChange = useRef(null);
//   const checkInterval = useRef(null);

//   // Clean up on unmount
//   useEffect(() => {
//     const subscription = AppState.addEventListener('change', handleAppStateChange);

//     return () => {
//       if (checkInterval.current) {
//         clearInterval(checkInterval.current);
//       }
//       subscription.remove();
//     };
//   }, []);

//   const handleAppStateChange = async (nextAppState) => {
//     // Check if app is coming back from background (user returned from settings)
//     if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
//       console.log('App returned from background - checking GPS status');

//       if (pendingOnChange.current) {
//         // Wait a bit for GPS to initialize
//         setTimeout(async () => {
//           await checkGPSStatus(pendingOnChange.current);
//         }, 1000);
//       }
//     }
//     appState.current = nextAppState;
//   };

//   const checkGPSStatus = async (onChange) => {
//     try {
//       const isGPSEnabled = await checkLocationServices();
//       console.log('GPS status check:', isGPSEnabled);

//       if (isGPSEnabled) {
//         onChange(true);
//         pendingOnChange.current = null;
//         if (checkInterval.current) {
//           clearInterval(checkInterval.current);
//           checkInterval.current = null;
//         }
//       }
//     } catch (error) {
//       console.error('Error checking GPS status:', error);
//     }
//   };

//   const checkLocationServices = () => {
//     return new Promise((resolve) => {
//       // Use a timeout to prevent hanging
//       const timeout = setTimeout(() => {
//         resolve(false);
//       }, 3000);

//       Geolocation.getCurrentPosition(
//         (position) => {
//           clearTimeout(timeout);
//           resolve(true);
//         },
//         (error) => {
//           clearTimeout(timeout);
//           console.log('GPS error code:', error.code);
//           resolve(false);
//         },
//         {
//           enableHighAccuracy: false,
//           timeout: 2500,
//           maximumAge: 0
//         }
//       );
//     });
//   };

//   const openLocationSettings = () => {
//     Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS')
//       .catch(() => {
//         Linking.openSettings();
//       });
//   };

//   const startGPSCheckInterval = (onChange) => {
//     // Clear any existing interval
//     if (checkInterval.current) {
//       clearInterval(checkInterval.current);
//     }

//     // Start checking every 2 seconds
//     checkInterval.current = setInterval(async () => {
//       console.log('Interval GPS check');
//       await checkGPSStatus(onChange);
//     }, 2000);

//     // Stop checking after 30 seconds
//     setTimeout(() => {
//       if (checkInterval.current) {
//         clearInterval(checkInterval.current);
//         checkInterval.current = null;
//         console.log('GPS check interval stopped');

//         if (pendingOnChange.current) {
//           // Final check
//           checkGPSStatus(onChange);
//         }
//       }
//     }, 30000);
//   };

//   const checkPermissionAndGPS = async () => {
//     try {
//       // Check permission first
//       const hasPermission = await PermissionsAndroid.check(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//       );

//       if (!hasPermission) {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location to function properly.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           }
//         );

//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           return false;
//         }
//       }

//       // Check if GPS is enabled
//       const isGPSEnabled = await checkLocationServices();
//       return isGPSEnabled;

//     } catch (error) {
//       console.error('Error checking permission/GPS:', error);
//       return false;
//     }
//   };

//   const handleToggle = async (value, onChange) => {
//     console.log('Toggle pressed. Current value:', value);

//     if (!value) {
//       // Trying to turn ON
//       const isReady = await checkPermissionAndGPS();
//       console.log('Permission and GPS check result:', isReady);

//       if (isReady) {
//         onChange(true);
//       } else {
//         // GPS is off, guide user to enable it
//         pendingOnChange.current = onChange;

//         Alert.alert(
//           'Enable Location Services',
//           'Please turn on Location Services to use this feature.',
//           [
//             {
//               text: 'Cancel',
//               style: 'cancel',
//               onPress: () => {
//                 pendingOnChange.current = null;
//                 if (checkInterval.current) {
//                   clearInterval(checkInterval.current);
//                   checkInterval.current = null;
//                 }
//               }
//             },
//             {
//               text: 'Open Settings',
//               onPress: () => {
//                 openLocationSettings();
//                 // Start periodic GPS checks
//                 startGPSCheckInterval(onChange);
//               },
//             },
//           ]
//         );
//       }
//     } else {
//       // Turning OFF
//       console.log('Turning OFF location');
//       pendingOnChange.current = null;
//       if (checkInterval.current) {
//         clearInterval(checkInterval.current);
//         checkInterval.current = null;
//       }
//       onChange(false);
//     }
//   };

//   return (
//     <Controller
//       name={name}
//       control={control}
//       defaultValue={false}
//       render={({ field: { value, onChange } }) => (
//         <View className="flex-row items-center justify-between">
//           <Text className="text-base text-gray-800 dark:text-gray-200">
//             {label}
//           </Text>

//           <Pressable
//             onPress={() => handleToggle(value, onChange)}
//             className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
//               value ? 'bg-blue-500' : 'bg-zinc-300'
//             }`}
//           >
//             <View
//               className={`w-4 h-4 rounded-full bg-white transform ${
//                 value ? 'translate-x-6' : 'translate-x-0'
//               }`}
//             />
//           </Pressable>
//         </View>
//       )}
//     />
//   );
// };

// export default ToggleSwitch;

// import React, { useEffect, useRef } from 'react';
// import {
//   View,
//   Pressable,
//   Text,
//   Linking,
//   Alert,
//   PermissionsAndroid,
//   AppState,
// } from 'react-native';
// import { Controller } from 'react-hook-form';
// import { useColorScheme } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';

// const ToggleSwitch = ({ name, control, label }) => {
//   const theme = useColorScheme();
//   const appState = useRef(AppState.currentState);
//   const pendingOnChange = useRef(null);
//   const checkInterval = useRef(null);
//   const currentGPSState = useRef(false);

//   // Monitor GPS state continuously
//   useEffect(() => {
//     startGPSMonitoring();

//     return () => {
//       stopGPSMonitoring();
//     };
//   }, []);

//   const startGPSMonitoring = () => {
//     if (checkInterval.current) {
//       clearInterval(checkInterval.current);
//     }

//     // Check GPS status every 3 seconds
//     checkInterval.current = setInterval(async () => {
//       const isGPSEnabled = await checkLocationServices();
//       currentGPSState.current = isGPSEnabled;

//       console.log('Current GPS state:', isGPSEnabled);

//       // If we have a pending onChange and GPS state changed, update it
//       if (pendingOnChange.current && isGPSEnabled) {
//         pendingOnChange.current(true);
//         pendingOnChange.current = null;
//       }
//     }, 3000);
//   };

//   const stopGPSMonitoring = () => {
//     if (checkInterval.current) {
//       clearInterval(checkInterval.current);
//       checkInterval.current = null;
//     }
//   };

//   useEffect(() => {
//     const subscription = AppState.addEventListener(
//       'change',
//       handleAppStateChange,
//     );

//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   const handleAppStateChange = async nextAppState => {
//     if (
//       appState.current.match(/inactive|background/) &&
//       nextAppState === 'active'
//     ) {
//       console.log('App returned from background - checking GPS status');

//       // Restart monitoring when app comes back to foreground
//       startGPSMonitoring();

//       if (pendingOnChange.current) {
//         setTimeout(async () => {
//           await checkGPSStatus(pendingOnChange.current);
//         }, 1000);
//       }
//     }
//     appState.current = nextAppState;
//   };

//   const checkGPSStatus = async onChange => {
//     try {
//       const isGPSEnabled = await checkLocationServices();
//       console.log('GPS status check:', isGPSEnabled);

//       if (isGPSEnabled) {
//         onChange(true);
//         pendingOnChange.current = null;
//       }
//     } catch (error) {
//       console.error('Error checking GPS status:', error);
//     }
//   };

//   const checkLocationServices = () => {
//     return new Promise(resolve => {
//       const timeout = setTimeout(() => {
//         resolve(false);
//       }, 2000);

//       Geolocation.getCurrentPosition(
//         position => {
//           clearTimeout(timeout);
//           resolve(true);
//         },
//         error => {
//           clearTimeout(timeout);
//           console.log('GPS error code:', error.code);
//           resolve(false);
//         },
//         {
//           enableHighAccuracy: false,
//           timeout: 1500,
//           maximumAge: 0,
//         },
//       );
//     });
//   };

//   const openLocationSettings = () => {
//     Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS').catch(
//       () => {
//         Linking.openSettings();
//       },
//     );
//   };

//   const checkPermissionAndGPS = async () => {
//     try {
//       // Check permission first
//       const hasPermission = await PermissionsAndroid.check(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       );

//       if (!hasPermission) {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message:
//               'This app needs access to your location to function properly.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );

//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           Alert.alert(
//             'Permission Required',
//             'Location permission is needed to use this feature.',
//           );
//           return false;
//         }
//       }

//       // Check if GPS is enabled
//       const isGPSEnabled = await checkLocationServices();
//       return isGPSEnabled;
//     } catch (error) {
//       console.error('Error checking permission/GPS:', error);
//       return false;
//     }
//   };

//   const handleToggle = async (value, onChange) => {
//     console.log(
//       'Toggle pressed. Current value:',
//       value,
//       'Actual GPS state:',
//       currentGPSState.current,
//     );

//     if (!value) {
//       // Trying to turn ON
//       const isReady = await checkPermissionAndGPS();
//       console.log('Permission and GPS check result:', isReady);

//       if (isReady) {
//         onChange(true);
//       } else {
//         // GPS is off, guide user to enable it
//         pendingOnChange.current = onChange;

//         Alert.alert(
//           'Enable Location Services',
//           'Please turn on Location Services to use this feature.',
//           [
//             {
//               text: 'Cancel',
//               style: 'cancel',
//               onPress: () => {
//                 pendingOnChange.current = null;
//               },
//             },
//             {
//               text: 'Open Settings',
//               onPress: () => {
//                 openLocationSettings();
//               },
//             },
//           ],
//         );
//       }
//     } else {
//       // Turning OFF - Show options to disable GPS
//       Alert.alert(
//         'Disable Location',
//         'Do you want to turn off location services?',
//         [
//           {
//             text: 'Cancel',
//             style: 'cancel',
//             onPress: () => {
//               // Keep the toggle on since user canceled
//               onChange(true);
//             },
//           },
//           {
//             text: 'Turn Off GPS',
//             onPress: () => {
//               openLocationSettings();
//               // Set toggle to off immediately
//               onChange(false);
//             },
//           },
//           {
//             text: 'Just Disable for App',
//             onPress: () => {
//               // Only disable for this app, not system-wide
//               onChange(false);
//             },
//           },
//         ],
//       );
//     }
//   };

//   return (
//     <Controller
//       name={name}
//       control={control}
//       defaultValue={false}
//       render={({ field: { value, onChange } }) => (
//         <View className="flex-row items-center justify-between">
//           <Text className="text-base text-gray-800 dark:text-gray-200">
//             {label}
//           </Text>

//           <Pressable
//             onPress={() => handleToggle(value, onChange)}
//             className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
//               value ? 'bg-blue-500' : 'bg-zinc-300'
//             }`}
//           >
//             <View
//               className={`w-4 h-4 rounded-full bg-white transform ${
//                 value ? 'translate-x-6' : 'translate-x-0'
//               }`}
//             />
//           </Pressable>
//         </View>
//       )}
//     />
//   );
// };

// export default ToggleSwitch;

import React, { useEffect, useRef } from 'react';
import {
  View,
  Pressable,
  Text,
  Linking,
  Alert,
  PermissionsAndroid,
  AppState,
} from 'react-native';
import { Controller } from 'react-hook-form';
import Geolocation from '@react-native-community/geolocation';

const ToggleSwitch = ({ name, control, label }) => {
  const appState = useRef(AppState.currentState);
  const pendingOnChange = useRef(null);
  const checkInterval = useRef(null);
  const currentGPSState = useRef(false);

  // Monitor GPS state continuously
  useEffect(() => {
    startGPSMonitoring();

    return () => {
      stopGPSMonitoring();
    };
  }, []);

  const startGPSMonitoring = () => {
    if (checkInterval.current) {
      clearInterval(checkInterval.current);
    }

    // Check GPS status every 3 seconds
    checkInterval.current = setInterval(async () => {
      const isGPSEnabled = await checkLocationServices();
      currentGPSState.current = isGPSEnabled;

      // console.log('Current GPS state:', isGPSEnabled);

      // If we have a pending onChange and GPS state changed, update it
      if (pendingOnChange.current && isGPSEnabled) {
        pendingOnChange.current(true);
        pendingOnChange.current = null;
      }
    }, 1000);
  };

  const stopGPSMonitoring = () => {
    if (checkInterval.current) {
      clearInterval(checkInterval.current);
      checkInterval.current = null;
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // console.log('App returned from background - checking GPS status');

      // Restart monitoring when app comes back to foreground
      startGPSMonitoring();

      if (pendingOnChange.current) {
        setTimeout(async () => {
          await checkGPSStatus(pendingOnChange.current);
        }, 1000);
      }
    }
    appState.current = nextAppState;
  };

  const checkGPSStatus = async onChange => {
    try {
      const isGPSEnabled = await checkLocationServices();
      // console.log('GPS status check:', isGPSEnabled);

      if (isGPSEnabled) {
        onChange(true);
        pendingOnChange.current = null;
      }
    } catch (error) {
      // console.error('Error checking GPS status:', error);
    }
  };

  const checkLocationServices = () => {
    return new Promise(resolve => {
      const timeout = setTimeout(() => {
        resolve(false);
      }, 1000);

      Geolocation.getCurrentPosition(
        position => {
          clearTimeout(timeout);
          resolve(true);
        },
        error => {
          clearTimeout(timeout);
          // console.log('GPS error code:', error.code);
          resolve(false);
        },
        {
          enableHighAccuracy: false,
          timeout: 1000,
          maximumAge: 0,
        },
      );
    });
  };

  const openLocationSettings = () => {
    Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS').catch(
      () => {
        Linking.openSettings();
      },
    );
  };

  const checkPermissionAndGPS = async () => {
    try {
      // Check permission first
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (!hasPermission) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location to function properly.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Required',
            'Location permission is needed to use this feature.',
          );
          return false;
        }
      }

      // Check if GPS is enabled
      const isGPSEnabled = await checkLocationServices();
      return isGPSEnabled;
    } catch (error) {
      console.error('Error checking permission/GPS:', error);
      return false;
    }
  };

  const handleToggle = async (value, onChange) => {
    console.log(
      'Toggle pressed. Current value:',
      value,
      'Actual GPS state:',
      currentGPSState.current,
    );

    if (!value) {
      // Trying to turn ON
      const isReady = await checkPermissionAndGPS();
      console.log('Permission and GPS check result:', isReady);

      if (isReady) {
        onChange(true);
      } else {
        // GPS is off, guide user to enable it
        pendingOnChange.current = onChange;

        Alert.alert(
          'Enable Location Services',
          'Please turn on Location Services to use this feature.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => {
                pendingOnChange.current = null;
              },
            },
            {
              text: 'Open Settings',
              onPress: () => {
                openLocationSettings();
              },
            },
          ],
        );
      }
    } else {
      // Turning OFF - Show options to disable GPS
      Alert.alert(
        'Disable Location',
        'Do you want to turn off location services?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              // Keep the toggle on since user canceled
              onChange(true);
            },
          },
          {
            text: 'Turn Off GPS',
            onPress: () => {
              openLocationSettings();
              // Set toggle to off immediately
              onChange(false);
            },
          },
          {
            text: 'Just Disable for App',
            onPress: () => {
              // Only disable for this app, not system-wide
              onChange(false);
            },
          },
        ],
      );
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field: { value, onChange } }) => (
        <View className="flex-row items-center justify-between">
          <Text className="text-base text-gray-800 dark:text-gray-200">
            {label}
          </Text>

          <Pressable
            onPress={() => handleToggle(value, onChange)}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
              value ? 'bg-blue-500' : 'bg-zinc-300'
            }`}
          >
            <View
              className={`w-4 h-4 rounded-full bg-white transform ${
                value ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </Pressable>
        </View>
      )}
    />
  );
};

export default ToggleSwitch;
