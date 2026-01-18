/* eslint-disable react/no-unstable-nested-components */
// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react/no-unstable-nested-components */
// import {
//   FlatList,
//   Image,
//   Pressable,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';
// import React from 'react';
// import {
//   useGetMySupportQuery,
//   useSendSupportMutation,
// } from '../../redux/slices/authSlice';
// import ThemedView from '../../utils/ThemedView';
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import ThemedText from '../../utils/ThemedText';
// import GoBack from '../../components/GoBack';
// import { useNavigation } from '@react-navigation/native';
// import ThemedTextInput from '../../utils/ThemedTextInput';
// import { useFormContext } from 'react-hook-form';
// import ThemedTextArea from '../../utils/ThemedTextArea';
// import DropdownBox from '../../components/DropdownBox';
// import { supportTypes } from '../../../assets/data/data';
// import ThemedText2 from '../../utils/ThemeText2';

// const CustomerServiceScreen = () => {
//   const { data, error, isLoading } = useGetMySupportQuery();
//   console.log('LINE AT 7', data, error, isLoading);
//   const navigation = useNavigation();
//   const theme = useColorScheme();
//   const {
//     control,
//     formState: { errors },
//     handleSubmit,
//     // reset,
//   } = useFormContext();

//   const baseStyle = `${theme === 'dark' ? 'bg-primary_dark' : 'bg-primary'} ${
//     loading ? 'opacity-50' : 'opacity-100'
//   }`;

//   const [sendSupport, { isLoading: loading }] = useSendSupportMutation();

//   const handleSendSupport = async formData => {
//     try {
//       // formData will have subject, description, supportType
//       const itemData = {
//         subject: formData?.supportSubject,
//         supportType: formData?.supportSupportType,
//         description: formData?.supportDescription,
//       };
//       const response = await sendSupport(itemData).unwrap();
//       console.log('Support ticket sent successfully:', response);
//       // reset({
//       //   supportSubject: '',
//       //   supportSupportType: '',
//       //   supportDescription: '',
//       // });
//     } catch (err) {
//       console.log('Error sending support ticket:', err);

//       // Show error feedback
//       // Alert.alert("Error", "Failed to send support request. Try again.");
//     }
//   };

//   return (
//     <ThemedView
//       styles="flex-1"
//       style={{
//         paddingHorizontal: responsiveWidth(6),
//         paddingVertical: responsiveHeight(5),
//         gap: responsiveHeight(4),
//       }}
//     >
//       <GoBack navigation={navigation} />
//       <ThemedText>Connect to our dedicated customer care member</ThemedText>
//       <FlatList
//         data={data?.data}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <ThemedView
//             styles="p-4 rounded-lg"
//             style={{ backgroundColor: '#F3F4F6', gap: responsiveHeight(1) }}
//           >
//             {/* <Image
//               source={{ uri: item.profileImage }}
//               className="w-10 h-10 object-cover rounded-full"
//             /> */}

//             <ThemedText styles="text-lg font-SemiBold">{item?.subject}</ThemedText>
//             <ThemedText styles="text-base">{item?.description}</ThemedText>
//             <ThemedText styles="text-base">{item?.status}</ThemedText>

//             <Pressable
//               onPress={() => {
//                 console.log('LINE AT 36');

//                 navigation.navigate('UserChat', {
//                   receiverId: item?.id,
//                   receiverName: item?.fullName || item?.email,
//                 });
//               }}
//               className="p-4 bg-blue-500 rounded-md"
//             >
//               <ThemedText styles="text-white text-center font-Medium">
//                 Chat
//               </ThemedText>
//             </Pressable>
//           </ThemedView>
//         )}
//         ItemSeparatorComponent={() => <View className="h-4" />}
//         contentContainerStyle={{ paddingBottom: 20 }}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={() => {
//           if (isLoading) {
//             return (
//               <View className="flex-1 items-center justify-center py-10">
//                 <ThemedText styles="text-base mt-3">
//                   Loading customer care members...
//                 </ThemedText>
//               </View>
//             );
//           }

//           if (error) {
//             return (
//               <View className="flex-1 items-center justify-center py-10">
//                 <ThemedText styles="text-base text-red-500">
//                   Failed to load customer care members
//                 </ThemedText>
//               </View>
//             );
//           }

//           return (
//             <View className="flex-1 items-center justify-center py-10">
//               <ThemedText styles="text-base mt-3">
//                 No customer care members available.
//               </ThemedText>
//             </View>
//           );
//         }}
//       />
//       <ThemedTextInput
//         name="supportSubject"
//         control={control}
//         error={errors?.supportSubject?.message}
//         label="Subject"
//         placeholder="Type here..."
//         type="text"
//       />
//       <ThemedTextArea
//         name="supportDescription"
//         control={control}
//         error={errors?.supportDescription?.message}
//         label="Description"
//         placeholder="Type here..."
//         type="text"
//       />

