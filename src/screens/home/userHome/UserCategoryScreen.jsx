

// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react-native/no-inline-styles */
// import React, { useEffect, useState } from "react";
// import {
//   ScrollView,
//   TextInput,
//   Pressable,
//   useColorScheme,
//   Text,
// } from "react-native";
// import ThemedView from "@/utils/ThemedView";
// import useT from "@/utils/useT";
// import GoBackTitle2 from "@/components/GoBackTitle2";
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";
// import { useNavigation } from "@react-navigation/native";
// import { useThemeColor } from "@/utils/useThemeColor";
// import { Controller, useFormContext } from "react-hook-form";
// import { useDebounce } from "use-debounce";

// import HotelComponent from "@/components/HotelComponent";
// import BookingComponent from "@/components/BookingComponent";
// import SecurityComponent from "@/components/SecurityComponent";
// import AttractionComponent from "@/components/AttractionComponent";

// // Redux API hooks
// import { useGetAllHotelsQuery } from "@/redux/slices/userSlice/hotelbookingSlice";
// import { useGetAllCarQuery } from "@/redux/slices/userSlice/carBookingSlice";
// import { useGetAllSecurityQuery } from "@/redux/slices/userSlice/securityBookingSlice";
// import { useGetAllAttractionByCountryQuery } from "@/redux/slices/userSlice/attractionSlice";
// import { Search } from "lucide-react-native";

// const TAB_IDS = {
//   HOTEL: "hotel",
//   CAR: "car",
//   SECURITY: "security",
//   ATTRACTION: "attraction",
// };

// const TAB_OPTIONS = [
//   { id: TAB_IDS.HOTEL, label: "tab.hotel" },
//   { id: TAB_IDS.CAR, label: "tab.car" },
//   { id: TAB_IDS.SECURITY, label: "tab.security" },
//   { id: TAB_IDS.ATTRACTION, label: "tab.attraction" },
// ];

// const UserCategoryScreen = () => {
//   const navigation = useNavigation();
//   const theme = useColorScheme();
//   const { icon3 } = useThemeColor();
//   const t = useT();
//   const { watch, control } = useFormContext();

//   const [activeTab, setActiveTab] = useState(TAB_IDS.HOTEL);
//   const [page, setPage] = useState({
//     [TAB_IDS.HOTEL]: 1,
//     [TAB_IDS.CAR]: 1,
//     [TAB_IDS.SECURITY]: 1,
//     [TAB_IDS.ATTRACTION]: 1,
//   });
//   const [hasMore, setHasMore] = useState({
//     [TAB_IDS.HOTEL]: true,
//     [TAB_IDS.CAR]: true,
//     [TAB_IDS.SECURITY]: true,
//     [TAB_IDS.ATTRACTION]: true,
//   });
//   const [dataCache, setDataCache] = useState({
//     [TAB_IDS.HOTEL]: [],
//     [TAB_IDS.CAR]: [],
//     [TAB_IDS.SECURITY]: [],
//     [TAB_IDS.ATTRACTION]: [],
//   });
//   const [refreshing, setRefreshing] = useState({
//     [TAB_IDS.HOTEL]: false,
//     [TAB_IDS.CAR]: false,
//     [TAB_IDS.SECURITY]: false,
//     [TAB_IDS.ATTRACTION]: false,
//   });

//   const searchTerm = watch("searchCategory") || "";
//   const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

//   // Reset page to 1 when search term changes
//   useEffect(() => {
//     const resetPages = () => {
//       setPage({
//         [TAB_IDS.HOTEL]: 1,
//         [TAB_IDS.CAR]: 1,
//         [TAB_IDS.SECURITY]: 1,
//         [TAB_IDS.ATTRACTION]: 1,
//       });
//       // Clear cache when searching
//       setDataCache({
//         [TAB_IDS.HOTEL]: [],
//         [TAB_IDS.CAR]: [],
//         [TAB_IDS.SECURITY]: [],
//         [TAB_IDS.ATTRACTION]: [],
//       });
//       // Reset hasMore flags
//       setHasMore({
//         [TAB_IDS.HOTEL]: true,
//         [TAB_IDS.CAR]: true,
//         [TAB_IDS.SECURITY]: true,
//         [TAB_IDS.ATTRACTION]: true,
//       });
//     };
//     resetPages();
//   }, [debouncedSearchTerm]);

//   // --- API CALLS CENTRALIZED ---
//   const hotelQuery = useGetAllHotelsQuery(
//     { page: page[TAB_IDS.HOTEL], searchTerm: debouncedSearchTerm },
//     {
//       refetchOnMountOrArgChange: true,
//       skip: !hasMore[TAB_IDS.HOTEL] && page[TAB_IDS.HOTEL] > 1,
//     }
//   );

