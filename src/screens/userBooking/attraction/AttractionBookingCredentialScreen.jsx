/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Calendar } from "react-native-calendars";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import ThemedText from "@/utils/ThemedText";
import useT from "@/utils/useT";
import { Controller, useFormContext } from "react-hook-form";
import CounterInput from "@/components/ControllerInput";
import CustomCounterInput from "@/components/CustomControllerInput";
import ThemedViewBlue from "@/utils/ThemedViewBlue";
import { useGetSingleUserQuery } from "@/redux/slices/authSlice";
import moment from "moment";
import Button from "@/components/Button";
import { useCreateBookingAttractionMutation } from "@/redux/slices/userSlice/attractionSlice";

export default function AttractionBookingCredentialScreen() {
  const {
    getValues,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [createBookingAttraction] = useCreateBookingAttractionMutation();

  const { selectedAttraction } = getValues();
  const navigation = useNavigation();
  const t = useT();

  console.log("====================================");
  console.log("LINE AT 49", selectedAttraction);
  console.log("====================================");

  const { data: profileData } = useGetSingleUserQuery({
    id: selectedAttraction?.partnerId,
  });

  // State for calendar modal and dates
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  // Function to generate dates for the next 2 weeks based on available days
  // const generateAvailableDates = (schedules) => {
  //   const availableDates = [];
  //   const markedDatesObj = {};
  //   const today = moment();

  //   // Generate dates for the next 14 days for horizontal scroll
  //   for (let i = 0; i < 14; i++) {
  //     const date = today.clone().add(i, "days");
  //     const dateString = date.format("YYYY-MM-DD");
  //     const dayName = date.format("dddd");

  //     // Check if this day is available according to the API
  //     const scheduleForDay = schedules.find((item) => item.day === dayName);

  //     if (scheduleForDay) {
  //       availableDates.push({
  //         date: date.toDate(),
  //         day: date.format("ddd"),
  //         dateFormatted: dateString,
  //         dayOfWeek: dayName,
  //         fullDate: date.format("MMMM D, YYYY"),
  //         slots: scheduleForDay.slots.map((slot) => ({
  //           id: slot.id,
  //           from: slot.from,
  //           to: slot.to,
  //           displayTime: formatTimeDisplay(slot.from, slot.to),
  //         })),
  //       });

  //       // Mark as available in calendar
  //       markedDatesObj[dateString] = {
  //         selected: false,
  //         disabled: false,
  //         selectedColor: "#3B82F6",
  //         selectedTextColor: "#FFFFFF",
  //         dotColor: "#10B981",
  //         marked: true,
  //       };
  //     } else {
  //       // Mark as unavailable in calendar
  //       markedDatesObj[dateString] = {
  //         disabled: true,
  //         disableTouchEvent: true,
  //       };
  //     }
  //   }

  //   // Also mark future dates beyond 14 days in calendar
  //   for (let i = 14; i < 365; i++) {
  //     // Mark for 1 year
  //     const date = today.clone().add(i, "days");
  //     const dateString = date.format("YYYY-MM-DD");
  //     const dayName = date.format("dddd").toUpperCase();

  //     const scheduleForDay = schedules.find((item) => item.day === dayName);

  //     if (scheduleForDay && !markedDatesObj[dateString]) {
  //       markedDatesObj[dateString] = {
  //         selected: false,
  //         disabled: false,
  //         dotColor: "#10B981",
  //         marked: true,
  //       };
  //     }
  //   }

  //   setMarkedDates(markedDatesObj);
  //   return availableDates;
  // };

  const generateAvailableDates = (schedules) => {
    const availableDates = [];
    const markedDatesObj = {};
    const today = moment();

    for (let i = 0; i < 14; i++) {
      const date = today.clone().add(i, "days");
      const dateString = date.format("YYYY-MM-DD");
      const dayName = date.format("dddd"); // e.g., "Sunday"
      const dayNameUpper = dayName.toUpperCase(); // e.g., "SUNDAY"

      // Check schedule with both formats
      const scheduleForDay = schedules.find(
        (item) =>
          item.day === dayNameUpper ||
          item.day === dayName ||
          item.day.toLowerCase() === dayName.toLowerCase()
      );

      if (scheduleForDay) {
        availableDates.push({
          date: date.toDate(),
          day: date.format("ddd"),
          dateFormatted: dateString,
          dayOfWeek: dayName,
          fullDate: date.format("MMMM D, YYYY"),
          slots: scheduleForDay.slots.map((slot) => ({
            id: slot.id,
            from: slot.from,
            to: slot.to,
            displayTime: formatTimeDisplay(slot.from, slot.to),
          })),
        });

        // Mark as available
        markedDatesObj[dateString] = {
          selected: false,
          disabled: false,
          selectedColor: "#3B82F6",
          selectedTextColor: "#FFFFFF",
          dotColor: "#10B981",
          marked: true,
        };
      } else {
        markedDatesObj[dateString] = {
          disabled: true,
          disableTouchEvent: true,
        };
      }
    }

    setMarkedDates(markedDatesObj);
    return availableDates;
  };

  // Format time display (e.g., "09:00 AM - 09:30 AM")
  const formatTimeDisplay = (fromTime, toTime) => {
    const formatTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(":");
      const hourInt = parseInt(hours, 10);
      const period = hourInt >= 12 ? "PM" : "AM";
      const displayHour = hourInt % 12 || 12;
      return `${displayHour}:${minutes} ${period}`;
    };

    return `${formatTime(fromTime)} - ${formatTime(toTime)}`;
  };

  // ✅ Generate available dates on mount
  useEffect(() => {
    if (selectedAttraction?.attractionSchedule) {
      const dates = generateAvailableDates(
        selectedAttraction?.attractionSchedule
      );
      setAvailableDates(dates);

      if (dates.length > 0) {
        setSelectedDate(dates[0]);
        setValue("attractionDate", dates[0].dateFormatted);
        setTimeSlots(dates[0].slots);

        if (dates[0].slots.length > 0) {
          setValue("attractionTime", dates[0].slots[0].id);
        }

        // Update marked dates with initial selection
        setMarkedDates((prev) => ({
          ...prev,
          [dates[0].dateFormatted]: {
            ...prev[dates[0].dateFormatted],
            selected: true,
            selectedColor: "#3B82F6",
          },
        }));
      }
    }
  }, [selectedAttraction]);

  // ✅ Update time slots when date changes
  useEffect(() => {
    if (!selectedDate) return;
    setTimeSlots(selectedDate.slots);
    if (selectedDate.slots.length > 0) {
      setValue("attractionTime", selectedDate.slots[0].id);
    } else {
      setValue("attractionTime", null);
    }
  }, [selectedDate]);

  // Handle calendar date selection
  // const handleCalendarDateSelect = (day) => {
  //   const selectedDateString = day.dateString;
  //   const selectedMoment = moment(selectedDateString);
  //   const dayName = selectedMoment.format("dddd").toUpperCase();

  //   // Check if the selected date is available
  //   const scheduleForDay = selectedAttraction?.attractionSchedule?.find(
  //     (item) => item.day === dayName
  //   );

  //   if (!scheduleForDay) {
  //     // Date not available
  //     return;
  //   }

  //   // Create date object for the selected date
  //   const newSelectedDate = {
  //     date: selectedMoment.toDate(),
  //     day: selectedMoment.format("ddd"),
  //     dateFormatted: selectedDateString,
  //     dayOfWeek: dayName,
  //     fullDate: selectedMoment.format("MMMM D, YYYY"),
  //     slots: scheduleForDay.slots.map((slot) => ({
  //       id: slot.id,
  //       from: slot.from,
  //       to: slot.to,
  //       displayTime: formatTimeDisplay(slot.from, slot.to),
  //     })),
  //   };

  //   setSelectedDate(newSelectedDate);
  //   setValue("attractionDate", selectedDateString);

  //   // Update marked dates
  //   setMarkedDates((prev) => {
  //     const newMarkedDates = { ...prev };

  //     // Remove previous selection
  //     Object.keys(newMarkedDates).forEach((date) => {
  //       if (newMarkedDates[date].selected) {
  //         newMarkedDates[date] = {
  //           ...newMarkedDates[date],
  //           selected: false,
  //         };
  //       }
  //     });

  //     // Add new selection
  //     newMarkedDates[selectedDateString] = {
  //       ...newMarkedDates[selectedDateString],
  //       selected: true,
  //       selectedColor: "#3B82F6",
  //     };

  //     return newMarkedDates;
  //   });

  //   setCalendarModalVisible(false);
  // };

  const handleCalendarDateSelect = (day) => {
    const selectedDateString = day.dateString;
    const selectedMoment = moment(selectedDateString);
    const dayName = selectedMoment.format("dddd"); // e.g., "Sunday"
    const dayNameUpper = dayName.toUpperCase(); // e.g., "SUNDAY"

    // Check schedule with case-insensitive comparison
    const scheduleForDay = selectedAttraction?.attractionSchedule?.find(
      (item) =>
        item.day.toUpperCase() === dayNameUpper ||
        item.day.toLowerCase() === dayName.toLowerCase()
    );

    if (!scheduleForDay) {
      console.log(
        "No schedule for day:",
        dayName,
        "Looking for:",
        dayNameUpper
      );
      return;
    }

    // Create date object...
    const newSelectedDate = {
      date: selectedMoment.toDate(),
      day: selectedMoment.format("ddd"),
      dateFormatted: selectedDateString,
      dayOfWeek: dayName,
      fullDate: selectedMoment.format("MMMM D, YYYY"),
      slots: scheduleForDay.slots.map((slot) => ({
        id: slot.id,
        from: slot.from,
        to: slot.to,
        displayTime: formatTimeDisplay(slot.from, slot.to),
      })),
    };

    // Rest of the function...
  };

  // Format date for display
  const formatDateDisplay = (date) => {
    return moment(date).format("MMM D");
  };

  // Get price information
  const adultPrice = selectedAttraction?.convertedAdultPrice || 0;
  const childPrice = selectedAttraction?.convertedChildPrice || 0;

  // Calculate total cost based on form values
  const adults = watch("attractionAdults") || 0;
  const children = watch("attractionChildren") || 0;
  const totalCost = adults * adultPrice + children * childPrice;

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(5),
        gap: responsiveHeight(3),
      }}
    >
      {/* Header */}
      <GoBack navigation={navigation} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View className=" mb-4">
          <Image
            source={{
              uri: selectedAttraction?.attractionImages[0],
            }}
            style={{
              width: responsiveWidth(88),
              height: responsiveHeight(35),
              resizeMode: "cover",
              borderRadius: 12,
            }}
          />
        </View>

        <Pressable
          onPress={() =>
            navigation.navigate("UserChat", {
              receiverId: selectedAttraction?.partnerId,
              receiverName:
                profileData?.data?.fullName || profileData?.data?.email,
            })
          }
          className="w-full mb-4"
        >
          <ThemedViewBlue styles="px-4 py-3 rounded-xl items-center">
            <Image source={require("@/../assets/images/chat.webp")} />
          </ThemedViewBlue>
        </Pressable>

        {/* Info */}
        <View className="pb-32">
          <ThemedText styles="text-2xl font-Bold mb-2">
            {selectedAttraction?.attractionDestinationType}
          </ThemedText>
          <Text className="text-gray-500 mb-3">
            {selectedAttraction?.attractionDescription}
          </Text>

          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center">
              {/* <FontAwesome name="star" size={16} color="#facc15" /> */}
              <Text className="ml-1 font-Medium text-sm text-yellow-600">
                {selectedAttraction?.attractionRating}
              </Text>
              <Text className="ml-1 text-sm text-gray-500 font-Regular">
                ({selectedAttraction?.attractionReviewCount}{" "}
                {t("attractionBooking.ratingLabel")})
              </Text>
            </View>
            <Text className="text-lg font-Bold text-gray-500 w-1/2">
              {t("attractionBooking.fromPrice")}{" "}
              {selectedAttraction?.displayCurrency}{" "}
              {selectedAttraction?.convertedAdultPrice}
            </Text>
          </View>
          <View className="flex-row items-center gap-1 w-2/3 mb-2">
            {/* <Ionicons name="location-outline" size={16} color="#facc15" /> */}
            <Text className="ml-1 font-Medium text-sm text-yellow-600">
              {selectedAttraction?.attractionAddress},{" "}
              {selectedAttraction?.attractionCity},{" "}
              {selectedAttraction?.attractionCountry}
            </Text>
          </View>
          {/* Selected Date Display */}
          {selectedDate && (
            <View className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-sm text-blue-800 font-Medium">
                    Selected Date & Time
                  </Text>
                  <Text className="text-lg text-blue-900 font-SemiBold">
                    {selectedDate.fullDate}
                  </Text>
                  {watch("attractionTime") && (
                    <Text className="text-sm text-blue-700 font-Medium">
                      {
                        timeSlots.find(
                          (slot) => slot.id === watch("attractionTime")
                        )?.displayTime
                      }
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => setCalendarModalVisible(true)}
                  className="flex-row items-center bg-white px-3 py-2 rounded-lg border border-blue-300"
                >
                  {/* <Ionicons name="calendar-outline" size={16} color="#3B82F6" /> */}
                  <Text className="ml-1 text-blue-600 text-sm font-Medium">
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 14-day horizontal scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            {availableDates.map((dateObj) => {
              const isSelected =
                selectedDate &&
                selectedDate.dateFormatted === dateObj.dateFormatted;

              return (
                <Pressable
                  key={dateObj.dateFormatted}
                  onPress={() => {
                    setSelectedDate(dateObj);
                    setValue("attractionDate", dateObj.dateFormatted);

                    // Update marked dates
                    setMarkedDates((prev) => {
                      const newMarkedDates = { ...prev };

                      // Remove previous selection
                      Object.keys(newMarkedDates).forEach((date) => {
                        if (newMarkedDates[date].selected) {
                          newMarkedDates[date] = {
                            ...newMarkedDates[date],
                            selected: false,
                          };
                        }
                      });

                      // Add new selection
                      newMarkedDates[dateObj.dateFormatted] = {
                        ...newMarkedDates[dateObj.dateFormatted],
                        selected: true,
                        selectedColor: "#3B82F6",
                      };

                      return newMarkedDates;
                    });
                  }}
                  className={`mr-3 rounded-lg border px-4 py-2 items-center min-w-16 ${
                    isSelected
                      ? "bg-blue-200 border-blue-600"
                      : "bg-zinc-200 border-zinc-400"
                  }`}
                >
                  <Text className="text-xs text-gray-500">{dateObj.day}</Text>
                  <Text
                    className={`text-base font-SemiBold ${
                      isSelected ? "text-blue-900" : "text-zinc-500"
                    }`}
                  >
                    {formatDateDisplay(dateObj.date)}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Time selection */}
          <ThemedText styles="text-base font-SemiBold mb-3">
            {t("attractionBooking.selectTime")}
          </ThemedText>

          <Controller
            control={control}
            name="attractionTime"
            render={({ field: { onChange, value } }) => (
              <View className="flex-row flex-wrap gap-2 mb-6">
                {timeSlots.map((slot) => {
                  const isSelected = value === slot.id;
                  return (
                    <Pressable
                      key={slot.id}
                      onPress={() => onChange(slot.id)}
                      className={`rounded-lg border px-3 py-2 items-center ${
                        isSelected
                          ? "bg-blue-200 border-blue-600"
                          : "bg-zinc-200 border-zinc-400"
                      }`}
                    >
                      <Text
                        className={`text-sm font-SemiBold text-center ${
                          isSelected ? "text-blue-900" : "text-zinc-500"
                        }`}
                      >
                        {slot.displayTime}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          />

          {/* Ticketing */}
          <View className="border border-gray-300 rounded-xl p-4 space-y-4">
            <View className="mb-2">
              <ThemedText styles="text-lg font-SemiBold mb-3">
                {t("attractionBooking.generalAdmission")}
              </ThemedText>

              <View className="flex-row items-center mt-1">
                {/* <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color="#666"
                /> */}
                {/* <Text className="ml-1 text-gray-500 text-sm">
                  {t('attractionBooking.nonRefundable')}
                </Text> */}
              </View>
            </View>
            {/* <Text>{adultPrice}</Text> */}
            {/* <CounterInput
              control={control}
              name="attractionAdults"
              label={t('attractionBooking.adults')}
              // price={adultPrice}
            /> */}
            <CustomCounterInput
              control={control}
              name="attractionAdults"
              label={t("attractionBooking.adults")}
              // price={adultPrice}
              min={1}
            />
            {/* <Text>{childPrice}</Text> */}

            <CounterInput
              control={control}
              name="attractionChildren"
              label={t("attractionBooking.children")}
              // price={childPrice}
            />

            {/* Total cost display */}
            <View className="flex-row justify-between items-center pt-4 border-t border-gray-200">
              <View>
                <ThemedText styles="text-base font-Medium">
                  {t("attractionBooking.totalCost")}
                </ThemedText>
                <Text className="text-xs text-gray-500 mt-1">
                  {t("attractionBooking.includesTaxes")}
                </Text>
              </View>
              <ThemedText styles="text-lg font-Bold ">
                {selectedAttraction?.displayCurrency} {totalCost.toFixed(2)}
              </ThemedText>
            </View>
          </View>
        </View>

        {errors && (
          <Text className="text-red-500">{errors?.root?.message}</Text>
        )}
      </ScrollView>

      {/* Calendar Modal */}
      <Modal
        visible={calendarModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className="flex-1 bg-white p-4">
          <View className="flex-row justify-between items-center mb-4">
            <ThemedText styles="text-xl font-Bold">Select Date</ThemedText>
            <TouchableOpacity
              onPress={() => setCalendarModalVisible(false)}
              className="p-2"
            >
              {/* <Ionicons name="close" size={24} color="#666" /> */}
            </TouchableOpacity>
          </View>

          <Calendar
            minDate={new Date().toISOString().split("T")[0]}
            maxDate={moment().add(1, "year").format("YYYY-MM-DD")}
            onDayPress={handleCalendarDateSelect}
            markedDates={markedDates}
            enableSwipeMonths={true}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#6B7280",
              selectedDayBackgroundColor: "#3B82F6",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#3B82F6",
              dayTextColor: "#1F2937",
              textDisabledColor: "#D1D5DB",
              dotColor: "#10B981",
              selectedDotColor: "#ffffff",
              arrowColor: "#3B82F6",
              monthTextColor: "#1F2937",
              indicatorColor: "#3B82F6",
            }}
          />

          <View className="mt-6 p-4 bg-blue-50 rounded-lg">
            <View className="flex-row items-center mb-2">
              <View className="w-3 h-3 bg-green-500 rounded-full mr-2" />
              <Text className="text-sm text-gray-700">Available dates</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-3 h-3 bg-gray-300 rounded-full mr-2" />
              <Text className="text-sm text-gray-700">Unavailable dates</Text>
            </View>
          </View>

          {/* Current Selection in Modal */}
          {selectedDate && (
            <View className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <Text className="text-sm text-green-800 font-Medium">
                Current Selection:
              </Text>
              <Text className="text-lg text-green-900 font-SemiBold">
                {selectedDate.fullDate}
              </Text>
              {watch("attractionTime") && (
                <Text className="text-sm text-green-700 font-Medium">
                  {
                    timeSlots.find(
                      (slot) => slot.id === watch("attractionTime")
                    )?.displayTime
                  }
                </Text>
              )}
            </View>
          )}
        </View>
      </Modal>

      {/* Bottom Button */}
      <ThemedView styles="absolute bottom-0 left-0 right-0  px-5 py-4 ">
        <Button
          title={t("attractionBooking.reserve")}
          navigation={navigation}
          path="Payment"
          ids={[
            "attractionDate",
            "attractionTime",
            "attractionAdults",
            // 'attractionChildren',
          ]}
          noicon={true}
          submission={createBookingAttraction}
          isCreateBookingAttraction={true}
        />
      </ThemedView>
    </ThemedView>
  );
}