//       <View>
//         <DropdownBox
//           name="supportSupportType"
//           options={supportTypes}
//           zIndex={1000}
//         />
//       </View>

//       <Pressable
//         onPress={handleSubmit(handleSendSupport)}
//         className={`rounded-lg p-3 ${baseStyle} flex-row items-center justify-center gap-2 ${
//           loading && 'disabled:bg-slate-200'
//         } `}
//       >
//         <ThemedText2 styles="text-center font-SemiBold text-lg">
//           Send
//         </ThemedText2>
//       </Pressable>
//     </ThemedView>
//   );
// };

// export default CustomerServiceScreen;

/* eslint-disable react-native/no-inline-styles */
import { FlatList, Pressable, View, useColorScheme } from 'react-native';
import React from 'react';
import {
  useGetMySupportQuery,
  useSendSupportMutation,
} from '../../redux/slices/authSlice';
import ThemedView from '../../utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedText from '../../utils/ThemedText';
import GoBack from '../../components/GoBack';
import { useNavigation } from '@react-navigation/native';
import ThemedTextInput from '../../utils/ThemedTextInput';
import { useFormContext } from 'react-hook-form';
import ThemedTextArea from '../../utils/ThemedTextArea';
import DropdownBox from '../../components/DropdownBox';
import { supportTypes } from '../../../assets/data/data';
import ThemedText2 from '../../utils/ThemeText2';
import { useSelector } from 'react-redux';

const CustomerServiceScreen = () => {
  const userId = useSelector(state => state.auth.user?.id);
  const { data, error, isLoading } = useGetMySupportQuery();
  const navigation = useNavigation();
  const theme = useColorScheme();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  console.log('LINE AT 230', data?.data?.data, userId, error, loading);

  const [sendSupport, { isLoading: loading }] = useSendSupportMutation();

  const handleSendSupport = async formData => {
    try {
      const itemData = {
        subject: formData?.supportSubject,
        supportType: formData?.supportSupportType,
        description: formData?.supportDescription,
      };
      const response = await sendSupport(itemData).unwrap();
      console.log('Support ticket sent successfully:', response);
    } catch (err) {
      console.log('Error sending support ticket:', err);
    }
  };

  const baseButtonStyle = theme === 'dark' ? 'bg-primary_dark' : 'bg-primary';

  return (
    <ThemedView styles="flex-1 px-6 py-5">
      {/* Header */}
      <GoBack navigation={navigation} />
      <ThemedText styles="mt-4 text-lg font-SemiBold">
        Connect to our dedicated customer care member
      </ThemedText>

      <FlatList
        data={data?.data?.data}
        keyExtractor={item => item?.id?.toString()}
        renderItem={({ item }) => (
          <ThemedView styles="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 gap-2 border my-2">
            <ThemedText styles="text-lg font-SemiBold">
              #{item?.channelName}
            </ThemedText>
            {/* <ThemedText styles="text-base text-gray-700 dark:text-gray-300">
              {item?.description}
            </ThemedText>
            <ThemedText styles="text-sm text-gray-500">
              {item?.status}
            </ThemedText> */}
            <Pressable
              onPress={() =>
                navigation.navigate('UserChat', {
                  receiverIdSupport: item?.channelName,
                  receiverName: item?.fullName || item?.email,
                  type: 'support',
                  receiverId: item?.receiverUser?.id,
                })
              }
              className="mt-3 p-3 bg-blue-500 rounded-lg"
            >
              <ThemedText styles="text-white text-center font-Medium">
                Chat
              </ThemedText>
            </Pressable>
          </ThemedView>
        )}
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={() => (
          <ThemedText styles="text-base mt-3 text-center">
            No support tickets
          </ThemedText>
        )}
        ListHeaderComponent={() => (
          <View className="mt-6 gap-5">
            <ThemedTextInput
              name="supportSubject"
              control={control}
              error={errors?.supportSubject?.message}
              label="Subject"
              placeholder="Type here..."
            />
            <ThemedTextArea
              name="supportDescription"
              control={control}
              error={errors?.supportDescription?.message}
              label="Description"
              placeholder="Type here..."
            />
            <DropdownBox
              name="supportSupportType"
              options={supportTypes}
              zIndex={1000}
            />
            <Pressable
              onPress={handleSubmit(handleSendSupport)}
              disabled={loading}
              className={`mt-4 rounded-xl p-3 flex-row items-center justify-center ${
                theme === 'dark' ? 'bg-primary_dark' : 'bg-primary'
              } ${loading ? 'opacity-50' : 'opacity-100'}`}
            >
              <ThemedText2 styles="text-center font-SemiBold text-lg text-white">
                {loading ? 'Sending...' : 'Send'}
              </ThemedText2>
            </Pressable>
          </View>
        )}
      />
    </ThemedView>
  );
};

export default CustomerServiceScreen;