//   const carQuery = useGetAllCarQuery(
//     { page: page[TAB_IDS.CAR], searchTerm: debouncedSearchTerm },
//     {
//       refetchOnMountOrArgChange: true,
//       skip: !hasMore[TAB_IDS.CAR] && page[TAB_IDS.CAR] > 1,
//     }
//   );

//   const securityQuery = useGetAllSecurityQuery(
//     { page: page[TAB_IDS.SECURITY], searchTerm: debouncedSearchTerm },
//     {
//       refetchOnMountOrArgChange: true,
//       skip: !hasMore[TAB_IDS.SECURITY] && page[TAB_IDS.SECURITY] > 1,
//     }
//   );

//   const attractionQuery = useGetAllAttractionByCountryQuery(
//     { page: page[TAB_IDS.ATTRACTION], searchTerm: debouncedSearchTerm },
//     {
//       refetchOnMountOrArgChange: true,
//       skip: !hasMore[TAB_IDS.ATTRACTION] && page[TAB_IDS.ATTRACTION] > 1,
//     }
//   );

//   // Cache data when API calls succeed and update hasMore
//   useEffect(() => {
//     if (hotelQuery.data?.data?.data && !hotelQuery.isFetching) {
//       const newData = hotelQuery.data.data.data;
//       const total = hotelQuery.data.data.meta?.total || 0;
//       const limit = hotelQuery.data.data.meta?.limit || 10;

//       if (page[TAB_IDS.HOTEL] === 1) {
//         setDataCache((prev) => ({
//           ...prev,
//           [TAB_IDS.HOTEL]: newData,
//         }));
//       } else {
//         // Remove duplicates before adding new data
//         const existingIds = new Set(
//           dataCache[TAB_IDS.HOTEL].map((item) => item.id)
//         );
//         const uniqueNewData = newData.filter(
//           (item) => !existingIds.has(item.id)
//         );

//         setDataCache((prev) => ({
//           ...prev,
//           [TAB_IDS.HOTEL]: [...prev[TAB_IDS.HOTEL], ...uniqueNewData],
//         }));
//       }

//       // Check if we have more data to load
//       const currentTotal = dataCache[TAB_IDS.HOTEL].length + newData.length;
//       setHasMore((prev) => ({
//         ...prev,
//         [TAB_IDS.HOTEL]: currentTotal < total,
//       }));
//     }
//   }, [hotelQuery.data, hotelQuery.isFetching, page[TAB_IDS.HOTEL]]);

//   useEffect(() => {
//     if (carQuery.data?.data?.data && !carQuery.isFetching) {
//       const newData = carQuery.data.data.data;
//       const total = carQuery.data.data.meta?.total || 0;

//       if (page[TAB_IDS.CAR] === 1) {
//         setDataCache((prev) => ({
//           ...prev,
//           [TAB_IDS.CAR]: newData,
//         }));
//       } else {
//         // Remove duplicates before adding new data
//         const existingIds = new Set(
//           dataCache[TAB_IDS.CAR].map((item) => item.id)
//         );
//         const uniqueNewData = newData.filter(
//           (item) => !existingIds.has(item.id)
//         );

//         setDataCache((prev) => ({
//           ...prev,
//           [TAB_IDS.CAR]: [...prev[TAB_IDS.CAR], ...uniqueNewData],
//         }));
//       }

//       // Check if we have more data to load
//       const currentTotal = dataCache[TAB_IDS.CAR].length + newData.length;
//       setHasMore((prev) => ({
//         ...prev,
//         [TAB_IDS.CAR]: currentTotal < total,
//       }));
//     }
//   }, [carQuery.data, carQuery.isFetching, page[TAB_IDS.CAR]]);

//   useEffect(() => {
//     if (securityQuery.data?.data?.data && !securityQuery.isFetching) {
//       const newData = securityQuery.data.data.data;
//       const total = securityQuery.data.data.meta?.total || 0;

//       if (page[TAB_IDS.SECURITY] === 1) {
//         setDataCache((prev) => ({
//           ...prev,
//           [TAB_IDS.SECURITY]: newData,
//         }));
//       } else {
//         // Remove duplicates before adding new data
//         const existingIds = new Set(
//           dataCache[TAB_IDS.SECURITY].map((item) => item.id)
//         );
//         const uniqueNewData = newData.filter(
//           (item) => !existingIds.has(item.id)
//         );

//         setDataCache((prev) => ({
//           ...prev,
//           [TAB_IDS.SECURITY]: [...prev[TAB_IDS.SECURITY], ...uniqueNewData],
//         }));
//       }

