import { View, ScrollView } from 'react-native';
import React from 'react';
import { useGetTermsQuery } from '../../redux/slices/authSlice';
import ThemedView from '../../utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import GoBack from '../../components/GoBack';
import { useNavigation } from '@react-navigation/native';
import ThemedText from '../../utils/ThemedText';
import ThemedText3 from '../../utils/ThemedText3';

const SingleSection = ({ title, text }) => (
  <View className="mb-5">
    <ThemedText styles="text-lg font-SemiBold mb-2">{title}</ThemedText>
    <ThemedText3 styles="font-Regular">{text}</ThemedText3>
  </View>
);

// Fallback Terms & Conditions content
const TERMS_TITLE = 'FASIFY – TERMS & CONDITIONS';
const TERMS_ACCEPTANCE = `Welcome to Fasify. By accessing or using our mobile application, website, or related services (“Services”), you agree to be bound by these Terms & Conditions. Please read them carefully.`;
const TERMS_ELIGIBILITY = `Users must be at least 18 years old or have legal capacity to enter into binding agreements.`;
const TERMS_USER_ACCOUNTS = `You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your login details.`;
const TERMS_BOOKING_PAYMENTS = `All bookings made through Fasify are subject to availability and confirmation. Payments are processed securely through third-party payment providers. Fasify does not store complete payment card details.`;
const TERMS_PRICING_FEES = `Prices may vary depending on location, availability, and season. Taxes and service fees may apply.`;
const TERMS_CANCELLATIONS = `Cancellations are governed by our Cancellation Policy. Refund eligibility depends on the timing and circumstances.`;
const TERMS_USER_RESPONSIBILITIES = `Users must not provide false information, misuse the platform, violate applicable laws, or attempt to hack, reverse-engineer, or disrupt the system.`;
const TERMS_PROHIBITED_ACTIVITIES = `Fraud, abuse of promotions or discounts, posting harmful or illegal content, and interfering with other users or hosts are prohibited.`;
const TERMS_HOST_RESPONSIBILITIES = `Hosts must ensure that accommodation listings are accurate, safe, and comply with local regulations.`;
const TERMS_LIABILITY = `Fasify is not responsible for damages caused by hosts or guests, cancellations due to external factors, or losses arising from misuse of the platform. To the fullest extent permitted by law, Fasify shall not be liable for indirect, incidental, or consequential damages.`;
const TERMS_INTELLECTUAL = `All content, branding, logos, and designs are the property of Fasify and may not be reproduced without permission.`;
const TERMS_SUSPENSION = `We may suspend or terminate accounts that violate these Terms or threaten the safety of the community.`;
const TERMS_DATA_PROTECTION = `Your personal data is handled according to our Privacy Policy.`;
const TERMS_MODIFICATIONS = `Fasify may update these Terms at any time. Continued use of the Services constitutes acceptance of revised Terms.`;
const TERMS_GOVERNING_LAW = `These Terms are governed by the laws of the United Kingdom and Nigeria, depending on the user's location.`;
const TERMS_CONTACT = `For questions or support, contact us:\nEmail: info@fasifys.com\nPhone: +44 7521 010080\nUK Office: 103 Marsh Hill, Erdington, Birmingham, B23 7DU\nNigeria Office: 6 Esomo Close, Off Toyin Street, Ikeja, Lagos`;

const TermsAndConditionsScreen = () => {
  const {
    data: item,
    isLoading,
    isError,
  } = useGetTermsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const termsData = item?.data;
  const navigation = useNavigation();

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      <GoBack navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <ThemedText styles="text-2xl font-Bold mb-3">
          {termsData?.title ?? TERMS_TITLE}
        </ThemedText>

        {/* Acceptance of Terms */}
        <SingleSection
          title="Acceptance of Terms"
          text={termsData?.acceptance_terms ?? TERMS_ACCEPTANCE}
        />

        {/* Eligibility */}
        <SingleSection title="Eligibility" text={termsData?.eligibility ?? TERMS_ELIGIBILITY} />

        {/* User Accounts */}
        <SingleSection title="User Accounts" text={termsData?.user_accounts ?? TERMS_USER_ACCOUNTS} />

        {/* Booking & Payments */}
        <SingleSection title="Booking & Payments" text={termsData?.booking_payments ?? TERMS_BOOKING_PAYMENTS} />

        {/* Pricing & Fees */}
        <SingleSection title="Pricing & Fees" text={termsData?.pricing_fees ?? TERMS_PRICING_FEES} />

        {/* Cancellations & Refunds */}
        <SingleSection title="Cancellations & Refunds" text={termsData?.cancellations_refunds ?? TERMS_CANCELLATIONS} />

        {/* User Responsibilities */}
        <SingleSection title="User Responsibilities" text={termsData?.user_responsibilities ?? TERMS_USER_RESPONSIBILITIES} />

        {/* Prohibited Activities */}
        <SingleSection title="Prohibited Activities" text={termsData?.prohibited_activities ?? TERMS_PROHIBITED_ACTIVITIES} />

        {/* Host Responsibilities */}
        <SingleSection title="Host Responsibilities" text={termsData?.host_responsibilities ?? TERMS_HOST_RESPONSIBILITIES} />

        {/* Liability */}
        <SingleSection title="Liability" text={termsData?.liability ?? TERMS_LIABILITY} />

        {/* Intellectual Property */}
        <SingleSection title="Intellectual Property" text={termsData?.intellectual_property ?? TERMS_INTELLECTUAL} />

        {/* Suspension & Termination */}
        <SingleSection title="Suspension & Termination" text={termsData?.suspension_termination ?? TERMS_SUSPENSION} />

        {/* Data Protection */}
        <SingleSection title="Data Protection" text={termsData?.data_protection ?? TERMS_DATA_PROTECTION} />

        {/* Modifications */}
        <SingleSection title="Modifications" text={termsData?.modifications ?? TERMS_MODIFICATIONS} />

        {/* Governing Law */}
        <SingleSection title="Governing Law" text={termsData?.governing_law ?? TERMS_GOVERNING_LAW} />

        {/* Contact Info */}
        <SingleSection title="Contact Information" text={termsData?.contact_info ?? TERMS_CONTACT} />
      </ScrollView>
    </ThemedView>
  );
};

export default TermsAndConditionsScreen;
