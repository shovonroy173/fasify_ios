import "./global.css";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { FormProvider, useForm } from "react-hook-form";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nextProvider } from "react-i18next";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";

import { Text, useColorScheme, View } from "react-native";

import i18n from "@/utils/languageSetup";
import { navigationRef } from "@/utils/NavigationService";
import RootAppNavigator from "@/roots/RootAppnavigator/RootAppNavigator";
import { initializeFCM } from "@/utils/notificationService";
import { useEffect } from "react";

import { persistor, store } from "@/redux/store";


function App() {
  // useEffect(() => {
  //   RNBootSplash.hide({ fade: true });
  // }, []);

  const methods = useForm({ mode: "onChange" });
  const theme = useColorScheme();

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   let cleanupFunction = null;

  //   const initFCM = async () => {
  //     try {
  //       const result = await initializeFCM();
  //        const fcmToken = await messaging().getToken();
  //       // console.log('FCM Token:', fcmToken);
  //       if (result) {
  //         cleanupFunction = result.cleanup;
  //         // console.log('FCM Token:', result.token);
  //         // dispatch(setFCMToken(result.token));
  //         // Send token to your backend
  //         if (result.token) {
  //           // await api.saveFCMToken(userId, result.token);
  //         }
  //       }
  //     } catch (error) {
  //       console.log('FCM initialization failed:', error);
  //     }
  //   };

  //   initFCM();

  //   // Cleanup on unmount
  //   return () => {
  //     if (cleanupFunction) {
  //       cleanupFunction();
  //     }
  //   };
  // }, []);



  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FormProvider {...methods}>
          <SafeAreaProvider>
            <I18nextProvider i18n={i18n}>
              <NavigationContainer
                theme={theme === "dark" ? DarkTheme : DefaultTheme}
                ref={navigationRef}
              >
                <RootAppNavigator />
               
              </NavigationContainer>
            </I18nextProvider>
          </SafeAreaProvider>
        </FormProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
