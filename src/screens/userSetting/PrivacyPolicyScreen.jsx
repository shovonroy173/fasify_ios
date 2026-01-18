import { View,  ScrollView } from 'react-native';
import React from 'react';
import { useGetPrivacyPolicyQuery } from '../../redux/slices/authSlice';
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
    <ThemedText styles="text-lg font-SemiBold  mb-2">{title}</ThemedText>
    <ThemedText3 styles="font-Regular">{text}</ThemedText3>
  </View>
);

const Section = ({ title, data }) => (
  <View className="mb-5">
    <ThemedText styles="text-lg font-SemiBold  mb-2">{title}</ThemedText>
    {data?.map((item, index) => (
      <ThemedText3 key={index} styles="mb-1 font-Regular">
        • {item}
      </ThemedText3>
    ))}
  </View>
);

// Fallback privacy policy content
const PRIVACY_TITLE = 'FASIFY – PRIVACY POLICY';
const PRIVACY_INTRO = `This Privacy Policy explains how Fasify ("we," "our," or "us") collects, uses, stores, and protects your personal information when you use our mobile application, website, and related services. By using our services, you consent to the practices described in this policy.`;

const INFORMATION_COLLECT = [
  'Personal Information (Name, Email, Phone Number)',
  'Payment Information (Processed securely through third-party gateways)',
  'Location Information (For booking and personalized experience)',
  'Usage & Device Information (IP, browser type, app activity)',
  'Booking Information (Accommodation, dates, preferences)',
];

const HOW_USE = [
  'To provide, operate, and improve our services',
  'To enable secure bookings and transactions',
  'To provide customer support',
  'To enhance user safety and fraud prevention',
  'To send service updates, notifications, or promotional content',
];

const HOW_SHARE = [
  'With trusted service providers supporting our operations',
  'With accommodation partners and hosts to complete your booking',
  'With legal and regulatory authorities when required',
  'During business transfers such as mergers or acquisitions',
];

const DATA_SECURITY = `We implement industry-standard security measures including encryption, secure servers, and PCI-compliant payment processing to protect your information from unauthorized access or disclosure.`;

const YOUR_RIGHTS = `Depending on your region, you may have the right to access, correct, delete, restrict processing, or withdraw consent regarding your personal data. To exercise these rights, contact us using the details below.`;

const DATA_RETENTION = `We retain your information only for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.`;

const THIRD_PARTY_SERVICES = `Fasify integrates with third-party platforms such as payment gateways, analytics providers, and hosting partners. Each third-party service has its own privacy practices which we encourage you to review.`;

const COOKIES_TRACKING = `We use cookies, analytics tools, and device identifiers to improve user experience, analyze usage patterns, and provide personalized content and advertisements.`;

const CHILDRENS_PRIVACY = `Fasify is not intended for children under the age of 16, and we do not knowingly collect information from minors.`;

const INTERNATIONAL_TRANSFERS = `Your information may be processed and stored in countries outside your own. We ensure appropriate safeguards such as GDPR-compliant transfer mechanisms.`;

const CHANGES_POLICY = `We may update this Privacy Policy periodically. Changes will be reflected with a new 'Last Updated' date.`;

const CONTACT_INFO = `Email: info@fasifys.com\nPhone: +44 7521 010080\nUK Office: 103 Marsh Hill, Erdington, Birmingham, B23 7DU\nNigeria Office: 6 Esomo Close, Off Toyin Street, Ikeja, Lagos`;


const PrivacyPolicyScreen = () => {
  const {
    data: item,
    isLoading,
    isError,
  } = useGetPrivacyPolicyQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const policyData = item?.data;
  console.log("LINE AT 41s", policyData);
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
        <ThemedText styles="text-2xl font-Bold  mb-3">
          {policyData?.title ?? PRIVACY_TITLE}
        </ThemedText>

        {/* Introduction */}
        <ThemedText styles="text-base font-Regular mb-4">
          {policyData?.introduction ?? PRIVACY_INTRO}
        </ThemedText>

        {/* Information we collect */}
        <Section
          title="Information We Collect"
          data={policyData?.information_collect ?? INFORMATION_COLLECT}
        />

        {/* How we use your data */}
        <Section
          title="How We Use Your Data"
          data={policyData?.how_useYour_data ?? HOW_USE}
        />

        {/* How we share your information */}
        <Section
          title="How We Share Your Information"
          data={policyData?.how_share_info ?? HOW_SHARE}
        />

        {/* Data Security */}
        <SingleSection title="Data Security" text={policyData?.data_security ?? DATA_SECURITY} />

        {/* Third-Party Services */}
        <SingleSection
          title="Third-Party Services"
          text={policyData?.third_party_services ?? THIRD_PARTY_SERVICES}
        />

        {/* Your Rights */}
        <SingleSection title="Your Rights" text={policyData?.user_control ?? YOUR_RIGHTS} />

        {/* Data Retention */}
        <SingleSection title="Data Retention" text={policyData?.data_retention ?? DATA_RETENTION} />

        {/* Cookies & Tracking Technologies */}
        <SingleSection title="Cookies & Tracking Technologies" text={policyData?.cookies_tracking ?? COOKIES_TRACKING} />

        {/* International Data Transfers */}
        <SingleSection title="International Data Transfers" text={policyData?.international_transfers ?? INTERNATIONAL_TRANSFERS} />

        {/* Children's Privacy */}
        <SingleSection
          title="Children’s Privacy"
          text={policyData?.children_privacy ?? CHILDRENS_PRIVACY}
        />

        {/* Changes to Policy */}
        <SingleSection
          title="Changes to Policy"
          text={policyData?.changes_to_policy ?? CHANGES_POLICY}
        />

        {/* Contact Info */}
        <SingleSection
          title="Contact Information"
          text={policyData?.contact_info ?? CONTACT_INFO}
        />
      </ScrollView>
    </ThemedView>
  );
};

export default PrivacyPolicyScreen;
