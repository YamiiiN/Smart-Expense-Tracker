import React from 'react';
import { View, Text, ScrollView, ActivityIndicator} from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import styles from '../styles/statsStyles';
import { API } from '../services/api';
import { useState, useEffect } from 'react';

export default function Stats() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState([]);
  const [categoryPercentages, setCategoryPercentages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMonthlyExpenses = async () => {
    try {
      const response = await API.get('/stats/monthly-expenses');
      setMonthlyData(response.data.data);
    } catch (error) {
      console.error('Error fetching monthly expenses:', error);
    }
  };

  const fetchCategoryTotals = async () => {
    try {
      const response = await API.get('/stats/category-totals');
      setCategoryTotals(response.data.data);
    } catch (error) {
      console.error('Error fetching category totals:', error);
    }
  };

  const fetchCategoryPercentages = async () => {
    try {
      const response = await API.get('/stats/category-percentage');
      setCategoryPercentages(response.data.data);
    } catch (error) {
      console.error('Error fetching category percentages:', error);
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
    fetchData();
  }, []);

  // Prepare data for charts
  const barData = monthlyData.map(item => ({
    value: item.total,
    label: item.month,
    frontColor: '#64D2B0',
  }));

  const horizontalBarData = categoryTotals.map(item => ({
    value: item.total,
    label: item.category,
    frontColor: '#64D2B0',
  }));

  const pieData = categoryPercentages.map(item => ({
    value: item.amount,
    color: '#2FAF7B', // You can customize colors based on categories
    text: item.category,
  }));

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
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Current Balance</Text>
            <Text style={styles.summaryValue}>2500</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Expenses</Text>
            <Text style={styles.summaryValue}>1765</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Month</Text>
            <Text style={styles.summaryValue}>May 2025</Text>
          </View>
        </View>

        {/* Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="#2FAF7B" />
        ) : (
          <>
            {/* Monthly Overview Bar Chart */}
            <View style={styles.chartSection}>
              <Text style={styles.chartTitle}>Monthly Overview</Text>
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
                  maxValue={Math.max(...barData.map(item => item.value)) + 1000} // Adjust max value
                  isAnimated
                  animationDuration={800}
                  barBorderRadius={8}
                  yAxisLabelWidth={35}
                />
              </View>
            </View>

            {/* Pie Chart for Category Percentages */}
            <View style={styles.smallChartContainer}>
              <Text style={styles.chartTitle}>Expenses by Category</Text>
              <View style={styles.pieChartWrapper}>
                <PieChart
                  data={pieData}
                  donut
                  radius={70}
                  innerRadius={45}
                  innerCircleColor="#FFFFFF"
                  centerLabelComponent={() => {
                    return (
                      <View style={styles.centerLabel}>
                        <Text style={styles.centerLabelText}>
                          {categoryPercentages.reduce((acc, item) => acc + item.amount, 0)}
                        </Text>
                        <Text style={styles.centerLabelSubtext}>Total</Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>

            {/* Horizontal Bar Chart for Category Totals */}
            <View style={styles.smallChartContainer}>
              <Text style={styles.chartTitle}>Top Spending Categories</Text>
              <View style={styles.horizontalChartWrapper}>
                <BarChart
                  data={horizontalBarData}
                  width={130}
                  height={140}
                  barWidth={18}
                  spacing={12}
                  horizontal
                  roundedTop
                  roundedBottom
                  hideRules
                  xAxisThickness={0}
                  yAxisThickness={0}
                  hideYAxisText
                  noOfSections={3}
                  maxValue={Math.max(...horizontalBarData.map(item => item.value)) + 100} // Adjust max value
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
      </ScrollView >
    </View >
  );
}