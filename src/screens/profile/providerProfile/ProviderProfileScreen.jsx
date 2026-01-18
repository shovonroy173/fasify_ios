

// final 2

import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  useColorScheme,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import WebView from 'react-native-webview';
import ThemedView from '@/utils/ThemedView';
import ThemedViewBlue from '@/utils/ThemedViewBlue';
import ThemedText2 from '@/utils/ThemeText2';
import ThemedText from '@/utils/ThemedText';
import { useThemeColor } from '@/utils/useThemeColor';
import { profileBtnsProfile } from 'assets/data/data';
import ProfileOption from '@/components/ProfileOption';
import {
  useGetProviderProfileQuery,
  useGetSingleUserQuery,
  useLogoutMutation,
} from '@/redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from '@/redux/reducers/authReducer';
import { useFormContext } from 'react-hook-form';
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Edit,
  X,
} from 'lucide-react-native';

const ProviderProfileScreen = () => {
  const navigation = useNavigation();
  const { icon } = useThemeColor();
  const theme = useColorScheme();
  const {
    data: profileData,
    isLoading,
    isError,
  } = useGetProviderProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth?.token);
  const user = useSelector(state => state.auth.user);
  const {
    data: singleLoggedUser,
    isLoading: userLoading,
    isError: userError,
    refetch: refetchSingleUser,
  } = useGetSingleUserQuery(user?.id);

  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPaystackOverlay, setShowPaystackOverlay] = useState(false);
  const [showStripeOverlay, setShowStripeOverlay] = useState(false);
  const [onboardingUrl, setOnboardingUrl] = useState('');
  const [webViewLoading, setWebViewLoading] = useState(true);

  // Paystack form state
  const [paystackForm, setPaystackForm] = useState({
    business_name: '',
    settlement_bank: '',
    account_number: '',
    percentage_charge: '',
  });

  // Stripe onboarding function
  const handleOnboarding = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.fasifys.com/api/v1/payments/stripe-account-onboarding',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `${token}` } : {}),
          },
        },
      );

      const data = await response.json();
      console.log('Onboarding response:', data);

      if (data?.success && data.data?.onboardingLink) {
        setOnboardingUrl(data?.data?.onboardingLink);
        setShowStripeOverlay(true);
      } else if (data.success) {
        Alert.alert('✅ Success', data.message || 'Onboarding completed');
        refetchSingleUser();
      } else {
        Alert.alert('Error', data.message || 'Failed to start onboarding');
      }
    } catch (error) {
      console.log('Onboarding error:', error);
      Alert.alert('Error', 'Failed to start onboarding process');
    } finally {
      setLoading(false);
    }
  };

  const handlePaystackSubmit = async () => {
    if (
      !paystackForm.business_name ||
      !paystackForm.settlement_bank ||
      !paystackForm.account_number ||
      !paystackForm.percentage_charge
    ) {
      Alert.alert('Validation', 'All fields are required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        'https://api.fasifys.com/api/v1/payments/paystack-account-sub-account',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `${token}` } : {}),
          },
          body: JSON.stringify(paystackForm),
        },
      );
      const data = await response.json();
      console.log('first', data);
      if (data.success) {
        Alert.alert('✅ Success', 'Paystack setup completed');
        setShowPaystackOverlay(false);
        refetchSingleUser();
      } else {
        Alert.alert('Error', data.message || 'Failed to setup Paystack');
      }
    } catch (error) {
      console.log('Paystack error:', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleWebViewNavigationStateChange = (navState) => {
    console.log('WebView URL:', navState.url);
    
    // Check if the user has completed onboarding
    if (navState.url.includes('/success') || 
        navState.url.includes('/complete') ||
        navState.url.includes('/return') ||
        navState.url.includes('account_link') ||
        navState.title?.includes('success')) {
      // Close the overlay and refresh user data
      setShowStripeOverlay(false);
      refetchSingleUser();
      Alert.alert('Success', 'Stripe onboarding completed successfully!');
    }
  };

  const handleWebViewLoad = () => {
    setWebViewLoading(false);
  };

  const handleWebViewError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
    setWebViewLoading(false);
    Alert.alert('Error', 'Failed to load onboarding page. Please try again.');
  };

  const { getValues } = useFormContext();
  const { businessType } = getValues();

  const filteredBtns = profileBtnsProfile.filter(
    btn => btn.title !== 'profile.my_voucher' || businessType?.id === 'car',
  );

  // Main render function
  return (
    <ThemedView styles="flex-1">
      {/* Stripe WebView Overlay */}
      {showStripeOverlay && (
        <View style={{ flex: 1, backgroundColor: '#fff', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <View style={{ flex: 1 }}>
            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: responsiveWidth(6),
                paddingVertical: responsiveHeight(2),
                borderBottomWidth: 1,
                borderBottomColor: '#e5e5e5',
                backgroundColor: '#fff',
              }}
            >
              <ThemedText styles="font-SemiBold text-lg text-black">
                Stripe Onboarding
              </ThemedText>
              <Pressable
                onPress={() => setShowStripeOverlay(false)}
                style={{ padding: 5 }}
              >
                <X size={24} color="#000" />
              </Pressable>
            </View>

            {/* WebView Container */}
            <View style={{ flex: 1 }}>
              {webViewLoading && (
                <View style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  zIndex: 10 
                }}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <ThemedText styles="mt-4 text-black">Loading Stripe onboarding...</ThemedText>
                </View>
              )}
              
              {onboardingUrl ? (
                <WebView
                  source={{ uri: onboardingUrl }}
                  onNavigationStateChange={handleWebViewNavigationStateChange}
                  onLoadStart={() => setWebViewLoading(true)}
                  onLoadEnd={handleWebViewLoad}
                  onError={handleWebViewError}
                  startInLoadingState={false}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  sharedCookiesEnabled={true}
                  style={{ flex: 1 }}
                  allowsInlineMediaPlayback={true}
                  mediaPlaybackRequiresUserAction={false}
                />
              ) : (
                <View style={{ 
                  flex: 1, 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  backgroundColor: '#fff'
                }}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <ThemedText styles="mt-4 text-black">Preparing onboarding...</ThemedText>
                </View>
              )}
            </View>
          </View>
        </View>
      )}

      {/* Paystack Form Overlay */}
      {showPaystackOverlay && (
        <View style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0,0,0,0.8)', 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          zIndex: 1000,
          justifyContent: 'center',
          padding: 20 
        }}>
          <StatusBar backgroundColor="rgba(0,0,0,0.8)" barStyle="light-content" />
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 12,
              gap: 10,
              maxHeight: '80%',
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <ThemedText styles="font-Bold text-lg text-black">Paystack Setup</ThemedText>
              <Pressable onPress={() => setShowPaystackOverlay(false)}>
                <X size={24} color="#000" />
              </Pressable>
            </View>
            
            <TextInput
              placeholder="Business Name"
              placeholderTextColor="#999"
              value={paystackForm.business_name}
              onChangeText={t =>
                setPaystackForm({ ...paystackForm, business_name: t })
              }
              style={{ 
                borderBottomWidth: 1, 
                borderBottomColor: '#ddd',
                padding: 8,
                fontSize: 16,
                color: '#000',
              }}
            />
            
            <TextInput
              placeholder="Settlement Bank"
              placeholderTextColor="#999"
              value={paystackForm.settlement_bank}
              onChangeText={t =>
                setPaystackForm({ ...paystackForm, settlement_bank: t })
              }
              style={{ 
                borderBottomWidth: 1, 
                borderBottomColor: '#ddd',
                padding: 8,
                fontSize: 16,
                color: '#000',
              }}
            />
            
            <TextInput
              placeholder="Account Number"
              placeholderTextColor="#999"
              value={paystackForm.account_number}
              onChangeText={t =>
                setPaystackForm({ ...paystackForm, account_number: t })
              }
              style={{ 
                borderBottomWidth: 1, 
                borderBottomColor: '#ddd',
                padding: 8,
                fontSize: 16,
                color: '#000',
              }}
              keyboardType="numeric"
            />
            
            <TextInput
              placeholder="Percentage Charge"
              placeholderTextColor="#999"
              value={paystackForm.percentage_charge}
              onChangeText={t =>
                setPaystackForm({ ...paystackForm, percentage_charge: t })
              }
              style={{ 
                borderBottomWidth: 1, 
                borderBottomColor: '#ddd',
                padding: 8,
                fontSize: 16,
                color: '#000',
              }}
              keyboardType="numeric"
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 10,
                marginTop: 20,
              }}
            >
              <Pressable 
                onPress={() => setShowPaystackOverlay(false)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}
                disabled={loading}
              >
                <ThemedText styles="text-red-500 font-Medium">Cancel</ThemedText>
              </Pressable>
              
              <Pressable 
                onPress={handlePaystackSubmit}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="blue" />
                ) : (
                  <ThemedText styles="text-blue-500 font-Medium">Submit</ThemedText>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {/* Main Content - Only show when no overlays are active */}
      {!showStripeOverlay && !showPaystackOverlay && (
        <>
          <ThemedViewBlue
            style={{
              paddingHorizontal: responsiveWidth(6),
              paddingVertical: responsiveHeight(3),
              gap: responsiveHeight(3),
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <ThemedViewBlue styles="flex-row relative justify-center items-center">
              <Pressable
                onPress={() =>
                  navigation.navigate('ProviderBottomTab', { screen: 'Dashboard' })
                }
                className="absolute left-0"
              >
                <ChevronLeft size={24} color={icon} />
              </Pressable>

              <ThemedText2 styles="font-SemiBold text-xl">My Profile</ThemedText2>
            </ThemedViewBlue>

            <ThemedViewBlue styles="flex-row items-center justify-between">
              <ThemedViewBlue styles="flex-row items-center gap-3">
                <Image
                  source={{ uri: profileData?.data?.profileImage }}
                  style={{
                    width: responsiveWidth(15),
                    height: responsiveWidth(15),
                    borderRadius: 100,
                  }}
                />

                <ThemedViewBlue>
                  <ThemedText2 styles="font-Bold text-lg">
                    {profileData?.data?.fullName || 'Add Full Name'}
                  </ThemedText2>
                  <ThemedText2 styles="font-Regular text-sm opacity-80">
                    {profileData?.data?.email}
                  </ThemedText2>
                  <ThemedText2 styles="font-Regular text-sm opacity-80">
                    {profileData?.data?.contactNumber || 'Add Contact Number'}
                  </ThemedText2>
                </ThemedViewBlue>
              </ThemedViewBlue>
              <Pressable onPress={() => navigation.navigate('ProviderEditProfile')}>
                <Edit size={24} color={icon} />
              </Pressable>
            </ThemedViewBlue>
          </ThemedViewBlue>

          <View
            style={{
              flex: 1,
              paddingHorizontal: responsiveWidth(6),
              paddingVertical: responsiveHeight(5),
              justifyContent: 'space-between',
            }}
          >
            <View style={{ gap: 4 }}>
              {filteredBtns.map(item => (
                <ProfileOption key={item.id} item={item} />
              ))}

              {user?.role === 'BUSINESS_PARTNER' && (
                <View>
                  <Pressable onPress={() => setShowDropdown(!showDropdown)}>
                    <ThemedView
                      styles={`flex-row justify-between items-center gap-2 border-b ${
                        theme === 'dark' ? 'border-zinc-600' : 'border-zinc-200'
                      } pb-3`}
                    >
                      <View className="flex-row gap-2 items-center">
                        <Image
                          source={require('@/../assets/images/payment.png')}
                        />
                        <ThemedText styles="font-Medium text-md">
                          Create Payment Setup
                        </ThemedText>
                      </View>
                      {loading && <ActivityIndicator color="blue" />}
                      <ChevronDown
                        size={24}
                        color={theme === 'dark' ? '#52525b' : '#d4d4d8'}
                      />
                    </ThemedView>
                  </Pressable>

                  {/* Dropdown */}
                  {showDropdown && (
                    <View style={{ marginLeft: 20, marginTop: 5 }}>
                      <Pressable
                        className="flex-row gap-2 items-center"
                        onPress={() => {
                          setShowDropdown(false);
                          if (!singleLoggedUser?.data?.isStripeConnected) {
                            handleOnboarding();
                          } else {
                            Alert.alert(
                              'Info',
                              'You are already connected to Stripe',
                            );
                          }
                        }}
                      >
                        <ThemedText styles="py-2">➡ Stripe</ThemedText>
                        {singleLoggedUser?.data?.isStripeConnected ? (
                          <CheckCircle2 size={20} color={'green'} />
                        ) : (
                          <Text className="text-green-500">Onboard</Text>
                        )}
                      </Pressable>

                      <Pressable
                        className="flex-row gap-2 items-center"
                        onPress={() => {
                          setShowDropdown(false);
                          if (!singleLoggedUser?.data?.isPayStackConnected) {
                            setShowPaystackOverlay(true);
                          } else {
                            Alert.alert(
                              'Info',
                              'You are already connected to Paystack',
                            );
                          }
                        }}
                      >
                        <ThemedText styles="py-2">➡ Paystack</ThemedText>
                        {singleLoggedUser?.data?.isPayStackConnected ? (
                          <CheckCircle2 size={20} color={'green'} />
                        ) : (
                          <Text className="text-green-500">Onboard</Text>
                        )}
                      </Pressable>
                    </View>
                  )}
                </View>
              )}
            </View>

            {/* Logout */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 2, marginTop: 20 }}>
              <Pressable
                disabled={logoutLoading}
                onPress={async () => {
                  try {
                    await logout().unwrap();
                    dispatch(clearAuth());
                  } catch (err) {
                    console.error('Logout error:', err);
                  }
                }}
                className="flex-row items-center gap-2"
              >
                <Image source={require('@/../assets/images/logout.webp')} />
                <ThemedText styles="font-Medium text-md">Logout</ThemedText>
                {logoutLoading && <ActivityIndicator color="blue" />}
              </Pressable>
            </View>
          </View>
        </>
      )}
    </ThemedView>
  );
};

export default ProviderProfileScreen;
