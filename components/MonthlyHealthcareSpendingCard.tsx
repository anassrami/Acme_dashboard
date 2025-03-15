import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

interface SpendingData {
  month: string;
  amount: number;
}

interface MonthlyHealthcareSpendingCardProps {
  data: SpendingData[];
  onExpandPress: () => void;
}

export const MonthlyHealthcareSpendingCard: React.FC<MonthlyHealthcareSpendingCardProps> = ({
  data,
  onExpandPress
}) => {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  
  // Find the maximum amount to scale the bars properly
  const maxAmount = Math.max(...data.map(item => item.amount));
  
  // Colors - matching with CoverageOverviewCard
  const usedColor = '#4285F4'; // Blue for bars
  const hoveredColor = '#FF6B4A'; // Orange for hovered state
  
  // Handle hover simulation with press in/out
  const handlePressIn = (month: string) => {
    setHoveredMonth(month);
  };
  
  const handlePressOut = () => {
    setHoveredMonth(null);
  };
  
  return (
    <ThemedView style={styles.card}>
      <View style={styles.headerContainer}>
        <ThemedText style={styles.cardTitle}>Monthly Healthcare Spending</ThemedText>
        <TouchableOpacity onPress={onExpandPress}>
          <Ionicons name="expand-outline" size={20} color="#4285F4" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.chartContainer}>
        {data.map((item) => {
          const isHovered = item.month === hoveredMonth;
          const barHeight = (item.amount / maxAmount) * 150;
          
          return (
            <TouchableOpacity 
              key={item.month}
              style={styles.barContainer}
              onPressIn={() => handlePressIn(item.month)}
              onPressOut={handlePressOut}
              delayPressOut={150}
              activeOpacity={1}
            >
              <View style={styles.amountContainer}>
                <ThemedText 
                  style={[
                    styles.amountText, 
                    isHovered && styles.hoveredAmountText
                  ]}
                >
                  ${item.amount}
                </ThemedText>
              </View>
              
              <View style={styles.barWrapper}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: barHeight,
                      backgroundColor: isHovered ? hoveredColor : usedColor
                    }
                  ]}
                />
              </View>
              
              <ThemedText style={styles.monthText}>{item.month}</ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 220,
  },
  barContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  amountContainer: {
    marginBottom: 8,
    height: 20,
  },
  amountText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  hoveredAmountText: {
    color: '#FF6B4A',
    fontWeight: '700',
  },
  barWrapper: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 150,
  },
  bar: {
    width: 16, // Increased from 8 to 16 for thicker bars
    borderRadius: 8, // Adjusted to half of width for rounded corners
  },
  monthText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});