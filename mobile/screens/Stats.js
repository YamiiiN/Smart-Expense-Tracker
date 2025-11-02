import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import styles from '../styles/statsStyles';

export default function Stats() {
  // Bar Chart Data
  const barData = [
    { value: 2500, label: 'Jan', frontColor: '#64D2B0' },
    { value: 2300, label: 'Feb', frontColor: '#64D2B0' },
    { value: 3200, label: 'Mar', frontColor: '#64D2B0' },
    { value: 1200, label: 'Apr', frontColor: '#64D2B0' },
  ];

  // Pie Chart Data (Donut style)
  const pieData = [
    { 
      value: 850, 
      color: '#2FAF7B',
      text: '850',
    },
    { 
      value: 350, 
      color: '#3BA7E6',
      text: '350',
    },
    { 
      value: 465, 
      color: '#FFB703',
      text: '465',
    },
  ];

  // Horizontal Bar Data
  const horizontalBarData = [
    { value: 450, label: 'Groceries', frontColor: '#64D2B0' },
    { value: 320, label: 'Utilities', frontColor: '#3BA7E6' },
    { value: 600, label: 'Shopping', frontColor: '#2FAF7B' },
    { value: 280, label: 'Dining', frontColor: '#FFB703' },
  ];

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

        {/* Bar Chart Section */}
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
              maxValue={3500}
              isAnimated
              animationDuration={800}
              barBorderRadius={8}
              yAxisLabelWidth={35}
            />
          </View>
        </View>

        {/* Charts Row */}
        <View style={styles.chartsRow}>
          {/* Pie Chart (Donut) */}
          <View style={styles.smallChartContainer}>
            <Text style={styles.chartTitle}>Expenses</Text>
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
                      <Text style={styles.centerLabelText}>1665</Text>
                      <Text style={styles.centerLabelSubtext}>Total</Text>
                    </View>
                  );
                }}
              />
            </View>
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#2FAF7B' }]} />
                <Text style={styles.legendText}>Food</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#3BA7E6' }]} />
                <Text style={styles.legendText}>Transport</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#FFB703' }]} />
                <Text style={styles.legendText}>Entertainment</Text>
              </View>
            </View>
          </View>

          {/* Horizontal Bar Chart */}
          <View style={styles.smallChartContainer}>
            <Text style={styles.chartTitle}>Top Spending</Text>
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
                maxValue={600}
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
        </View>
      </ScrollView>
    </View>
  );
}