//       // Check if we have more data to load
//       const currentTotal = dataCache[TAB_IDS.SECURITY].length + newData.length;
//       setHasMore((prev) => ({
//         ...prev,
//         [TAB_IDS.SECURITY]: currentTotal < total,
//       }));
//     }
//   }, [securityQuery.data, securityQuery.isFetching, page[TAB_IDS.SECURITY]]);

//   useEffect(() => {
//     if (attractionQuery.data?.data?.data && !attractionQuery.isFetching) {
//       const newData = attractionQuery.data.data.data;
//       const total = attractionQuery.data.data.meta?.total || 0;

//       if (page[TAB_IDS.ATTRACTION] === 1) {
//         setDataCache((prev) => ({
//           ...prev,
//           [TAB_IDS.ATTRACTION]: newData,
//         }));
//       } else {
//         // Remove duplicates before adding new data
//         const existingIds = new Set(
//           dataCache[TAB_IDS.ATTRACTION].map((item) => item.id)
//         );
//         const uniqueNewData = newData.filter(
//           (item) => !existingIds.has(item.id)
//         );

//         setDataCache((prev) => ({
//           ...prev,
//           [TAB_IDS.ATTRACTION]: [...prev[TAB_IDS.ATTRACTION], ...uniqueNewData],
//         }));
//       }

//       // Check if we have more data to load
//       const currentTotal =
//         dataCache[TAB_IDS.ATTRACTION].length + newData.length;
//       setHasMore((prev) => ({
//         ...prev,
//         [TAB_IDS.ATTRACTION]: currentTotal < total,
//       }));
//     }
//   }, [
//     attractionQuery.data,
//     attractionQuery.isFetching,
//     page[TAB_IDS.ATTRACTION],
//   ]);

//   // --- REFRESH HANDLER ---
//   const onRefresh = (tabId) => {
//     setRefreshing((prev) => ({ ...prev, [tabId]: true }));
//     setPage((prev) => ({ ...prev, [tabId]: 1 }));
//     // Clear cache for this tab
//     setDataCache((prev) => ({ ...prev, [tabId]: [] }));
//     setHasMore((prev) => ({ ...prev, [tabId]: true }));
//   };

//   // --- LOAD MORE HANDLER ---
//   const loadMore = (tabId, data) => {
//     const total = data?.data?.meta?.total || 0;
//     const limit = data?.data?.meta?.limit || 10;
//     const currentPage = page[tabId];

//     // Calculate total pages
//     const totalPages = Math.ceil(total / limit);

//     // Only load more if we're not currently fetching and there are more pages
//     if (currentPage < totalPages && hasMore[tabId]) {
//       setPage((prev) => ({ ...prev, [tabId]: prev[tabId] + 1 }));
//     }
//   };

//   // Reset refreshing state when data arrives
//   useEffect(() => {
//     if (hotelQuery.data && !hotelQuery.isFetching) {
//       setRefreshing((prev) => ({ ...prev, [TAB_IDS.HOTEL]: false }));
//     }
//   }, [hotelQuery.data, hotelQuery.isFetching]);

//   useEffect(() => {
//     if (carQuery.data && !carQuery.isFetching) {
//       setRefreshing((prev) => ({ ...prev, [TAB_IDS.CAR]: false }));
//     }
//   }, [carQuery.data, carQuery.isFetching]);

//   useEffect(() => {
//     if (securityQuery.data && !securityQuery.isFetching) {
//       setRefreshing((prev) => ({ ...prev, [TAB_IDS.SECURITY]: false }));
//     }
//   }, [securityQuery.data, securityQuery.isFetching]);

//   useEffect(() => {
//     if (attractionQuery.data && !attractionQuery.isFetching) {
//       setRefreshing((prev) => ({ ...prev, [TAB_IDS.ATTRACTION]: false }));
//     }
//   }, [attractionQuery.data, attractionQuery.isFetching]);

//   // Get the current tab's meta data for displaying total
//   const getCurrentMeta = () => {
//     switch (activeTab) {
//       case TAB_IDS.HOTEL:
//         return hotelQuery.data?.data?.meta || { total: 0, page: 1, limit: 10 };
//       case TAB_IDS.CAR:
//         return carQuery.data?.data?.meta || { total: 0, page: 1, limit: 10 };
//       case TAB_IDS.SECURITY:
//         return (
//           securityQuery.data?.data?.meta || { total: 0, page: 1, limit: 10 }
//         );
//       case TAB_IDS.ATTRACTION:
//         return (
//           attractionQuery.data?.data?.meta || { total: 0, page: 1, limit: 10 }
//         );
//       default:
//         return { total: 0, page: 1, limit: 10 };
//     }
//   };

//   const currentMeta = getCurrentMeta();

