import React from 'react';
import { View, useColorScheme, Image } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import ThemedText from '../utils/ThemedText';
// import ThemedText2 from '../utils/ThemeText2';
import ThemedView from '../utils/ThemedView';
import ThemedText3 from '../utils/ThemedText3';
// import Icon from 'react-native-vector-icons/Ionicons';
import ThemedPressableWhite from '../utils/ThemedPressableWhite';
import { useThemeColor } from '../utils/useThemeColor';

const ActiveListingSecurityGuardCard = ({
  item,
  name,
  path,
  navigation,
  screen,
  pathListing,
}) => {
  const theme = useColorScheme();
  const { control } = useFormContext();
  // console.log('LINE AT 11', item);
  const { icon3 } = useThemeColor();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <ThemedView
          styles={`rounded-lg p-3 gap-2 items-center ${
            theme === 'dark' ? 'bg-zinc-600' : 'bg-zinc-100'
          }`}
        >
          <View className="flex-row">
            <Image
              source={{ uri: item?.securityImages[0] }}
              className="w-12 h-12 rounded-full mr-3"
            />

            <View className="flex-1 gap-1">
              <ThemedText styles="font-SemiBold text-sm">
                {item?.securityGuardName}
              </ThemedText>
              {/* <ThemedText3 styles="font-Regular text-sm">
                {item?.securityTagline}
              </ThemedText3> */}
              <View className="flex-row items-center gap-2">
                <View className="flex-row items-center gap-1">
                  {/* <Icon name="star" size={14} color="#FFA500" /> */}
                  <ThemedText3 styles="text-xs font-Regular">
                    {item?.securityRating}
                  </ThemedText3>
                </View>

                <ThemedText3 styles="text-xs font-Regular">
                  BDT {item?.securityPriceDay}
                </ThemedText3>
              </View>
              <View className="flex-row items-center ">
                {/* <Icon name="location-outline" size={14} color={icon3} /> */}
                <ThemedText3 styles="text-sm ml-1 w-1/2">
                  {item?.securityCity}, {item?.securityDistrict},
                  {item?.securityCountry}
                </ThemedText3>
              </View>
            </View>
          </View>

          <View className="w-full gap-1">
            {/* <ThemedPressableWhite
              styles="border rounded-xl p-2  "
              onPress={() => {
                onChange(item); // set the selected item
                navigation.navigate(pathListing, { id: item?.id }); // navigate to next screen
              }}
            >
              <ThemedText styles="font-SemiBold text-center">
                View All Securities
              </ThemedText>
            </ThemedPressableWhite> */}
            <ThemedPressableWhite
              styles="border rounded-xl p-2  "
              onPress={() => {
                onChange(item); // set the selected item
                navigation.navigate(path, { screen: screen }); // navigate to next screen
                console.log('click');
              }}
            >
              <ThemedText styles="font-SemiBold text-center">Edit</ThemedText>
            </ThemedPressableWhite>
          </View>
        </ThemedView>
      )}
    />
  );
};

export default ActiveListingSecurityGuardCard;
