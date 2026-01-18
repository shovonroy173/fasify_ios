import { Check } from 'lucide-react-native';
import React from 'react';
import { Pressable } from 'react-native';

const CustomCheckbox = ({ checked, onToggle }) => {
  return (
    <Pressable
      onPress={onToggle}
      className={`w-4 h-4 rounded-md border-2 ${
        checked ? 'bg-blue-600 border-blue-600' : 'border-gray-900'
      } items-center justify-center`}
    >
      {checked && <Check size={12} color={'#fff'}/>}
    </Pressable>
  );
};

export default CustomCheckbox;


