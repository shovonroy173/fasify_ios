import { Image, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Controller } from 'react-hook-form';
import ThemedView from '../utils/ThemedView';
import ThemedText from '../utils/ThemedText';
import ThemedText3 from '../utils/ThemedText3';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ThemedPressableWhite from '../utils/ThemedPressableWhite';

const ActiveAttractionBusinessCard = ({
  item,
  name,
  path,
  screen,
  control,
  pathListing,
}) => {
  // const theme = useColorScheme();
  const navigation = useNavigation();

  // console.log('LINE AT 16', item);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        // const isSelected = value?.id === item?.id;

        return (
          <ThemedView styles="flex-row p-3 rounded-md border ">
            <Image
              source={{ uri: item.businessLogo }}
              className="w-24 h-42 rounded-md"
              resizeMode="cover"
            />

            <View className="flex-1 ml-3 gap-2">
              <ThemedText styles="font-SemiBold text-base">
                {item?.attractionBusinessName}
              </ThemedText>
              {/* <ThemedText3 styles="text-sm mt-1 font-Regular">
                {item?.attractionBusinessTagline}
              </ThemedText3> */}

              {/* <ThemedText3 styles="text-xs font-Regular">
                Total Attractions: {item?.totalAppeals}
              </ThemedText3> */}

              <View className="w-full gap-1">
                <ThemedPressableWhite
                  styles="border rounded-xl p-2  "
                  onPress={() => {
                    onChange(item); // set the selected item
                    navigation.navigate(pathListing, { id: item?.id }); // navigate to next screen
                  }}
                >
                  <ThemedText styles="font-SemiBold text-center">
                    View All Attractions
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
            </View>
          </ThemedView>
        );
      }}
    />
  );
};

export default ActiveAttractionBusinessCard;
