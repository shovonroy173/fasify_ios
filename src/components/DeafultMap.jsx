import { View, Image, FlatList } from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LocationSearchInput from './LocationSearchInput';
import GoBack from './GoBack';
import DatePicker from './DatePicker';
import Button from './Button';
import { useFormContext } from 'react-hook-form';
import useT from '../utils/useT';
import ThemedView from '../utils/ThemedView';
import { carBooking } from '../../assets/data/data';
import AvailableCar from './AvailableCar';

const DeafultMap = ({ navigation }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const t = useT();
  return (
   <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      {/* Map Image */}
    

      {/* Location Input (Positioned at Top) */}
      
        <GoBack navigation={navigation} />
        <LocationSearchInput />
        {/* <DatePicker
          name="bookingDate"
          control={control}
          label="Date"
          error={errors?.bookingDate?.message}
        /> */}
        <Button
          title={t('search')}
          navigation={navigation}
          path="UserCarAvailable"
          noicon={true}
        />
      <FlatList
        data={carBooking}
        renderItem={({ item }) => (
          <AvailableCar
            key={item.id}
            item={item}
            name="selectedCar"
            navigation={navigation}
            path="UserCarDetail"
          />
        )}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(4),
          gap: responsiveHeight(5),
        }}
      />
      
    </ThemedView>
  );
};

export default DeafultMap;
