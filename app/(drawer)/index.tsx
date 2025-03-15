import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppSelector } from '@/store';
import { CoverageOverviewCard } from '@/components/CoverageOverviewCard';
import { RecentClaimsCard } from '@/components/RecentClaimsCard';
import { UpcomingAppointmentsCard } from '@/components/UpcomingAppointmentsCard';
import { MonthlyHealthcareSpendingCard } from '@/components/MonthlyHealthcareSpendingCard';
import { useRouter } from 'expo-router';
import { AddyRecommendationsCard } from '@/components/AddyRecommendationsCard';

// Mock data for the coverage overview
const mockCoverageData = {
  totalCoverage: 10000,
  usedCoverage: 8000,
  deductible: {
    current: 750,
    total: 1500,
  },
  outOfPocket: {
    current: 1200,
    total: 5000,
  },
};

// Mock data for recent claims
const mockClaimsData: {
  id: string;
  provider: string;
  date: string;
  amount: number;
  status: 'Approved' | 'Pending' | 'Denied';
}[] = [
    {
      id: '1',
      provider: 'City Medical Center',
      date: '2025-03-01',
      amount: 350,
      status: 'Approved',
    },
    {
      id: '2',
      provider: 'Dr. Smith Office',
      date: '2025-03-05',
      amount: 120,
      status: 'Pending',
    },
  ];

// Mock data for upcoming appointments
const mockAppointmentsData: {
  id: string;
  provider: string;
  specialty: string;
  date: string;
  time: string;
}[] = [
    {
      id: '1',
      provider: 'Dr. Emily Wilson',
      specialty: 'Primary Care',
      date: '2025-03-20',
      time: '9:30 AM',
    },
    {
      id: '2',
      provider: 'Northside Dental',
      specialty: 'Dentist',
      date: '2025-04-05',
      time: '2:00 PM',
    },
  ];

// Mock data for monthly healthcare spending
const mockSpendingData: {
  month: string;
  amount: number;
}[] = [
    {
      month: 'Jan',
      amount: 400,
    },
    {
      month: 'Feb',
      amount: 200,
    },
    {
      month: 'Mar',
      amount: 600,
    },
  ];



// Mock data for Addy's recommendations
const mockRecommendations: {
  id: string;
  text: string;
  priority: 'High' | 'Medium' | 'Low';
}[] = [
    {
      id: '1',
      text: 'Time for your annual wellness check',
      priority: 'Medium',
    },
    {
      id: '2',
      text: 'Save 15% by switching to mail-order prescriptions',
      priority: 'Low',
    },
    {
      id: '3',
      text: 'Flu shot recommended based on your history',
      priority: 'High',
    },
  ];

export default function DashboardScreen() {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleViewAllClaims = () => {
    // Navigate to claims screen
    router.push('/claims-bills');
  };
  const onFindInNetworkProvider = () => {
    // Navigate to the FindInNetworkProvider screen
    router.push('/find-provider');
  };

  const handleScheduleAppointment = () => {
    // Navigate to appointment scheduling screen
    // router.push('/appointments/schedule');
  };

  const handleExpandSpendingChart = () => {
    // Navigate to detailed spending view
    // router.push('/spending');
  };

  const handleAskAddy = () => {
    // Navigate to Addy chat screen
    // router.push('/addy-chat');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.greeting}>Hello, {user?.username || 'demo'}</ThemedText>
          <ThemedText style={styles.subGreeting}>Here's your health coverage summary</ThemedText>
        </View>

        <CoverageOverviewCard data={mockCoverageData} />



        <RecentClaimsCard
          claims={mockClaimsData}
          onViewAllPress={handleViewAllClaims}
        />

        <UpcomingAppointmentsCard
          appointments={mockAppointmentsData}
          onSchedulePress={handleScheduleAppointment}
        />

        <MonthlyHealthcareSpendingCard
          data={mockSpendingData}
          onExpandPress={handleExpandSpendingChart}
        />

        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Find an In-Network Provider</ThemedText>
          <TouchableOpacity style={styles.mainBtn} onPress={onFindInNetworkProvider}>
            <ThemedText style={{ ...styles.cardTitle, color: '#FFFFFF' }}>Search</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <AddyRecommendationsCard
          recommendations={mockRecommendations}
          onAskQuestion={handleAskAddy}
        />
      </ScrollView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
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
  },
  mainBtn: {
    marginTop: 16,
    flex: 1,
    height: 50,
    backgroundColor: "#4285F4",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }
});

