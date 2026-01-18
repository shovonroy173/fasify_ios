

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import {
  Bed,
  Car,
  Map,
  ShieldCheck,
  Bell,
} from 'lucide-react-native';
import GoBack from '@/components/GoBack';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedView from '@/utils/ThemedView';
import ThemedText from '@/utils/ThemedText';
import ThemedText3 from '@/utils/ThemedText3';
import { useGetNotificationsQuery } from '@/redux/slices/authSlice';
import { useThemeColor } from '@/utils/useThemeColor';

// Map serviceType → lucide icons
const serviceIcons = {
  HOTEL: Bed,
  CAR: Car,
  ATTRACTION: Map,
  SECURITY: ShieldCheck,
  DEFAULT: Bell,
};

// Convert ISO date → relative time string
const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hr ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;

  // fallback to readable date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const NotificationItem = ({ item, iconColor }) => {
  const Icon = serviceIcons[item.serviceType] || serviceIcons.DEFAULT;
  const relativeTime = getRelativeTime(item.updatedAt);

  return (
    <View className="flex-row items-start p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 shadow-sm">
      <View style={{ marginRight: 12, marginTop: 4 }}>
        <Icon size={28} color={iconColor} strokeWidth={2.2} />
      </View>
      <View className="flex-1">
        <ThemedText styles="text-base font-SemiBold">{item.title}</ThemedText>
        <ThemedText3 styles="text-sm font-Regular mt-1">{item.body}</ThemedText3>
        <ThemedText3 styles="text-xs font-Regular mt-2 text-gray-500 dark:text-gray-400">
          {relativeTime}
        </ThemedText3>
      </View>
    </View>
  );
};

const NotificationScreen = () => {
  const navigation = useNavigation();
  const { icon2 } = useThemeColor();
  const { data, isError, isLoading, refetch } = useGetNotificationsQuery();

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
      <ThemedText styles="text-2xl font-SemiBold">Notifications</ThemedText>

      <FlatList
        data={data?.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem item={item} iconColor={icon2} />
        )}
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          if (isLoading) {
            return (
              <View className="flex-1 items-center justify-center py-10">
                <ActivityIndicator size="large" color={icon2} />
                <ThemedText styles="text-base mt-3">
                  Loading notifications..
                </ThemedText>
              </View>
            );
          }

          if (isError) {
            return (
              <View className="flex-1 items-center justify-center py-10">
                <ThemedText styles="text-base text-red-500">
                  Failed to load notifications
                </ThemedText>
                <ThemedText
                  styles="text-sm text-blue-500 mt-2"
                  onPress={refetch}
                >
                  Tap to retry
                </ThemedText>
              </View>
            );
          }

          return (
            <View className="flex-1 items-center justify-center py-10">
              <ThemedText styles="text-base text-gray-500">
                No notifications yet
              </ThemedText>
            </View>
          );
        }}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </ThemedView>
  );
};

export default NotificationScreen;
