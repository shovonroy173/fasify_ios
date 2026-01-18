// /* eslint-disable react-native/no-inline-styles */

// import {
//   View,
//   Image,
//   FlatList,
//   ScrollView,
//   StyleSheet,
//   useColorScheme,
//   Pressable,
//   Share,
// } from "react-native";
// import React, { useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import ThemedView from "@/utils/ThemedView";
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";
// import ThemedText from "@/utils/ThemedText";
// import { useThemeColor } from "@/utils/useThemeColor";
// // import Octicons from 'react-native-vector-icons/Octicons';
// // import Feather from 'react-native-vector-icons/Feather';
// // import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import IconContainer from "@/utils/IconContainer";
// import ReadMoreText from "@/utils/ReadMoreText";
// import Feature from "@/components/Feature";
// import ThemedViewBlue from "@/utils/ThemedViewBlue";
// // import Button from '@/components/Button';
// import { useFormContext } from "react-hook-form";
// import useT from "@/utils/useT";
// import { useGetSingleUserQuery } from "@/redux/slices/authSlice";
// import { featureMap } from "@/utils/featureMap";
// import HotelRoomCard from "@/components/HotelRoomCard";
// import { useAddFavouriteHotelMutation } from "@/redux/slices/userSlice/hotelbookingSlice";
// import { ArrowLeft, Heart, Share2, Star } from "lucide-react-native";

// const HotelBookingHotelDetailScreen = () => {
//   const navigation = useNavigation();
//   const { icon2 } = useThemeColor();
//   const [liked, setLiked] = useState(false);
//   const [addFavouriteHotel] = useAddFavouriteHotelMutation();

//   const { getValues, setValue } = useFormContext();
//   const {
//     selectedHotel: item,
//     // children,
//     // adults,
//     // rooms,
//     // bookedFromDate,
//     // bookedToDate,
//   } = getValues();

//   console.log("LINE AT 51", item, item?.room);

//   const handleFavourite = async () => {
//     try {
//       const res = await addFavouriteHotel({ hotelId: item.id }).unwrap();
//       console.log("Added to favourites ✅:", res);
//       setLiked((prev) => !prev);
//     } catch (error) {
//       console.error("Error adding favourite ❌:", error);
//     }
//   };

//   const theme = useColorScheme();
//   const styles = getStyles(theme);
//   const t = useT();

//   // 🟨 Open booking modal automatically if missing required fields
//   // useEffect(() => {
//   //   if (!children || !adults || !rooms || !bookedFromDate || !bookedToDate) {
//   //     setShowBookingModal(true);
//   //   }
//   // }, []);

//   // ✅ Filter hotel features
//   const features = featureMap
//     .filter((f) => item[f?.key])
//     .map((f, index) => ({
//       id: index,
//       title: f?.title,
//       icon: f?.icon,
//     }));

//   const { data: profileData } = useGetSingleUserQuery(item?.partnerId);

//   // console.log('LINE AT 87', profileData);

//   const handleBookRoom = (room) => {
//     // if (!children || !adults || !rooms || !bookedFromDate || !bookedToDate) {
//     //   setShowBookingModal(true);
//     // } else {
//     navigation.navigate("UserHotelHotelBookCredential", { room: room });
//     setValue("selectedRoom", room);
//     // }
//   };

//   const renderItem = ({ item }) => (
//     <HotelRoomCard room={item} onBookRoom={handleBookRoom} />
//   );

//   const handlePress = async () => {
//     try {
//       await Share.share({
//         message: `Hey 👋 check out this awesome ${item?.hotelBusinessName}!`,
//       });
//     } catch (error) {
//       console.error("Error sharing:", error);
//     }
//   };

//   return (
//     <ThemedView styles="flex-1 relative bg-white">
//       {/* Header */}
//       <View style={styles.header}>
//         <IconContainer
//           icon={<ArrowLeft size={24} color={icon2} />}
//           onPress={() => navigation.goBack()}
//         />
//         <View className="flex-row gap-4">
//           <Pressable onPress={handlePress}>
//             <IconContainer icon={<Share2 size={20} color={icon2} />} />
//           </Pressable>
//           <Pressable onPress={handleFavourite}>
//             <ThemedView
//               styles="rounded-full"
//               style={{
//                 paddingHorizontal: responsiveWidth(2),
//                 paddingVertical: responsiveHeight(1),
//               }}
//             >
//               {liked ? (
//                 <Heart size={20} color={icon2} fill={icon2} />
//               ) : (
//                 <Heart size={20} color={icon2} />
//               )}
//             </ThemedView>
//           </Pressable>
//         </View>
//       </View>

