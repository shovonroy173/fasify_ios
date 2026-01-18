

import { View, FlatList } from 'react-native';
import React from 'react';
import ThemedView from '@/utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import GoBack from '@/components/GoBack';
import { useNavigation } from '@react-navigation/native';
import ThemedText from '@/utils/ThemedText';
import { useGetAllCarPromoCodeQuery } from '@/redux/slices/userSlice/carBookingSlice';
import ThemedText3 from '@/utils/ThemedText3';
import GlobalLoading from '@/components/GlobalLoading';
import GlobalError from '@/components/GlobalError';
import GlobalNoData from '@/components/GlobalNoData';

const UserMyVoucherScreen = () => {
  const navigation = useNavigation();
  const {
    data: carAllPromoCode,
    isLoading: promoCodeLoading,
    isError: promoCodeError,
    refetch,
  } = useGetAllCarPromoCodeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log(carAllPromoCode?.data[0]?.validFrom);

  const renderItem = ({ item }) => (
    <ThemedView
      style={{
        marginBottom: responsiveHeight(3),
        gap: responsiveHeight(2),
      }}
    >
      <ThemedView styles="w-full flex-row justify-between">
        <ThemedText styles="font-Medium text-md">Promo Code</ThemedText>
        <ThemedText3 styles="font-Medium text-md">{item?.code}</ThemedText3>
      </ThemedView>

      <ThemedView styles="w-full flex-row justify-between">
        <ThemedText styles="font-Medium text-md">Discount</ThemedText>
        <ThemedText3 styles="font-Medium text-md">
          {item?.discountValue}
        </ThemedText3>
      </ThemedView>

      <ThemedView styles="w-full flex-row justify-between">
        <ThemedText styles="font-Medium text-md">
          Minimum Expenditure on car booking
        </ThemedText>
        <ThemedText3 styles="font-Medium text-md">
          {item?.minimumAmount}
        </ThemedText3>
      </ThemedView>
      <ThemedView styles="w-full flex-row justify-between">
        <ThemedText styles="font-Medium text-md">
          Validity
        </ThemedText>
        <ThemedText3 styles="font-Medium text-md">
          {new Date(item?.validFrom).toLocaleDateString()} - {new Date(item?.validTo).toLocaleDateString()}
        </ThemedText3>
      </ThemedView>
    </ThemedView>
  );

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(4),
      }}
    >
      <GoBack navigation={navigation} />

      <ThemedText styles="font-SemiBold text-lg ">
        Your voucher for car booking
      </ThemedText>

      <FlatList
        data={carAllPromoCode?.data}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingBottom: responsiveHeight(4) }}
        ListHeaderComponent={
          <View>
            {promoCodeLoading && <GlobalLoading />}

            {promoCodeError && <GlobalError refetch={refetch} />}
            {!promoCodeLoading &&
              !promoCodeError &&
              !carAllPromoCode?.data?.length && <GlobalNoData />}
          </View>
        }
      />
    </ThemedView>
  );
};

export default UserMyVoucherScreen;
