import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

type FeedbackType = 'success' | 'error' | 'loading' | null;
type ActionType = 'inventory_submit' | 'payroll_process' | 'user_login' | null;

// Interactive demo for all three feedback types
export default function FeedbackDemoScreen() {
  const [currentFeedback, setCurrentFeedback] = useState<FeedbackType>(null);
  const [currentAction, setCurrentAction] = useState<ActionType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [attemptCount, setAttemptCount] = useState(0);
  const [lastActionTime, setLastActionTime] = useState<Date | null>(null);

  // Auto-dismiss the banners - found 4 seconds works well
  useEffect(() => {
    if (currentFeedback && currentFeedback !== 'loading') {
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setCurrentFeedback(null);
        });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentFeedback, fadeAnim]);

  const showBanner = (type: FeedbackType) => {
    setCurrentFeedback(type);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideBanner = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentFeedback(null);
    });
  };

  const simulateInventorySubmission = () => {
    setCurrentAction('inventory_submit');
    setAttemptCount(prev => prev + 1);
    setLastActionTime(new Date());
    
    // 15% chance of validation error for realism
    if (Math.random() < 0.15) {
      showBanner('error');
    } else {
      showBanner('success');
    }
  };

  const simulatePayrollProcessing = () => {
    setCurrentAction('payroll_process');
    setAttemptCount(prev => prev + 1);
    setLastActionTime(new Date());
    showBanner('error'); // Payroll often has validation issues
  };

  const simulateSlowOperation = () => {
    setCurrentAction('inventory_submit');
    setIsLoading(true);
    showBanner('loading');
    setAttemptCount(prev => prev + 1);
    setLastActionTime(new Date());
    
    // Realistic variable timing: 6-9 seconds
    const processingTime = 6000 + Math.random() * 3000;
    
    setTimeout(() => {
      setIsLoading(false);
      hideBanner();
      // 80% success rate after loading
      setTimeout(() => {
        if (Math.random() < 0.8) {
          simulateInventorySubmission();
        } else {
          simulatePayrollProcessing();
        }
      }, 500);
    }, processingTime);
  };

  const handleReturnHome = () => {
    router.push('/');
  };

  const clearSession = () => {
    setCurrentFeedback(null);
    setCurrentAction(null);
    setAttemptCount(0);
    setLastActionTime(null);
    setIsLoading(false);
    hideBanner();
  };

  const getBannerStyle = () => {
    switch (currentFeedback) {
      case 'success':
        return styles.successBanner;
      case 'error':
        return styles.errorBanner;
      case 'loading':
        return styles.loadingBanner;
      default:
        return {};
    }
  };

  const getBannerText = () => {
    const actionContext = getActionContext();
    switch (currentFeedback) {
      case 'success':
        return {
          icon: '✅',
          title: actionContext.successTitle,
          message: actionContext.successMessage,
        };
      case 'error':
        return {
          icon: '❌',
          title: 'Input Error',
          message: actionContext.errorMessage,
        };
      case 'loading':
        return {
          icon: '⏳',
          title: 'Please Wait...',
          message: actionContext.loadingMessage,
        };
      default:
        return { icon: '', title: '', message: '' };
    }
  };

  const getActionContext = () => {
    switch (currentAction) {
      case 'inventory_submit':
        return {
          successTitle: 'Inventory Submitted!',
          successMessage: `Fresh produce inventory for ${new Date().toLocaleDateString()} has been distributed to all head chefs.`,
          errorMessage: 'Please ensure all required inventory fields are completed. Missing: Organic vegetables count.',
          loadingMessage: 'Syncing inventory data across all 12 restaurant locations. Estimated time: 7 seconds.'
        };
      case 'payroll_process':
        return {
          successTitle: 'Payroll Processed!',
          successMessage: `Weekly payroll for ${new Date().toLocaleDateString()} calculated successfully. 147 employees processed.`,
          errorMessage: 'Payroll validation failed. Please verify employee hours for Philadelphia location before proceeding.',
          loadingMessage: 'Calculating payroll for all staff members. Processing tax deductions and benefits...'
        };
      case 'user_login':
        return {
          successTitle: 'Login Successful!',
          successMessage: `Welcome back! Last login: ${lastActionTime?.toLocaleString() || 'First time'}`,
          errorMessage: 'Login failed. Please check your credentials. Hint: Use your Cherry Hill restaurant manager ID.',
          loadingMessage: 'Authenticating with restaurant management system. Verifying permissions...'
        };
      default:
        return {
          successTitle: 'Action Completed!',
          successMessage: 'Your restaurant management action was completed successfully.',
          errorMessage: 'Please check your input and try again. Contact IT support if problem persists.',
          loadingMessage: 'Processing your request. Updating all restaurant locations...'
        };
    }
  };

  const isDisabled = isLoading || currentFeedback === 'loading';

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Feedback Demo
        </ThemedText>
        <ThemedText style={styles.headerSubtext}>
          Test different types of system feedback
        </ThemedText>
      </View>

      {/* Feedback Banner */}
      {currentFeedback && (
        <Animated.View 
          style={[
            styles.banner,
            getBannerStyle(),
            { opacity: fadeAnim }
          ]}
        >
          <View style={styles.bannerContent}>
            <ThemedText style={styles.bannerIcon}>
              {getBannerText().icon}
            </ThemedText>
            <View style={styles.bannerTextContainer}>
              <ThemedText style={styles.bannerTitle}>
                {getBannerText().title}
              </ThemedText>
              <ThemedText style={styles.bannerMessage}>
                {getBannerText().message}
              </ThemedText>
            </View>
          </View>
          {currentFeedback !== 'loading' && (
            <TouchableOpacity onPress={hideBanner} style={styles.closeButton}>
              <ThemedText style={styles.closeButtonText}>×</ThemedText>
            </TouchableOpacity>
          )}
        </Animated.View>
      )}

      {/* Demo Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.demoButton, 
            styles.successButton,
            isDisabled && styles.disabledButton
          ]}
          onPress={simulateInventorySubmission}
          disabled={isDisabled}
        >
          <ThemedText style={[styles.buttonText, styles.successButtonText]}>
            Simulate Inventory Submission
          </ThemedText>
          <ThemedText style={styles.buttonDescription}>
            Test produce report submission with validation
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.demoButton, 
            styles.errorButton,
            isDisabled && styles.disabledButton
          ]}
          onPress={simulatePayrollProcessing}
          disabled={isDisabled}
        >
          <ThemedText style={[styles.buttonText, styles.errorButtonText]}>
            Simulate Payroll Processing
          </ThemedText>
          <ThemedText style={styles.buttonDescription}>
            Test payroll validation with error handling
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.demoButton, 
            styles.loadingButton,
            isDisabled && styles.disabledButton
          ]}
          onPress={simulateSlowOperation}
          disabled={isDisabled}
        >
          <ThemedText style={[styles.buttonText, styles.loadingButtonText]}>
            Simulate Multi-Location Sync
          </ThemedText>
          <ThemedText style={styles.buttonDescription}>
            Test slow network operations (6-9 seconds)
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Functional status indicator with business metrics */}
      {(isLoading || attemptCount > 0) && (
        <View style={styles.statusIndicator}>
          {isLoading ? (
            <ThemedText style={styles.statusText}>
              🔄 Syncing with restaurant locations... Buttons disabled during operation.
            </ThemedText>
          ) : (
            <View style={styles.metricsContainer}>
              <ThemedText style={styles.metricsTitle}>Session Statistics</ThemedText>
              <View style={styles.metricsRow}>
                <ThemedText style={styles.metricItem}>Actions: {attemptCount}</ThemedText>
                <ThemedText style={styles.metricItem}>Current: {currentAction || 'None'}</ThemedText>
                <ThemedText style={styles.metricItem}>
                  Last: {lastActionTime?.toLocaleTimeString() || 'Never'}
                </ThemedText>
              </View>
            </View>
          )}
        </View>
      )}

      {/* Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.homeButton}
          onPress={handleReturnHome}
        >
          <ThemedText style={styles.homeButtonText}>
            Return to Home
          </ThemedText>
        </TouchableOpacity>
        
        {attemptCount > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={clearSession}
          >
            <ThemedText style={styles.clearButtonText}>
              Clear Session Data
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtext: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  banner: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  successBanner: {
    backgroundColor: '#E8F5E8',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  errorBanner: {
    backgroundColor: '#FFEBEE',
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  loadingBanner: {
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bannerIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bannerMessage: {
    fontSize: 14,
    opacity: 0.8,
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 20,
    opacity: 0.6,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  demoButton: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 4,
  },
  successButton: {
    backgroundColor: '#E8F5E8',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  errorButton: {
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#F44336',
  },
  loadingButton: {
    backgroundColor: '#FFF3E0',
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  successButtonText: {
    color: '#2D5D31',
  },
  errorButtonText: {
    color: '#C62828',
  },
  loadingButtonText: {
    color: '#E65100',
  },
  buttonDescription: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
  statusIndicator: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.6,
  },
  metricsContainer: {
    width: '100%',
  },
  metricsTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metricItem: {
    fontSize: 11,
    opacity: 0.7,
    textAlign: 'center',
  },
  footer: {
    marginBottom: 20,
  },
  homeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginBottom: 8,
  },
  homeButtonText: {
    fontSize: 16,
    opacity: 0.7,
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#FFE0E0',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    color: '#D63031',
    fontWeight: '500',
  },
});