//   return (
//     <ThemedView
//       styles="flex-1"
//       style={{
//         paddingHorizontal: responsiveWidth(6),
//         paddingTop: responsiveHeight(5),
//         gap: responsiveHeight(3),
//       }}
//     >
//       <GoBackTitle2 navigation={navigation} title={t("category")} />

//       {/* Search */}
//       <ThemedView styles="relative p-1 border rounded-md">
//         <Search
//           color={icon3}
//           style={{ position: "absolute", left: 10, top: 10 }}
//         />
//         <Controller
//           control={control}
//           name="searchCategory"
//           render={({ field: { onChange, onBlur, value } }) => (
//             <TextInput
//               style={{
//                 paddingLeft: 40,
//                 color: theme === "dark" ? " #fff" : "#000",
//               }}
//               placeholder={"Searching.."}
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//             />
//           )}
//         />
//       </ThemedView>

//       <ThemedView styles="flex-row gap-2">
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ gap: responsiveWidth(2) }}
//         >
//           {TAB_OPTIONS.map((tab) => (
//             <Pressable
//               key={tab.id}
//               onPress={() => setActiveTab(tab.id)}
//               className={`px-2 py-2 rounded-lg items-center ${
//                 activeTab === tab.id
//                   ? "bg-primary dark:bg-primary_dark"
//                   : "bg-zinc-200 dark:bg-zinc-800"
//               }`}
//             >
//               <Text
//                 className={`font-semibold text-sm ${
//                   activeTab === tab.id ? "text-white" : "text-zinc-900"
//                 }`}
//               >
//                 {t(tab.label)}
//               </Text>
//             </Pressable>
//           ))}
//         </ScrollView>
//       </ThemedView>

//       {/* Show total count */}
//       <Text className="text-sm text-gray-500">
//         Showing {dataCache[activeTab]?.length || 0} of {currentMeta.total} items
//       </Text>

//       {/* Tab Components */}
//       {activeTab === TAB_IDS.HOTEL && (
//         <HotelComponent
//           data={{
//             ...hotelQuery.data,
//             data: {
//               ...hotelQuery.data?.data,
//               data: dataCache[TAB_IDS.HOTEL],
//               meta: currentMeta,
//             },
//           }}
//           isLoading={hotelQuery.isLoading && page[TAB_IDS.HOTEL] === 1}
//           isFetchingMore={hotelQuery.isFetching && page[TAB_IDS.HOTEL] > 1}
//           isError={hotelQuery.isError}
//           onRefresh={() => onRefresh(TAB_IDS.HOTEL)}
//           loadMore={() => loadMore(TAB_IDS.HOTEL, hotelQuery.data)}
//           refreshing={refreshing[TAB_IDS.HOTEL]}
//           refetch={hotelQuery.refetch}
//           hasMore={hasMore[TAB_IDS.HOTEL]}
//         />
//       )}
//       {activeTab === TAB_IDS.CAR && (
//         <BookingComponent
//           data={{
//             ...carQuery.data,
//             data: {
//               ...carQuery.data?.data,
//               data: dataCache[TAB_IDS.CAR],
//               meta: currentMeta,
//             },
//           }}
//           isLoading={carQuery.isLoading && page[TAB_IDS.CAR] === 1}
//           isFetchingMore={carQuery.isFetching && page[TAB_IDS.CAR] > 1}
//           isError={carQuery.isError}
//           onRefresh={() => onRefresh(TAB_IDS.CAR)}
//           loadMore={() => loadMore(TAB_IDS.CAR, carQuery.data)}
//           refreshing={refreshing[TAB_IDS.CAR]}
//           refetch={carQuery.refetch}
//           hasMore={hasMore[TAB_IDS.CAR]}
//         />
//       )}
//       {activeTab === TAB_IDS.SECURITY && (
//         <SecurityComponent
//           data={{
//             ...securityQuery.data,
//             data: {
//               ...securityQuery.data?.data,
//               data: dataCache[TAB_IDS.SECURITY],
//               meta: currentMeta,
//             },
//           }}
//           isLoading={securityQuery.isLoading && page[TAB_IDS.SECURITY] === 1}
//           isFetchingMore={
//             securityQuery.isFetching && page[TAB_IDS.SECURITY] > 1
//           }
//           isError={securityQuery.isError}
//           onRefresh={() => onRefresh(TAB_IDS.SECURITY)}
//           loadMore={() => loadMore(TAB_IDS.SECURITY, securityQuery.data)}
//           refreshing={refreshing[TAB_IDS.SECURITY]}
//           refetch={securityQuery.refetch}
//           hasMore={hasMore[TAB_IDS.SECURITY]}
//         />
//       )}
//       {activeTab === TAB_IDS.ATTRACTION && (
//         <AttractionComponent
//           data={{
//             ...attractionQuery.data,
//             data: {
//               ...attractionQuery.data?.data,
//               data: dataCache[TAB_IDS.ATTRACTION],
//               meta: currentMeta,
//             },
//           }}
//           isLoading={
//             attractionQuery.isLoading && page[TAB_IDS.ATTRACTION] === 1
//           }
//           isFetchingMore={
//             attractionQuery.isFetching && page[TAB_IDS.ATTRACTION] > 1
//           }
//           isError={attractionQuery.isError}
//           onRefresh={() => onRefresh(TAB_IDS.ATTRACTION)}
//           loadMore={() => loadMore(TAB_IDS.ATTRACTION, attractionQuery.data)}
//           refreshing={refreshing[TAB_IDS.ATTRACTION]}
//           refetch={attractionQuery.refetch}
//           hasMore={hasMore[TAB_IDS.ATTRACTION]}
//         />
//       )}
//     </ThemedView>
//   );
// };

