/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Platform,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { SafeAreaView } from "react-native-safe-area-context";

const SalesChart = ({ allStatics, isLoading, isError }) => {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  // console.log("LINE AT 23", allStatics, isLoading, isError);

  const chartBackground = isDark ? "#18181B" : "#FFFFFF";
  const textPrimary = isDark ? "#F3F4F6" : "#333333";
  const textSecondary = isDark ? "#9CA3AF" : "#6B7280";
  const axisColor = isDark ? "#3F3F46" : "#E5E7EB";
  const ruleColor = isDark ? "#3F3F46" : "#E5E7EB";


  const monthShortMap = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec",
  };

  // Ensure safe array
  const paymentMonths = allStatics?.data?.paymentMonthsData ?? [];

  const chartData = paymentMonths.map((item) => ({
    value: item?.serviceEarnings ?? 0,
    label: monthShortMap[item?.month] ?? "",
  }));

  // Compute max value safely
  const maxEarning = Math.max(...chartData.map((d) => d.value), 0);

  // Round max (fallback to 100 if all values are 0)
  const roundedMax = maxEarning > 0 ? Math.ceil(maxEarning / 10) * 10 : 100;

  // Step value (avoid NaN)
  const stepValue = roundedMax / 5 || 20;

  // Loading / Error UI
  if (isLoading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: chartBackground }]}
      >
        <Text style={{ color: textPrimary, padding: 20 }}>
          Loading sales data…
        </Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: chartBackground }]}
      >
        <Text style={{ color: "red", padding: 20 }}>
          Failed to load sales data.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: chartBackground }]}
    >
      <View
        style={[
          styles.chartContainer,
          {
            backgroundColor: chartBackground,
            shadowColor:
              Platform.OS === "ios"
                ? isDark
                  ? "#ffff33"
                  : "#000"
                : isDark
                  ? "#ffff33"
                  : "#000",
            shadowOpacity: isDark ? 0.08 : 0.1,
            borderColor: isDark ? "#27272A" : "transparent",
          },
        ]}
      >
        <Text style={[styles.title, { color: textPrimary }]}>Total Sales</Text>
        <Text style={[styles.amount, { color: textPrimary }]}>
          {allStatics?.data?.currency} {allStatics?.data?.serviceEarnings ?? 0}
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <BarChart
            data={chartData}
            width={responsiveWidth(100) * 1.5}
            height={responsiveHeight(30)}
            barWidth={responsiveWidth(4)}
            spacing={responsiveWidth(4)}
            roundedTop={4}
            roundedBottom={0}
            xAxisThickness={1}
            xAxisColor={axisColor}
            yAxisThickness={0}
            yAxisTextStyle={{ color: textSecondary, fontSize: 12 }}
            xAxisLabelTextStyle={{ color: textSecondary, fontSize: 12 }}
            minValue={0} // Always start from 0
            maxValue={roundedMax}
            noOfSections={5}
            stepValue={stepValue}
            hideRules={false}
            rulesColor={ruleColor}
            rulesType={"solid"}
            initialSpacing={20}
            endSpacing={20}
            frontColor={"#4F46E5"}
            showValuesOnTopOfBars={false}
            showYAxisIndices={false}
            showXAxisIndices={false}
            backgroundColor={chartBackground}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
  },
  chartContainer: {
    borderRadius: 12,
    padding: 20,
    // margin: 16,
    elevation: 5, // Android shadow
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    borderWidth: 1, // to simulate glow on dark mode
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  amount: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
});

export default SalesChart;
