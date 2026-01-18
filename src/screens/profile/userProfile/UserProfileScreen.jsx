/* eslint-disable react-native/no-inline-styles */
import {  Image, Pressable,  } from 'react-native';
import React from 'react';
import ThemedView from '@/utils/ThemedView';
import ThemedViewBlue from '@/utils/ThemedViewBlue';
import {  useNavigation } from '@react-navigation/native';
// import Feather from 'react-native-vector-icons/Feather';
import { useThemeColor } from '@/utils/useThemeColor';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedText2 from '@/utils/ThemeText2';
import ThemedText from '@/utils/ThemedText';
import { profileBtns } from '@/../assets/data/data';
import ProfileOption from '@/components/ProfileOption';
// import Octicons from 'react-native-vector-icons/Octicons';
import useT from '@/utils/useT';
import {
  useGetProviderProfileQuery,
  useLogoutMutation,
} from '@/redux/slices/authSlice';
import { clearAuth } from '@/redux/reducers/authReducer';
import { useDispatch } from 'react-redux';
import { ChevronLeft, Edit } from 'lucide-react-native';

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const { icon } = useThemeColor();
  const t = useT();
  const {
    data: profileData,
    isLoading,
    isError,
  } = useGetProviderProfileQuery(undefined, {
    // 👇 Ensures it re-fetches when tag is invalidated
    refetchOnMountOrArgChange: true,
  });
  console.log('Provider Profile', profileData, isLoading, isError);

  const [logout] = useLogoutMutation();

  const dispatch = useDispatch();

  return (
    <ThemedView styles="flex-1">
      <ThemedViewBlue
        style={{
          paddingHorizontal: responsiveWidth(6),
          paddingVertical: responsiveHeight(3),
          gap: responsiveHeight(3),
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <ThemedViewBlue styles="flex-row relative justify-center items-center">
          <Pressable
            onPress={() => navigation.navigate('UserHome', { screen: 'Home' })}
            className="absolute left-0"
          >
            {/* <Octicons name="arrow-left" size={24} color={icon} /> */}

            {/* <Entypo name="chevron-small-left" size={24} color={icon} /> */}
            <ChevronLeft size={24} color={icon}/>
          </Pressable>

          <ThemedText2 styles="font-SemiBold text-xl">
            {t('profile.my_profile')}
          </ThemedText2>
        </ThemedViewBlue>

        <ThemedViewBlue styles="flex-row items-center justify-between">
          <ThemedViewBlue styles="flex-row items-center gap-3">
            {/* <Pressable onPress={() => navigation.navigate('UserProfile')}> */}
            <Image
              source={{ uri: profileData?.data?.profileImage }}
              style={{
                width: responsiveWidth(15),
                height: responsiveWidth(15),
                borderRadius: 100,
              }}
            />
            {/* </Pressable> */}

            <ThemedViewBlue>
              <ThemedText2 styles="font-Bold text-lg">
                {profileData?.data?.fullName || 'Add Full Name'}
              </ThemedText2>
              <ThemedText2 styles="font-Regular text-sm opacity-80">
                {profileData?.data?.email}
              </ThemedText2>
              <ThemedText2 styles="font-Regular text-sm opacity-80">
                {profileData?.data?.contactNumber || 'Add Contact Number'}
              </ThemedText2>
            </ThemedViewBlue>
          </ThemedViewBlue>
          <Pressable onPress={() => navigation.navigate('UserEditProfile')}>
            {/* <Feather name="edit" size={24} color={icon} /> */}
            <Edit size={24} color={icon}/>
          </Pressable>
        </ThemedViewBlue>
      </ThemedViewBlue>
      <ThemedView
        style={{
          flex: 1,
          paddingHorizontal: responsiveWidth(6),
          paddingVertical: responsiveHeight(5),
          justifyContent: 'space-between',
        }}
      >
        <ThemedView styles="gap-4">
          {profileBtns.map(item => (
            <ProfileOption key={item.id} item={item} />
          ))}
        </ThemedView>

        <Pressable
          onPress={async () => {
            try {
              await logout().unwrap();
              dispatch(clearAuth());
              // navigation.reset({
              //   index: 0,
              //   routes: [
              //     {
              //       name: 'Auth',
              //       state: {
              //         routes: [{ name: 'Signin' }],
              //       },
              //     },
              //   ], // ⬅️ replace with your login/welcome stack root
              // });
              // navigation.dispatch(
              //   CommonActions.reset({
              //     index: 0,
              //     routes: [
              //       {
              //         name: 'Auth',
              //         state: {
              //           routes: [{ name: 'Signin' }], // your nested route inside AuthStack
              //         },
              //       },
              //     ],
              //   }),
              // );
            } catch (err) {
              console.error('Logout error:', err);
            }
          }}
          className="flex-row items-center gap-2"
        >
          <Image source={require('assets/images/logout.webp')} />
          <ThemedText styles="font-Medium text-md">
            {t('profile.logout')}
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
};

export default UserProfileScreen;
