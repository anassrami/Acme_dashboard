import React, { useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider } from '@/components/SafeAreaProvider';

type Provider = {
    id: string;
    name: string;
    specialty: string;
    location: string;
    distance: string;
    accepting: boolean;
};

const mockProviders: Provider[] = [
    {
        id: '1',
        name: 'Dr. Sarah Johnson',
        specialty: 'Primary Care',
        location: '123 Medical Ave, San Francisco, CA',
        distance: '0.8 miles',
        accepting: true,
    },
    {
        id: '2',
        name: 'Dr. Michael Chen',
        specialty: 'Cardiology',
        location: '456 Health St, San Francisco, CA',
        distance: '1.2 miles',
        accepting: true,
    },
    {
        id: '3',
        name: 'Dr. Emily Rodriguez',
        specialty: 'Cardiology',
        location: '789 Wellness Blvd, San Francisco, CA',
        distance: '2.5 miles',
        accepting: true,
    },
    {
        id: '4',
        name: 'Dr. James Wilson',
        specialty: 'Orthopedics',
        location: '321 Care Lane, San Francisco, CA',
        distance: '3.1 miles',
        accepting: false,
    },
    {
        id: '5',
        name: 'Dr. Lisa Thompson',
        specialty: 'Dermatology',
        location: '555 Skin Center, San Francisco, CA',
        distance: '4.0 miles',
        accepting: true,
    },
    {
        id: '6',
        name: 'Dr. Robert Martinez',
        specialty: 'Primary Care',
        location: '789 Health Blvd, San Francisco, CA',
        distance: '1.5 miles',
        accepting: true,
    },
    {
        id: '7',
        name: 'Dr. Jennifer Lee',
        specialty: 'Orthopedics',
        location: '222 Bone St, San Francisco, CA',
        distance: '2.8 miles',
        accepting: true,
    },
    {
        id: '8',
        name: 'Dr. David Kim',
        specialty: 'Dermatology',
        location: '333 Derma Ave, San Francisco, CA',
        distance: '3.7 miles',
        accepting: false,
    },
    {
        id: '9',
        name: 'Dr. Amanda Patel',
        specialty: 'Pediatrics',
        location: "444 Children's Way, San Francisco, CA",
        distance: '1.9 miles',
        accepting: true,
    },
    {
        id: '10',
        name: 'Dr. Thomas Wright',
        specialty: 'Pediatrics',
        location: "555 Kid's Plaza, San Francisco, CA",
        distance: '2.3 miles',
        accepting: true,
    }
];

export default function FindProviderScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const specialties = ['All', 'Accepting', 'Primary Care', 'Cardiology', 'Pediatrics', 'Orthopedics', 'Dermatology'];

    const filteredProviders = mockProviders.filter(provider => {
        const matchesSearch =
            provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            provider.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
            provider.location.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeFilter === 'All') return matchesSearch;
        if (activeFilter === 'Accepting') return matchesSearch && provider.accepting;

        // Filter by specialty
        return matchesSearch && provider.specialty === activeFilter;
    });

    const renderProviderCard = ({ item }: { item: Provider }) => (
        <TouchableOpacity style={styles.providerCard} activeOpacity={0.7}>
            <View style={styles.providerHeader}>
                <ThemedText type="subtitle" style={styles.providerName}>{item.name}</ThemedText>
                <View style={item.accepting ? styles.acceptingBadge : styles.notAcceptingBadge}>
                    <ThemedText style={styles.acceptingText}>
                        {item.accepting ? 'Accepting' : 'Not Accepting'}
                    </ThemedText>
                </View>
            </View>

            <View style={styles.providerInfo}>
                <View style={styles.infoRow}>
                    <IconSymbol size={16} name="stethoscope" color="#8F9BB3" />
                    <ThemedText style={styles.infoText}>{item.specialty}</ThemedText>
                </View>
                <View style={styles.infoRow}>
                    <IconSymbol size={16} name="location" color="#8F9BB3" />
                    <ThemedText style={styles.infoText}>{item.location}</ThemedText>
                </View>
                <View style={styles.infoRow}>
                    <IconSymbol size={16} name="map" color="#8F9BB3" />
                    <ThemedText style={styles.infoText}>{item.distance}</ThemedText>
                </View>
            </View>

            <TouchableOpacity style={styles.scheduleButton}>
                <ThemedText style={styles.buttonText}>Schedule</ThemedText>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const renderFilterChip = (filter: string) => (
        <TouchableOpacity
            key={filter}
            style={[
                styles.filterChip,
                activeFilter === filter && styles.activeFilterChip
            ]}
            onPress={() => setActiveFilter(filter)}
        >
            <ThemedText
                style={[
                    styles.filterText,
                    activeFilter === filter && styles.activeFilterText
                ]}
            >
                {filter}
            </ThemedText>
        </TouchableOpacity>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <ThemedText style={styles.emptyStateText}>
                No providers found matching your criteria
            </ThemedText>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="title">Find a Provider</ThemedText>
            </View>

            <View style={styles.searchContainer}>
                <IconSymbol size={20} name="magnifyingglass" color="#8F9BB3" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name, specialty, or location"
                    placeholderTextColor="#8F9BB3"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <View style={styles.filtersWrapper}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filtersScrollContent}
                >
                    {specialties.map(renderFilterChip)}
                </ScrollView>
            </View>

            <FlatList
                data={filteredProviders}
                renderItem={renderProviderCard}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={renderEmptyState}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                windowSize={10}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    header: {
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F9FC',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        height: 48,
        borderWidth: 1,
        borderColor: '#E4E9F2',
    },
    searchInput: {
        flex: 1,
        height: 48,
        marginLeft: 8,
        color: '#222B45',
        fontSize: 16,
    },
    filtersWrapper: {
        marginBottom: 16,
    },
    filtersScrollContent: {
        paddingVertical: 4,
        paddingHorizontal: 4,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
        backgroundColor: '#F7F9FC',
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#E4E9F2',
    },
    activeFilterChip: {
        backgroundColor: '#0095FF',
        borderColor: '#0095FF',
    },
    filterText: {
        fontSize: 14,
        color: '#222B45',
    },
    activeFilterText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    listContent: {
        flexGrow: 1,
        paddingBottom: 16,
    },
    providerCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E4E9F2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    providerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    providerName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222B45',
        flex: 1,
    },
    acceptingBadge: {
        backgroundColor: '#00E096',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    notAcceptingBadge: {
        backgroundColor: '#FF3D71',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    acceptingText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    providerInfo: {
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        gap: 8,
    },
    infoText: {
        fontSize: 16,
        color: '#222B45',
        flex: 1,
    },
    scheduleButton: {
        backgroundColor: '#0095FF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#8F9BB3',
        textAlign: 'center',
    }
});