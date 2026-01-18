/* eslint-disable react-native/no-inline-styles */
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import Icon from 'react-native-vector-icons/MaterialIcons';

const { width: screenWidth } = Dimensions.get('window');

// export const carImage = [
//   { id: 1, uri: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop&crop=center' },
//   { id: 2, uri: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=250&fit=crop&crop=center' },
//   { id: 3, uri: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400&h=250&fit=crop&crop=center' },
//   { id: 4, uri: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop&crop=center' },
// //   { id: 5, uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&crop=center' },
// ];

export default function CarImageCarousel({ carImage }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);
  // console.log(carImage);

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const scrollToIndex = index => {
    scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
    setActiveIndex(index);
  };

  const goToPrevious = () =>
    scrollToIndex(activeIndex > 0 ? activeIndex - 1 : carImage.length - 1);
  const goToNext = () => scrollToIndex((activeIndex + 1) % carImage.length);

  return (
    <View className="rounded-2xl mb-3">
      <View className="relative">
        <TouchableOpacity
          onPress={goToPrevious}
          className="absolute left-2  z-10 "
          style={{
            transform: [{ translateY: -20 }],
            bottom: -responsiveHeight(6),
          }}
        >
          {/* <Icon name="chevron-left"  /> */}
          <ChevronLeft size={24} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToNext}
          className="absolute right-2  z-10 "
          style={{
            transform: [{ translateY: -20 }],
            bottom: -responsiveHeight(6),
          }}
        >
          <ChevronRight size={24} color="#9CA3AF" />
          {/* <Icon name="chevron-right" size={24} color="#9CA3AF" /> */}
        </TouchableOpacity>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          snapToInterval={screenWidth}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {carImage.map(car => (
            <View key={car + 1} style={{ width: responsiveWidth(100) }}>
              <Image
                source={{ uri: car }}
                className=" rounded-xl"
                style={{
                  width: responsiveWidth(88),
                  height: responsiveHeight(24),
                  objectFit: 'cover',
                }}
              />
            </View>
          ))}
        </ScrollView>


      </View>
    </View>
  );
}

// export function AutoPlayCarImageCarousel({ autoPlayInterval = 3000 }) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const scrollViewRef = useRef(null);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     startAutoPlay();
//     return () => stopAutoPlay();
//   }, [activeIndex]);

//   const startAutoPlay = () => {
//     intervalRef.current = setInterval(() => {
//       scrollToIndex((activeIndex + 1) % carImage.length);
//     }, autoPlayInterval);
//   };

//   const stopAutoPlay = () => clearInterval(intervalRef.current);

//   const scrollToIndex = (index) => {
//     scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
//     setActiveIndex(index);
//   };

//   const handleScroll = (e) => setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / screenWidth));
//   const handleTouchStart = stopAutoPlay;
//   const handleTouchEnd = () => setTimeout(startAutoPlay, 2000);

//   return (
//     <View className="bg-white mx-4 mt-4 rounded-2xl p-6 shadow-sm">
//       <View className="relative">
//         <TouchableOpacity onPress={() => scrollToIndex((activeIndex - 1 + carImage.length) % carImage.length)} className="absolute left-2 top-1/2 z-10 bg-white rounded-full p-2 shadow-md" style={{ transform: [{ translateY: -20 }] }}>
//           <Icon name="chevron-left" size={24} color="#9CA3AF" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => scrollToIndex((activeIndex + 1) % carImage.length)} className="absolute right-2 top-1/2 z-10 bg-white rounded-full p-2 shadow-md" style={{ transform: [{ translateY: -20 }] }}>
//           <Icon name="chevron-right" size={24} color="#9CA3AF" />
//         </TouchableOpacity>

//         <ScrollView
//           ref={scrollViewRef}
//           horizontal
//           pagingEnabled
//           snapToInterval={screenWidth}
//           decelerationRate="fast"
//           showsHorizontalScrollIndicator={false}
//           onScroll={handleScroll}
//           scrollEventThrottle={16}
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//           contentContainerStyle={{ alignItems: 'center' }}>
//           {carImage.map((car) => (
//             <View key={car.id} style={{ width: screenWidth }}>
//               <Image source={{ uri: car.uri }} className="h-48 rounded-xl" style={{ width: screenWidth - 80 }} resizeMode="contain" />
//             </View>
//           ))}
//         </ScrollView>

//         <View className="flex-row justify-center items-center mt-4">
//           {carImage.map((_, index) => (
//             <TouchableOpacity key={index} onPress={() => scrollToIndex(index)} className={`mx-1 rounded-full ${index === activeIndex ? 'bg-blue-500 w-8 h-2' : 'bg-gray-300 w-2 h-2'}`} />
//           ))}
//         </View>
//       </View>
//     </View>
//   );
// }

// export function ThumbnailCarImageCarousel() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const mainScrollViewRef = useRef(null);
//   const thumbScrollViewRef = useRef(null);

//   const handleMainScroll = (event) => {
//     const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
//     setActiveIndex(index);
//     thumbScrollViewRef.current?.scrollTo({ x: index * 80, animated: true });
//   };

//   const selectImage = (index) => {
//     setActiveIndex(index);
//     mainScrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
//   };

//   return (
//     <View className="bg-white mx-4 mt-4 rounded-2xl p-6 shadow-sm">
//       <View className="relative">
//         <ScrollView
//           ref={mainScrollViewRef}
//           horizontal
//           pagingEnabled
//           snapToInterval={screenWidth}
//           decelerationRate="fast"
//           showsHorizontalScrollIndicator={false}
//           onScroll={handleMainScroll}
//           scrollEventThrottle={16}
//           contentContainerStyle={{ alignItems: 'center' }}>
//           {carImage.map((car) => (
//             <View key={car.id} style={{ width: screenWidth }}>
//               <Image source={{ uri: car.uri }} className="h-48 rounded-xl" style={{ width: screenWidth - 80 }} resizeMode="contain" />
//             </View>
//           ))}
//         </ScrollView>

//         <View className="mt-4">
//           <ScrollView
//             ref={thumbScrollViewRef}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingHorizontal: 8 }}>
//             {carImage.map((car, index) => (
//               <TouchableOpacity
//                 key={car.id}
//                 onPress={() => selectImage(index)}
//                 className={`mr-2 rounded-lg overflow-hidden ${index === activeIndex ? 'border-2 border-blue-500' : 'border border-gray-200'}`}>
//                 <Image source={{ uri: car.uri }} className="w-16 h-12" resizeMode="cover" />
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>

//         <View className="flex-row justify-center items-center mt-4">
//           {carImage.map((_, index) => (
//             <TouchableOpacity key={index} onPress={() => selectImage(index)} className={`mx-1 rounded-full ${index === activeIndex ? 'bg-blue-500 w-8 h-2' : 'bg-gray-300 w-2 h-2'}`} />
//           ))}
//         </View>
//       </View>
//     </View>
//   );
// }
