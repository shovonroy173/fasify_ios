import React, { useState } from 'react';
import { Text, Pressable } from 'react-native';
import ThemedView from './ThemedView';
import ThemedText from './ThemedText';

const ReadMoreText = ({
  text = '',
  wordLimit = 20,
  style = {},
  seeMoreText = ' Read More',
  seeLessText = ' Read Less',
}) => {
  const [expanded, setExpanded] = useState(false);

  const words = text.trim().split(/\s+/);
  const shouldTruncate = words.length > wordLimit;

  const handleToggle = () => setExpanded(!expanded);

  return (
    <ThemedView>
      <ThemedText styles="font-Regular text-md">
        {expanded || !shouldTruncate ? (
          <>
            {text}
            <Text
              onPress={handleToggle}
              style={{ color: '#CD7405' }}
            >
              {seeLessText}
            </Text>
          </>
        ) : (
          <>
            {words.slice(0, wordLimit).join(' ')}...
            <Text
              onPress={handleToggle}
              style={{ color: '#CD7405' }}
            >
              {seeMoreText}
            </Text>
          </>
        )}
      </ThemedText>
    </ThemedView>
  );
};

export default ReadMoreText;
