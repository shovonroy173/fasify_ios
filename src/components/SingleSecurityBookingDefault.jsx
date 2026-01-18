import { View, Text, useColorScheme, Image, Pressable } from 'react-native';
import React from 'react';
import ThemedText from '../utils/ThemedText';
import ThemedText3 from '../utils/ThemedText3';
import ThemedText2 from '../utils/ThemeText2';
import { useNavigation } from '@react-navigation/native';
import ThemedView from '../utils/ThemedView';

const SingleSecurityBookingDefault = ({ booking, path, screen }) => {
  const theme = useColorScheme();
  const navigation = useNavigation();
  return (
    <View
    //   onPress={() => navigation.navigate(path, { screen: screen })}
    //   key={booking.id}
      className={`${
        theme === 'dark' ? 'bg-zinc-600' : 'bg-zinc-200'
      }  rounded-lg p-3  flex-row items-center`}
    >
      <Image
        source={{ uri: booking.image }}
        className="w-12 h-12 rounded-full mr-3"
      />
      <View className="flex-1">
        <ThemedText styles="font-SemiBold text-sm">{booking.name}</ThemedText>
        {/* <ThemedText3 styles="text-xs font-Regular">{booking.date}</ThemedText3> */}
        {/* <ThemedText3 styles="text-xs font-Regular">{booking.time}</ThemedText3> */}
      </View>
      <View className="items-end">
        {/* <Text className="text-xs text-gray-500 mb-2">{booking.timeAgo}</Text> */}
        <Pressable onPress={()=> navigation.navigate(path)} className="bg-green-500 px-6 py-1 rounded-md">
          <ThemedText2 styles="font-Medium">
            Edit
          </ThemedText2>
        </Pressable>
      </View>
    </View>
  );
};

export default SingleSecurityBookingDefault;
