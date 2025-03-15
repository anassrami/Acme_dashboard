import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

interface Appointment {
  id: string;
  provider: string;
  specialty: string;
  date: string;
  time: string;
}

interface UpcomingAppointmentsCardProps {
  appointments: Appointment[];
  onSchedulePress: () => void;
}

export const UpcomingAppointmentsCard: React.FC<UpcomingAppointmentsCardProps> = ({
  appointments,
  onSchedulePress
}) => {
  return (
    <ThemedView style={styles.card}>
      <ThemedText style={styles.cardTitle}>Upcoming Appointments</ThemedText>
      
      <View style={styles.appointmentsContainer}>
        {appointments.map((appointment, index) => (
          <View 
            key={appointment.id} 
            style={[
              styles.appointmentItem, 
              index < appointments.length - 1 && styles.appointmentItemWithBorder
            ]}
          >
            <View style={styles.appointmentDetails}>
              <ThemedText style={styles.providerName}>{appointment.provider}</ThemedText>
              <ThemedText style={styles.specialty}>{appointment.specialty}</ThemedText>
              
              <View style={styles.dateTimeContainer}>
                <ThemedText style={styles.date}>{appointment.date}</ThemedText>
                <ThemedText style={styles.time}>{appointment.time}</ThemedText>
              </View>
            </View>
          </View>
        ))}
      </View>
      
      <TouchableOpacity style={styles.scheduleButton} onPress={onSchedulePress}>
        <ThemedText style={styles.scheduleText}>Schedule appointment</ThemedText>
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
  appointmentsContainer: {
    width: '100%',
  },
  appointmentItem: {
    paddingVertical: 16,
  },
  appointmentItemWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  appointmentDetails: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: '#333333',
  },
  time: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  scheduleText: {
    fontSize: 14,
    color: '#4285F4',
    fontWeight: '500',
    marginRight: 4,
  },
});