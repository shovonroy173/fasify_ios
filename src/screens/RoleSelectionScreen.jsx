// /* eslint-disable react-native/no-inline-styles */
// import { Image, FlatList } from "react-native";
// import React from "react";
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";

// import { useNavigation } from "@react-navigation/native";
// import { roles } from "assets/data/data";
// import ThemedSelect from "@/utils/ThemedSelect";
// import ThemedView from "@/utils/ThemedView";
// import { useFormContext } from "react-hook-form";

// const RoleSelectionScreen = () => {
//   const navigation = useNavigation();
//   const { watch } = useFormContext();
  
//   // Use watch() to get real-time updates of the role field
//   const role = watch("role");
//   console.log("LINE AT 19", role);

//   return (
//     <ThemedView
//       styles="flex-1 justify-center"
//       style={{
//         paddingHorizontal: responsiveWidth(6),
//         paddingVertical: responsiveHeight(10),
//         gap: responsiveHeight(5),
//         // justifyContent: 'space-between',
//       }}
//     >
//       <Image
//         source={require("assets/images/role.webp")}
//         style={{
//           width: responsiveWidth(90),
//           height: responsiveHeight(45),
//           objectFit: "cover",
//         }}
//         className="rounded-full"
//       />

//       <FlatList
//         data={roles}
//         renderItem={({ item }) => (
//           <ThemedSelect
//             key={item.id}
//             item={item}
//             name={"role"}
//             navigation={navigation}
//             path={role === "USER" ? "Signin" : "ProviderSignin"}
//             role={role}
//           />
//         )}
//         contentContainerClassName="gap-4"
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//       />
//     </ThemedView>
//   );
// };

// export default RoleSelectionScreen;


/* eslint-disable react-native/no-inline-styles */
// import { Image, FlatList } from "react-native";




// import React, { useEffect } from "react";
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";

// import { useNavigation } from "@react-navigation/native";
// import { roles } from "assets/data/data";
// import ThemedSelect from "@/utils/ThemedSelect";
// import ThemedView from "@/utils/ThemedView";
// import { useFormContext } from "react-hook-form";

// const RoleSelectionScreen = () => {
//   const navigation = useNavigation();
//   const { watch } = useFormContext();
  
//   // Use watch() to get real-time updates of the role field
//   const roleId = watch("role");
//   console.log("Current role ID:", roleId);

//   // Find the selected role object
//   const selectedRole = roles.find(role => role.id === roleId);
  
//   // Navigate when role is selected
//   useEffect(() => {
//     if (selectedRole) {
//       console.log("Selected role object:", selectedRole);
      
//       // Navigate based on the value
//       if (selectedRole?.id === "USER") {
//         navigation.navigate("Signin");
//       } else if (selectedRole?.id === "BUSINESS_PARTNER") {
//         navigation.navigate("ProviderSignin");
//       }
//     }
//   }, [selectedRole, navigation]);

//   return (
//     <ThemedView
//       styles="flex-1 justify-center"
//       style={{
//         paddingHorizontal: responsiveWidth(6),
//         paddingVertical: responsiveHeight(10),
//         gap: responsiveHeight(5),
//       }}
//     >
//       <Image
//         source={require("assets/images/role.webp")}
//         style={{
//           width: responsiveWidth(90),
//           height: responsiveHeight(45),
//           objectFit: "cover",
//         }}
//         className="rounded-full"
//       />

//       <FlatList
//         data={roles}
//         renderItem={({ item }) => (
//           <ThemedSelect
//             key={item.id}
//             item={item}
//             name={"role"}
//             // Remove navigation prop since parent handles it
//           />
//         )}
//         contentContainerClassName="gap-4"
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//       />
//     </ThemedView>
//   );
// };

// export default RoleSelectionScreen;



import { Image, FlatList } from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

import { useNavigation } from "@react-navigation/native";
import { roles } from "assets/data/data";
import ThemedSelect from "@/utils/ThemedSelect";
import ThemedView from "@/utils/ThemedView";
import { useFormContext } from "react-hook-form";

const RoleSelectionScreen = () => {
  const navigation = useNavigation();
  const { watch } = useFormContext();
  
  // Handle role selection and navigation
  const handleRoleSelect = (roleId) => {
    console.log("Role selected:", roleId);
    
    // Navigate based on the role ID
    if (roleId === "USER") {
      console.log("Navigating to Signin");
      navigation.navigate("Signin");
    } else if (roleId === "BUSINESS_PARTNER") {
      console.log("Navigating to ProviderSignin");
      navigation.navigate("ProviderSignin");
    }
  };

  return (
    <ThemedView
      styles="flex-1 justify-center"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(10),
        gap: responsiveHeight(5),
      }}
    >
      <Image
        source={require("assets/images/role.webp")}
        style={{
          width: responsiveWidth(90),
          height: responsiveHeight(45),
          objectFit: "cover",
        }}
        className="rounded-full"
      />

      <FlatList
        data={roles}
        renderItem={({ item }) => (
          <ThemedSelect
            key={item.id}
            item={item}
            name={"role"}
            onSelect={handleRoleSelect}
          />
        )}
        contentContainerClassName="gap-4"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
};

export default RoleSelectionScreen;