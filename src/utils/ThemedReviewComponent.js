import { Controller } from 'react-hook-form';
import { TextInput, View, Text, Pressable } from 'react-native';
import { useColorScheme } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedText3 from './ThemedText3';
import ThemedText from './ThemedText';

const ThemedReviewComponent = ({
  label,

  ans,
  ...props
}) => {
  const theme = useColorScheme();

  // Apply theme-based classes for the TextInput and label
  const themedInputClasses = `${
    theme === 'dark'
      ? 'bg-black text-zinc-100 border-zinc-300'
      : 'bg-white text-black  border-zinc-200'
  }`;

  const themedLabelClasses = `${
    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
  } text-md`;

  return (
    <View className="relative flex-1">
      {label && (
        <ThemedText3
          styles={`${themedLabelClasses}  font-Medium text-md mb-1`}
          style={{}}
        >
          {label}
        </ThemedText3>
      )}
      {/* <TextInput
            // {...props}
            value={value}
            onChangeText={text => onChange(text)}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor={theme === 'dark' ? '#f4f4f580' : '#000000'}
            secureTextEntry={secureTextEntry}
            style={{
              // paddingHorizontal: responsiveWidth(3),
              // paddingBottom: responsiveHeight(1),
              // paddingTop: responsiveHeight(5),
            }}
            className={`${themedInputClasses} px-4  rounded-md font-SemiBold border ${
              error && 'border-red-500 '
            }`}
          /> */}
      <ThemedText
        styles={`${themedInputClasses} py-3  rounded-md font-SemiBold border-b `}
      >
        {ans}
      </ThemedText>
    </View>
  );
};

export default ThemedReviewComponent;
