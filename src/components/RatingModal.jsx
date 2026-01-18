/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Modal, View, TextInput, Pressable } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedText from '@/utils/ThemedText';
import ThemedText2 from '@/utils/ThemeText2';
import ThemedView from '@/utils/ThemedView';
import { Star } from 'lucide-react-native';

const RatingModal = ({ visible, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRating = value => setRating(value);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <ThemedView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <ThemedView
          style={{
            width: responsiveWidth(85),
            padding: responsiveHeight(3),
            borderRadius: 12,
            // backgroundColor: 'white',
            alignItems: 'center',
            gap: responsiveHeight(2),
          }}
        >
          <ThemedText styles="font-SemiBold text-xl">Rate Your Us</ThemedText>

          {/* Star Ratings */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {[1, 2, 3, 4, 5].map(star => (
              <Pressable key={star} onPress={() => handleRating(star)}>
                <Star
                  size={32}
                  fill={star <= rating ? '#facc15' : 'transparent'}
                  color={star <= rating ? '#facc15' : '#9ca3af'}
                />
              </Pressable>
            ))}
          </View>

          {/* Comment Box */}
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Leave a comment..."
            multiline
            style={{
              width: '100%',
              minHeight: responsiveHeight(12),
              // borderWidth: 1,
              // borderColor: '#d1d5db',
              borderRadius: 8,
              padding: 10,
              textAlignVertical: 'top',
            }}
            className="  text-base border
    bg-white dark:bg-neutral-900
    text-black dark:text-white
    border-gray-300 dark:border-gray-700"
          />

          {/* Buttons */}
          <View style={{ flexDirection: 'row', gap: 16, marginTop: 10 }}>
            <Pressable
              onPress={onClose}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                backgroundColor: '#e5e7eb',
              }}
            >
              <ThemedText2 styles="font-SemiBold">Cancel</ThemedText2>
            </Pressable>

            <Pressable
              onPress={() => {
                onSubmit({ rating, comment });
                onClose();
                setRating(0);
                setComment('');
              }}
              disabled={rating === 0}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                backgroundColor: rating === 0 ? '#9ca3af' : '#3b82f6',
              }}
            >
              <ThemedText2 styles="font-SemiBold text-white">
                Submit
              </ThemedText2>
            </Pressable>
          </View>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

export default RatingModal;