// export default UserCategoryScreen;




/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TextInput,
  Pressable,
  useColorScheme,
  Text,
} from "react-native";
import ThemedView from "@/utils/ThemedView";
import useT from "@/utils/useT";
import GoBackTitle2 from "@/components/GoBackTitle2";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import { useThemeColor } from "@/utils/useThemeColor";
import { Controller, useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";

import HotelComponent from "@/components/HotelComponent";
import BookingComponent from "@/components/BookingComponent";
import SecurityComponent from "@/components/SecurityComponent";
import AttractionComponent from "@/components/AttractionComponent";

// Redux API hooks
import { useGetAllHotelsQuery } from "@/redux/slices/userSlice/hotelbookingSlice";
import { useGetAllCarQuery } from "@/redux/slices/userSlice/carBookingSlice";
import { useGetAllSecurityQuery } from "@/redux/slices/userSlice/securityBookingSlice";
import { useGetAllAttractionByCountryQuery } from "@/redux/slices/userSlice/attractionSlice";
import { Search } from "lucide-react-native";

const TAB_IDS = {
  HOTEL: "hotel",
  CAR: "car",
  SECURITY: "security",
  ATTRACTION: "attraction",
};

const TAB_OPTIONS = [
  { id: TAB_IDS.HOTEL, label: "tab.hotel" },
  { id: TAB_IDS.CAR, label: "tab.car" },
  { id: TAB_IDS.SECURITY, label: "tab.security" },
  { id: TAB_IDS.ATTRACTION, label: "tab.attraction" },
];

const UserCategoryScreen = () => {
  const navigation = useNavigation();
  const theme = useColorScheme();
  const { icon3 } = useThemeColor();
  const t = useT();
  const { watch, control } = useFormContext();

  const [activeTab, setActiveTab] = useState(TAB_IDS.HOTEL);
  const [page, setPage] = useState({
    [TAB_IDS.HOTEL]: 1,
    [TAB_IDS.CAR]: 1,
    [TAB_IDS.SECURITY]: 1,
    [TAB_IDS.ATTRACTION]: 1,
  });
  const [hasMore, setHasMore] = useState({
    [TAB_IDS.HOTEL]: true,
    [TAB_IDS.CAR]: true,
    [TAB_IDS.SECURITY]: true,
    [TAB_IDS.ATTRACTION]: true,
  });
  const [dataCache, setDataCache] = useState({
    [TAB_IDS.HOTEL]: [],
    [TAB_IDS.CAR]: [],
    [TAB_IDS.SECURITY]: [],
    [TAB_IDS.ATTRACTION]: [],
  });
  const [refreshing, setRefreshing] = useState({
    [TAB_IDS.HOTEL]: false,
    [TAB_IDS.CAR]: false,
    [TAB_IDS.SECURITY]: false,
    [TAB_IDS.ATTRACTION]: false,
  });

  const searchTerm = watch("searchCategory") || "";
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // Reset page to 1 when search term changes
  useEffect(() => {
    const resetPages = () => {
      setPage({
        [TAB_IDS.HOTEL]: 1,
        [TAB_IDS.CAR]: 1,
        [TAB_IDS.SECURITY]: 1,
        [TAB_IDS.ATTRACTION]: 1,
      });
      // Clear cache when searching
      setDataCache({
        [TAB_IDS.HOTEL]: [],
        [TAB_IDS.CAR]: [],
        [TAB_IDS.SECURITY]: [],
        [TAB_IDS.ATTRACTION]: [],
      });
      // Reset hasMore flags
      setHasMore({
        [TAB_IDS.HOTEL]: true,
        [TAB_IDS.CAR]: true,
        [TAB_IDS.SECURITY]: true,
        [TAB_IDS.ATTRACTION]: true,
      });
    };
    
    // Only reset if we have a search term or it changed from non-empty to empty
    if (debouncedSearchTerm !== '' || searchTerm === '') {
      resetPages();
    }
  }, [debouncedSearchTerm]);

  // --- API CALLS CENTRALIZED ---
  const hotelQuery = useGetAllHotelsQuery(
    { page: page[TAB_IDS.HOTEL], searchTerm: debouncedSearchTerm },
    { 
      refetchOnMountOrArgChange: true,
    }
  );

  const carQuery = useGetAllCarQuery(
    { page: page[TAB_IDS.CAR], searchTerm: debouncedSearchTerm },
    { 
      refetchOnMountOrArgChange: true,
    }
  );

  const securityQuery = useGetAllSecurityQuery(
    { page: page[TAB_IDS.SECURITY], searchTerm: debouncedSearchTerm },
    { 
      refetchOnMountOrArgChange: true,
    }
  );

  const attractionQuery = useGetAllAttractionByCountryQuery(
    { page: page[TAB_IDS.ATTRACTION], searchTerm: debouncedSearchTerm },
    { 
      refetchOnMountOrArgChange: true,
    }
  );

  // Cache data when API calls succeed and update hasMore - HOTEL
  useEffect(() => {
    if (hotelQuery.data?.data?.data && !hotelQuery.isFetching) {
      const newData = hotelQuery.data.data.data;
      const total = hotelQuery.data.data.meta?.total || 0;
      
      // If page is 1, replace the cache
      if (page[TAB_IDS.HOTEL] === 1) {
        setDataCache(prev => ({
          ...prev,
          [TAB_IDS.HOTEL]: newData
        }));
      } else {
        // For subsequent pages, merge without duplicates
        const existingIds = new Set(dataCache[TAB_IDS.HOTEL].map(item => item.id));
        const uniqueNewData = newData.filter(item => !existingIds.has(item.id));
        
        setDataCache(prev => ({
          ...prev,
          [TAB_IDS.HOTEL]: [...prev[TAB_IDS.HOTEL], ...uniqueNewData]
        }));
      }
      
      // Check if we have more data to load
      const currentData = page[TAB_IDS.HOTEL] === 1 ? newData : [...dataCache[TAB_IDS.HOTEL], ...newData];
      setHasMore(prev => ({
        ...prev,
        [TAB_IDS.HOTEL]: currentData.length < total
      }));
    }
    
    // Reset refreshing when data arrives
    if (!hotelQuery.isFetching) {
      setRefreshing(prev => ({ ...prev, [TAB_IDS.HOTEL]: false }));
    }
  }, [hotelQuery.data, hotelQuery.isFetching, page[TAB_IDS.HOTEL]]);

  // Cache data when API calls succeed and update hasMore - CAR
  useEffect(() => {
    if (carQuery.data?.data?.data && !carQuery.isFetching) {
      const newData = carQuery.data.data.data;
      const total = carQuery.data.data.meta?.total || 0;
      
      if (page[TAB_IDS.CAR] === 1) {
        setDataCache(prev => ({
          ...prev,
          [TAB_IDS.CAR]: newData
        }));
      } else {
        const existingIds = new Set(dataCache[TAB_IDS.CAR].map(item => item.id));
        const uniqueNewData = newData.filter(item => !existingIds.has(item.id));
        
        setDataCache(prev => ({
          ...prev,
          [TAB_IDS.CAR]: [...prev[TAB_IDS.CAR], ...uniqueNewData]
        }));
      }
      
      const currentData = page[TAB_IDS.CAR] === 1 ? newData : [...dataCache[TAB_IDS.CAR], ...newData];
      setHasMore(prev => ({
        ...prev,
        [TAB_IDS.CAR]: currentData.length < total
      }));
    }
    
    if (!carQuery.isFetching) {
      setRefreshing(prev => ({ ...prev, [TAB_IDS.CAR]: false }));
    }
  }, [carQuery.data, carQuery.isFetching, page[TAB_IDS.CAR]]);

  // Cache data when API calls succeed and update hasMore - SECURITY
  useEffect(() => {
    if (securityQuery.data?.data?.data && !securityQuery.isFetching) {
      const newData = securityQuery.data.data.data;
      const total = securityQuery.data.data.meta?.total || 0;
      
      if (page[TAB_IDS.SECURITY] === 1) {
        setDataCache(prev => ({
          ...prev,
          [TAB_IDS.SECURITY]: newData
        }));
      } else {
        const existingIds = new Set(dataCache[TAB_IDS.SECURITY].map(item => item.id));
        const uniqueNewData = newData.filter(item => !existingIds.has(item.id));
        
        setDataCache(prev => ({
          ...prev,
          [TAB_IDS.SECURITY]: [...prev[TAB_IDS.SECURITY], ...uniqueNewData]
        }));
      }
      
      const currentData = page[TAB_IDS.SECURITY] === 1 ? newData : [...dataCache[TAB_IDS.SECURITY], ...newData];
      setHasMore(prev => ({
        ...prev,
        [TAB_IDS.SECURITY]: currentData.length < total
      }));
    }
    
    if (!securityQuery.isFetching) {
      setRefreshing(prev => ({ ...prev, [TAB_IDS.SECURITY]: false }));
    }
  }, [securityQuery.data, securityQuery.isFetching, page[TAB_IDS.SECURITY]]);

  // Cache data when API calls succeed and update hasMore - ATTRACTION
  useEffect(() => {
    if (attractionQuery.data?.data?.data && !attractionQuery.isFetching) {
      const newData = attractionQuery.data.data.data;
      const total = attractionQuery.data.data.meta?.total || 0;
      
      if (page[TAB_IDS.ATTRACTION] === 1) {
        setDataCache(prev => ({
          ...prev,
          [TAB_IDS.ATTRACTION]: newData
        }));
      } else {
        const existingIds = new Set(dataCache[TAB_IDS.ATTRACTION].map(item => item.id));
        const uniqueNewData = newData.filter(item => !existingIds.has(item.id));
        
        setDataCache(prev => ({
          ...prev,
          [TAB_IDS.ATTRACTION]: [...prev[TAB_IDS.ATTRACTION], ...uniqueNewData]
        }));
      }
      
      const currentData = page[TAB_IDS.ATTRACTION] === 1 ? newData : [...dataCache[TAB_IDS.ATTRACTION], ...newData];
      setHasMore(prev => ({
        ...prev,
        [TAB_IDS.ATTRACTION]: currentData.length < total
      }));
    }
    
    if (!attractionQuery.isFetching) {
      setRefreshing(prev => ({ ...prev, [TAB_IDS.ATTRACTION]: false }));
    }
  }, [attractionQuery.data, attractionQuery.isFetching, page[TAB_IDS.ATTRACTION]]);

  // --- REFRESH HANDLER ---
  const onRefresh = async (tabId) => {
    setRefreshing((prev) => ({ ...prev, [tabId]: true }));
    setPage((prev) => ({ ...prev, [tabId]: 1 }));
    
    try {
      // Refetch the data for page 1
      switch (tabId) {
        case TAB_IDS.HOTEL:
          await hotelQuery.refetch();
          break;
        case TAB_IDS.CAR:
          await carQuery.refetch();
          break;
        case TAB_IDS.SECURITY:
          await securityQuery.refetch();
          break;
        case TAB_IDS.ATTRACTION:
          await attractionQuery.refetch();
          break;
      }
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      // Reset refreshing state after a timeout if needed
      setTimeout(() => {
        setRefreshing(prev => ({ ...prev, [tabId]: false }));
      }, 1000);
    }
  };

  // --- LOAD MORE HANDLER ---
  const loadMore = (tabId, data) => {
    const total = data?.data?.meta?.total || 0;
    const limit = data?.data?.meta?.limit || 10;
    const currentPage = page[tabId];
    
    // Calculate total pages
    const totalPages = Math.ceil(total / limit);
    
    // Only load more if we're not currently fetching and there are more pages
    if (currentPage < totalPages && hasMore[tabId]) {
      setPage((prev) => ({ ...prev, [tabId]: prev[tabId] + 1 }));
    }
  };

  // Get the current tab's meta data for displaying total
  const getCurrentMeta = () => {
    switch (activeTab) {
      case TAB_IDS.HOTEL:
        return hotelQuery.data?.data?.meta || { total: 0, page: 1, limit: 10 };
      case TAB_IDS.CAR:
        return carQuery.data?.data?.meta || { total: 0, page: 1, limit: 10 };
      case TAB_IDS.SECURITY:
        return securityQuery.data?.data?.meta || { total: 0, page: 1, limit: 10 };
      case TAB_IDS.ATTRACTION:
        return attractionQuery.data?.data?.meta || { total: 0, page: 1, limit: 10 };
      default:
        return { total: 0, page: 1, limit: 10 };
    }
  };

  const currentMeta = getCurrentMeta();

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(5),
        gap: responsiveHeight(3),
      }}
    >
      <GoBackTitle2 navigation={navigation} title={t("category")} />

      {/* Search */}
      <ThemedView styles="relative p-1 border rounded-md">
        <Search
          color={icon3}
          style={{ position: "absolute", left: 10, top: 10 }}
        />
        <Controller
          control={control}
          name="searchCategory"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                paddingLeft: 40,
                padding: 10,
                color: theme === "dark" ? " #fff" : "#000",
              }}
              placeholder={'Searching..'}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </ThemedView>

      <ThemedView styles="flex-row gap-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: responsiveWidth(2) }}
        >
          {TAB_OPTIONS.map((tab) => (
            <Pressable
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className={`px-2 py-2 rounded-lg items-center ${
                activeTab === tab.id
                  ? "bg-primary dark:bg-primary_dark"
                  : "bg-zinc-200 dark:bg-zinc-800"
              }`}
            >
              <Text
                className={`font-semibold text-sm ${
                  activeTab === tab.id ? "text-white" : "text-zinc-900"
                }`}
              >
                {t(tab.label)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </ThemedView>

      {/* Show total count */}
      {/* {dataCache[activeTab]?.length > 0 && (
        <Text className="text-sm text-gray-500">
          Showing {dataCache[activeTab]?.length || 0} of {currentMeta.total} items
        </Text>
      )} */}

      {/* Tab Components */}
      {activeTab === TAB_IDS.HOTEL && (
        <HotelComponent
          data={{
            ...hotelQuery.data,
            data: {
              ...hotelQuery.data?.data,
              data: dataCache[TAB_IDS.HOTEL],
              meta: {
                ...currentMeta,
                // Ensure page reflects current cache state
                page: page[TAB_IDS.HOTEL]
              }
            }
          }}
          isLoading={hotelQuery.isLoading && page[TAB_IDS.HOTEL] === 1}
          isFetchingMore={hotelQuery.isFetching && page[TAB_IDS.HOTEL] > 1}
          isError={hotelQuery.isError}
          onRefresh={() => onRefresh(TAB_IDS.HOTEL)}
          loadMore={() => loadMore(TAB_IDS.HOTEL, hotelQuery.data)}
          refreshing={refreshing[TAB_IDS.HOTEL]}
          refetch={hotelQuery.refetch}
          hasMore={hasMore[TAB_IDS.HOTEL]}
        />
      )}
      {activeTab === TAB_IDS.CAR && (
        <BookingComponent
          data={{
            ...carQuery.data,
            data: {
              ...carQuery.data?.data,
              data: dataCache[TAB_IDS.CAR],
              meta: {
                ...currentMeta,
                page: page[TAB_IDS.CAR]
              }
            }
          }}
          isLoading={carQuery.isLoading && page[TAB_IDS.CAR] === 1}
          isFetchingMore={carQuery.isFetching && page[TAB_IDS.CAR] > 1}
          isError={carQuery.isError}
          onRefresh={() => onRefresh(TAB_IDS.CAR)}
          loadMore={() => loadMore(TAB_IDS.CAR, carQuery.data)}
          refreshing={refreshing[TAB_IDS.CAR]}
          refetch={carQuery.refetch}
          hasMore={hasMore[TAB_IDS.CAR]}
        />
      )}
      {activeTab === TAB_IDS.SECURITY && (
        <SecurityComponent
          data={{
            ...securityQuery.data,
            data: {
              ...securityQuery.data?.data,
              data: dataCache[TAB_IDS.SECURITY],
              meta: {
                ...currentMeta,
                page: page[TAB_IDS.SECURITY]
              }
            }
          }}
          isLoading={securityQuery.isLoading && page[TAB_IDS.SECURITY] === 1}
          isFetchingMore={securityQuery.isFetching && page[TAB_IDS.SECURITY] > 1}
          isError={securityQuery.isError}
          onRefresh={() => onRefresh(TAB_IDS.SECURITY)}
          loadMore={() => loadMore(TAB_IDS.SECURITY, securityQuery.data)}
          refreshing={refreshing[TAB_IDS.SECURITY]}
          refetch={securityQuery.refetch}
          hasMore={hasMore[TAB_IDS.SECURITY]}
        />
      )}
      {activeTab === TAB_IDS.ATTRACTION && (
        <AttractionComponent
          data={{
            ...attractionQuery.data,
            data: {
              ...attractionQuery.data?.data,
              data: dataCache[TAB_IDS.ATTRACTION],
              meta: {
                ...currentMeta,
                page: page[TAB_IDS.ATTRACTION]
              }
            }
          }}
          isLoading={attractionQuery.isLoading && page[TAB_IDS.ATTRACTION] === 1}
          isFetchingMore={attractionQuery.isFetching && page[TAB_IDS.ATTRACTION] > 1}
          isError={attractionQuery.isError}
          onRefresh={() => onRefresh(TAB_IDS.ATTRACTION)}
          loadMore={() => loadMore(TAB_IDS.ATTRACTION, attractionQuery.data)}
          refreshing={refreshing[TAB_IDS.ATTRACTION]}
          refetch={attractionQuery.refetch}
          hasMore={hasMore[TAB_IDS.ATTRACTION]}
        />
      )}
    </ThemedView>
  );
};

export default UserCategoryScreen;