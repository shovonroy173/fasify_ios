import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ThemedView from '@/utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import ThemedText from '@/utils/ThemedText';
import { useThemeColor } from '@/utils/useThemeColor';
// import Octicons from 'react-native-vector-icons/Octicons';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import IconContainer from '@/utils/IconContainer';
// import ReadMoreText from '@/utils/ReadMoreText';
// import Feature from '@/components/Feature';
// import ThemedViewBlue from '@/utils/ThemedViewBlue';
// import Button from '@/components/Button';
import { useFormContext } from 'react-hook-form';
import ThemedTextInputLocation from '@/utils/ThemeTextInputLocation';
import CarAgency from '@/components/CarAgency';
import { carRentalAgencies } from '@/../assets/data/data';
import GoBack from '@/components/GoBack';

const HotelBookingHotelDetailScreen = () => {
  const navigation = useNavigation();
  const { icon2 } = useThemeColor();

  const { getValues } = useFormContext();
  const { selectedHotel: item } = getValues();
  // console.log('HotelBookingHotelDetailScreen', item);

  const theme = useColorScheme();

  const styles = getStyles(theme);

  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  return (
    <ThemedView styles="flex-1 relative ">


      {/* Hotel Image */}
      {/* <Image source={require('@/../assets/images/map.png')} style={styles.image} /> */}
      <View style={styles.imageContainer}>
        <Image
          source={require('assets/images/map.png')}
          style={styles.image}
        />
        <View style={styles.imageOverlay} />
      </View>
      {/* Scrollable Content with Rounded Corners */}
      <View style={styles.bottomSheet}>
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        > */}
        <GoBack navigation={navigation}/>
          <View className="gap-3">
            
            <ThemedTextInputLocation
              // label="Location"
              name="location"
              control={control}
              placeholder="Current location"
              error={errors.location?.message}
              // leftIcon={
              //   <MaterialIcons name="my-location" size={20} color="#999" />
              // }
              // rightIcon={
              //   <SimpleLineIcons name="target" size={20} color="#ef4444" />
              // }
              onPress={() => console.log('Right icon pressed')}
              onLeftPress={() => console.log('Left icon pressed')}
            />

            <ThemedTextInputLocation
              // label="Location"
              name="city"
              control={control}
              placeholder="Current city"
              error={errors.city?.message}
              // leftIcon={<Feather name="map-pin" size={20} color="#999" />}
              // rightIcon={<Feather name="x" size={20} color="#999" />}
              onPress={() => console.log('Right icon pressed')}
              onLeftPress={() => console.log('Left icon pressed')}
            />
          </View>
          <View className="w-full h-[0.5] bg-zinc-400" />
          <FlatList
            data={carRentalAgencies}
            renderItem={({ item }) => (
              // <Destination
              //   key={item.id}
              //   item={item}
              //   name="selectedHotel"
              //   navigation={navigation}
              //   path="UserHotelHotelDetail"
              // />
              <CarAgency
                key={item.id}
                item={item}
                name="selectedAgency"
                navigation={navigation}
                path="UserCarAvailable"
              />
            )}
            onEndReachedThreshold={0.3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              // paddingBottom: responsiveHeight(4),
              gap: responsiveHeight(3),
            }}
          />
          {/* <CarAgency /> */}
        {/* </ScrollView> */}
      </View>


    </ThemedView>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    header: {
      position: 'absolute',
      zIndex: 20,
      width: '100%',
      paddingHorizontal: responsiveWidth(6),
      paddingVertical: responsiveHeight(3),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    image: {
      width: responsiveWidth(100),
      height: responsiveHeight(35),
      resizeMode: 'cover',
    },
    imageContainer: {
      position: 'relative',
    },
    imageOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)', // or 0.6 for more darkness
    },

    bottomSheet: {
      position: 'absolute',
      top: responsiveHeight(15),
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme === 'dark' ? 'black' : 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: 'hidden',
      paddingHorizontal: responsiveWidth(6),
      // paddingBottom: responsiveHeight(18), // give space below for fixed button
      paddingTop: responsiveHeight(5),
      gap: responsiveHeight(4),
    },
    scrollContent: {
      paddingHorizontal: responsiveWidth(6),
      paddingBottom: responsiveHeight(18), // give space below for fixed button
      paddingTop: responsiveHeight(5),
      gap: responsiveHeight(2),
    },
    fixedButton: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: responsiveWidth(6),
      paddingVertical: responsiveHeight(2),
      backgroundColor: theme === 'dark' ? 'black' : 'white',
    },
    userImage: {
      width: responsiveWidth(13),
      height: responsiveWidth(13),
      resizeMode: 'cover',
      borderRadius: 10,
    },
  });

export default HotelBookingHotelDetailScreen;
