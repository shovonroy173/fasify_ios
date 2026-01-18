// correct version
import React, { useState } from 'react';
import {
  View,
  Platform,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// import Entypo from 'react-native-vector-icons/Entypo';
import { useThemeColor } from '../utils/useThemeColor';
import ThemedText from '../utils/ThemedText';
import ThemedText3 from '../utils/ThemedText3';
import ThemedPressableWhite from '../utils/ThemedPressableWhite';
import { Controller } from 'react-hook-form';

const TimePicker = ({ name, control, label, error }) => {
  const { icon3 } = useThemeColor();
  const theme = useColorScheme();
  const [show, setShow] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={new Date()}
      render={({ field: { onChange, value } }) => (
        <View>
          <ThemedText3 styles="font-Medium text-md">{label}</ThemedText3>
          <ThemedPressableWhite
            onPress={() => setShow(true)}
            styles={`border rounded-lg px-5 py-3 flex-row items-center gap-2 ${
              theme === 'dark' ? 'border-zinc-200' : 'border-zinc-300'
            }`}
          >
            {/* <Entypo name="time-slot" size={18} color={icon3} /> */}
            <ThemedText styles="font-SemiBold">
              {value ? new Date(value).toLocaleTimeString() : 'Select Time'}
            </ThemedText>
          </ThemedPressableWhite>

          {error && (
            <ThemedText styles="text-red-500 text-xs mt-1">
              {error}
            </ThemedText>
          )}

          {show && (
            <DateTimePicker
              value={value || new Date()}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={false}
              onChange={(event, selectedTime) => {
                setShow(Platform.OS === 'ios');
                if (selectedTime) {
                  onChange(selectedTime);
                }
              }}
            />
          )}
        </View>
      )}
    />
  );
};

export default TimePicker;



