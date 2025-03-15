import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

interface CoverageData {
  totalCoverage: number;
  usedCoverage: number;
  deductible: {
    current: number;
    total: number;
  };
  outOfPocket: {
    current: number;
    total: number;
  };
}

export const CoverageOverviewCard: React.FC<{ data: CoverageData }> = ({ data }) => {
  const percentage = Math.round((data.usedCoverage / data.totalCoverage) * 100);
  
  // Animation values
  const [animatedPercentage] = useState(new Animated.Value(0));
  const [deductibleWidth] = useState(new Animated.Value(0));
  const [outOfPocketWidth] = useState(new Animated.Value(0));
  const [displayedPercentage, setDisplayedPercentage] = useState(0);
  
  // Calculate the circle properties
  const size = 160;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Colors
  const usedColor = '#4285F4'; // Blue for used coverage
  const remainingColor = '#E5E5E5'; // Light gray for remaining
  
  // Animation for the percentage text
  useEffect(() => {
    animatedPercentage.addListener(({ value }) => {
      setDisplayedPercentage(Math.round(value));
    });
    
    // Run animations when component mounts
    Animated.parallel([
      Animated.timing(animatedPercentage, {
        toValue: percentage,
        duration: 1500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(deductibleWidth, {
        toValue: (data.deductible.current / data.deductible.total) * 100,
        duration: 1500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(outOfPocketWidth, {
        toValue: (data.outOfPocket.current / data.outOfPocket.total) * 100,
        duration: 1500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();
    
    return () => {
      animatedPercentage.removeAllListeners();
    };
  }, []);
  
  // Calculate the animated stroke dasharray and dashoffset
  const animatedStrokeDasharray = `${circumference} ${circumference}`;
  const animatedStrokeDashoffset = animatedPercentage.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });
  
  return (
    <ThemedView style={styles.card}>
      <ThemedText style={styles.cardTitle}>Coverage Overview</ThemedText>
      
      <View style={styles.cardContent}>
        <View style={styles.pieChartContainer}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background circle (remaining coverage) */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={remainingColor}
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            
            {/* Animated foreground circle (used coverage) */}
            <AnimatedCircle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={usedColor}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={animatedStrokeDasharray}
              strokeDashoffset={animatedStrokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90, ${size / 2}, ${size / 2})`}
            />
            
            {/* Percentage text */}
            <SvgText
              x={size / 2 - 10}
              y={size / 2}
              fontSize="24"
              fontWeight="bold"
              fill="#333333"
              textAnchor="middle"
              alignmentBaseline="central"
            >
              {displayedPercentage}%
            </SvgText>
            
            {/* Label text */}
            <SvgText
              x={size / 2}
              y={size / 2 + 20}
              fontSize="12"
              fill="#666666"
              textAnchor="middle"
              alignmentBaseline="central"
            >
              Coverage
            </SvgText>
          </Svg>
          
          {/* Legend - moved outside of SVG for better layout control */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: usedColor }]} />
              <ThemedText style={styles.legendText}>Used</ThemedText>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: remainingColor }]} />
              <ThemedText style={styles.legendText}>Remaining</ThemedText>
            </View>
          </View>
        </View>
        
        <View style={styles.progressBarsContainer}>
          <View style={styles.progressContainer}>
            <View style={styles.progressLabelContainer}>
              <ThemedText style={styles.progressLabel}>Deductible</ThemedText>
              <ThemedText style={styles.progressValue}>
                ${data.deductible.current.toLocaleString()} of ${data.deductible.total.toLocaleString()}
              </ThemedText>
            </View>
            <View style={styles.progressBarBackground}>
              <Animated.View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: deductibleWidth.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                    backgroundColor: usedColor
                  }
                ]} 
              />
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressLabelContainer}>
              <ThemedText style={styles.progressLabel}>Out-of-pocket Maximum</ThemedText>
              <ThemedText style={styles.progressValue}>
                ${data.outOfPocket.current.toLocaleString()} of ${data.outOfPocket.total.toLocaleString()}
              </ThemedText>
            </View>
            <View style={styles.progressBarBackground}>
              <Animated.View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: outOfPocketWidth.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                    backgroundColor: usedColor
                  }
                ]} 
              />
            </View>
          </View>
        </View>
      </View>
    </ThemedView>
  );
};

// Create an animated Circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  pieChartContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666666',
  },
  progressBarsContainer: {
    width: '100%',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressValue: {
    fontSize: 14,
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#E5E5E5',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
});