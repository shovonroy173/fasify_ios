/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Modal, Pressable, Text, useColorScheme } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { Controller } from 'react-hook-form';
// import Feather from 'react-native-vector-icons/Feather';
import { useThemeColor } from '../utils/useThemeColor';
import ThemedPressableWhite from '../utils/ThemedPressableWhite';
import ThemedText from '../utils/ThemedText';
import useT from '../utils/useT';

const DatePicker = ({
  label,
  name,
  control,
  error,
  placeholder = 'Select Date',
}) => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const { icon3 } = useThemeColor();
  const theme = useColorScheme();

  const formatDisplayDate = date =>
    moment(date, 'YYYY-MM-DD').format('D MMMM, YYYY');

  const t = useT();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <View className="relative flex-1">
          {label && (
            <ThemedText styles="font-Medium text-md mb-1">{label}</ThemedText>
          )}

          <ThemedPressableWhite
            onPress={() => setCalendarVisible(true)}
            style={{
              flexDirection: 'row',
              paddingHorizontal: 14,
              paddingVertical: 12,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: theme === 'dark' ? '#d4d4d8' : '#e4e4e7',

              // alignItems: 'center',
              // shadowColor: '#a1a1aa',
              // shadowOffset: { width: 0, height: 8 },
              // shadowOpacity: 0.4,
              // shadowRadius: 10,
              // elevation: 12,
            }}
            // styles={` border2 ${themedInputClasses}  px-4  rounded-md font-SemiBold  ${
            //   error && 'border-red-500 '
            // }`}
          >
            {/* <Feather name="calendar" size={18} color={icon3} /> */}
            {/* <ThemedText3 style={{ marginLeft: 8 }}>{placeholder}</ThemedText3> */}
            <View style={{ flex: 1, marginLeft: 6 }}>
              <ThemedText
                styles="font-SemiBold"
                style={{ flexShrink: 1, flexWrap: 'wrap' }}
              >
                {value ? formatDisplayDate(value) : t('date')}
              </ThemedText>
            </View>
          </ThemedPressableWhite>

          {/* {error && (
            <Text className="text-red-500 text-xs font-Regular mt-1">
              {error}
            </Text>
          )} */}

          <Modal visible={calendarVisible} animationType="slide" transparent>
            <View className="flex-1 justify-center bg-black/60 p-5">
              <View className="bg-white rounded-lg p-4 overflow-hidden">
                <Calendar
                  onDayPress={day => {
                    onChange(day.dateString);
                    setCalendarVisible(false);
                  }}
                  theme={theme === 'dark' ? 'DARK' : 'LIGHT'}
                  markedDates={
                    value
                      ? {
                          [value]: {
                            selected: true,
                            selectedColor: '#70d7c7',
                            selectedTextColor: 'white',
                          },
                        }
                      : {}
                  }
                  // minDate={moment().format('YYYY-MM-DD')}
                />
                <Pressable
                  onPress={() => setCalendarVisible(false)}
                  className="bg-teal-400 mt-4 py-3 rounded-lg items-center"
                >
                  <Text className="text-white">Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
    />
  );
};

export default DatePicker;
