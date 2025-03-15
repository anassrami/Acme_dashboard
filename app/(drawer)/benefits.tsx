import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
// Replace IconSymbol import with Lucide icons
import { Calendar, Users, DollarSign, CreditCard, Heart, Shield, ChevronUp, ChevronDown, ArrowRight } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

type BenefitCategory = {
  id: string;
  title: string;
  icon: string;
  items: BenefitItem[];
};

type BenefitItem = {
  label: string;
  value: string;
  description?: string;
};

const benefitCategories: BenefitCategory[] = [
  {
    id: 'deductibles',
    title: 'Deductibles',
    icon: 'dollarsign.square',
    items: [
      { label: 'Individual', value: '$1,500', description: 'Amount you pay before insurance begins to pay' },
      { label: 'Family', value: '$3,000', description: 'Combined amount for all family members' },
      { label: 'Out-of-Network Individual', value: '$3,000', description: 'For providers outside your network' },
      { label: 'Out-of-Network Family', value: '$6,000', description: 'For family members using out-of-network providers' },
    ]
  },
  {
    id: 'copays',
    title: 'Copays',
    icon: 'creditcard',
    items: [
      { label: 'Primary Care', value: '$25', description: 'For regular doctor visits' },
      { label: 'Specialist', value: '$50', description: 'For visits to specialists' },
      { label: 'Urgent Care', value: '$75', description: 'For urgent care centers' },
      { label: 'Emergency Room', value: '$250', description: 'Waived if admitted to hospital' },
      { label: 'Virtual Visit', value: '$10', description: 'For telehealth appointments' },
    ]
  },
  {
    id: 'covered',
    title: 'Covered Services',
    icon: 'heart.text.square',
    items: [
      { label: 'Preventive Care', value: '100%', description: 'Annual physicals, vaccinations, screenings' },
      { label: 'Hospital Stay', value: '80% after deductible', description: 'Inpatient services' },
      { label: 'Prescription Drugs', value: '$10/$35/$60', description: 'Generic/Preferred/Non-preferred' },
      { label: 'Mental Health', value: '$25 copay', description: 'Therapy and psychiatric services' },
      { label: 'Physical Therapy', value: '$30 copay', description: 'Up to 30 visits per year' },
    ]
  },
  {
    id: 'maximums',
    title: 'Out-of-Pocket Maximums',
    icon: 'shield',
    items: [
      { label: 'Individual', value: '$5,000', description: "Maximum you'll pay in a plan year"},
      { label: 'Family', value: '$10,000', description: 'Maximum your family will pay in a plan year' },
    ]
  },
];

export default function BenefitsScreen() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };
  
  const renderBenefitItem = (item: BenefitItem) => (
    <View key={item.label} style={styles.benefitItem}>
      <View style={styles.benefitItemContent}>
        <ThemedText style={styles.benefitLabel}>{item.label}</ThemedText>
        {item.description && (
          <ThemedText style={styles.benefitDescription}>{item.description}</ThemedText>
        )}
      </View>
      <ThemedText style={styles.benefitValue}>{item.value}</ThemedText>
    </View>
  );

  // Helper function to render the appropriate icon
  const renderCategoryIcon = (iconName: string, color: string) => {
    switch(iconName) {
      case 'dollarsign.square':
        return <DollarSign size={20} color={color} />;
      case 'creditcard':
        return <CreditCard size={20} color={color} />;
      case 'heart.text.square':
        return <Heart size={20} color={color} />;
      case 'shield':
        return <Shield size={20} color={color} />;
      default:
        return <DollarSign size={20} color={color} />;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">My Benefits</ThemedText>
        <ThemedText style={styles.planName}>Premium PPO Plan</ThemedText>
      </View>
      
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Calendar size={24} color={isDarkMode ? '#0095FF' : '#0095FF'} />
          <View style={styles.summaryTextContainer}>
            <ThemedText style={styles.summaryLabel}>Plan Year</ThemedText>
            <ThemedText style={styles.summaryValue}>Jan - Dec 2023</ThemedText>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.summaryItem}>
          <Users size={24} color={isDarkMode ? '#0095FF' : '#0095FF'} />
          <View style={styles.summaryTextContainer}>
            <ThemedText style={styles.summaryLabel}>Coverage</ThemedText>
            <ThemedText style={styles.summaryValue}>Family</ThemedText>
          </View>
        </View>
      </View>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {benefitCategories.map((category) => (
          <View key={category.id} style={styles.categoryContainer}>
            <TouchableOpacity 
              style={styles.categoryHeader} 
              onPress={() => toggleCategory(category.id)}
              activeOpacity={0.7}
            >
              <View style={styles.categoryTitleContainer}>
                <View style={styles.iconContainer}>
                  {renderCategoryIcon(category.icon, isDarkMode ? '#FFFFFF' : '#222B45')}
                </View>
                <ThemedText style={styles.categoryTitle}>{category.title}</ThemedText>
              </View>
              {expandedCategory === category.id ? 
                <ChevronUp size={20} color={isDarkMode ? '#8F9BB3' : '#8F9BB3'} /> : 
                <ChevronDown size={20} color={isDarkMode ? '#8F9BB3' : '#8F9BB3'} />
              }
            </TouchableOpacity>
            
            {expandedCategory === category.id && (
              <View style={styles.categoryContent}>
                {category.items.map(renderBenefitItem)}
              </View>
            )}
          </View>
        ))}
        
        <TouchableOpacity style={styles.viewMoreButton}>
          <ThemedText style={styles.viewMoreText}>View Full Benefits Details</ThemedText>
          <ArrowRight size={16} color={isDarkMode ? '#0095FF' : '#0095FF'} />
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  planName: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 4,
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 149, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryTextContainer: {
    marginLeft: 12,
  },
  summaryLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  categoryContainer: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 149, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  categoryContent: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  benefitItemContent: {
    flex: 1,
    marginRight: 16,
  },
  benefitLabel: {
    fontSize: 16,
  },
  benefitDescription: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
  benefitValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  viewMoreText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0095FF',
    marginRight: 8,
  },
});