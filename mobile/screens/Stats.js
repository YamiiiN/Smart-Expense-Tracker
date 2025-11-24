import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import styles from '../styles/statsStyles';
import { API } from '../services/api';

export default function Stats() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState([]);
  const [categoryPercentages, setCategoryPercentages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthLabel, setMonthLabel] = useState("");

  const fetchMonthlyExpenses = async () => {
    try {
      const response = await API.get('/stats/monthly-expenses');
      setMonthlyData(response.data.data || []);
    } catch (error) {
      console.error('Error fetching monthly expenses:', error);
      setMonthlyData([]);
    }
  };

  const fetchCategoryTotals = async () => {
    try {
      const response = await API.get('/stats/category-totals');
      setCategoryTotals(response.data.data || []);
    } catch (error) {
      console.error('Error fetching category totals:', error);
      setCategoryTotals([]);
    }
  };

  const fetchCategoryPercentages = async () => {
    try {
      const response = await API.get('/stats/category-percentage');
      setCategoryPercentages(response.data.data || []);
    } catch (error) {
      console.error('Error fetching category percentages:', error);
      setCategoryPercentages([]);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([
      fetchMonthlyExpenses(),
      fetchCategoryTotals(),
      fetchCategoryPercentages(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    const now = new Date();
    const formattedMonth = now.toLocaleString("default", { month: "short" });
    const formattedYear = now.getFullYear();
    setMonthLabel(`${formattedMonth} ${formattedYear}`);
    fetchData();
  }, []);

  // Prepare data for charts safely
  const barData = monthlyData.map(item => ({
    value: item.total,
    label: item.month,
    frontColor: '#76ab80ff',
  }));

  const horizontalBarData = categoryTotals.map(item => ({
    value: item.total,
    label: item.category,
    frontColor: '#6490d2ff',
  }));

  const pieData = categoryPercentages.map((item, index) => {
  const colors = ["#6EC6FF", "#A5D6A7", "#FFCC80", "#F48FB1", "#CE93D8", "#FFE082"];
  return {
    value: item.amount,
    color: colors[index % colors.length],
    text: item.category,
  };
});

  const totalCategoryAmount =
    categoryPercentages.length > 0
      ? categoryPercentages.reduce((acc, item) => acc + item.amount, 0)
      : 0;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Statistics</Text>
        </View>

       {/* Summary Card */}
<View style={styles.summaryCard}>
  {/* Top Category */}
  <View style={styles.summaryItem}>
  <Text style={styles.summaryLabel}>Top Category</Text>
  <Text style={styles.summaryValue}>
    {categoryTotals.length > 0
      ? categoryTotals
          .reduce((prev, current) =>
            current.total > prev.total ? current : prev
          )
          .category.toUpperCase()
      : "NO DATA"}
  </Text>
</View>


  <View style={styles.summaryDivider} />

  {/* Total Expenses */}
  <View style={styles.summaryItem}>
    <Text style={styles.summaryLabel}>Total Expenses</Text>
    <Text style={styles.summaryValue}>₱{totalCategoryAmount}</Text>
  </View>

  <View style={styles.summaryDivider} />

  {/* Month */}
  <View style={styles.summaryItem}>
    <Text style={styles.summaryLabel}>Month</Text>
    <Text style={styles.summaryValue}>{monthLabel}</Text>
  </View>
</View>

        {/* Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="#2FAF7B" />
        ) : (
          <>
            {/* Monthly Overview Bar Chart */}
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Monthly Overview</Text>
              {barData.length > 0 ? (
                <View style={styles.chartContainer}>
                  <BarChart
                    data={barData}
                    width={280}
                    height={200}
                    barWidth={50}
                    spacing={24}
                    roundedTop
                    roundedBottom
                    hideRules
                    xAxisThickness={0}
                    yAxisThickness={0}
                    yAxisTextStyle={{ color: '#6B7A78', fontSize: 10 }}
                    noOfSections={4}
                    maxValue={Math.max(...barData.map(item => item.value)) + 1000}
                    isAnimated
                    animationDuration={800}
                    barBorderRadius={8}
                    yAxisLabelWidth={35}
                  />
                </View>
              ) : (
                <Text style={styles.noDataText}>No monthly data available</Text>
              )}
            </View>

            {/* Pie Chart */}
<View style={styles.chartCard}>
  <Text style={styles.chartTitle}>Expenses by Category</Text>
  {pieData.length > 0 ? (
    <View style={styles.pieChartWrapper}>
      <PieChart
        data={pieData}
        donut
        radius={70}
        innerRadius={45}
        innerCircleColor="#FFFFFF"
        centerLabelComponent={() => (
          <View style={styles.centerLabel}>
            <Text style={styles.centerLabelText}>
              ₱{totalCategoryAmount.toLocaleString()}
            </Text>
            <Text style={styles.centerLabelSubtext}>Total</Text>
          </View>
        )}
      />

      {/* ✅ Legend below the PieChart */}
      <View style={styles.legendContainer}>
        {pieData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[styles.legendColorBox, { backgroundColor: item.color }]}
            />
            <Text style={styles.legendText}>
              {item.text}: ₱{item.value.toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  ) : (
    <Text style={styles.noDataText}>No category data available</Text>
  )}
</View>

            {/* Horizontal Bar Chart */}
            <View style={styles.chartCard}>
  <Text style={styles.chartTitle}>Top Spending Categories</Text>

  <View style={styles.horizontalChartWrapper}>
    <BarChart
  data={horizontalBarData}
  width={180}
  height={160}
  barWidth={25}        // ✅ slightly thicker bars for clarity
  spacing={35}         // ✅ moderate space between bars
  horizontal
  roundedTop
  roundedBottom
  hideRules
  xAxisThickness={0}
  yAxisThickness={0}
  hideYAxisText={false}
  yAxisLabelWidth={80}
  yAxisTextStyle={{
    fontSize: 12,
    color: '#333',
    width: 80,
    textAlign: 'right',
  }}
  noOfSections={4}
  maxValue={Math.max(...horizontalBarData.map(item => item.value)) + 100}
  isAnimated
  animationDuration={800}
  barBorderRadius={10}
  showFractionalValues
/>

  </View>

  <View style={styles.horizontalLabelsContainer}>
    {horizontalBarData.map((item, index) => (
      <View key={index} style={styles.horizontalLabelRow}>
        <Text style={styles.horizontalLabel}>{item.label}</Text>
        <Text style={styles.horizontalValue}>₱{item.value}</Text>
      </View>
    ))}
  </View>
</View>

          </>
        )}
      </ScrollView>
    </View>
  );
}
