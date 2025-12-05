import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

// Payroll processing screen with guidance demo
export default function PayrollGuidanceScreen() {
  const [showGuidance, setShowGuidance] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [employeesProcessed, setEmployeesProcessed] = useState(0);
  const [processingStartTime, setProcessingStartTime] = useState<Date | null>(null);

  const handleProcessPayroll = async () => {
    setIsProcessing(true);
    setProcessingStartTime(new Date());
    setEmployeesProcessed(0);
    
    // Simulate the payroll proccess - this feels pretty realistic
    const totalEmployees = 147;
    const processingInterval = setInterval(() => {
      setEmployeesProcessed(prev => {
        const next = Math.min(prev + Math.floor(Math.random() * 15) + 5, totalEmployees);
        return next;
      });
    }, 200);
    
    // Give it a realistic delay so it feels like actual work is happening
    setTimeout(() => {
      clearInterval(processingInterval);
      setEmployeesProcessed(totalEmployees);
      setIsProcessing(false);
      setShowGuidance(true);
    }, 2500);
  };

  const handleGoToReports = () => {
    // Mock up some realistic payroll data
    const reportDetails = {
      processed: employeesProcessed,
      startTime: processingStartTime?.toLocaleString(),
      totalHours: 'calculating...',
      grossPay: '$45,230.75',
      taxes: '$8,945.12'
    };
    
    Alert.alert(
      'Payroll Reports Ready', 
      `Successfully processed ${reportDetails.processed} employees.\nGross Pay: ${reportDetails.grossPay}\nNavigation: Reports → Audit Logs → Payroll`,
      [
        { text: 'View Summary', onPress: () => console.log('Report:', reportDetails) },
        { text: 'Go Back', onPress: () => router.back() }
      ]
    );
  };

  const handleReturnHome = () => {
    router.push('/');
  };

  return (
    <ThemedView style={styles.container}>
      {!showGuidance ? (
        <>
          {/* Header with icon */}
          <View style={styles.successHeader}>
            <View style={styles.iconContainer}>
              <ThemedText style={styles.icon}>💰</ThemedText>
            </View>
            <ThemedText type="title" style={styles.successTitle}>
              Payroll Management
            </ThemedText>
            <ThemedText style={styles.successSubtext}>
              Process weekly payroll for restaurant staff across all Cherry Hill locations.
            </ThemedText>
          </View>

          {/* Action buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton, isProcessing && styles.processingButton]}
              onPress={handleProcessPayroll}
              disabled={isProcessing}
            >
              <ThemedText style={styles.primaryButtonText}>
                {isProcessing ? `Processing ${employeesProcessed}/147 employees...` : 'Process Weekly Payroll'}
              </ThemedText>
              {isProcessing && (
                <ThemedText style={styles.loadingText}>⏳</ThemedText>
              )}
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

          {/* Info summary */}
          <View style={styles.reportSummary}>
            <ThemedText style={styles.summaryTitle}>Process Info</ThemedText>
            <ThemedText style={styles.summaryText}>
              • Calculates pay for {employeesProcessed || 147} active employees{'\n'}
              • Processing typically takes 2-3 minutes{'\n'}
              • Covers all Philadelphia & NYC locations{'\n'}
              • Generates audit trails automatically{'\n'}
              • {isProcessing ? 'Currently processing...' : 'Ready for next payroll cycle'}
            </ThemedText>
          </View>
        </>
      ) : (
        // Success state after processing
        <>
          {/* Success header */}
          <View style={styles.successHeader}>
            <View style={styles.iconContainer}>
              <ThemedText style={styles.icon}>✅</ThemedText>
            </View>
            <ThemedText type="title" style={styles.successTitle}>
              Payroll Processed Successfully!
            </ThemedText>
            <ThemedText style={styles.successSubtext}>
              Weekly payroll has been calculated and is ready for review.
            </ThemedText>
          </View>

          {/* Action buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]}
              onPress={handleGoToReports}
            >
              <ThemedText style={styles.primaryButtonText}>
                Go to Reports
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

          {/* Guidance info */}
          <View style={styles.reportSummary}>
            <ThemedText style={styles.summaryTitle}>Next Steps</ThemedText>
            <ThemedText style={styles.summaryText}>
              • Go to Reports in the main menu{'\n'}
              • Select Audit Logs{'\n'}
              • Filter by Payroll category{'\n'}
              • Review detailed audit trails
            </ThemedText>
          </View>
        </>
      )}
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
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 40,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#1565C0',
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
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  processingButton: {
    backgroundColor: '#90CAF9',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1976D2',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  secondaryButtonText: {
    color: '#1976D2',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 20,
    color: 'white',
  },
  reportSummary: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1565C0',
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.7,
  },
});