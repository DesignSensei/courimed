import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import CustomAlert from '../components/CustomAlert';
import { colors } from '../constants/colors';

const OTP = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(60);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({ title: '', message: '', onConfirm: () => {} });
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>(new Array(6).fill(null));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setAlertData({
        title: 'Error',
        message: 'Please enter a 6-digit OTP',
        onConfirm: () => setAlertVisible(false),
      });
      setAlertVisible(true);
      return;
    }
    if (timer <= 0) {
      setAlertData({
        title: 'Error',
        message: 'OTP has expired. Please request a new one.',
        onConfirm: () => setAlertVisible(false),
      });
      setAlertVisible(true);
      return;
    }

    try {
      const response = await fetch('http://192.168.133.221:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpCode }),
      });
      const data = await response.json();
      if (data.message === 'OTP verified') {
        setAlertData({
          title: 'Success',
          message: 'Verification complete!',
          onConfirm: () => {
            setAlertVisible(false);
            router.push('/login');
          },
        });
        setAlertVisible(true);
      } else {
        setAlertData({
          title: 'Error',
          message: data.message || 'Verification failed',
          onConfirm: () => setAlertVisible(false),
        });
        setAlertVisible(true);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setAlertData({
        title: 'Error',
        message: errorMessage,
        onConfirm: () => setAlertVisible(false),
      });
      setAlertVisible(true);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      const response = await fetch('http://192.168.133.221:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.message === 'OTP sent') {
        setOtp(['', '', '', '', '', '']);
        setTimer(60);
        setCanResend(false);
        setAlertData({
          title: 'Success',
          message: 'A new OTP has been sent.',
          onConfirm: () => setAlertVisible(false),
        });
        setAlertVisible(true);
      } else {
        setAlertData({
          title: 'Error',
          message: data.message || 'Failed to resend OTP',
          onConfirm: () => setAlertVisible(false),
        });
        setAlertVisible(true);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setAlertData({
        title: 'Error',
        message: errorMessage,
        onConfirm: () => setAlertVisible(false),
      });
      setAlertVisible(true);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const setRef = useCallback((index: number) => (ref: TextInput | null) => {
    inputRefs.current[index] = ref;
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.instruction}>Enter the OTP sent to {email}</Text>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={setRef(index)}
            style={styles.otpBox}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>

      <Text style={styles.timer}>Time remaining: {formatTimer(timer)}</Text>

      <Pressable
        style={[styles.verifyButton, styles.resendButton, !canResend && styles.disabledButton]}
        onPress={handleResend}
        disabled={!canResend}
      >
        <Text style={styles.resendButtonText}>Resend Code</Text>
      </Pressable>

      <Pressable style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
      </Pressable>

      <CustomAlert
        isVisible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        onConfirm={alertData.onConfirm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.shades.white,
  },
  header: {
    alignItems: 'flex-start',
    marginTop: 64,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.primary[500],
    fontFamily: 'Nunito_400Regular',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.neutral[900],
    fontFamily: 'Nunito_700Bold',
    marginBottom: 5,
  },
  instruction: {
    fontSize: 16,
    color: colors.neutral[600],
    fontFamily: 'Nunito_400Regular',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    width: 52,
    height: 64,
    backgroundColor: colors.neutral[200],
    borderRadius: 8,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Nunito_400Regular',
  },
  timer: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: colors.neutral[600],
    fontFamily: 'Nunito_400Regular',
  },
  verifyButton: {
    backgroundColor: colors.primary[500],
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  resendButton: {
    backgroundColor: colors.primary[500],
  },
  disabledButton: {
    backgroundColor: colors.neutral[300],
  },
  verifyButtonText: {
    color: colors.shades.white,
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
  resendButtonText: {
    color: colors.shades.white,
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
});

export default OTP;