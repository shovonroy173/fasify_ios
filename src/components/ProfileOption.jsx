import { Image, useColorScheme, Pressable, Share } from 'react-native';
import React from 'react';
import ThemedView from '../utils/ThemedView';
import ThemedText from '../utils/ThemedText';
// import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import useT from '../utils/useT';

const ProfileOption = ({ item }) => {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const t = useT();

  const handlePress = async () => {
    if (item.title === 'profile.invite_friends') {
      // 👉 Handle Invite Friends with Share API
      try {
        await Share.share({
          message:
            'Hey 👋 check out this awesome app! Download it here: https://yourdomain.com/app.apk',
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else if (item.path) {
      // 👉 Navigate to normal screen
      navigation.navigate(item.path);
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <ThemedView styles="flex-row justify-between items-center gap-2 border-b pb-4">
        <ThemedView styles="flex-row items-center gap-2">
          <Image source={item.uri} />
          <ThemedText styles="font-Medium text-md">{t(item.title)}</ThemedText>
        </ThemedView>
        {/* <Entypo
          name="chevron-small-right"
          size={24}
          color={theme === 'dark' ? '#52525b' : '#d4d4d8'}
        /> */}
      </ThemedView>
    </Pressable>
  );
};

export default ProfileOption;
