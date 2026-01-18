
// // services/fcmService.js
// import messaging from '@react-native-firebase/messaging';
// import { Platform, PermissionsAndroid, Alert } from 'react-native';

// let navigationRef = null;

// // Request notification permissions
// export const requestNotificationPermission = async () => {
//   if (Platform.OS === 'ios') {
//     const authStatus = await messaging().requestPermission();
//     return (
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL
//     );
//   } else if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (error) {
//       console.error('Permission error:', error);
//       return false;
//     }
//   }
//   return true;
// };

// // Get FCM token
// export const getFCMToken = async () => {
//   try {
//     await requestNotificationPermission();
//     const token = await messaging().getToken();
//     // console.log('FCM Token:', token);
//     return token;
//   } catch (error) {
//     console.error('Error getting FCM token:', error);
//     return null;
//   }
// };

// // Handle foreground notifications (show as alert)
// export const handleForegroundMessage = (remoteMessage) => {
//   const { notification, data } = remoteMessage;
  
//   // Show alert for foreground notifications
//   Alert.alert(
//     notification?.title || 'Payment Notification',
//     notification?.body || 'Your payment was processed',
//     [
//       // {
//       //   text: 'View Details',
//       //   onPress: () => handleNotificationNavigation(data),
//       // },
//       {
//         text: 'Dismiss',
//         style: 'cancel',
//       },
//     ]
//   );
// };

// // Handle notification navigation
// export const handleNotificationNavigation = (data) => {
//   if (!navigationRef || !data) return;

//   if (data.type === 'payment_success') {
//     navigationRef.navigate('PaymentSuccess', { 
//       paymentId: data.payment_id,
//       amount: data.amount 
//     });
//   } else if (data.type === 'payment_failed') {
//     navigationRef.navigate('PaymentFailed', { 
//       paymentId: data.payment_id,
//       reason: data.reason 
//     });
//   }
//   // Add more cases as needed
// };

// // Setup all FCM listeners
// export const setupFCMListeners = (navigation) => {
//   navigationRef = navigation;

//   // 1. Foreground messages - app is open
//   const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
//     // console.log('Foreground FCM message:', remoteMessage);
//     handleForegroundMessage(remoteMessage);
//   });

//   // 2. Background/Quit state messages - FCM handles automatically
//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     // console.log('Background FCM message:', remoteMessage);
//     // FCM will automatically show system notification
//     // You can process data here if needed
//     return Promise.resolve();
//   });

//   // 3. Notification opened from background/quit state
//   const unsubscribeOpened = messaging().onNotificationOpenedApp(remoteMessage => {
//     // console.log('Notification opened from background:', remoteMessage);
//     handleNotificationNavigation(remoteMessage.data);
//   });

//   // 4. Check if app was opened from a notification
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log('App opened from notification:', remoteMessage);
//         handleNotificationNavigation(remoteMessage.data);
//       }
//     });

//   // Return cleanup function
//   return () => {
//     unsubscribeForeground();
//     unsubscribeOpened();
//   };
// };

// // Initialize FCM
// export const initializeFCM = async (navigation) => {
//   try {
//     await requestNotificationPermission();
//     const token = await getFCMToken();
//     const cleanup = setupFCMListeners(navigation);
    
//     // console.log('FCM initialized successfully');
//     return { token, cleanup };
//   } catch (error) {
//     console.error('Failed to initialize FCM:', error);
//     return null;
//   }
// };

// export default {
//   requestNotificationPermission,
//   getFCMToken,
//   handleForegroundMessage,
//   handleNotificationNavigation,
//   setupFCMListeners,
//   initializeFCM,
// };


import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid, Alert } from 'react-native';

let navigationRef = null;
let isInitialized = false;

// Initialize FCM with proper error handling
export const initializeFCM = async (navigation) => {
  try {
    // Check if Firebase is available
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }

    await requestNotificationPermission();
    const token = await getFCMToken();
    const cleanup = setupFCMListeners(navigation);
    
    isInitialized = true;
    console.log('FCM initialized successfully');
    return { token, cleanup };
  } catch (error) {
    console.error('Failed to initialize FCM:', error);
    
    // More specific error handling
    if (error.message.includes('No Firebase App')) {
      console.error('Firebase not configured properly. Check your setup:');
      console.error('1. Ensure react-native-firebase is properly installed');
      console.error('2. Check your google-services.json (Android) or GoogleService-Info.plist (iOS)');
      console.error('3. Verify your React Native Firebase configuration');
    }
    
    return null;
  }
};

// Update getFCMToken with better error handling
export const getFCMToken = async () => {
  try {
    // Check if we have permissions first
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      console.warn('Notification permission not granted');
      return null;
    }

    const token = await messaging().getToken();
    console.log('FCM Token retrieved successfully');
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    
    // Handle specific Firebase initialization errors
    if (error.message.includes('No Firebase App')) {
      console.error('Firebase not initialized. Make sure to:');
      console.error('1. Call initializeFCM() first');
      console.error('2. Check your Firebase configuration files');
    }
    
    return null;
  }
};

// Rest of your existing code remains the same...
export const requestNotificationPermission = async () => {
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  } else if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Permission error:', error);
      return false;
    }
  }
  return true;
};

export const handleForegroundMessage = (remoteMessage) => {
  const { notification, data } = remoteMessage;
  
  Alert.alert(
    notification?.title || 'Payment Notification',
    notification?.body || 'Your payment was processed',
    [
      // {
      //   text: 'View Details',
      //   onPress: () => handleNotificationNavigation(data),
      // },
      {
        text: 'Dismiss',
        style: 'cancel',
      },
    ]
  );
};

export const handleNotificationNavigation = (data) => {
  if (!navigationRef || !data) return;

  if (data.type === 'payment_success') {
    navigationRef.navigate('PaymentSuccess', { 
      paymentId: data.payment_id,
      amount: data.amount 
    });
  } else if (data.type === 'payment_failed') {
    navigationRef.navigate('PaymentFailed', { 
      paymentId: data.payment_id,
      reason: data.reason 
    });
  }
};

export const setupFCMListeners = (navigation) => {
  navigationRef = navigation;

  const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
    console.log('Foreground FCM message:', remoteMessage);
    handleForegroundMessage(remoteMessage);
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background FCM message:', remoteMessage);
    return Promise.resolve();
  });

  const unsubscribeOpened = messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification opened from background:', remoteMessage);
    handleNotificationNavigation(remoteMessage.data);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('App opened from notification:', remoteMessage);
        handleNotificationNavigation(remoteMessage.data);
      }
    });

  return () => {
    unsubscribeForeground();
    unsubscribeOpened();
  };
};

export default {
  initializeFCM,
  requestNotificationPermission,
  getFCMToken,
  handleForegroundMessage,
  handleNotificationNavigation,
  setupFCMListeners,
};