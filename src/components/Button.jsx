import { Pressable, useColorScheme } from "react-native";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ThemedText2 from "../utils/ThemeText2";
import { useThemeColor } from "../utils/useThemeColor";
import { useSelector } from "react-redux";

import messaging from "@react-native-firebase/messaging";
import // useGetProviderProfileQuery,
// useGetSingleUserQuery,
// useSendNotificationMutation,
"../redux/slices/authSlice";
import { CommonActions } from "@react-navigation/native";
import moment from "moment";

const Button = ({
  title,
  navigation,
  path,
  ids = [],
  noicon,
  onComplete,
  submission,
  isLogin,
  isRegister,
  isForgotPassword,
  isVerifyCode,
  isEmailVerify,
  isResetPassword,
  isProfileUpdate,
  isHotelCreate,
  isUpdateProviderHotel,
  isSecurityCreate,
  isUpdateProviderSecurity,
  isCarCreate,
  isUpdateProviderCar,
  isAttractionCreate,
  isUpdateProviderAttraction,

  isCreateBookingHotel,

  isCreateBookingSecurity,

  isCreateBookingAttraction,

  isCreateBookingCar,

  isHotelRoomCreate,

  isUpdateProviderHotelRoom,

  isHotelRoomCreateListing,

  isSecurityProfileCreate,
  isSecurityProfileUpdate,

  isCarListingCreate,
  isCarActiveListingCreate,

  isAttractionListingCreate,
  isAttractionActiveListingCreate,
  isUpdateProviderAttractionListing,
  isUpdateProviderListing,

  isProviderRegister,
  isProviderLogin,
}) => {
  const { icon } = useThemeColor();
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    getValues,
    setValue,
  } = useFormContext();
  // console.log(path);
  // console.log('otp', watch('otp'));

  const isDisabled = ids.some((id) => !!errors[id] || !watch(id));
  const theme = useColorScheme();

  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  // console.log("LINE AT 55", user);

  // const [sendNotification] = useSendNotificationMutation();

  const baseStyle = `${theme === "dark" ? "bg-primary_dark" : "bg-primary"} ${
    loading ? "opacity-50" : "opacity-100"
  }`;

  // const onSubmit = async data => {
  //   console.log(data);

  //   // handle navigation if path is provided
  //   if (typeof path === 'string') {
  //     navigation.navigate(path, { formData: data });
  //   } else if (typeof path === 'object' && path !== null) {
  //     navigation.navigate(path.name, {
  //       screen: path.screen,
  //       params: { formData: data },
  //     });
  //   }

  //   // ✅ Always trigger onComplete if defined
  //   if (typeof onComplete === 'function') {
  //     onComplete();
  //   }
  // };

  const {
    selectedRoom: item,
    selectedSecurity: itemSecurity,
    selectedAttraction: itemAttraction,
    selectedCar: itemCar,
    profileImage: editProfileImage,
    providerRegEmail,
    attractionSchedule,
    serviceId,
    selectedActiveListing,
    selectedActiveListingSecurity,
    selectedActiveListingSecurityGuard,
    selectedActiveListingCar,
    // selectedActiveListingAttraction,
    selectedActiveBusinessCar,
    regEmail
  } = getValues();

  console.log("LINE AT 103", selectedActiveListingSecurityGuard);

  // const fcmToken = useSelector(state => state.auth.fcmToken);

  // const {
  //   data: profileData,
  //   isLoading,
  //   isError,
  // } = useGetProviderProfileQuery(undefined, {
  //   // 👇 Ensures it re-fetches when tag is invalidated
  //   refetchOnMountOrArgChange: true,
  // });

  const onSubmit = async (data) => {
    // const storedRole = await AsyncStorage.getItem('@select_role');
    // console.log('Original data:', data, storedRole);
    // const email = await AsyncStorage.getItem('@reset_email');
    // const code = await AsyncStorage.getItem('@reset_code');
    setLoading(true); // ⏳ start loading

    try {
      // Submit form data first
      let payload = { ...data };
      let finalPayload = {};
      if (isLogin) {
        finalPayload.email = payload.email;
        finalPayload.password = payload.password;
        finalPayload.role = payload.role;
        // const fcmToken = await messaging().getToken();
        // console.log('FCM Token:', fcmToken);

        // finalPayload.fcmToken = fcmToken;
      }
      if (isProviderLogin) {
        finalPayload.email = payload.providerLogEmail;
        finalPayload.password = payload.providerLogPassword;
        finalPayload.role = payload.role;
        // const fcmToken = await messaging().getToken();
        // console.log('FCM Token:', fcmToken);

        // finalPayload.fcmToken = fcmToken;
      }
      if (isRegister) {
        finalPayload.email = payload.regEmail;
        finalPayload.password = payload.regPassword;
        finalPayload.role = payload.role;
        finalPayload.status = "INACTIVE";
        // const fcmToken = await messaging().getToken();
        // console.log('FCM Token:', fcmToken);

        // finalPayload.fcmToken = fcmToken;
      }
      if (isProviderRegister) {
        console.log("LINE AT 40");

        finalPayload.email = payload.providerRegEmail;
        finalPayload.password = payload.providerRegPassword;
        finalPayload.role = payload.role;
        finalPayload.status = "INACTIVE";
        // const fcmToken = await messaging().getToken();
        // console.log('FCM Token:', fcmToken);

        // finalPayload.fcmToken = fcmToken;
      }

      if (isForgotPassword) {
        finalPayload.email = payload.email;
      }

      if (isResetPassword) {
        finalPayload.password = payload.password;
        finalPayload.confirmPassword = payload.confirmPassword;
        finalPayload.id = user?.id;
      }

      // not added this(final solution)
      if (isVerifyCode) {
        finalPayload.email = regEmail
        finalPayload.otp = payload.otp;
      }

      if (isEmailVerify) {
        finalPayload.email = providerRegEmail || regEmail;
        finalPayload.otp = payload.otp;
        // const fcmToken = await messaging().getToken();
        // console.log('FCM Token:', fcmToken);

        // finalPayload.fcmToken = fcmToken;
      }

      if (isProfileUpdate) {
        const formData = new FormData();

        if (editProfileImage) {
          formData.append("profileImage", {
            uri: editProfileImage,
            type: "image/jpeg", // Helper function to detect type
            name: "profileImage.jpg", // Helper function to generate unique name
          });
        }

        // Append other fields only if they have values
        if (payload?.fullName?.trim()) {
          formData.append("fullName", payload?.fullName?.trim());
        }

        if (payload?.address?.trim()) {
          formData.append("address", payload?.address?.trim());
        }

        if (payload?.contactNumber?.trim()) {
          formData.append("contactNumber", payload?.contactNumber?.trim());
        }

        if (payload?.country?.trim()) {
          formData.append("country", payload?.country?.trim());
        }
        finalPayload = formData;
      }

      if (isHotelCreate || isUpdateProviderHotel) {
        const providerHotel = watch("selectedActiveListing");
        const toBoolean = (value) => {
          if (typeof value === "boolean") return Boolean(value);
        };

        const appendIfDefined = (key, value) => {
          if (value !== undefined) {
            formData.append(key, toBoolean(value));
          }
        };

        const formData = new FormData();

        // Business Information
        if (payload.hotelBusinessName) {
          formData.append("hotelBusinessName", payload.hotelBusinessName);
        }

        if (payload.hotelName) {
          formData.append("hotelName", payload.hotelName);
        }

        if (
          payload.hotelBusinessType &&
          payload.hotelBusinessType != "default"
        ) {
          formData.append("hotelBusinessType", payload.hotelBusinessType);
        }

        if (
          payload.hotelAccommodationType &&
          payload.hotelAccommodationType != "default"
        ) {
          formData.append(
            "hotelAccommodationType",
            payload.hotelAccommodationType
          );
        }

        if (payload.hotelRegNum) {
          formData.append("hotelRegNum", payload.hotelRegNum);
        }

        if (payload.hotelRegDate) {
          formData.append("hotelRegDate", payload.hotelRegDate);
        }

        if (payload.hotelPhone) {
          formData.append("hotelPhone", payload.hotelPhone);
        }

        if (payload.hotelEmail) {
          formData.append("hotelEmail", payload.hotelEmail);
        }

        if (payload.businessTagline) {
          formData.append("businessTagline", payload.businessTagline);
        }

        if (payload.businessDescription) {
          formData.append("businessDescription", payload.businessDescription);
        }

        // Business Logo (Check if the businessLogo exists and has a valid file path)
        if (payload.businessLogo) {
          const filename = payload.businessLogo.split("/").pop();
          formData.append("businessLogo", {
            uri: payload.businessLogo,
            type: "image/jpeg",
            name: filename || "business_logo.jpg",
          });
        }

        // Policies (Only append if these fields exist)
        if (payload.hotelBookingCondition) {
          formData.append(
            "hotelBookingCondition",
            payload.hotelBookingCondition
          );
        }

        if (payload.hotelCancelationPolicy) {
          formData.append(
            "hotelCancelationPolicy",
            payload.hotelCancelationPolicy
          );
        }

        // Documents (Check if any documents exist in the array)
        if (payload.hotelDocs && payload.hotelDocs.length > 0) {
          payload.hotelDocs.forEach((doc, index) => {
            formData.append("hotelDocs", {
              uri: doc.uri || doc,
              type: doc.type || "application/pdf",
              name: doc.name || `document_${index}.pdf`,
            });
          });
        }

        // Location Details (Only append if the fields exist)
        if (payload.hotelAddress) {
          formData.append("hotelAddress", payload.hotelAddress);
        }

        if (payload.hotelCity) {
          formData.append("hotelCity", payload.hotelCity);
        }

        if (payload.hotelPostalCode) {
          formData.append("hotelPostalCode", payload.hotelPostalCode);
        }

        if (payload.hotelDistrict) {
          formData.append("hotelDistrict", payload.hotelDistrict);
        }

        if (payload.hotelCountry && payload.hotelCountry != "default") {
          formData.append("hotelCountry", payload.hotelCountry);
        }

        // Hotel Amenities (Convert to proper booleans)
        appendIfDefined("hotelAC", payload.hotelAC);
        appendIfDefined("hotelParking", payload.hotelParking);
        appendIfDefined("hoitelWifi", payload.hoitelWifi);
        appendIfDefined("hotelBreakfast", payload.hotelBreakfast);
        appendIfDefined("hotelPool", payload.hotelPool);
        appendIfDefined("hotelTv", payload.hotelTv);
        appendIfDefined("hotelWashing", payload.hotelWashing);
        appendIfDefined("hotelKitchen", payload.hotelKitchen);
        appendIfDefined("hotelRestaurant", payload.hotelRestaurant);
        appendIfDefined("hotelGym", payload.hotelGym);
        appendIfDefined("hotelSpa", payload.hotelSpa);
        appendIfDefined("hotel24HourFrontDesk", payload.hotel24HourFrontDesk);
        appendIfDefined("hotelAirportShuttle", payload.hotelAirportShuttle);
        appendIfDefined("hotelCoffeeBar", payload.hotelCoffeeBar);

        // Smoking Preferences (Convert to proper booleans)
        appendIfDefined("hotelSmoking", payload.hotelSmoking);
        appendIfDefined(
          "hotelNoSmokingPreference",
          payload.hotelNoSmokingPreference
        );
        appendIfDefined("hotelNoNSmoking", payload.hotelNoNSmoking);

        // Pet Policies (Convert to proper booleans)
        appendIfDefined("hotelPetsAllowed", payload.hotelPetsAllowed);
        appendIfDefined(
          "hotelNoPetsPreferences",
          payload.hotelNoPetsPreferences
        );
        appendIfDefined("hotelPetsNotAllowed", payload.hotelPetsNotAllowed);

        // Location Features (Convert to proper booleans)
        appendIfDefined(
          "hotelLocationFeatureWaterView",
          payload.hotelLocationFeatureWaterView
        );
        appendIfDefined(
          "hotelLocationFeatureIsland",
          payload.hotelLocationFeatureIsland
        );

        // Update case
        if (isUpdateProviderHotel) {
          formData.append("id", providerHotel?.id);
        }

        finalPayload = formData;
      }

      if (
        isHotelRoomCreate ||
        isUpdateProviderHotelRoom ||
        isHotelRoomCreateListing
      ) {
        const formData = new FormData();

        // Room Information
        if (payload.hotelRoomType && payload.hotelRoomType !== "default") {
          formData.append("hotelRoomType", payload.hotelRoomType);
        }
        if (payload.hotelRoomDescription) {
          formData.append("hotelRoomDescription", payload.hotelRoomDescription);
        }

        if (payload.hotelRoomCapacity) {
          formData.append("hotelRoomCapacity", payload.hotelRoomCapacity);
        }

        if (payload.hotelNumAdults) {
          formData.append("hotelNumAdults", parseFloat(payload.hotelNumAdults));
        }
        if (payload.hotelNumChildren) {
          formData.append(
            "hotelNumChildren",
            parseFloat(payload.hotelNumChildren)
          );
        }

        // Pricing & Classification
        if (payload.category) {
          formData.append("category", payload.category);
        }
        if (payload.hotelRating) {
          formData.append("hotelRating", parseFloat(payload.hotelRating));
        }
        if (payload.hotelRoomPriceNight) {
          formData.append(
            "hotelRoomPriceNight",
            parseFloat(payload.hotelRoomPriceNight)
          );
        }

        if (payload.currency && payload.currency !== "default") {
          formData.append("currency", payload.currency);
        }
        if (payload.discount) {
          formData.append("discount", parseFloat(payload.discount));
        }

        // Hotel Facility Images
        if (payload.hotelImages && payload.hotelImages.length > 0) {
          payload.hotelImages.forEach((img, index) => {
            formData.append("hotelImages", {
              uri: img.uri || img,
              type: "image/jpeg",
              name: `hotel_facility_${index}.jpg`,
            });
          });
        }

        // Room Images
        if (payload.hotelRoomImages && payload.hotelRoomImages.length > 0) {
          payload.hotelRoomImages.forEach((img, index) => {
            formData.append("hotelRoomImages", {
              uri: img.uri || img,
              type: "image/jpeg",
              name: `room_${index}.jpg`,
            });
          });
        }

        finalPayload = formData;
      }

      if (isSecurityCreate || isUpdateProviderSecurity) {
        const providerSecurityId = watch("selectedActiveListingSecurity");
        const formData = new FormData();

        if (payload.securityBusinessName) {
          formData.append("securityBusinessName", payload.securityBusinessName);
        }
        if (payload.securityName) {
          formData.append("securityName", payload.securityName);
        }
        if (payload.securityBusinessType) {
          formData.append("securityBusinessType", payload.securityBusinessType);
        }
        if (payload.securityProtocolType) {
          formData.append("securityProtocolType", payload.securityProtocolType);
        }
        if (payload.securityRegNum) {
          formData.append("securityRegNum", payload.securityRegNum);
        }
        if (payload.securityRegDate) {
          formData.append("securityRegDate", payload.securityRegDate);
        }
        if (payload.securityPhone) {
          formData.append("securityPhone", payload.securityPhone);
        }
        if (payload.securityEmail) {
          formData.append("securityEmail", payload.securityEmail);
        }
        if (payload.securityBookingCondition) {
          formData.append(
            "securityBookingCondition",
            payload.securityBookingCondition
          );
        }
        if (payload.securityCancelationPolicy) {
          formData.append(
            "securityCancelationPolicy",
            payload.securityCancelationPolicy
          );
        }

        // Append optional fields (only if they exist)
        if (payload.securityTagline) {
          formData.append("securityTagline", payload.securityTagline);
        }

        if (payload.securityProtocolDescription) {
          formData.append(
            "securityProtocolDescription",
            payload.securityProtocolDescription
          );
        }

        // Append business logo (with fallback to default)
        if (payload.businessLogo) {
          formData.append("businessLogo", {
            uri: payload.businessLogo,
            type: "image/jpeg",
            name: "businessLogo.jpg",
          });
        }

        // Append security documents (array of files)
        if (payload.securityDocs && payload.securityDocs.length > 0) {
          payload.securityDocs.forEach((doc, index) => {
            formData.append("securityDocs", {
              uri: doc.uri,
              type: doc.type || "application/pdf",
              name: doc.name || `security_doc_${index}.pdf`,
            });
          });
        }

        if (isUpdateProviderSecurity) {
          formData.append("id", providerSecurityId?.id);
        }

        finalPayload = formData;
      }

      if (isSecurityProfileCreate || isSecurityProfileUpdate) {
        const formData = new FormData();
        console.log("LINE AT 578", "EDIT LISTING");

        // Basic Information

        if (payload.securityGuardName) {
          formData.append("securityGuardName", payload.securityGuardName);
        }
        if (payload.securityGuardDescription) {
          formData.append(
            "securityGuardDescription",
            payload.securityGuardDescription
          );
        }

        // Address Information
        if (payload.securityAddress) {
          formData.append("securityAddress", payload.securityAddress);
        }
        if (payload.securityPostalCode) {
          formData.append("securityPostalCode", payload.securityPostalCode);
        }
        if (payload.securityDistrict) {
          formData.append("securityDistrict", payload.securityDistrict);
        }
        if (payload.securityCity) {
          formData.append("securityCity", payload.securityCity);
        }
        if (payload.securityCountry) {
          formData.append("securityCountry", payload.securityCountry);
        }

        // Professional Information
        if (payload.experience) {
          formData.append("experience", parseFloat(payload.experience));
        }
        if (payload.certification) {
          formData.append("certification", payload.certification);
        }

        if (payload.availability) {
          formData.append("availability", payload.availability);
        }

        // Pricing & Rating
        if (payload.securityRating) {
          formData.append("securityRating", parseFloat(payload.securityRating));
        }
        if (payload.securityPriceDay) {
          formData.append(
            "securityPriceDay",
            parseFloat(payload.securityPriceDay)
          );
        }

        if (payload.currency && payload.currency != "default") {
          formData.append("currency", payload.currency);
        }

        // Services & Languages - pass arrays directly

        if (payload.securityServicesOffered) {
          formData.append(
            "securityServicesOffered",
            payload.securityServicesOffered
          );
        }

        if (payload.languages) {
          formData.append("languages", payload.languages);
        }

        // Availability & Schedule
        // formData.append("availability", payload.availability);

        if (payload.securityBookingAbleDays) {
          formData.append(
            "securityBookingAbleDays",
            payload.securityBookingAbleDays
          );
        }

        // Optional fields
        if (payload.discount) {
          formData.append("discount", parseFloat(payload.discount));
        }

        if (payload.category) {
          formData.append("category", payload.category);
        }

        // Security Images - append each image individually
        if (payload.securityImages && payload.securityImages.length > 0) {
          payload.securityImages.forEach((image, index) => {
            formData.append("securityImages", {
              uri: image,
              type: "image/jpeg",
              name: `security_image_${index}.jpg`,
            });
          });
        }

        finalPayload = formData;
      }

      if (isCarCreate || isUpdateProviderCar) {
        // const providerCarId = watch('selectedActiveBusinessCar');
        const formData = new FormData();

        // formData.append("carBusinessName", payload.carBusinessName);
        // formData.append("carName", payload.carName);
        // formData.append("carBusinessType", payload.carBusinessType);
        // formData.append("carRentalType", payload.carRentalType);
        // formData.append("carRegNum", payload.carRegNum);
        // formData.append("carRegDate", payload.carRegDate);
        // formData.append("carPhone", payload.carPhone);
        // formData.append("carEmail", payload.carEmail);
        // formData.append("carTagline", payload.carTagline);
        // formData.append("carRentalDescription", payload.carRentalDescription);

        // formData.append("carBookingCondition", payload.carBookingCondition);
        // formData.append("carCancelationPolicy", payload.carCancelationPolicy);

        if (payload.carBusinessName) {
          formData.append("carBusinessName", payload.carBusinessName);
        }
        if (payload.carName) {
          formData.append("carName", payload.carName);
        }
        if (payload.carBusinessType && payload.carBusinessType != "default") {
          formData.append("carBusinessType", payload.carBusinessType);
        }
        if (payload.carRentalType && payload.carRentalType != "default") {
          formData.append("carRentalType", payload.carRentalType);
        }
        if (payload.carRegNum) {
          formData.append("carRegNum", payload.carRegNum);
        }
        if (payload.carRegDate) {
          formData.append("carRegDate", payload.carRegDate);
        }
        if (payload.carPhone) {
          formData.append("carPhone", payload.carPhone);
        }
        if (payload.carEmail) {
          formData.append("carEmail", payload.carEmail);
        }
        if (payload.carTagline) {
          formData.append("carTagline", payload.carTagline);
        }
        if (payload.carRentalDescription) {
          formData.append("carRentalDescription", payload.carRentalDescription);
        }
        if (payload.carBookingCondition) {
          formData.append("carBookingCondition", payload.carBookingCondition);
        }
        if (payload.carCancelationPolicy) {
          formData.append("carCancelationPolicy", payload.carCancelationPolicy);
        }

        // Append car images
        if (payload.businessLogo) {
          formData.append("businessLogo", {
            uri: payload.businessLogo,
            type: "image/jpeg",
            name: "businessLogo.jpg",
          });
        }

        if (payload.carDocs && payload.carDocs.length > 0) {
          payload.carDocs.forEach((doc, index) => {
            formData.append("carDocs", {
              uri: doc.uri,
              type: doc.type || "application/pdf",
              name: doc.name || `security_doc_${index}.pdf`,
            });
          });
        }

        // if (isUpdateProviderCar) {
        //   formData.append('id', providerCarId);
        // }

        finalPayload = formData;
      }

      if (
        isCarListingCreate ||
        isCarActiveListingCreate ||
        isUpdateProviderListing
      ) {
        const providerCarId = watch("selectedActiveListingCar");
        const formData = new FormData();

        // Car Specifications

        // Location Information
        if (payload.carAddress) {
          formData.append("carAddress", payload.carAddress);
        }
        if (payload.carPostalCode) {
          formData.append("carPostalCode", payload.carPostalCode);
        }
        if (payload.carCity) {
          formData.append("carCity", payload.carCity);
        }
        if (payload.carDistrict) {
          formData.append("carDistrict", payload.carDistrict);
        }
        if (payload.carCountry && payload.carCountry != "default") {
          formData.append("carCountry", payload.carCountry);
        }

        // Car Description
        if (payload.carDescription) {
          formData.append("carDescription", payload.carDescription);
        }

        // Car Specifications
        if (payload.carType) {
          formData.append("carType", payload.carType);
        }
        if (payload.carSeats) {
          formData.append("carSeats", payload.carSeats);
        }
        if (payload.fuelType) {
          formData.append("fuelType", payload.fuelType);
        }
        if (payload.carOilType) {
          formData.append("carOilType", payload.carOilType);
        }
        if (payload.carEngineType) {
          formData.append("carEngineType", payload.carEngineType);
        }
        if (payload.carTransmission) {
          formData.append("carTransmission", payload.carTransmission);
        }
        if (payload.carPower) {
          formData.append("carPower", payload.carPower);
        }
        if (payload.carDrivetrain) {
          formData.append("carDrivetrain", payload.carDrivetrain);
        }
        if (payload.carMileage) {
          formData.append("carMileage", payload.carMileage);
        }
        if (payload.carModel) {
          formData.append("carModel", payload.carModel);
        }
        if (payload.carCapacity) {
          formData.append("carCapacity", payload.carCapacity);
        }
        if (payload.carColor) {
          formData.append("carColor", payload.carColor);
        }
        if (payload.gearType) {
          formData.append("gearType", payload.gearType);
        }

        // Pricing & Rating
        if (payload.carRating) {
          formData.append("carRating", payload.carRating);
        }
        if (payload.currency && payload.currency != "default") {
          formData.append("currency", payload.currency);
        }
        if (payload.carPriceDay) {
          formData.append("carPriceDay", parseFloat(payload.carPriceDay));
        }
        if (payload.discount) {
          formData.append("discount", payload.discount);
        }
        if (payload.vat) {
          formData.append("vat", payload.vat);
        }
        if (payload.category) {
          formData.append("category", payload.category);
        } else {
          formData.append("category", "Car Rental");
        }

        // Booking Availability
        if (payload.carBookingAbleDays) {
          formData.append("carBookingAbleDays", payload.carBookingAbleDays);
        }

        // Append car images
        payload.carImages?.forEach((img, index) => {
          formData.append("carImages", {
            uri: img.uri || img,
            type: "image/jpeg",
            name: `car_${index}.jpg`,
          });
        });

        // Services Offered
        if (payload.carServicesOffered) {
          const servicesArray = payload.carServicesOffered
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s !== ""); // Remove empty strings
          if (servicesArray.length > 0) {
            formData.append("carServicesOffered", servicesArray);
          }
        }

        if (isUpdateProviderCar) {
          formData.append("id", providerCarId);
        }

        finalPayload = formData;
      }

      if (isAttractionCreate || isUpdateProviderAttraction) {
        // const providerAttractionId = watch('selectedActiveListingAttraction');
        const formData = new FormData();

        // Business Information Fields
        formData.append(
          "attractionBusinessName",
          payload.attractionBusinessName
        );
        formData.append("attractionName", payload.attractionName);
        formData.append(
          "attractionBusinessType",
          payload.attractionBusinessType
        );
        formData.append("attractionType", payload.attractionType);
        formData.append("attractionRegNum", payload.attractionRegNum);
        formData.append("attractionRegDate", payload.attractionRegDate);
        formData.append("attractionPhone", payload.attractionPhone);
        formData.append("attractionEmail", payload.attractionEmail);

        // Professional Details Fields
        formData.append(
          "attractionBusinessTagline",
          payload.attractionBusinessTagline
        );
        formData.append(
          "attractionBusinessDescription",
          payload.attractionBusinessDescription
        );

        // Business Logo
        if (payload.businessLogo) {
          formData.append("businessLogo", {
            uri: payload.businessLogo,
            type: "image/jpeg",
            name: "attractionBusinessLogo.jpg",
          });
        }

        // Policies
        formData.append(
          "attractionBookingCondition",
          payload.attractionBookingCondition
        );
        formData.append(
          "attractionCancelationPolicy",
          payload.attractionCancelationPolicy
        );

        // Business Registration and Policy Docs
        payload.attractionDocs?.forEach((doc, index) => {
          formData.append("attractionDocs", {
            uri: doc.uri,
            type: doc.type || "application/pdf",
            name: doc.name || `document_${index}.pdf`,
          });
        });

        // if (isUpdateProviderAttraction) {
        //   formData.append('id', providerAttractionId?.id);
        // }

        finalPayload = formData;
      }

      if (
        isAttractionListingCreate ||
        isAttractionActiveListingCreate ||
        isUpdateProviderAttractionListing
      ) {
        // const providerAttractionId = watch('selectedActiveListingAttraction');
        // const providerAttractionBusinessId = watch(
        //   selectedActiveListingBusinessAttraction
        // );

        const formData = new FormData();
        const toBoolean = (value) => {
          if (typeof value === "boolean") return value;
          if (typeof value === "string") return value === "true";
          return Boolean(value);
        };
        const appendIfDefined = (key, value) => {
          if (value !== undefined) {
            formData.append(key, toBoolean(value));
          }
        };
        // Validate required fields
        // if (
        //   !payload.attractionDestinationType ||
        //   !payload.attractionDescription
        // ) {
        //   throw new Error("Destination type and description are required");
        // }

        // Basic Information
        if (payload.attractionDestinationType) {
          formData.append(
            "attractionDestinationType",
            payload.attractionDestinationType
          );
        }
        if (payload.attractionDescription) {
          formData.append(
            "attractionDescription",
            payload.attractionDescription
          );
        }

        // Location Details
        if (payload.attractionAddress) {
          formData.append("attractionAddress", payload.attractionAddress);
        }
        if (payload.attractionCity) {
          formData.append("attractionCity", payload.attractionCity);
        }
        if (payload.attractionPostalCode) {
          formData.append("attractionPostalCode", payload.attractionPostalCode);
        }
        if (payload.attractionDistrict) {
          formData.append("attractionDistrict", payload.attractionDistrict);
        }
        if (payload.attractionCountry) {
          formData.append("attractionCountry", payload.attractionCountry);
        }

        // Append attraction images (max 5 as per your UI)
        if (payload.attractionImages && payload.attractionImages.length > 0) {
          payload.attractionImages.slice(0, 5).forEach((img, index) => {
            formData.append("attractionImages", {
              uri: img.uri || img,
              type: "image/jpeg",
              name: `attraction_${index}.jpg`,
            });
          });
        }

        // Services Offered
        if (payload.attractionServicesOffered) {
          formData.append(
            "attractionServicesOffered",
            payload.attractionServicesOffered
          );
        }

        // formData.append("currency", payload.currency || "");
        appendIfDefined("attractionFreeWifi", payload.attractionFreeWifi);
        appendIfDefined("attractionFreeParking", payload.attractionFreeParking);
        appendIfDefined("attractionKitchen", payload.attractionKitchen);
        appendIfDefined("attractionTv", payload.attractionTv);
        appendIfDefined(
          "attractionAirConditioning",
          payload.attractionAirConditioning
        );
        appendIfDefined("attractionPool", payload.attractionPool);

        // // Pricing & Rating
        // formData.append(
        //   "attractionRating",
        //   parseFloat(payload.attractionRating)
        // );
        // formData.append(
        //   "attractionAdultPrice",
        //   parseFloat(payload.attractionAdultPrice)
        // );
        // formData.append(
        //   "attractionChildPrice",
        //   parseFloat(payload.attractionChildPrice)
        // );
        // formData.append("category", payload.category);
        // formData.append("discount", parseFloat(payload.discount));
        // formData.append("vat", parseFloat(payload.vat));

        // formData.append("schedules", JSON.stringify(attractionSchedule));

        if (payload.currency && payload.currency !== "default") {
          formData.append("currency", payload.currency);
        }

        // Pricing & Rating
        if (
          payload.attractionRating !== undefined &&
          payload.attractionRating !== null
        ) {
          formData.append(
            "attractionRating",
            parseFloat(payload.attractionRating)
          );
        }

        if (
          payload.attractionAdultPrice !== undefined &&
          payload.attractionAdultPrice !== null
        ) {
          formData.append(
            "attractionAdultPrice",
            parseFloat(payload.attractionAdultPrice)
          );
        }

        if (
          payload.attractionChildPrice !== undefined &&
          payload.attractionChildPrice !== null
        ) {
          formData.append(
            "attractionChildPrice",
            parseFloat(payload.attractionChildPrice)
          );
        }

        if (payload.category) {
          formData.append("category", payload.category);
        }

        if (payload.discount !== undefined && payload.discount !== null) {
          formData.append("discount", parseFloat(payload.discount));
        }

        if (payload.vat !== undefined && payload.vat !== null) {
          formData.append("vat", parseFloat(payload.vat));
        }

        // Schedules
        if (attractionSchedule && attractionSchedule.length > 0) {
          formData.append("schedules", JSON.stringify(attractionSchedule));
        }

        finalPayload = formData;
      }

      if (isCreateBookingHotel) {
        const {
          selectedRoom,
          rooms,
          adults,
          children,
          bookedToDate,
          bookedFromDate,
        } = getValues();
        // finalPayload.hotelId = item.id;
        finalPayload.convertedPrice = selectedRoom?.convertedPrice;
        finalPayload.displayCurrency = selectedRoom?.displayCurrency;
        finalPayload.discountedPrice = selectedRoom?.discount;
        finalPayload.rooms = rooms;
        finalPayload.adults = adults;
        finalPayload.children = children || 0;
        finalPayload.bookedToDate = bookedToDate;
        finalPayload.bookedFromDate = bookedFromDate;
      }

      if (isCreateBookingSecurity) {
        const {
          number_of_security,
          securityBookedFromDate,
          securityBookedToDate,
          selectedSecurity,
        } = getValues();
        finalPayload.convertedPrice = selectedSecurity?.convertedPrice;
        finalPayload.displayCurrency = selectedSecurity?.displayCurrency;
        finalPayload.discountedPrice = selectedSecurity?.discountedPrice;
        finalPayload.number_of_security = number_of_security;
        finalPayload.securityBookedFromDate = securityBookedFromDate;
        finalPayload.securityBookedToDate = securityBookedToDate;
      }

      if (isCreateBookingAttraction) {
        const {
          attractionChildren,
          attractionAdults,
          attractionDate, // This is a string in "YYYY-MM-DD" format
          attractionTime, // This is the slot ID (string)
          selectedAttraction, // This contains the attraction data
        } = getValues();

        // Find the time slot details from the selected attraction
        let fromTime = "";

        // Search for the time slot in the attraction schedule
        if (selectedAttraction && selectedAttraction.attractionSchedule) {
          for (const schedule of selectedAttraction.attractionSchedule) {
            const slot = schedule.slots.find((s) => s.id === attractionTime);
            if (slot) {
              fromTime = slot.from; // Get the from time (e.g., "11:30:00")
              break;
            }
          }
        }

        // Get the day name from the date (e.g., "SUNDAY")
        const dayName = moment(attractionDate).format("dddd");

        // Prepare the payload according to backend expectations
        finalPayload.convertedAdultPrice =
          selectedAttraction?.convertedAdultPrice;
        finalPayload.convertedChildPrice =
          selectedAttraction?.convertedChildPrice;
        finalPayload.displayCurrency = selectedAttraction?.displayCurrency;
        finalPayload.discountedPrice = selectedAttraction?.discountedPrice;
        finalPayload.adults = attractionAdults || 0;
        finalPayload.children = attractionChildren || 0;
        finalPayload.date = attractionDate; // "2025-09-14" format
        finalPayload.day = dayName; // "SUNDAY" format
        finalPayload.from = fromTime; // "11:30:00" format
      }

      if (isCreateBookingCar) {
        const { carBookedFromDate, carBookedToDate, promo_code, selectedCar } =
          getValues();
        finalPayload.convertedPrice = selectedCar?.convertedPrice;
        finalPayload.displayCurrency = selectedCar?.displayCurrency;
        finalPayload.discountedPrice = selectedCar?.discountedPrice;
        finalPayload.carBookedFromDate = carBookedFromDate;
        finalPayload.carBookedToDate = carBookedToDate;
        finalPayload.promo_code = promo_code;
        console.log(
          "LINE AT 1322",
          selectedCar?.convertedPrice,
          selectedCar?.displayCurrency
        );
      }

      console.log("LINE AT 112", finalPayload, "LINE AT 112 Payload", payload);
      let res;
      if (submission) {
        // If submission is passed, call it
        if (isCreateBookingHotel) {
          res = await submission({
            hotelId: item?.id,
            finalPayload,
          }).unwrap();
          console.log("Submission Success Result:", res);
          // const fcmToken = await messaging().getToken();

          // const response = await sendNotification({
          //   id: profileData?.data?.id, // your ride/user id
          //   fcmToken: fcmToken,
          //   title: 'Ride Confirmed 🚖',
          //   // message: 'Your ride has been confirmed successfully!',
          //   // userId: profileData?.data?.id,
          //   body: 'Your ride has been confirmed successfully!',
          // }).unwrap();

          // console.log('✅ Notification sent:', response);
        } else if (isCreateBookingSecurity) {
          res = await submission({
            securityId: itemSecurity?.id,
            finalPayload,
          }).unwrap();
          // console.log('Submission Success Result:', res);
        } else if (isCreateBookingAttraction) {
          res = await submission({
            attractionId: itemAttraction?.id,
            finalPayload,
          }).unwrap();
          // console.log('Submission Success Result:', res);
        } else if (isCreateBookingCar) {
          const itemData = {
            carId: itemCar?.id,
            finalPayload,
          };
          // console.log('LINE AT 602', itemData);

          res = await submission(itemData).unwrap();
          // console.log('Submission Success Result:', res);
        } else if (isHotelRoomCreate) {
          const currentServiceId = serviceId || getValues("serviceId");

          const itemData = {
            id: currentServiceId,
            finalPayload,
          };
          // console.log('LINE AT 602', itemData);

          res = await submission(itemData).unwrap();
          // console.log('Submission Success Result:', res);
        } else if (isHotelRoomCreateListing) {
          const currentServiceId =
            getValues("selectedActiveListing") || selectedActiveListing;

          const itemData = {
            id: currentServiceId?.id,
            finalPayload,
          };
          // console.log('LINE AT 602', itemData);

          res = await submission(itemData).unwrap();
          // console.log('Submission Success Result:', res);
        } else if (isUpdateProviderHotelRoom) {
          const currentServiceId = getValues("selectedActiveListingRoom");

          const itemData = {
            id: currentServiceId?.id,
            finalPayload,
          };
          console.log("LINE AT 602", itemData);

          res = await submission(itemData).unwrap();
        } else if (isSecurityProfileCreate || isSecurityProfileUpdate) {
          const currentServiceId = isSecurityProfileCreate
            ? serviceId ||
              getValues("serviceId") ||
              selectedActiveListingSecurity?.id
            : selectedActiveListingSecurityGuard?.id;

          const itemData = {
            id: currentServiceId,
            finalPayload,
          };
          console.log("Security Update itemData:", itemData);

          res = await submission(itemData).unwrap();
          // console.log('Submission Success Result:', res);
        } else if (isCarListingCreate) {
          const currentServiceId = serviceId || getValues("serviceId");

          const itemData = {
            id: currentServiceId,
            finalPayload,
          };
          // console.log('LINE AT 602', itemData);

          res = await submission(itemData).unwrap();
          // console.log('Submission Success Result:', res);
        } else if (isCarActiveListingCreate) {
          const currentServiceId =
            selectedActiveBusinessCar?.id ||
            getValues("selectedActiveBusinessCar")?.id;

          const itemData = {
            id: currentServiceId,
            finalPayload,
          };
          // console.log('LINE AT 602', itemData);

          res = await submission(itemData).unwrap();
          // console.log('Submission Success Result:', res);
        } else if (isUpdateProviderCar) {
          const currentServiceId =
            selectedActiveBusinessCar?.id ||
            getValues("selectedActiveBusinessCar")?.id;

          const itemData = {
            id: currentServiceId,
            finalPayload,
          };
          // console.log('LINE AT 602', itemData);

          res = await submission(itemData).unwrap();
          // console.log('Submission Success Result:', res);
        } else if (isUpdateProviderListing) {
          const currentServiceId =
            selectedActiveListingCar?.id ||
            getValues("selectedActiveListingCar")?.id;

          const itemData = {
            id: currentServiceId,
            finalPayload,
          };
          // console.log('LINE AT 602', itemData);

          res = await submission(itemData).unwrap();
          // console.log('Submission Success Result:', res);
        } else if (isAttractionListingCreate) {
          const currentServiceId = serviceId || getValues("serviceId");

          const itemData = {
            id: currentServiceId,
            finalPayload,
          };
          // console.log('LINE AT 602', itemData);

          res = await submission(itemData).unwrap();
          // console.log('Submission Success Result:', res);
        } else if (isUpdateProviderAttraction) {
          const currentServiceId = getValues("selectedActiveListingAttraction");

          const itemData = {
            id: currentServiceId?.id,
            finalPayload,
          };
          // console.log('LINE AT 602', itemData);

          res = await submission(itemData).unwrap();
          // console.log('Submission Success Result:', res);
        } else if (isAttractionActiveListingCreate) {
          const currentServiceId = getValues("selectedActiveListingAttraction");

          const itemData = {
            id: currentServiceId?.id,
            finalPayload,
          };
          // console.log('LINE AT 602', itemData);

          res = await submission(itemData).unwrap();
          // console.log('Submission Success Result:', res);
        } else if (isUpdateProviderAttractionListing) {
          const currentServiceId = getValues(
            "selectedActiveListingAttractionAppeal"
          );

          const itemData = {
            id: currentServiceId?.id,
            finalPayload,
          };
          // console.log('LINE AT 602', itemData);

          res = await submission(itemData).unwrap();
          // console.log('Submission Success Result:', res);
        } else {
          // console.log('Final Payload before submission:', finalPayload);

          res = await submission(finalPayload).unwrap();
          // console.log('Submission Success Result:', res);
        }
        // console.log('Submission Success finalPayload:', finalPayload);
        if (
          (isUpdateProviderHotel ||
            isHotelCreate ||
            isSecurityCreate ||
            isUpdateProviderSecurity ||
            isCarCreate ||
            isUpdateProviderCar ||
            isAttractionCreate ||
            isUpdateProviderAttraction ||
            isUpdateProviderHotelRoom ||
            isHotelRoomCreateListing ||
            isSecurityProfileCreate ||
            isSecurityProfileUpdate ||
            isCarActiveListingCreate ||
            isAttractionActiveListingCreate ||
            isUpdateProviderAttractionListing ||
            isUpdateProviderListing) &&
          res?.success
        ) {
          onComplete();
          setValue("attractionSchedule", null);
          if (
            isHotelCreate ||
            isSecurityCreate ||
            isAttractionCreate ||
            isCarCreate
          ) {
            setValue("serviceId", res?.data?.id);
          }
        }
      } else {
        console.log("No submission handler provided");
      }
      // Then handle navigation based on `path`
      if (typeof path === "string") {
        if (isLogin || isProviderLogin) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: path, params: { formData: finalPayload } }],
            })
          );
          // navigation.navigate(path, { formData: finalPayload });
        } else {
          if (
            isCreateBookingHotel ||
            isCreateBookingSecurity ||
            isCreateBookingAttraction ||
            isCreateBookingCar
          ) {
            navigation.navigate(path, {
              bookingResponse: res,
              bookingType: isCreateBookingHotel
                ? "hotel"
                : isCreateBookingSecurity
                  ? "security"
                  : isCreateBookingAttraction
                    ? "attraction"
                    : "car",
            });
          } else {
            navigation.navigate(path, { formData: finalPayload });
          }
        }
      } else if (typeof path === "object" && path !== null) {
        navigation.navigate(path.name, {
          screen: path.screen,
          params: { formData: finalPayload },
        });
      } else {
        // Default fallback navigation (optional)
        // navigation.navigate('Login');
        console.log("log");
      }
    } catch (error) {
      console.log("Submission Error:", error);

      // Optionally, handle error UI here
      if (
        error?.data?.errorMessages &&
        Array.isArray(error.data.errorMessages)
      ) {
        error.data.errorMessages.forEach(({ paths, message }) => {
          const field = paths || "root"; // use 'root' if no specific field
          setError(field, {
            type: "server",
            message,
          });
        });
      } else {
        setError("root", {
          error,
        });
      }
    } finally {
      setLoading(false); // ✅ done loading
    }
  };
  // console.log('LINE AT 353', loading);

  return (
    <Pressable
      onPress={() => {
        // const invalidFields = ids.filter(id => !!errors[id] || !watch(id));

        // if (isDisabled || loading) {
        //   console.log('Form validation failed for:', invalidFields);
        // } else {
        //   // setError('root', undefined); // ✅ IMPORTANT
        //   clearErrors();

        //   handleSubmit(onSubmit)();
        // }
        if (!(isDisabled || loading)) {
          clearErrors();
          handleSubmit(onSubmit)();
        }
      }}
      className={`rounded-lg p-3 ${baseStyle} flex-row items-center justify-center gap-2 ${
        isDisabled || loading ? "opacity-50" : "opacity-100" // Also update opacity for visual feedback
      }`}
    >
      <ThemedText2 styles="text-center font-SemiBold text-lg">
        {title}
      </ThemedText2>
      {/* {!noicon && <MaterialIcons name="check-circle" size={24} color={icon} />} */}
    </Pressable>
  );
};

export default Button;
