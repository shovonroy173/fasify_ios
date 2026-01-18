import { useNavigation } from "@react-navigation/native";
import { useThemeColor } from "../utils/useThemeColor";
import ThemedView from "../utils/ThemedView";
import { Image, Text, View } from "react-native";
import ThemedText from "../utils/ThemedText";
import ThemedText3 from "../utils/ThemedText3";
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ThemedPressableWhite from "../utils/ThemedPressableWhite";
// import Octicons from 'react-native-vector-icons/Octicons';


const ProviderAttactionTicketCard = ({ item }) => {
  const { icon2 } = useThemeColor();
  const navigation = useNavigation();
  return (
    <ThemedView styles="flex-row p-3 rounded-md border  mb-3">
      <Image
        source={{ uri: item.imageUrl }}
        className="w-24 h-42 rounded-md"
        resizeMode="cover"
        
      />
      <View className="flex-1 ml-3 gap-2">
        <ThemedText styles="font-SemiBold text-base">{item.title}</ThemedText>
        <ThemedText3 styles=" text-sm mt-1">{item.description}</ThemedText3>
        <View className="flex-row gap-[0.5] items-center mt-2">
          {/* <Entypo name="location-pin" size={14} color="gray" /> */}
          <ThemedText3 styles=" text-sm mr-2">{item.location}</ThemedText3>
          {/* <FontAwesome name="star" size={14} color="#f59e0b" /> */}
          <Text className="text-yellow-600 text-xs ml-1">
            {item.rating} ({item.reviews} reviews)
          </Text>
          <ThemedText3 styles="text-sm font-Medium ml-1">
            From ${item.price}
          </ThemedText3>
        </View>

        <ThemedPressableWhite
          onPress={() => navigation.navigate('ProviderEditAttractionListing')}
          styles="p-2 border rounded-md flex-1 flex-row gap-2 justify-center items-center"
        >
          <ThemedText styles="font-Medium text-sm">Edit</ThemedText>
          {/* <Octicons name="arrow-right" size={16} color={icon2} /> */}
        </ThemedPressableWhite>
      </View>
    </ThemedView>
  );
};

export default ProviderAttactionTicketCard