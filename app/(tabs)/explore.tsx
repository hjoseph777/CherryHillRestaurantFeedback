import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

// Restaurant feedback system documentation and resources
export default function ExploreScreen() {
  const handleReturnToMain = () => {
    router.push('/');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#2D5D31', dark: '#1B3B1E' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#4CAF50"
          name="book.pages"
          style={styles.headerImage}
        />
      }>
      
      {/* Header with return button */}
      <ThemedView style={styles.headerContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText
            type="title"
            style={{
              fontFamily: Fonts.rounded,
              color: '#2D5D31',
            }}>
            Restaurant Resources
          </ThemedText>
        </ThemedView>
        
        <TouchableOpacity 
          style={styles.returnButton}
          onPress={handleReturnToMain}
        >
          <ThemedText style={styles.returnButtonText}>
            ← Back to Dashboard
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedText style={styles.description}>
        Quick access to your restaurant management demos and features.
      </ThemedText>

      {/* Navigation cards to different pages */}
      <ThemedView style={styles.navigationSection}>
        <ThemedText style={styles.sectionTitle}>Demo Pages</ThemedText>
        
        {/* Produce Report Link */}
        <TouchableOpacity 
          style={styles.navCard}
          onPress={() => router.push('/inventory-success')}
        >
          <ThemedView style={styles.cardContent}>
            <ThemedText style={styles.cardIcon}>🍃</ThemedText>
            <ThemedView style={styles.cardText}>
              <ThemedText style={styles.cardTitle}>Daily Produce Report</ThemedText>
              <ThemedText style={styles.cardDescription}>View inventory success feedback</ThemedText>
            </ThemedView>
            <ThemedText style={styles.cardArrow}>→</ThemedText>
          </ThemedView>
        </TouchableOpacity>

        {/* Payroll Processing Link */}
        <TouchableOpacity 
          style={styles.navCard}
          onPress={() => router.push('/payroll-guidance')}
        >
          <ThemedView style={styles.cardContent}>
            <ThemedText style={styles.cardIcon}>💼</ThemedText>
            <ThemedView style={styles.cardText}>
              <ThemedText style={styles.cardTitle}>Payroll Processing</ThemedText>
              <ThemedText style={styles.cardDescription}>Process payroll with guidance</ThemedText>
            </ThemedView>
            <ThemedText style={styles.cardArrow}>→</ThemedText>
          </ThemedView>
        </TouchableOpacity>

        {/* Interactive Feedback Link */}
        <TouchableOpacity 
          style={styles.navCard}
          onPress={() => router.push('/feedback-demo')}
        >
          <ThemedView style={styles.cardContent}>
            <ThemedText style={styles.cardIcon}>⚡</ThemedText>
            <ThemedView style={styles.cardText}>
              <ThemedText style={styles.cardTitle}>Interactive Feedback Demo</ThemedText>
              <ThemedText style={styles.cardDescription}>Test all feedback types</ThemedText>
            </ThemedView>
            <ThemedText style={styles.cardArrow}>→</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>

      {/* Bottom return button for convenience */}
      <ThemedView style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={styles.bottomReturnButton}
          onPress={handleReturnToMain}
        >
          <ThemedText style={styles.bottomReturnButtonText}>
            Return to Main Dashboard
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#4CAF50',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  headerContainer: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    opacity: 0.8,
  },
  // Navigation section
  navigationSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#2D5D31',
  },
  // Navigation cards
  navCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    opacity: 0.8,
  },
  cardArrow: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  // Return to main button - top
  returnButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  returnButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  // Content styling
  bulletPoint: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 8,
    marginVertical: 2,
  },
  note: {
    fontSize: 14,
    fontStyle: 'italic',
    opacity: 0.7,
    marginTop: 8,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#4CAF50',
  },
  // Bottom return button
  bottomButtonContainer: {
    marginTop: 32,
    marginBottom: 20,
    alignItems: 'center',
  },
  bottomReturnButton: {
    backgroundColor: '#2D5D31',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomReturnButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
