import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

type Claim = {
  id: string;
  provider: string;
  service: string;
  date: string;
  amount: string;
  status: 'Pending' | 'Approved' | 'Denied' | 'Paid';
};

type Bill = {
  id: string;
  provider: string;
  service: string;
  date: string;
  amount: string;
  dueDate: string;
  isPaid: boolean;
};

const mockClaims: Claim[] = [
  {
    id: '1',
    provider: 'Dr. Sarah Johnson',
    service: 'Annual Physical',
    date: '06/15/2023',
    amount: '$150.00',
    status: 'Paid',
  },
  {
    id: '2',
    provider: 'City Medical Center',
    service: 'X-Ray',
    date: '07/22/2023',
    amount: '$350.00',
    status: 'Approved',
  },
  {
    id: '3',
    provider: 'Dr. Michael Chen',
    service: 'Specialist Consultation',
    date: '08/10/2023',
    amount: '$200.00',
    status: 'Pending',
  },
  {
    id: '4',
    provider: 'Wellness Pharmacy',
    service: 'Prescription',
    date: '08/15/2023',
    amount: '$45.00',
    status: 'Paid',
  },
  {
    id: '5',
    provider: 'Urgent Care Clinic',
    service: 'Emergency Visit',
    date: '09/03/2023',
    amount: '$275.00',
    status: 'Denied',
  },
];

const mockBills: Bill[] = [
  {
    id: '1',
    provider: 'City Medical Center',
    service: 'Emergency Room Visit',
    date: '07/10/2023',
    amount: '$450.00',
    dueDate: '08/10/2023',
    isPaid: false,
  },
  {
    id: '2',
    provider: 'Dr. Sarah Johnson',
    service: 'Follow-up Appointment',
    date: '07/25/2023',
    amount: '$75.00',
    dueDate: '08/25/2023',
    isPaid: true,
  },
  {
    id: '3',
    provider: 'Lab Services Inc.',
    service: 'Blood Work',
    date: '08/05/2023',
    amount: '$120.00',
    dueDate: '09/05/2023',
    isPaid: false,
  },
];

export default function ClaimsBillsScreen() {
  const [activeTab, setActiveTab] = useState<'claims' | 'bills'>('claims');
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const getStatusColor = (status: Claim['status']) => {
    switch(status) {
      case 'Paid': return '#00E096';
      case 'Approved': return '#0095FF';
      case 'Pending': return '#FFAA00';
      case 'Denied': return '#FF3D71';
      default: return '#8F9BB3';
    }
  };

  const renderClaimItem = ({ item }: { item: Claim }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <ThemedText type="subtitle" style={styles.cardTitle}>{item.service}</ThemedText>
        <View style={[styles.statusBadge, {backgroundColor: getStatusColor(item.status)}]}>
          <ThemedText style={styles.statusText}>{item.status}</ThemedText>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <IconSymbol size={16} name="person" color="#8F9BB3" />
            <ThemedText style={styles.infoText}>{item.provider}</ThemedText>
          </View>
          
          <View style={styles.infoItem}>
            <IconSymbol size={16} name="calendar" color="#8F9BB3" />
            <ThemedText style={styles.infoText}>{item.date}</ThemedText>
          </View>
          
          <View style={styles.infoItem}>
            <IconSymbol size={16} name="dollarsign.circle" color="#8F9BB3" />
            <ThemedText style={styles.infoText}>{item.amount}</ThemedText>
          </View>
        </View>
      </View>
      
      <TouchableOpacity style={styles.actionButton}>
        <ThemedText style={styles.actionButtonText}>View Details</ThemedText>
        <IconSymbol size={16} name="chevron.right" color="#FFFFFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderBillItem = ({ item }: { item: Bill }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <ThemedText type="subtitle" style={styles.cardTitle}>{item.service}</ThemedText>
        <View style={[styles.statusBadge, {backgroundColor: item.isPaid ? '#00E096' : '#FFAA00'}]}>
          <ThemedText style={styles.statusText}>{item.isPaid ? 'Paid' : 'Due'}</ThemedText>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <IconSymbol size={16} name="person" color="#8F9BB3" />
            <ThemedText style={styles.infoText}>{item.provider}</ThemedText>
          </View>
          
          <View style={styles.infoItem}>
            <IconSymbol size={16} name="calendar" color="#8F9BB3" />
            <ThemedText style={styles.infoText}>{item.date}</ThemedText>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <IconSymbol size={16} name="dollarsign.circle" color="#8F9BB3" />
            <ThemedText style={styles.infoText}>{item.amount}</ThemedText>
          </View>
          
          <View style={styles.infoItem}>
            <IconSymbol size={16} name="clock" color="#8F9BB3" />
            <ThemedText style={styles.infoText}>Due: {item.dueDate}</ThemedText>
          </View>
        </View>
      </View>
      
      {!item.isPaid && (
        <TouchableOpacity style={styles.actionButton}>
          <ThemedText style={styles.actionButtonText}>Pay Now</ThemedText>
          <IconSymbol size={16} name="creditcard" color="#FFFFFF" />
        </TouchableOpacity>
      )}
      
      {item.isPaid && (
        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
          <ThemedText style={styles.actionButtonText}>View Receipt</ThemedText>
          <IconSymbol size={16} name="doc.text" color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <IconSymbol size={48} name={activeTab === 'claims' ? 'doc.text' : 'creditcard'} color="#8F9BB3" />
      <ThemedText style={styles.emptyStateTitle}>
        No {activeTab === 'claims' ? 'claims' : 'bills'} found
      </ThemedText>
      <ThemedText style={styles.emptyStateText}>
        {activeTab === 'claims' 
          ? 'Your insurance claims will appear here when processed.'
          : 'Your medical bills will appear here when received.'}
      </ThemedText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Claims & Bills</ThemedText>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'claims' && styles.activeTab]}
          onPress={() => setActiveTab('claims')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'claims' && styles.activeTabText]}>Claims</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'bills' && styles.activeTab]}
          onPress={() => setActiveTab('bills')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'bills' && styles.activeTabText]}>Bills</ThemedText>
        </TouchableOpacity>
      </View>
      
      <FlatList<Claim | Bill>
        data={activeTab === 'claims' ? mockClaims : mockBills}
        renderItem={({ item }) => {
          if (activeTab === 'claims') {
            return renderClaimItem({ item } as { item: Claim });
          } else {
            return renderBillItem({ item } as { item: Bill });
          }
        }}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'rgba(0, 149, 255, 0.8)',
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: "white",
    fontWeight: '600',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cardContent: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
    minWidth: '45%',
  },
  infoText: {
    fontSize: 14,
    marginLeft: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 149, 255, 0.8)',
    paddingVertical: 12,
    borderRadius: 8,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  }
});