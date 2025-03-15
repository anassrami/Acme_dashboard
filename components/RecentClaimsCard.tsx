import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

interface Claim {
  id: string;
  provider: string;
  date: string;
  amount: number;
  status: 'Approved' | 'Pending' | 'Denied';
}

interface RecentClaimsCardProps {
  claims: Claim[];
  onViewAllPress: () => void;
}

export const RecentClaimsCard: React.FC<RecentClaimsCardProps> = ({ 
  claims, 
  onViewAllPress 
}) => {
  // Function to render the status badge with appropriate color
  const renderStatusBadge = (status: string) => {
    let backgroundColor = '#E5E5E5';
    let textColor = '#666666';
    
    switch(status) {
      case 'Approved':
        backgroundColor = '#E7F5E8';
        textColor = '#2E7D32';
        break;
      case 'Pending':
        backgroundColor = '#FFF8E1';
        textColor = '#F57C00';
        break;
      case 'Denied':
        backgroundColor = '#FFEBEE';
        textColor = '#C62828';
        break;
    }
    
    return (
      <View style={[styles.statusBadge, { backgroundColor }]}>
        <ThemedText style={[styles.statusText, { color: textColor }]}>
          {status}
        </ThemedText>
      </View>
    );
  };

  return (
    <ThemedView style={styles.card}>
      <ThemedText style={styles.cardTitle}>Recent Claims</ThemedText>
      
      <View style={styles.claimsContainer}>
        {claims.map((claim, index) => (
          <View 
            key={claim.id} 
            style={[
              styles.claimItem, 
              index < claims.length - 1 && styles.claimItemWithBorder
            ]}
          >
            <View style={styles.claimDetails}>
              <ThemedText style={styles.providerName}>{claim.provider}</ThemedText>
              <ThemedText style={styles.claimDate}>{claim.date}</ThemedText>
            </View>
            
            <View style={styles.claimRightSection}>
              <ThemedText style={styles.claimAmount}>${claim.amount}</ThemedText>
              {renderStatusBadge(claim.status)}
            </View>
          </View>
        ))}
      </View>
      
      <TouchableOpacity style={styles.viewAllButton} onPress={onViewAllPress}>
        <ThemedText style={styles.viewAllText}>View all claims</ThemedText>
        <Ionicons name="chevron-forward" size={16} color="#4285F4" />
      </TouchableOpacity>
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  claimsContainer: {
    width: '100%',
  },
  claimItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  claimItemWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  claimDetails: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  claimDate: {
    fontSize: 14,
    color: '#666666',
  },
  claimRightSection: {
    alignItems: 'flex-end',
  },
  claimAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  viewAllText: {
    fontSize: 14,
    color: '#4285F4',
    fontWeight: '500',
    marginRight: 4,
  },
});