//       {/* Hotel Image */}
//       <Image
//         source={{ uri: item?.room[0]?.hotelImages[0] }}
//         style={styles.image}
//       />

//       {/* Bottom Section */}
//       <View style={styles.bottomSheet}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         >
//           <ThemedText styles="font-Bold text-4xl">
//             {item?.hotelBusinessName}
//           </ThemedText>
//           <ThemedText styles="font-Regular text-md">
//             {item?.hotelAddress}, {item?.hotelCity}, {item?.hotelCountry}
//           </ThemedText>

//           {/* Rating and Price */}
//           <ThemedView styles="flex-row justify-between items-center my-2">
//             <ThemedView styles="flex-row items-center gap-1">
//               {/* <FontAwesome name="star" size={18} color="#FE8814" /> */}
//               <Star size={18} color="#FE8814" />

//               <ThemedText styles="font-Medium">
//                 {item?.averageRating} ({item?.averageReviewCount} reviews)
//               </ThemedText>
//             </ThemedView>
//             <ThemedView styles="flex-row items-center">
//               {/* <Feather name="dollar-sign" size={14} color={icon2} /> */}
//               <ThemedText styles="font-Medium">
//                 {item?.displayCurrency}{" "}
//               </ThemedText>
//               <ThemedText styles="font-Medium">
//                 {item?.averagePrice} /night
//               </ThemedText>
//             </ThemedView>
//           </ThemedView>

//           {/* Description */}
//           <ReadMoreText text={item.businessDescription} wordLimit={15} />

//           {/* Features */}
//           {features?.length > 0 && (
//             <View>
//               <ThemedText styles="font-Bold text-2xl my-4">
//                 {t("hotelDetails.whatWeOffer")}
//               </ThemedText>
//               <View style={{ height: responsiveHeight(14) }}>
//                 <FlatList
//                   data={features}
//                   keyExtractor={(item) => item.id.toString()}
//                   renderItem={({ item }) => <Feature item={item} />}
//                   horizontal
//                   showsHorizontalScrollIndicator={false}
//                   contentContainerStyle={{
//                     gap: responsiveHeight(2),
//                   }}
//                 />
//               </View>
//             </View>
//           )}

//           {/* All Rooms */}
//           <ThemedText styles="font-Bold text-2xl my-4">All Rooms</ThemedText>
//           <FlatList
//             data={item?.room}
//             renderItem={renderItem}
//             // keyExtractor={item => item.id.toString()}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{
//               gap: responsiveHeight(2),
//               paddingBottom: 20,
//             }}
//           />
//           <ThemedView styles="flex-row items-center justify-between mt-2">
//             <ThemedView>
//               <ThemedText styles="font-SemiBold text-md">
//                 {profileData?.data?.fullName || profileData?.data?.email}
//               </ThemedText>
//               <ThemedView styles="flex-row items-center gap-1">
//                 {/* <FontAwesome name="star" size={18} color="#FE8814" /> */}
//                 <ThemedText styles="font-Medium">
//                   {item?.room[0]?.hotelRating} (
//                   {item?.room[0]?.hotelReviewCount} {t("hotelDetails.reviews")})
//                 </ThemedText>
//               </ThemedView>
//             </ThemedView>

//             <Pressable
//               onPress={() =>
//                 navigation.navigate("UserChat", {
//                   receiverId: item?.partnerId,
//                   receiverName:
//                     profileData?.data?.fullName || profileData?.data?.email,
//                 })
//               }
//             >
//               <ThemedViewBlue styles="px-4 py-3 rounded-xl">
//                 <Image source={require("assets/images/chat.webp")} />
//               </ThemedViewBlue>
//             </Pressable>
//           </ThemedView>
//         </ScrollView>
//       </View>
//     </ThemedView>
//   );
// };

// // 💅 Styles
// const getStyles = (theme) =>
//   StyleSheet.create({
//     header: {
//       position: "absolute",
//       zIndex: 20,
//       width: "100%",
//       paddingHorizontal: responsiveWidth(6),
//       paddingVertical: responsiveHeight(3),
//       flexDirection: "row",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     image: {
//       width: responsiveWidth(100),
//       height: responsiveHeight(35),
//       resizeMode: "cover",
//     },
//     bottomSheet: {
//       position: "absolute",
//       top: responsiveHeight(30),
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: theme === "dark" ? "black" : "white",
//       borderTopLeftRadius: 30,
//       borderTopRightRadius: 30,
//       overflow: "hidden",
//     },
//     scrollContent: {
//       paddingHorizontal: responsiveWidth(6),
//       paddingBottom: responsiveHeight(5),
//       paddingTop: responsiveHeight(5),
//     },
//   });

