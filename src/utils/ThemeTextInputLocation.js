import { Controller } from 'react-hook-form';
import { TextInput, View, Text, Pressable, useColorScheme } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedText3 from './ThemedText3';
import React, { useState } from 'react';

const ThemedTextInputLocation = ({
  label,
  placeholder,
  secureTextEntry,
  leftIcon,
  rightIcon,
  name,
  control,
  error,
  ...props
}) => {
  const theme = useColorScheme();
  const [isFocused, setIsFocused] = useState(false);

  // Base styles based on theme
  const themedInputClasses = `
    ${theme === 'dark' ? 'bg-black text-zinc-100' : 'bg-white text-black'}
    ${
      error
        ? 'border-red-500'
        : isFocused
        ? 'border-blue-500'
        : theme === 'dark'
        ? 'border-zinc-300'
        : 'border-zinc-200'
    }
  `;

  const themedLabelClasses = `
    ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} text-md
  `;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, onBlur } }) => (
        <View className="relative">
          {label && (
            <ThemedText3 styles={`${themedLabelClasses} font-Medium text-md`}>
              {label}
            </ThemedText3>
          )}
          <View className="flex-row items-center">
            {/* Left Icon */}
            {leftIcon && (
              <Pressable
                onPress={props.onLeftPress}
                className="absolute left-2 z-10"
                style={{ zIndex: 10 }}
              >
                {/* Clone the leftIcon element and override its color based on focus */}
                {React.cloneElement(leftIcon, {
                  color: isFocused
                    ? '#3B82F6' /* blue-500 */
                    : leftIcon.props.color ||
                      (theme === 'dark' ? '#999' : '#666'),
                })}
              </Pressable>
            )}

            <TextInput
              {...props}
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                setIsFocused(false);
                onBlur();
              }}
              onFocus={() => setIsFocused(true)}
              placeholder={placeholder}
              placeholderTextColor={
                theme === 'dark' ? '#f4f4f580' : '#00000080'
              }
              secureTextEntry={secureTextEntry}
              className={`
                ${themedInputClasses}
                rounded-md font-SemiBold border pl-10 pr-10 py-3 w-full
              `}
            />
            {/* Right Icon */}
            {rightIcon && (
              <Pressable
                onPress={props.onPress}
                className="absolute right-2 z-10"
                hitSlop={10}
              >
                {rightIcon}
              </Pressable>
            )}
          </View>
          {error && (
            <Text className="text-red-500 text-xs font-Regular mt-1">
              {error}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default ThemedTextInputLocation;
