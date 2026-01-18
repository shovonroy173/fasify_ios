import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import ThemedView from '../utils/ThemedView';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import useT from '../utils/useT';

const Category = ({ item }) => {
  const navigation = useNavigation();
  const t = useT();
  return (
    <ThemedView styles="justify-center items-center gap-2 self-start">
      <Pressable onPress={() => navigation.navigate(item.path)} className='gap-2 '>
        <ThemedView
          styles="border border-zinc-300 rounded-lg justify-center items-center"
          style={{
            padding: responsiveWidth(5),
          }}
        >
          <Image
            source={item.uri}
            style={{
              width: responsiveWidth(10),
              height: responsiveWidth(10),
              objectFit: 'cover',
            }}
          />
        </ThemedView>

        <ThemedView styles="justify-center items-center">
          <Text className="text-zinc-500 font-Regular text-center">
            {t(item.title1).length > 11
              ? `${t(item.title1).slice(0, 11)}\n${t(item.title1).slice(11)}`
              : t(item.title1)}
          </Text>
          {/* <Text className="text-zinc-500 font-Regular"

        >{t(item.title1)} </Text> */}
          {/* <Text className="text-zinc-500 font-Regular ">{item.title2}</Text> */}
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
};

export default Category;

