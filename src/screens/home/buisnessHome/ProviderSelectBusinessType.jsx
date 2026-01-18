


import { View, FlatList, Pressable, useColorScheme, Text, Alert, ActivityIndicator } from 'react-native';
import React from 'react';
import ThemedView from '@/utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import GoBack from '@/components/GoBack';
import { useNavigation } from '@react-navigation/native';
import BusinessTypeSelector from '@/components/BuisnessTypeSelector';
import { businessTypes } from '@/../assets/data/data';
import { useFormContext } from 'react-hook-form';
import TitleComponent from '@/components/TitleComponent';
import ThemedText2 from '@/utils/ThemeText2';
import { useThemeColor } from '@/utils/useThemeColor';
import { useSelector } from 'react-redux';
import {
  getBusinessType,
  getBusinessTypeName,
} from '@/utils/getBusinessType';
import { useGetSingleUserQuery } from '@/redux/slices/authSlice';


const ProviderSelectBusinessType = () => {
  const navigation = useNavigation();
  const {
    getValues,
    setError,
    formState: { errors },
    clearErrors,
  } = useFormContext();
  const { businessType } = getValues();
  const theme = useColorScheme();
  
  // const user = useSelector(state => state.auth.res);
  // const token = useSelector(state => state.auth.token);
  const users = useSelector(state => state.auth.user);
  // console.log("LINE AT 31", businessType);
  const {data} = useGetSingleUserQuery(users?.id);



  // console.log('LINE AT 36', user, token, users, data);

  const baseStyle = `${theme === 'dark' ? 'bg-primary_dark' : 'bg-primary'} ${
    businessType ? 'opacity-100' : 'opacity-50'
  }`;
  // const [modalVisible, setModalVisible] = useState(false);
  const { icon } = useThemeColor();
  return (
    <ThemedView
      styles="flex-1 justify-between "
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
      }}
    >
      <View
        style={{
          marginTop: responsiveHeight(5),
          gap: responsiveHeight(5),
        }}
      >
        {/* <GoBack navigation={navigation} /> */}
        <TitleComponent
          title="Category"
          subTitle="Please select your business category."
        />
        <FlatList
          data={businessTypes}
          renderItem={({ item }) => (
            <BusinessTypeSelector
              key={item.id}
              item={item}
              name={'businessType'}
              navigation={navigation}
            />
          )}
          contentContainerClassName="gap-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      </View>
      {/* <Text className="text-red-500">
        {errors?.root?.type === 'businessType' && errors?.root?.message}
      </Text> */}

      <Pressable
        onPress={() => {
          clearErrors('root');
          if (data && getBusinessType(data?.data)) {
            if (getBusinessTypeName(data?.data) === businessType?.id) {
              navigation.navigate('ProviderBottomTab');
            } else {
              setError('root', {
                type: 'businessType',
                message: 'Please select your business!',
              });
            }
          } else {
            navigation.navigate(businessType && businessType?.path);
          }
          // if (businessType) {
          //   setModalVisible(true);
          // }
        }}
        className={`rounded-lg p-3 ${baseStyle} flex-row items-center justify-center gap-2 mb-4 ${
          !businessType && 'disabled:bg-slate-200'
        } `}
      >
        <ThemedText2 styles="text-center font-SemiBold text-lg">
          Next
        </ThemedText2>
        {/* {<MaterialIcons name="check-circle" size={24} color={icon} />} */}
      </Pressable>
      {/* <NextStepModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
        businessType={businessType}
      /> */}
    </ThemedView>
  );
};

export default ProviderSelectBusinessType;