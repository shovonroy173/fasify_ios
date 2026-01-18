
/* eslint-disable react-native/no-inline-styles */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,

  KeyboardAvoidingView,
  Platform,
  Pressable,
  ActivityIndicator,
  Alert,
  AppState,
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { Controller, useFormContext } from 'react-hook-form';
import MultiImageUploadUI from '@/components/MultiImageUploadUI';
import MultiImagePickerModal from '@/components/MultiImagePickerModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Images, Send } from 'lucide-react-native';

const WS_URL = 'wss://timothy-backend.onrender.com';
const API_URL = 'https://timothy-backend.onrender.com/api/v1';

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useSelector(state => state.auth.user);
  const senderId = user?.id;
  const { receiverId, receiverName, receiverImage, type, receiverIdSupport } = route.params;
  const token = useSelector(state => state.auth.token);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // const [uploadedImages, setUploadedImages] = useState([]);

  console.log('LINE AT 485', messages, type);

  const ws = useRef(null);
  const scrollViewRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const messageQueueRef = useRef([]);

  const { control, setValue, watch } = useFormContext();

  const chatImages = watch('chatImages');

  // Image picker function
  const pickFromGalleryMulti = (onSuccess, onClose) => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.8,
      selectionLimit: 5 - chatImages?.length, // Max 5 images total
    };

    launchImageLibrary(options, response => {
      if (response.didCancel || response.errorCode) {
        console.log('Image picking cancelled or failed');
      } else {
        const uris = response.assets?.map(asset => asset.uri).filter(Boolean);
        if (uris && uris.length) {
          onSuccess(uris);
          onClose();
        }
      }
    });
  };

  // Upload image to server
  const uploadImageToServer = async imageUri => {
    console.log('LINE AT 521', imageUri);

    try {
      const formData = new FormData();
      // formData.append('data', 'mdsg')
      formData.append('messageImages', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'chat-image.jpg',
      });

      const response = await fetch(
        `${API_URL}/messages/send-message/${receiverId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `${token}`,
            // 'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      console.log('LINE AT 544', response);


      if (!response.ok) throw new Error('Failed to upload image');

      const data = await response.json();
      console.log('LINE AT 547', data);

      return data.imageUrl; // Assuming your backend returns the image URL
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  // Send image message
  // const handleSendImageMessage = async imageUrls => {
  //   if (!imageUrls.length || isSending) return;

  //   const tempMessage = {
  //     id: Date.now(),
  //     message: '[Image]',
  //     senderId,
  //     images: imageUrls,
  //     createdAt: new Date().toISOString(),
  //     sender: { id: senderId, profileImage: user?.profileImage },
  //     isSending: true,
  //     isImage: true,
  //   };

  //   setMessages(prev => [...prev, tempMessage]);
  //   scrollToBottom();
  //   setIsSending(true);

  //   const messageData = {
  //     type: 'message',
  //     channelName,
  //     senderId,
  //     receiverId,
  //     message: '[Image]',
  //     images: imageUrls,
  //     isImage: true,
  //   };

  //   try {
  //     const sentViaWebSocket = safeSend(messageData);

  //     if (!sentViaWebSocket) {
  //       messageQueueRef.current.push(messageData);

  //       const response = await fetch(
  //         `${API_URL}/messages/send-message/${receiverId}`,
  //         {
  //           method: 'POST',
  //           headers: {
  //             Authorization: `${token}`,
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             message: '[Image]',
  //             images: imageUrls,
  //             isImage: true,
  //           }),
  //         },
  //       );

  //       if (!response.ok) throw new Error('Failed to send image message');
  //       fetchMessageHistory();
  //     }
  //   } catch (error) {
  //     console.error('Error sending image message:', error);
  //     Alert.alert('Error', 'Could not send image');
  //     setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
  //   } finally {
  //     setIsSending(false);
  //     setValue('chatImages', []);
  //   }
  // };

  // Update the handleSendImageMessage function
  const handleSendImageMessage = async imageUrls => {
    if (!imageUrls.length || isSending) return;

    const tempMessage = {
      id: Date.now(),
      message: '{"type":"refetch-img"}',
      // Set to null to match backend structure
      senderId,
      files: imageUrls, // Use 'files' instead of 'images' to match backend
      createdAt: new Date().toISOString(),
      sender: { id: senderId, profileImage: user?.profileImage },
      isSending: true,
      isImage: true,
    };

    setMessages(prev => [...prev, tempMessage]);
    scrollToBottom();
    setIsSending(true);

    const messageData = {
      type: 'message',
      channelName,
      senderId,
      receiverId,
      message: '{"type":"refetch-img"}', // Set to null for image messages
      files: imageUrls, // Use 'files' instead of 'images'
      isImage: true,
    };

    try {
      const sentViaWebSocket = safeSend(messageData);

      if (!sentViaWebSocket) {
        messageQueueRef.current.push(messageData);

        const response = await fetch(
          `${API_URL}/messages/send-message/${receiverId}`,
          {
            method: 'POST',
            headers: {
              Authorization: `${token}`,
              // 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: null, // Set to null for image messages
              files: imageUrls, // Use 'files' instead of 'images'
              isImage: true,
            }),
          },
        );

        if (!response.ok) throw new Error('Failed to send image message');
        fetchMessageHistory();
      }
    } catch (error) {
      console.error('Error sending image message:', error);
      Alert.alert('Error', 'Could not send image');
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
    } finally {
      setIsSending(false);
      setValue('chatImages', []);
    }
  };

  // Process selected images
  const processSelectedImages = async newUris => {
    try {
      setIsSending(true);
      const uploadedUrls = [];
      console.log("LINE AT 687", newUris);


      for (const uri of newUris) {
        try {
          const imageUrl = await uploadImageToServer(uri);
          console.log('LINE AT 691', imageUrl);

          uploadedUrls.push(imageUrl);
        } catch (error) {
          console.error('Failed to upload image:', uri, error);
        }
      }

      if (uploadedUrls.length > 0) {
        await handleSendImageMessage(uploadedUrls);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to process images');
    } finally {
      setIsSending(false);
    }
  };

  // Generate consistent channel name
  const channelName =
    type === 'support' ? receiverIdSupport : [senderId, receiverId].sort().join('');

  // ✅ Check WebSocket state before sending
  const safeSend = data => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      try {
        ws.current.send(JSON.stringify(data));
        return true;
      } catch (error) {
        console.error('Error sending message:', error);
        return false;
      }
    }
    return false;
  };

  // ✅ Process message queue when connection is established
  const processMessageQueue = useCallback(() => {
    while (messageQueueRef.current.length > 0) {
      const messageData = messageQueueRef.current[0];
      if (safeSend(messageData)) {
        messageQueueRef.current.shift();
      } else {
        break;
      }
    }
  }, []);

  // ✅ Fetch message history from database
  const fetchMessageHistory = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/messages/get-message/${channelName}`,
        {
          headers: {
            Authorization: `${token}`,
            // 'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) throw new Error('Failed to fetch messages');

      const data = await response.json();

      if (
        data?.data?.data &&
        data?.data?.data.length > 0 &&
        data?.data?.data[0].messages
      ) {
        setMessages(data?.data.data[0].messages);
      }
      if (type === 'support' && data.data?.data && data.data?.data.length > 0) {
        setMessages(data.data?.data[0].messages);
      }
    } catch (error) {
      console.error('Error fetching message history:', error);
    } finally {
      setIsLoading(false);
    }
  }, [channelName, token, type]);

  // ✅ Connect WebSocket with proper error handling
  const connectWebSocket = useCallback(() => {
    try {
      if (ws.current) {
        ws.current.close();
      }

      ws.current = new WebSocket(WS_URL);

      ws.current.onopen = () => {
        console.log('✅ WebSocket connected');
        setIsConnected(true);

        safeSend({
          type: 'subscribe',
          channelName: channelName,
        });

        processMessageQueue();
      };

      // ws.current.onmessage = event => {
      //   try {
      //     const parsed = JSON.parse(event.data);
      //     if (parsed.type === 'message') {
      //       setMessages(prev => [...prev, parsed.data]);
      //       scrollToBottom();
      //     }
      //   } catch (err) {
      //     console.error('Message parse error:', err);
      //   }
      // };

      ws.current.onmessage = event => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.type === 'message') {
            // Ensure the message data has the correct structure
            const messageData = parsed.data;

            // If it's an image message with files, make sure it's properly formatted
            if (messageData.files && messageData.files.length > 0) {
              messageData.isImage = true;
            }

            setMessages(prev => [...prev, messageData]);
            scrollToBottom();
          }
        } catch (err) {
          console.error('Message parse error:', err);
        }
      };

      ws.current.onerror = error => {
        // console.error('WebSocket error:', error);
        setIsConnected(false);
      };

      ws.current.onclose = event => {
        // console.log('WebSocket disconnected:', event.code, event.reason);
        setIsConnected(false);

        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('Attempting to reconnect...');
          connectWebSocket();
        }, 3000);
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }
  }, [channelName, processMessageQueue]);

  // ✅ Send Message with proper WebSocket state checking
  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;

    const msgText = message.trim();

    const tempMessage = {
      id: Date.now(),
      message: msgText,
      senderId,
      createdAt: new Date().toISOString(),
      sender: { id: senderId, profileImage: user?.profileImage },
      isSending: true,
    };

    setMessages(prev => [...prev, tempMessage]);
    setMessage('');
    scrollToBottom();
    setIsSending(true);

    const messageData = {
      type: 'message',
      channelName,
      senderId,
      receiverId,
      message: msgText,
    };

    try {
      const sentViaWebSocket = safeSend(messageData);

      if (!sentViaWebSocket) {
        messageQueueRef.current.push(messageData);

        const response = await fetch(
          `${API_URL}/messages/send-message/${receiverId}`,
          {
            method: 'POST',
            headers: {
              Authorization: `${token}`,
              // 'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: msgText }),
          },
        );

        console.log('LINE AT', response);


        if (!response.ok) throw new Error('Failed to send message');
        fetchMessageHistory();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Could not send message');
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
    } finally {
      setIsSending(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Handle app state changes
  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'active') {
        connectWebSocket();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connectWebSocket]);

  // Load messages and connect WebSocket
  useEffect(() => {
    fetchMessageHistory();
    connectWebSocket();

    const pollInterval = setInterval(fetchMessageHistory, 5000);

    return () => {
      clearInterval(pollInterval);
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [senderId, receiverId, fetchMessageHistory, connectWebSocket]);



  // Update the renderMessage function to check for both images and files

  const renderMessage = (msg, index) => {
    const isMine = msg.senderId === senderId;

    // Check if message has images (either in images or files array)
    const hasImages =
      (msg.images && msg.images.length > 0) ||
      (msg.files && msg.files.length > 0);
    const imageUrls = msg.images || msg.files || [];

    // Render image message
    if (hasImages && imageUrls.length > 0) {
      return (
        <View
          key={msg.id || index}
          className={`flex-row items-start mb-4 px-4 ${isMine ? 'justify-end' : ''
            }`}
        >
          {!isMine && (
            <Image
              source={{
                uri:
                  msg.sender?.profileImage ||
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
              }}
              className="w-8 h-8 rounded-full mr-3 mt-1"
            />
          )}
          <View className={`flex-1 ${isMine ? 'items-end' : ''}`}>
            <View
              className={`bg-gray-200 rounded-2xl px-3 py-2 ${isMine ? 'bg-blue-500' : ''
                }`}
            >
              {/* <ScrollView  horizontal showsHorizontalScrollIndicator={false}> */}
              {imageUrls.map((imageUrl, idx) => (
                <Image
                  key={idx}
                  source={{ uri: imageUrl }}
                  className="w-24 h-24 rounded-lg mr-2"
                  resizeMode="cover"
                />
              ))}
              {/* </ScrollView> */}
              {msg.isSending && (
                <View className="mt-1">
                  <ActivityIndicator
                    size="small"
                    color={isMine ? '#ffffff' : '#666'}
                  />
                </View>
              )}
            </View>
            <Text
              className={`text-gray-500 text-xs mt-1 ${isMine ? 'mr-1' : 'ml-1'
                }`}
            >
              {msg.createdAt
                ? new Date(msg.createdAt).toLocaleTimeString()
                : 'Just now'}
            </Text>
          </View>
        </View>
      );
    }

    // Render text message
    if (!isMine) {
      return (
        <View key={msg.id || index} className="flex-row items-start mb-4 px-4">
          <Image
            source={{
              uri:
                msg.sender?.profileImage ||
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
            }}
            className="w-8 h-8 rounded-full mr-3 mt-1"
          />
          <View className="flex-1">
            <View className="bg-gray-200 rounded-2xl rounded-tl-md px-4 py-3 self-start ">
              <Text className="text-gray-800 text-base leading-5">
                {msg.message || '[Image]'}
              </Text>
              {msg.isSending && (
                <View className="mt-1">
                  <ActivityIndicator size="small" color="#666" />
                </View>
              )}
            </View>
            <Text className="text-gray-500 text-xs mt-1 ml-1">
              {msg.createdAt
                ? new Date(msg.createdAt).toLocaleTimeString()
                : 'Just now'}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View
        key={msg.id || index}
        className="flex-row justify-end items-start mb-4 px-4"
      >
        <View className="flex-1 items-end">
          <View className="bg-blue-500 rounded-2xl rounded-tr-md px-4 py-3 max-w-xs">
            <Text className="text-white text-base leading-5">
              {msg.message || '[Image]'}
            </Text>
            {msg.isSending && (
              <View className="mt-1">
                <ActivityIndicator size="small" color="#ffffff" />
              </View>
            )}
          </View>
          <Text className="text-gray-500 text-xs mt-1 mr-1">
            {msg.createdAt
              ? new Date(msg.createdAt).toLocaleTimeString()
              : 'Just now'}
          </Text>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-gray-600 mt-4">Loading messages...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
        <Pressable onPress={() => navigation.goBack()} className="mr-4">
          {/* <Icon name="arrow-back" size={24} color="#000" /> */}
          <ArrowLeft size={24} color="#000" />
        </Pressable>
        <View className="flex-row items-center flex-1">
          <Image
            source={{
              uri:
                receiverImage ||
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
            }}
            className="w-8 h-8 rounded-full mr-3"
          />
          <Text className="text-lg font-semibold">
            {receiverName || 'Service Provider'}
          </Text>
        </View>
        {/* <View className="flex-row items-center">
          <View
            className={`w-3 h-3 rounded-full mr-2 ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <Text className="text-sm text-gray-500">
            {isConnected ? 'Online' : 'Offline'}
          </Text>
        </View> */}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 bg-white"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
          onContentSizeChange={scrollToBottom}
        >
          {messages.length === 0 ? (
            <View className="flex-1 items-center justify-center py-10">
              {/* <Icon
                name="chatbubble-ellipses-outline"
                size={48}
                color="#d1d5db"
              /> */}
              <Text className="text-gray-500 mt-4">No messages yet</Text>
              <Text className="text-gray-400 text-sm mt-1">
                Start a conversation
              </Text>
            </View>
          ) : (
            messages.map(renderMessage)
          )}
        </ScrollView>

        {/* Image Upload Section */}
        {chatImages?.length > 0 && (
          <View className="bg-gray-50 border-t border-gray-200 px-4 py-3">
            <Controller
              name="chatImages"
              control={control}
              render={({ field: { value = [], onChange } }) => (
                <>
                  <MultiImageUploadUI
                    value={value}
                    label="Selected Images"
                    onPress={() => setModalVisible(true)}
                    onRemove={idx => {
                      const updated = [...value];
                      updated.splice(idx, 1);
                      onChange(updated);
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => processSelectedImages(value)}
                    className="bg-blue-500 rounded-full py-3 px-6 mt-3 items-center"
                    disabled={isSending}
                  >
                    {isSending ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <Text className="text-white font-semibold">
                        Send {value.length} Image{value.length !== 1 ? 's' : ''}
                      </Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            />
          </View>
        )}

        {/* Input */}
        <View className="bg-white border-t border-gray-100 px-4 py-3">
          <View className="flex-row items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="mr-3 p-2"
              disabled={chatImages?.length >= 5}
            >
              {/* <Icon name="image-outline" size={24} color="#3b82f6" /> */}
              <Images size={24} color="#3b82f6" />
            </TouchableOpacity>

            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message"
              className="flex-1 text-base text-gray-800 py-2"
              placeholderTextColor="#9ca3af"
              multiline
              maxLength={1000}
              editable={!isSending}
            />

            <TouchableOpacity
              onPress={handleSendMessage}
              className={`p-2 rounded-full ml-2 ${message.trim() && !isSending ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              disabled={!message.trim() || isSending}
            >
              {isSending ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                // <Icon
                //   name="send"
                //   size={18}
                //   color={message.trim() ? '#ffffff' : '#9ca3af'}
                // />
                <Send

                  size={18}
                  color={message.trim() ? '#ffffff' : '#9ca3af'}

                />
                // <Text>Send</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Image Picker Modal */}
      <MultiImagePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPickGallery={() =>
          pickFromGalleryMulti(
            newUris => {
              const currentImages = chatImages || [];
              const combined = [...currentImages, ...newUris].slice(0, 5);
              setValue('chatImages', combined);
            },
            () => setModalVisible(false),
          )
        }
      />
    </View>
  );
};

export default ChatScreen;
