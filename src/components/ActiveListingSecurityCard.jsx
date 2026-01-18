import React from 'react';
import { View, useColorScheme, Image } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import ThemedText from '../utils/ThemedText';
// import ThemedText2 from '../utils/ThemeText2';
import ThemedView from '../utils/ThemedView';
import ThemedText3 from '../utils/ThemedText3';
// import Icon from 'react-native-vector-icons/Ionicons';
import ThemedPressableWhite from '../utils/ThemedPressableWhite';

const ActiveListingSecurityCard = ({
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
              source={{ uri: item?.businessLogo }}
              className="w-12 h-12 rounded-full mr-3"
            />

            <View className="flex-1 gap-1">
              <ThemedText styles="font-SemiBold text-sm">
                {item?.securityBusinessName}
              </ThemedText>
              <ThemedText3 styles="font-Regular text-sm">
                {item?.securityTagline}
              </ThemedText3>
              {/* <ThemedText3 styles="text-xs font-Regular">
                Total Security: {item?.totalGuards}
              </ThemedText3> */}
            </View>
          </View>

          <View className="w-full gap-1">
            <ThemedPressableWhite
              styles="border rounded-xl p-2  "
              onPress={() => {
                onChange(item); // set the selected item
                navigation.navigate(pathListing, { id: item?.id }); // navigate to next screen
              }}
            >
              <ThemedText styles="font-SemiBold text-center">
                View All Securities
              </ThemedText>
            </ThemedPressableWhite>
            <ThemedPressableWhite
              styles="border rounded-xl p-2  "
              onPress={() => {
                onChange(item); // set the selected item
                navigation.navigate(path, { screen: screen }); // navigate to next screen
              }}
            >
              <ThemedText styles="font-SemiBold text-center">
                Edit Business
              </ThemedText>
            </ThemedPressableWhite>
          </View>
        </ThemedView>
      )}
    />
  );
};

export default ActiveListingSecurityCard;
