import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
// Replace Ionicons with Lucide icons
import { MessageCircle, X } from 'lucide-react-native';

interface Recommendation {
  id: string;
  text: string;
  priority: 'High' | 'Medium' | 'Low';
}

interface AddyRecommendationsCardProps {
  recommendations: Recommendation[];
  onAskQuestion: () => void;
}

export const AddyRecommendationsCard: React.FC<AddyRecommendationsCardProps> = ({
  recommendations,
  onAskQuestion,
}) => {
  const [visibleRecommendations, setVisibleRecommendations] = useState<string[]>(
    recommendations.map(rec => rec.id)
  );

  const hideRecommendation = (id: string) => {
    setVisibleRecommendations(prev => prev.filter(recId => recId !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return '#FF6B6B';
      case 'Medium':
        return '#FFD166';
      case 'Low':
        return '#06D6A0';
      default:
        return '#E0E0E0';
    }
  };

  const filteredRecommendations = recommendations.filter(rec => 
    visibleRecommendations.includes(rec.id)
  );

  return (
    <ThemedView style={styles.card}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <MessageCircle size={20} color="#4CAF50" />
          </View>
          <ThemedText style={styles.cardTitle}>Addy's Recommendations</ThemedText>
        </View>
      </View>

      {filteredRecommendations.length > 0 ? (
        <View style={styles.recommendationsContainer}>
          {filteredRecommendations.map((recommendation) => (
            <View key={recommendation.id} style={styles.recommendationItem}>
              <View style={styles.recommendationContent}>
                <View style={[styles.recommendationBar, { backgroundColor: '#4285F4' }]} />
                <ThemedText style={styles.recommendationText}>
                  {recommendation.text}
                </ThemedText>
                <View style={[
                  styles.priorityBadge, 
                  { backgroundColor: getPriorityColor(recommendation.priority) + '20' }
                ]}>
                  <ThemedText style={[
                    styles.priorityText, 
                    { color: getPriorityColor(recommendation.priority) }
                  ]}>
                    {recommendation.priority}
                  </ThemedText>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => hideRecommendation(recommendation.id)}
              >
                <X size={16} color="#999" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyStateContainer}>
          <ThemedText style={styles.emptyStateText}>
            No active recommendations at this time
          </ThemedText>
        </View>
      )}

      <TouchableOpacity style={styles.askButton} onPress={onAskQuestion}>
        <ThemedText style={styles.askButtonText}>Ask Addy a question</ThemedText>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  recommendationsContainer: {
    marginBottom: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    overflow: 'hidden',
  },
  recommendationContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingRight: 12,
  },
  recommendationBar: {
    width: 4,
    height: '100%',
    marginRight: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    paddingRight: 8,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  closeButton: {
    padding: 10,
  },
  askButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  askButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  emptyStateContainer: {
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
});