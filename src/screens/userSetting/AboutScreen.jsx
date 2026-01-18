import { View, ScrollView } from 'react-native';
import React from 'react';
import { useGetAboutQuery } from '../../redux/slices/authSlice';
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

// Default brand content (used as fallback when API data is unavailable)
const BRAND_STORY = `Fasify was created with a simple belief: travel should be effortless. Born from the real frustrations that travelers face—complex bookings, unreliable platforms, and overwhelming choices—Fasify set out to redesign the journey.

Our story is about empowering people to explore the world with confidence, comfort, and convenience. From quick city breaks to special getaways, Fasify brings clarity and simplicity to every step of the travel process.

With roots in both the United Kingdom and Nigeria, Fasify bridges global experiences with local realities, making smart travel accessible to everyone. As we grow, our commitment remains the same: to elevate travel through innovation, trust, and exceptional user experience.`;

const BRAND_MISSION = `Our mission is to simplify and elevate the travel experience by providing a seamless, secure, and intuitive platform that connects travelers with quality accommodations and services. We aim to build a smarter way for people to explore, plan, and enjoy their journeys.`;

const BRAND_VISION = `Our vision is to become the leading travel technology platform in Africa and beyond, championing innovation, trust, and accessibility. We aspire to create a world where every traveler—regardless of location—can enjoy stress-free, well-informed, and personalized travel experiences.`;

const AboutScreen = () => {
  const { data: item, isLoading, isError } = useGetAboutQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const aboutData = item?.data;
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
          Fasify – Brand Story, Mission & Vision

        </ThemedText>

        {/* Brand Story */}
        <SingleSection title="Brand Story" text={aboutData?.brandStory ?? BRAND_STORY} />

        {/* Mission */}
        <SingleSection title="Our Mission" text={aboutData?.ourMission ?? BRAND_MISSION} />

        {/* Vision */}
        <SingleSection title="Our Vision" text={aboutData?.ourVision ?? BRAND_VISION} />

      </ScrollView>
    </ThemedView>
  );
};

export default AboutScreen;
