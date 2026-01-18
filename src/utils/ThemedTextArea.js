import { Controller } from 'react-hook-form';
import { TextInput, View, Text, Pressable } from 'react-native';
import { useColorScheme } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedText3 from './ThemedText3';
import ThemedText from './ThemedText';

const ThemedTextArea = ({
  label,
  placeholder,
  name,
  control,
  error,
  numberOfLines = 4,
  height = responsiveHeight(15),
  ...props
}) => {
  const theme = useColorScheme();

  const themedInputClasses = `${
    theme === 'dark'
      ? 'bg-black text-zinc-100 border-zinc-300'
      : 'bg-white text-black border-zinc-200'
  }`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, onBlur } }) => (
        <View className="relative flex-1">
          {label && (
            <ThemedText styles={` font-Medium text-md mb-1`}>
              {label}
            </ThemedText>
          )}
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor={theme === 'dark' ? '#f4f4f580' : '#d4d4d8'}
            multiline={true}
            numberOfLines={numberOfLines}
            style={{
              textAlignVertical: 'top', // very important for textarea behavior
              minHeight: height,
            }}
            className={`${themedInputClasses} px-4 py-2 rounded-md font-SemiBold border ${
              error ? 'border-red-500' : ''
            }`}
            {...props}
          />
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

export default ThemedTextArea;
