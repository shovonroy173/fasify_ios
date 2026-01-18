
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';
import ThemedPressableWhite from '../utils/ThemedPressableWhite';
import ThemedText3 from '../utils/ThemedText3';
import { useThemeColor } from '../utils/useThemeColor';
import useT from '../utils/useT';
import { CalendarDays, CircleX } from 'lucide-react-native';
import ThemedText from '../utils/ThemedText';

export default function DateRangeSelectorWithModal({
  fromName = 'fromDate',
  toName = 'toDate',
}) {
  const { icon3, icon2 } = useThemeColor();
  const t = useT();

  const { control, getValues, setValue, watch } = useFormContext();
  const [calendarVisible, setCalendarVisible] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  const fromDate = watch(fromName);
  const toDate = watch(toName);

  const formatDisplayDate = date =>
    date ? moment(date, 'YYYY-MM-DD').format('D MMM, YYYY') : '';
  const getToday = () => moment().format('YYYY-MM-DD');
  const getTomorrow = () => moment().add(1, 'day').format('YYYY-MM-DD');

  // Auto-select today and tomorrow dates on component mount
  useEffect(() => {
    // Only set default dates if they are not already set
    if (!fromDate) {
      setValue(fromName, getToday());
    }
    if (!toDate) {
      setValue(toName, getTomorrow());
    }
  }, ); // Empty dependency array to run only once on mount

  const generateMarkedRange = (start, end) => {
    if (!start || !end) {
      setMarkedDates({});
      return;
    }

    const range = {};
    let current = moment(start);
    const last = moment(end);

    while (current <= last) {
      const dateStr = current.format('YYYY-MM-DD');
      range[dateStr] = {
        color: dateStr === start || dateStr === end ? '#70d7c7' : '#afe6dd',
        textColor: 'white',
        startingDay: dateStr === start,
        endingDay: dateStr === end,
      };
      current = current.add(1, 'day');
    }
    setMarkedDates(range);
  };

  const clearDate = fieldName => {
    setValue(fieldName, null);

    // If clearing fromDate, also clear toDate
    if (fieldName === fromName) {
      setValue(toName, null);
      setMarkedDates({});
    }

    // If clearing toDate, keep fromDate but update marked dates
    if (fieldName === toName && fromDate) {
      setMarkedDates({
        [fromDate]: {
          startingDay: true,
          color: '#70d7c7',
          textColor: 'white',
        },
      });
    }
  };

  // Update marked dates whenever fromDate or toDate changes
  useEffect(() => {
    if (fromDate && toDate) {
      generateMarkedRange(fromDate, toDate);
    } else if (fromDate && !toDate) {
      setMarkedDates({
        [fromDate]: {
          startingDay: true,
          color: '#70d7c7',
          textColor: 'white',
        },
      });
    } else {
      setMarkedDates({});
    }
  }, [fromDate, toDate]);

  return (
    <View className="flex-row justify-center gap-2">
      {/* From Date */}
      <Controller
        control={control}
        name={fromName}
        render={({ field: { onChange } }) => (
          <View style={{ flex: 1, position: 'relative' }}>
            <ThemedPressableWhite
              onPress={() => setCalendarVisible('from')}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 12,
                alignItems: 'center',
                shadowColor: '#a1a1aa',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 12,
                flex: 1,
              }}
            >
              <CalendarDays size={18} color={icon2} />
              <View style={{ flex: 1, marginLeft: 6 }}>
                <ThemedText styles="text-sm font-base">
                  {fromDate
                    ? formatDisplayDate(fromDate)
                    : formatDisplayDate(getToday())}
                </ThemedText>
              </View>
            </ThemedPressableWhite>

            {/* {fromDate && (
              <Pressable
                onPress={() => clearDate(fromName)}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: [{ translateY: -9 }],
                  zIndex: 10,
                }}
              >
                <CircleX size={16} color={'red'} />
              </Pressable>
            )} */}
          </View>
        )}
      />

      {/* To Date */}
      <Controller
        control={control}
        name={toName}
        render={({ field: { onChange } }) => (
          <View style={{ flex: 1, position: 'relative' }}>
            <ThemedPressableWhite
              onPress={() => setCalendarVisible('to')}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 12,
                alignItems: 'center',
                shadowColor: '#a1a1aa',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 12,
                flex: 1,
              }}
            >
              <CalendarDays size={18} color={icon2} />
              <View style={{ flex: 1, marginLeft: 6 }}>
                <ThemedText styles="text-sm font-base">
                  {toDate
                    ? formatDisplayDate(toDate)
                    : formatDisplayDate(getTomorrow())}
                </ThemedText>
              </View>
            </ThemedPressableWhite>

            {/* {toDate && (
              <Pressable
                onPress={() => clearDate(toName)}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: [{ translateY: -9 }],
                  zIndex: 10,
                }}
              >
                <CircleX size={16} color={'red'} />
              </Pressable>
            )} */}
          </View>
        )}
      />

      {/* Calendar Modal */}
      <Modal visible={!!calendarVisible} animationType="slide" transparent>
        <View className="flex-1 justify-center bg-black/60 p-5">
          <View className="bg-white rounded-lg p-4 overflow-hidden">
            <Calendar
              onDayPress={day => {
                const date = day.dateString;
                if (calendarVisible === 'from') {
                  setValue(fromName, date);
                  // If selecting a fromDate that's after the current toDate, reset toDate
                  if (toDate && moment(date).isAfter(toDate)) {
                    setValue(toName, moment(date).add(1, 'day').format('YYYY-MM-DD'));
                  }
                } else {
                  // For toDate selection, ensure it's after fromDate
                  if (!getValues(fromName) || moment(date).isBefore(getValues(fromName))) {
                    return;
                  }
                  setValue(toName, date);
                }
                setCalendarVisible(null);
              }}
              markedDates={markedDates}
              minDate={
                calendarVisible === 'to' && getValues(fromName)
                  ? moment(getValues(fromName))
                      .add(1, 'day')
                      .format('YYYY-MM-DD')
                  : getToday()
              }
              markingType="period"
            />

            <View className="flex-row justify-between mt-4">
              <Pressable
                onPress={() => {
                  clearDate(fromName);
                  clearDate(toName);
                  // After clearing, set default dates again
                  setValue(fromName, getToday());
                  setValue(toName, getTomorrow());
                }}
                className="bg-gray-400 px-4 py-3 rounded-lg items-center flex-1 mr-2"
              >
                <Text className="text-white">{t('resetToDefault') || 'Reset to Default'}</Text>
              </Pressable>

              <Pressable
                onPress={() => setCalendarVisible(null)}
                className="bg-teal-400 px-4 py-3 rounded-lg items-center flex-1 ml-2"
              >
                <Text className="text-white">{t('close')}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}