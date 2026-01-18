// import React from 'react';
// import {
//   View,
//   ScrollView,
//   ImageBackground,
//   Pressable,
// } from 'react-native';
// import { useFormContext, Controller } from 'react-hook-form';
// import ThemedView from '../utils/ThemedView';
// import ThemedText from '../utils/ThemedText';
// import ThemedText2 from '../utils/ThemeText2';
// import { useNavigation } from '@react-navigation/native';
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import { Text } from 'react-native-svg';

// const SecurityCategory = ({ securityCategories, name }) => {
//   const navigation = useNavigation();
//   const { control } = useFormContext();

// console.log(securityCategories);

//   return (
//     <ThemedView
//       style={{
//         gap: responsiveHeight(2),
//       }}
//     >
//       <ThemedText styles="text-xl font-SemiBold">Categories</ThemedText>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             className="flex-row"
//           >
//             {securityCategories.map(cat => (
//               <Pressable
//                 key={cat.id}
//                 onPress={() => {
//                   // onChange(cat);
//                   navigation.navigate('UserSecurityAllSecurity');
//                 }}
//                 className="rounded-xl mr-3 overflow-hidden relative"
//                 style={{
//                   width: responsiveWidth(35),
//                   height: responsiveHeight(26),
//                 }}
//               >
//                 <ImageBackground
//                   source={{ uri: cat.image }}
//                   className="w-full h-full object-cover"
//                 />
//                 <View className="flex-1 p-3 z-20 absolute left-0 bottom-0">
//                   <ThemedText2 styles="text-sm font-SemiBold">
//                     {cat.title}
//                   </ThemedText2>
//                   <ThemedText2 styles="text-xs opacity-80 font-Regular">
//                     {cat.subtitle}
//                   </ThemedText2>
//                 </View>
//               </Pressable>
//             ))}
//           </ScrollView>

//     </ThemedView>

//   );
// };

// export default SecurityCategory;

// import React from 'react';
// import { View, ImageBackground, Pressable, FlatList } from 'react-native';
// import { useFormContext } from 'react-hook-form';
// import ThemedView from '../utils/ThemedView';
// import ThemedText from '../utils/ThemedText';
// import ThemedText2 from '../utils/ThemeText2';
// import { useNavigation } from '@react-navigation/native';
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import { useGetAllSecurityByCategoryQuery } from '../redux/slices/userSlice/securityBookingSlice';
// import GlobalLoading from './GlobalLoading';
// import GlobalError from './GlobalError';
// import GlobalNoData from './GlobalNoData';

// const SecurityCategory = () => {
//   const navigation = useNavigation();
//   const { control } = useFormContext();

//   const {
//     data: securityByGroupData,
//     isLoading: securityByGroupLoading,
//     isFetching: isSecurityByGroupFetchingMore,
//     isError: securityByGroupError,
//     refetch,
//   } = useGetAllSecurityByCategoryQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//   });
//   // const categories = Object.keys(securityByGroupData?.data).map(key => ({
//   //   title: key,
//   //   subtitle: `${securityByGroupData?.data[key].length} items`,
//   //   image:
//   //     'https://img.freepik.com/free-vector/shield_78370-582.jpg?t=st=1755973821~exp=1755977421~hmac=2968bc63cb885e948e25c2420e7ec34909b7223f57fb56683ae6f56ffacdf40c&w=1480', // 👈 put real category image
//   //   items: securityByGroupData?.data[key], // 👈 keep items to send later
//   // }));

//   console.log(securityByGroupData, securityByGroupLoading, securityByGroupError);

//   const renderCategory = ({ item }) => (
//     <Pressable
//       key={item.id}
//       onPress={() =>
//         navigation.navigate('UserSecurityAllSecurity', { category: item })
//       }
//       className="rounded-xl mr-3 overflow-hidden relative"
//       style={{
//         width: responsiveWidth(35),
//         height: responsiveHeight(26),
//       }}
//     >
//       <ImageBackground
//         source={{ uri: item?.items[0]?.securityImages[0] }}
//         className="w-full h-full object-cover"
//       />
//       <View className="flex-1 p-3 z-20 absolute left-0 bottom-0">
//         <ThemedText styles="text-sm font-SemiBold">{item.title}</ThemedText>
//         <ThemedText styles="text-xs opacity-80 font-Regular">
//           {item.subtitle}
//         </ThemedText>
//       </View>
//     </Pressable>
//   );

//   return (
//     <ThemedView
//       style={{
//         gap: responsiveHeight(2),
//       }}
//     >
//       <ThemedText styles="text-xl font-SemiBold">Categories</ThemedText>

//       {/* <FlatList
//         data={categories}
//         renderItem={renderCategory}
//         keyExtractor={item => item.id?.toString()}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         ListHeaderComponent={
//           <View>
//              {securityByGroupLoading && <GlobalLoading />}

//             {securityByGroupError && <GlobalError refetch={refetch} />}

//             {!securityByGroupLoading && !securityByGroupError && !categories?.length && (
//               <GlobalNoData />
//             )}
//           </View>
//         }
//       /> */}
//     </ThemedView>
//   );
// };

// export default SecurityCategory;

import React, { useMemo } from 'react';
import { View, ImageBackground, Pressable, FlatList } from 'react-native';
import ThemedView from '../utils/ThemedView';
import ThemedText from '../utils/ThemedText';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useGetAllSecurityByCategoryQuery } from '../redux/slices/userSlice/securityBookingSlice';
import GlobalLoading from './GlobalLoading';
import GlobalError from './GlobalError';
import GlobalNoData from './GlobalNoData';

const SecurityCategory = () => {
  const navigation = useNavigation();


  const {
    data: securityByGroupData,
    isLoading: securityByGroupLoading,
    isError: securityByGroupError,
    refetch,
  } = useGetAllSecurityByCategoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // ✅ transform API data safely with useMemo (only recompute when data changes)
  const categories = useMemo(() => {
    if (!securityByGroupData?.data) return [];
    return Object.keys(securityByGroupData.data).map((key, index) => ({
      id: index.toString(), // 👈 unique id for FlatList
      title: key,
      subtitle: `${securityByGroupData.data[key]?.length || 0} items`,
      image:
        securityByGroupData.data[key]?.[0]?.securityImages?.[0] ||
        'https://img.freepik.com/free-vector/shield_78370-582.jpg',
      items: securityByGroupData.data[key],
    }));
  }, [securityByGroupData]);

  const renderCategory = ({ item }) => (
    <Pressable
      onPress={() =>
        navigation.navigate('UserSecurityAllSecurity', { category: item })
      }
      className="rounded-xl mr-3 overflow-hidden relative"
      style={{
        width: responsiveWidth(35),
        height: responsiveHeight(26),
      }}
    >
      <ImageBackground
        source={{ uri: item.image }}
        className="w-full h-full object-cover"
      />
      <View className="flex-1 p-3 z-20 absolute left-0 bottom-0">
        <ThemedText styles="text-sm font-SemiBold">{item.title}</ThemedText>
        <ThemedText styles="text-xs opacity-80 font-Regular">
          {item.subtitle}
        </ThemedText>
      </View>
    </Pressable>
  );



  return (
    <ThemedView style={{ gap: responsiveHeight(2) }}>
      <ThemedText styles="text-xl font-SemiBold">Categories</ThemedText>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {securityByGroupLoading && <GlobalLoading />}
            {securityByGroupError && <GlobalError refetch={refetch} />}
            {!securityByGroupLoading && !securityByGroupError && !categories.length && (
              <GlobalNoData />
            )}
          </View>
        }
      />
    </ThemedView>
  );
};

export default SecurityCategory;
