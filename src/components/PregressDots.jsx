import React from 'react';
import { View } from 'react-native';

const ProgressDots = ({ totalStep = 2 }) => {
  if (totalStep < 2) return null;

  const steps = Array.from({ length: totalStep });

  return (
    <View className="items-center">
      {steps.map((_, index) => (
        <View key={index} className="items-center">
          {/* Dot */}
          <View
            className={`w-4 h-4 rounded-full ${
              index === 0
                ? 'border-2 border-teal-500 bg-transparent'
                : index === totalStep - 1
                ? 'bg-teal-500'
                : 'bg-teal-300'
            }`}
          />

          {/* Line (skip after last dot) */}
          {index < totalStep - 1 && (
            <View className="h-10 border-l-2 border-dashed border-zinc-200 my-1" />
          )}
        </View>
      ))}
    </View>
  );
};

export default ProgressDots;
