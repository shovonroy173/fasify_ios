
import { Controller } from 'react-hook-form';
import { TextInput, View, Text, Pressable } from 'react-native';
import { useColorScheme } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import ThemedText from './ThemedText';

const ThemedTextInput = ({
  label,
  placeholder,
  secureTextEntry,
  rightIcon,
  name,
  control,
  error,
  type = 'text',
  validationRules = {}, // Add validationRules prop
  ...props
}) => {
  const theme = useColorScheme();

  const themedInputClasses = `${
    theme === 'dark'
      ? 'bg-black text-zinc-100 border-zinc-300'
      : 'bg-white text-black border-zinc-200'
  }`;

  const keyboardType =
    type === 'number'
      ? 'numeric'
      : type === 'email'
      ? 'email-address'
      : 'default';

  // Add custom validation for rating field
  const getValidationRules = () => {
    let rules = { ...validationRules };
    
    // If it's a rating field, add min and max validation
    if (label === 'Rating' || label?.toLowerCase().includes('rating')) {
      rules = {
        // ...rules,
        min: {
          value: 1,
          message: 'Rating must be at least 1',
        },
        max: {
          value: 5,
          message: 'Rating cannot exceed 5',
        },
        validate: {
          isNumber: value => !isNaN(parseFloat(value)) || 'Rating must be a number',
          // isInteger: value => Number.isInteger(parseFloat(value)) || 'Rating must be a whole number',
        }
      };
    }
    
    return rules;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={getValidationRules()} // Apply validation rules
      render={({ field: { onChange, value, onBlur } }) => {
        
        return (
          <View className="relative flex-1 ">
            {label && (
              <ThemedText styles="font-Medium text-md mb-1">{label}</ThemedText>
            )}
            <TextInput
              value={value}
              onChangeText={text => onChange(text)}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={theme === 'dark' ? '#f4f4f580' : '#d4d4d8'}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              // maxLength={name === 'hotelRating' ? 1 : undefined} // Limit to 1 character for rating
              className={`${themedInputClasses} p-4 rounded-md font-SemiBold border ${
                error && 'border-red-500'
              }`}
              {...props}
            />
            {rightIcon && (
              <Pressable
                onPress={props.onPressToggle}
                className="absolute  -translate-y-1/2 z-10"
                style={{
                  right: responsiveWidth(3),
                  top: responsiveHeight(5)
                }}
                hitSlop={10}
              >
                {rightIcon}
              </Pressable>
            )}
            {error && (
              <Text className="text-red-500 text-xs font-Regular h-10">{error}</Text>
            )}
          </View>
        );
      }}
    />
  );
};

export default ThemedTextInput;