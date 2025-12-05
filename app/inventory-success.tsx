import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// Success screen after produce report submission
export default function InventorySuccessScreen() {
  const handleViewDetails = () => {
    // Quick mock data for the report - in real app this'd come from API
    const reportData = {
      id: `RPT-${Date.now()}`,
      timestamp: new Date().toISOString(),
      items: 12,
      locations: ['Philadelphia Center City', 'NYC Manhattan', 'Philadelphia Suburbs'],
      status: 'delivered'
    };
    
    // console.log('Debug - Report data:', reportData); 
    console.log('Navigating to report details...', reportData.id);
    // NOTE: this navigation needs to be updated when we build the actual detail screen
    router.back();
  };

  const handleReturnHome = () => {
    router.push('/');
  };

  // Generate some realistic looking timestamps
  const currentTime = new Date();
  const submitTime = new Date(currentTime.getTime() - Math.random() * 300000); // somewhere between now and 5 min ago
  const nextReportTime = new Date(currentTime);
  nextReportTime.setDate(nextReportTime.getDate() + 1);
  nextReportTime.setHours(9, 0, 0, 0);

  return (
    <ThemedView style={styles.container}>
      {/* Big green checkmark - always feels good to see this! */}
      <View style={styles.successHeader}>
        <View style={styles.checkmarkContainer}>
          <ThemedText style={styles.checkmark}>✅</ThemedText>
        </View>
        <ThemedText type="title" style={styles.successTitle}>
          Produce Report Sent!
        </ThemedText>
        <ThemedText style={styles.successSubtext}>
          Your daily farm-to-table inventory has been successfully delivered to all head chefs 
          across your Philadelphia and New York City locations.
        </ThemedText>
      </View>

      {/* Action buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]}
          onPress={handleViewDetails}
        >
          <ThemedText style={styles.primaryButtonText}>
            View Report Details
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={handleReturnHome}
        >
          <ThemedText style={styles.secondaryButtonText}>
            Return to Home
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Additional context - makes it feel more real for restaurant owners */}
      <View style={styles.reportSummary}>
        <ThemedText style={styles.summaryTitle}>Report Summary</ThemedText>
        <ThemedText style={styles.summaryText}>
          • 12 fresh produce items updated{'\n'}
          • Sent at {submitTime.toLocaleTimeString()}{'\n'}
          • Next farm delivery report due: {nextReportTime.toLocaleDateString()} at 9:00 AM{'\n'}
          • All Philadelphia & NYC locations notified{'\n'}
          • Delivery confirmation received from 3 head chefs
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmark: {
    fontSize: 40,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#2D5D31',
  },
  successSubtext: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
    opacity: 0.8,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  reportSummary: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2D5D31',
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.7,
  },
});