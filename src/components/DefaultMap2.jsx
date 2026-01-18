import { View, Image } from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LocationSearchInput from './LocationSearchInput';
import GoBack from './GoBack';
import LocationInput2 from './LocationInput2';
import DatePicker from './DatePicker';
import { useFormContext } from 'react-hook-form';
import Button from './Button';
import useT from '../utils/useT';
import ThemedView from '../utils/ThemedView';
import SecurityRecentBooking from './SecurityRecentBooking';
import { securityRecentBookings } from '../../assets/data/data';

const DeafultMap2 = ({ navigation }) => {
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
     
        <GoBack navigation={navigation} />
        <LocationInput2 />

        <Button
          title={t('search')}
          navigation={navigation}
          path="UserSecurityHome"
          noicon={true}
        />
      {/* </View> */}

      <SecurityRecentBooking
        securityRecentBookings={securityRecentBookings}
        path="UserSingleSecurity"
      />
    </ThemedView>
  );
};

export default DeafultMap2;