// export default HotelBookingHotelDetailScreen;

/* eslint-disable react-native/no-inline-styles */

import {
  View,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  useColorScheme,
  Pressable,
  Share,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import ThemedView from "@/utils/ThemedView";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import ThemedText from "@/utils/ThemedText";
import { useThemeColor } from "@/utils/useThemeColor";
import IconContainer from "@/utils/IconContainer";
import ReadMoreText from "@/utils/ReadMoreText";
import Feature from "@/components/Feature";
import ThemedViewBlue from "@/utils/ThemedViewBlue";
import { useFormContext } from "react-hook-form";
import useT from "@/utils/useT";
import { useGetSingleUserQuery } from "@/redux/slices/authSlice";
import { featureMap } from "@/utils/featureMap";
import HotelRoomCard from "@/components/HotelRoomCard";
import { useAddFavouriteHotelMutation } from "@/redux/slices/userSlice/hotelbookingSlice";
import { ArrowLeft, Heart, Share2, Star } from "lucide-react-native";
import {
  getCountryCode,
  getCurrencyFromCountryCode,
} from "@/utils/simpleLocationService";
import { convertPrice } from "@/utils/convertPrice";

const HotelBookingHotelDetailScreen = () => {
  const navigation = useNavigation();
  const { icon2 } = useThemeColor();
  const [liked, setLiked] = useState(false);
  const [addFavouriteHotel] = useAddFavouriteHotelMutation();

  // Price conversion states
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [displayCurrency, setDisplayCurrency] = useState(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true);

  const { getValues, setValue } = useFormContext();
  const { selectedHotel: item } = getValues();

  console.log("LINE AT 51", item, item?.room);

  const handleFavourite = async () => {
    try {
      const res = await addFavouriteHotel({ hotelId: item.id }).unwrap();
      console.log("Added to favourites ✅:", res);
      setLiked((prev) => !prev);
    } catch (error) {
      console.error("Error adding favourite ❌:", error);
    }
  };

  // Load price conversion
  useEffect(() => {
    const loadPriceConversion = async () => {
      try {
        setIsLoadingPrice(true);

        // Get user's country code
        const countryCode = await getCountryCode();
        // console.log("User country code:", countryCode);

        // Get currency for user's country
        const userCurrency = getCurrencyFromCountryCode(countryCode);
        // console.log("User currency:", userCurrency);

        // Get hotel's original currency
        const hotelCurrency =
          item?.roomCurrency || item?.displayCurrency || "USD";
        // console.log("Hotel currency:", hotelCurrency);

        // Convert price if currencies are different
        if (userCurrency !== hotelCurrency) {
          const newPrice = await convertPrice(
            item?.averagePrice,
            hotelCurrency,
            userCurrency
          );
          console.log("Converted price:", newPrice);
          setConvertedPrice(newPrice.toFixed(2));
          setDisplayCurrency(userCurrency);
        } else {
          // Same currency, no conversion needed
          setConvertedPrice(item?.averagePrice);
          setDisplayCurrency(hotelCurrency);
        }
      } catch (error) {
        console.error("Price conversion error:", error);
        // Fallback to original price on error
        setConvertedPrice(item?.averagePrice);
        setDisplayCurrency(item?.displayCurrency || item?.roomCurrency);
      } finally {
        setIsLoadingPrice(false);
      }
    };

    if (item) {
      loadPriceConversion();
    }
  }, [item]);

  const theme = useColorScheme();
  const styles = getStyles(theme);
  const t = useT();

  // ✅ Filter hotel features
  const features = featureMap
    .filter((f) => item[f?.key])
    .map((f, index) => ({
      id: index,
      title: f?.title,
      icon: f?.icon,
    }));

  const { data: profileData } = useGetSingleUserQuery(item?.partnerId);

  const handleBookRoom = (room) => {
    navigation.navigate("UserHotelHotelBookCredential", { room: room });
    setValue("selectedRoom", room);
  };

  const renderItem = ({ item }) => (
    <HotelRoomCard
      room={item}
      onBookRoom={handleBookRoom}
      convertedCurrency={displayCurrency}
      isLoadingPrice={isLoadingPrice}
    />
  );

  const handlePress = async () => {
    try {
      await Share.share({
        message: `Hey 👋 check out this awesome ${item?.hotelBusinessName}!`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  // Display price (use converted if available, otherwise original)
  const priceToDisplay =
    convertedPrice !== null ? convertedPrice : item?.averagePrice;
  const currencyToDisplay =
    displayCurrency || item?.displayCurrency || item?.roomCurrency;

  return (
    <ThemedView styles="flex-1 relative bg-white">
      {/* Header */}
      <View style={styles.header}>
        <IconContainer
          icon={<ArrowLeft size={24} color={icon2} />}
          onPress={() => navigation.goBack()}
        />
        <View className="flex-row gap-4">
          <Pressable onPress={handlePress}>
            <IconContainer icon={<Share2 size={20} color={icon2} />} />
          </Pressable>
          <Pressable onPress={handleFavourite}>
            <ThemedView
              styles="rounded-full"
              style={{
                paddingHorizontal: responsiveWidth(2),
                paddingVertical: responsiveHeight(1),
              }}
            >
              {liked ? (
                <Heart size={20} color={icon2} fill={icon2} />
              ) : (
                <Heart size={20} color={icon2} />
              )}
            </ThemedView>
          </Pressable>
        </View>
      </View>

      {/* Hotel Image */}
      <Image
        source={{ uri: item?.room[0]?.hotelImages[0] }}
        style={styles.image}
      />

      {/* Bottom Section */}
      <View style={styles.bottomSheet}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedText styles="font-Bold text-4xl">
            {item?.hotelBusinessName}
          </ThemedText>
          <ThemedText styles="font-Regular text-md">
            {item?.hotelAddress}, {item?.hotelCity}, {item?.hotelCountry}
          </ThemedText>

          {/* Rating and Price */}
          <ThemedView styles="flex-row justify-between items-center my-2">
            <ThemedView styles="flex-row items-center gap-1">
              <Star size={18} color="#FE8814" />
              <ThemedText styles="font-Medium">
                {item?.averageRating} ({item?.averageReviewCount} reviews)
              </ThemedText>
            </ThemedView>
            <ThemedView styles="flex-row items-center">
              <ThemedText styles="font-Medium">{currencyToDisplay} </ThemedText>
              <ThemedText styles="font-Medium">
                {isLoadingPrice ? "..." : priceToDisplay} /night
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Description */}
          <ReadMoreText text={item.businessDescription} wordLimit={15} />

          {/* Features */}
          {features?.length > 0 && (
            <View>
              <ThemedText styles="font-Bold text-2xl my-4">
                {t("hotelDetails.whatWeOffer")}
              </ThemedText>
              <View style={{ height: responsiveHeight(14) }}>
                <FlatList
                  data={features}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => <Feature item={item} />}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: responsiveHeight(2),
                  }}
                />
              </View>
            </View>
          )}

          {/* All Rooms */}
          <ThemedText styles="font-Bold text-2xl my-4">All Rooms</ThemedText>
          <FlatList
            data={item?.room}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: responsiveHeight(2),
              paddingBottom: 20,
            }}
          />
          <ThemedView styles="flex-row items-center justify-between mt-2">
            <ThemedView>
              <ThemedText styles="font-SemiBold text-md">
                {profileData?.data?.fullName || profileData?.data?.email}
              </ThemedText>
              <ThemedView styles="flex-row items-center gap-1">
                <ThemedText styles="font-Medium">
                  {item?.room[0]?.hotelRating} (
                  {item?.room[0]?.hotelReviewCount} {t("hotelDetails.reviews")})
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <Pressable
              onPress={() =>
                navigation.navigate("UserChat", {
                  receiverId: item?.partnerId,
                  receiverName:
                    profileData?.data?.fullName || profileData?.data?.email,
                })
              }
            >
              <ThemedViewBlue styles="px-4 py-3 rounded-xl">
                <Image source={require("assets/images/chat.webp")} />
              </ThemedViewBlue>
            </Pressable>
          </ThemedView>
        </ScrollView>
      </View>
    </ThemedView>
  );
};

// 💅 Styles
const getStyles = (theme) =>
  StyleSheet.create({
    header: {
      position: "absolute",
      zIndex: 20,
      width: "100%",
      paddingHorizontal: responsiveWidth(6),
      paddingVertical: responsiveHeight(3),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    image: {
      width: responsiveWidth(100),
      height: responsiveHeight(35),
      resizeMode: "cover",
    },
    bottomSheet: {
      position: "absolute",
      top: responsiveHeight(30),
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme === "dark" ? "black" : "white",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: "hidden",
    },
    scrollContent: {
      paddingHorizontal: responsiveWidth(6),
      paddingBottom: responsiveHeight(5),
      paddingTop: responsiveHeight(5),
    },
  });

export default HotelBookingHotelDetailScreen;
