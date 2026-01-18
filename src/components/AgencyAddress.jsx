import { View, useColorScheme } from 'react-native';
import React from 'react';
import ThemedView from '../utils/ThemedView';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import ThemedText from '../utils/ThemedText';
import ThemedText3 from '../utils/ThemedText3';
import { MapPin } from 'lucide-react-native';

const AgencyAddress = ({ address }) => {
  const theme = useColorScheme();

  return (
    <ThemedView styles="flex-row justify-between items-start">
      <View className="flex-row justify-between items-start gap-2">
        {/* <FontAwesome
          name="map-marker"
          size={24}
          color={theme === 'dark' ? '#2563eb' : '#1d4ed8'}
        /> */}
        <MapPin size={24} color={theme === 'dark' ? '#2563eb' : '#1d4ed8'} />
        <View>
          {/* <ThemedText styles="font-Medium text-lg">
            {address?.agencyName}
          </ThemedText> */}
          <ThemedText3 styles="font-Regular text-xs">
            {address?.address}, {address?.city}, {address?.country}
          </ThemedText3>
          <ThemedText3 styles="font-Regular text-xs">
            {address.postal}
          </ThemedText3>
        </View>
      </View>
      {/* <ThemedText styles="font-Medium text-sm">1.1km</ThemedText> */}
    </ThemedView>
  );
};

export default AgencyAddress;
