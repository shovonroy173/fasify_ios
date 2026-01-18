/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import { beginInfo } from '../../assets/data/data';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedView from '../utils/ThemedView';
import ThemedText from '../utils/ThemedText';
import ThemedPressable from '../utils/ThemedPressable';
import ThemedText2 from '../utils/ThemeText2';
import { useThemeColor } from '../utils/useThemeColor';
import { useNavigation } from '@react-navigation/native';
import useT from '../utils/useT';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ArrowRight } from 'lucide-react-native'; // ✅ Lucide icon


export default function Carousel() {
  const { width } = useWindowDimensions();
  const paddingHorizontal = responsiveWidth(6);
  const [activeIndex, setActiveIndex] = useState(0);
  const { icon } = useThemeColor();
  const navigation = useNavigation();
  const theme = useColorScheme();
  const t = useT();
  // console.log('LINE AT 34', theme);
  

  const flatListRef = useRef();

  // Slide animation value (replace fadeAnim)
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateToIndex = index => {
    if (index !== activeIndex) {
      // Slide out left
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        slideAnim.setValue(width); // Reset to right off-screen
        setActiveIndex(index);

        // Slide in from right
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handleScroll = event => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / (width - 2 * paddingHorizontal),
    );
    animateToIndex(index);
  };

  const handleNext = () => {
    if (activeIndex < beginInfo.length - 1) {
      animateToIndex(activeIndex + 1);
      flatListRef?.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      navigation.navigate('Role');
    }
  };

  return (
    <ThemedView
      styles="flex-1 justify-start"
      style={{
        paddingHorizontal: paddingHorizontal,
        paddingVertical: responsiveHeight(5),
        // gap: responsiveHeight(2),
      }}
    >
      {/* Carousel */}
      <View>
        <FlatList
          ref={flatListRef}
          data={beginInfo}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Image
              source={item.uri}
              style={{
                width: width - 2 * paddingHorizontal,
                height: responsiveHeight(50),
                borderRadius: 20,
              }}
              resizeMode="cover"
            />
          )}
        />
      </View>

      {/* Dot Indicator */}
      <View className="flex-row justify-center "
      style={{paddingVertical: responsiveHeight(1)}}
      >
        {beginInfo.map((_, index) => (
          <View
            key={index}
            className={`h-2 mx-1 rounded-xl ${
              activeIndex === index ? 'bg-primary w-10' : 'bg-slate-300 w-4'
            }`}
          />
        ))}
      </View>

      {/* Description (only logic changed here) */}
      <View
        style={{
          height: responsiveHeight(22),
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}
      >
        <Animated.Text
          style={[
            {
              transform: [{ translateX: slideAnim }],
              fontSize: 36, // text-5xl equivalent
              fontWeight: '700',
              fontFamily: 'AlbertSans-Bold',
              color: theme === 'dark' ? 'white' : '040404',
            },
          ]}
        >
          {t(beginInfo[activeIndex].desc)}
        </Animated.Text>
      </View>

      {/* Buttons */}
      <ThemedView styles="flex-row gap-2 justify-center items-center">
        {/* Skip */}
        <Pressable
          style={{
            width: responsiveWidth(35),
            paddingVertical: responsiveWidth(4),
          }}
          onPress={() => navigation.navigate('Role')}
        >
          <ThemedText styles="text-center font-SemiBold">
            {t(beginInfo[activeIndex].btn1)}
          </ThemedText>
        </Pressable>

        {/* Next / Get Started */}
        <ThemedPressable
          styles="rounded-lg bg-primary"
          style={{
            width: responsiveWidth(50),
            paddingVertical: responsiveWidth(4),
          }}
          onPress={handleNext}
        >
          <View className="flex-row justify-center items-center gap-2">
            <ThemedText2 styles="text-center font-SemiBold">
              {t(beginInfo[activeIndex].btn2)}
            </ThemedText2>
            <ArrowRight size={20} color={icon} strokeWidth={2.5} />
          </View>
        </ThemedPressable>
      </ThemedView>
    </ThemedView>
  );
}
