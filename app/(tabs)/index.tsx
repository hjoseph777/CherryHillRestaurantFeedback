import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

// Main dashboard for Josh & Colleen's restaurant feedback system
export default function HomeScreen() {
  // console.log('HomeScreen rendered'); // TODO: remove this later
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#2D5D31', dark: '#1B3B1E' }}
      headerImage={
        <ThemedView style={styles.headerContent}>
          <ThemedText style={styles.restaurantName}>Cherry Hill</ThemedText>
          <ThemedText style={styles.tagline}>Farm to Table Excellence</ThemedText>
        </ThemedView>
      }>
      
      {/* Personalized greeting - makes them feel at home */}
      <ThemedView style={styles.welcomeContainer}>
        <ThemedText type="title" style={styles.welcomeTitle}>
          Welcome Back, Josh & Colleen! 👨‍🍳👩‍🍳
        </ThemedText>
        <ThemedText style={styles.welcomeSubtext}>
          Manage your restaurant feedback systems across Philadelphia and NYC locations
        </ThemedText>
      </ThemedView>

      {/* Core demo section - this is where the magic happens */}
      <ThemedView style={styles.demosSection}>
        <ThemedText type="subtitle" style={styles.demosTitle}>
          System Feedback Demonstrations
        </ThemedText>
        <ThemedText style={styles.demosDescription}>
          Experience how clear feedback improves restaurant operations
        </ThemedText>
        
        <View style={styles.demoCardsContainer}>
          <Link href="/inventory-success" style={styles.demoLink}>
            <ThemedView style={[styles.demoCard, styles.inventoryCard]}>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <ThemedText style={styles.cardIcon}>🥬</ThemedText>
                </View>
                <View style={styles.cardContent}>
                  <ThemedText style={styles.cardTitle}>Daily Produce Report</ThemedText>
                  <ThemedText style={styles.cardDescription}>
                    See how success feedback confirms inventory updates reach your chefs
                  </ThemedText>
                </View>
              </View>
              <View style={styles.cardFooter}>
                <ThemedText style={styles.cardAction}>Try Demo →</ThemedText>
              </View>
            </ThemedView>
          </Link>

          <Link href="/payroll-guidance" style={styles.demoLink}>
            <ThemedView style={[styles.demoCard, styles.payrollCard]}>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <ThemedText style={styles.cardIcon}>💰</ThemedText>
                </View>
                <View style={styles.cardContent}>
                  <ThemedText style={styles.cardTitle}>Payroll Navigation</ThemedText>
                  <ThemedText style={styles.cardDescription}>
                    Learn how guidance messages help you find detailed audit information
                  </ThemedText>
                </View>
              </View>
              <View style={styles.cardFooter}>
                <ThemedText style={styles.cardAction}>Try Demo →</ThemedText>
              </View>
            </ThemedView>
          </Link>

          <Link href="/feedback-demo" style={styles.demoLink}>
            <ThemedView style={[styles.demoCard, styles.interactiveCard]}>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <ThemedText style={styles.cardIcon}>⚡</ThemedText>
                </View>
                <View style={styles.cardContent}>
                  <ThemedText style={styles.cardTitle}>Interactive Feedback</ThemedText>
                  <ThemedText style={styles.cardDescription}>
                    Test all three types: Success, Error, and Loading messages
                  </ThemedText>
                </View>
              </View>
              <View style={styles.cardFooter}>
                <ThemedText style={styles.cardAction}>Try Demo →</ThemedText>
              </View>
            </ThemedView>
          </Link>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  // Header branding - kept it simple but effective
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  restaurantName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#E8F5E8',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  
  // Welcome section - trying to make it feel personal
  welcomeContainer: {
    padding: 20,
    backgroundColor: '#F8FDF8',
    borderRadius: 16,
    marginBottom: 24,
    borderLeftWidth: 6,
    borderLeftColor: '#4CAF50',
    marginTop: -10, // pulled it up a bit
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2D5D31',
    textAlign: 'center',
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    textAlign: 'center',
  },

  // Demos section - main educational content
  demosSection: {
    marginBottom: 24,
  },
  demosTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  demosDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  
  // Demo cards - spent way too much time on these shadows
  demoCardsContainer: {
    gap: 16,
  },
  demoLink: {
    textDecorationLine: 'none',
  },
  demoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  
  // Different colors for each card type
  inventoryCard: {
    borderLeftWidth: 6,
    borderLeftColor: '#4CAF50',
    backgroundColor: '#FAFFFA',
  },
  payrollCard: {
    borderLeftWidth: 6,
    borderLeftColor: '#2196F3', 
    backgroundColor: '#F8FCFF',
  },
  interactiveCard: {
    borderLeftWidth: 6,
    borderLeftColor: '#FF9800',
    backgroundColor: '#FFFAF5',
  },

  // Card layout
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  cardFooter: {
    alignItems: 'flex-end',
  },
  cardAction: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
});
