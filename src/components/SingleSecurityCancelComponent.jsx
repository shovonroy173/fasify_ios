import { View, useColorScheme, Image, Pressable } from 'react-native';
import React from 'react';
import ThemedText from '../utils/ThemedText';
import ThemedText3 from '../utils/ThemedText3';
import ThemedText2 from '../utils/ThemeText2';
import { useNavigation } from '@react-navigation/native';
import useT from '../utils/useT';
// import { useGetSingleSecurityQuery } from '../redux/slices/userSlice/securityBookingSlice';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Controller, useFormContext } from 'react-hook-form';
import { Star } from 'lucide-react-native';

const SingleSecurityCancelComponent = ({ booking, name, path, screen }) => {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const t = useT();
  console.log('LINE AT 16', booking);
  // const { data: singleSecurity } = useGetSingleSecurityQuery(
  //   booking?.security?.id,
  // );
  // console.log('LINE AT 16', singleSecurity);
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Pressable
          onPress={() => {
            onChange(booking);
            navigation.navigate(path, { screen: screen });
          }}
          key={booking.id}
          className={`${
            theme === 'dark' ? 'bg-zinc-600' : 'bg-zinc-200'
          }  rounded-lg p-3  flex-row items-center`}
        >
          <Image
            source={{ uri: booking?.security_Guard?.securityImages[0] }}
            className="w-12 h-12 rounded-full mr-3"
          />
          <View className="flex-1">
            <ThemedText styles="font-SemiBold text-sm">
              {booking?.security_Guard?.securityGuardName}
            </ThemedText>
            <View className="flex-row items-center gap-2">
              <View className="flex-row items-center gap-1">
                {/* <Icon name="star" size={14} color="#FFA500" /> */}
                <Star size={14} color="#FFA500" />
                <ThemedText3 styles="text-xs font-Regular">
                  {booking?.security_Guard?.securityRating}
                </ThemedText3>
              </View>

              <ThemedText3 styles="text-xs font-Regular">
                {booking?.displayCurrency} {booking?.payment[0]?.amount}
              </ThemedText3>
            </View>
          </View>
          <View className="items-end">
            {/* <Text className="text-xs text-gray-500 mb-2">{booking.timeAgo}</Text> */}
            <View className="bg-red-500 px-4 py-1 rounded-md">
              <ThemedText2 styles="text-sm font-Medium">
                {t('cancel')}
              </ThemedText2>
            </View>
          </View>
        </Pressable>
      )}
    />
  );
};

export default SingleSecurityCancelComponent;
