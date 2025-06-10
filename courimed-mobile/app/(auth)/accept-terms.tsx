import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { colors } from "@constants/colors";

export default function AcceptTerms() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const handleContinue = () => {
    if (accepted) {
      setAlertData({
        title: "Account Creation",
        message: "Are you sure you want to create your business account?",
        onConfirm: () => {
          setAlertVisible(false);
          router.push("/loading-screen");
        },
      });
      setAlertVisible(true);
      return;
    }
    router.push("/loading-screen");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonIcon}>←</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.subtitle}>
          Please review our Terms of Service and Privacy Policy before proceeding.
        </Text>

        <ScrollView style={styles.termsBox}>
          <TouchableOpacity style={styles.iconTextRow} onPress={() => {}}>
            <View style={styles.iconBackground}>
              <Ionicons name="document-text" size={24} color={colors.primary[500]} />
            </View>
            <Text style={styles.termsLabel}>Terms of Service</Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.neutral[600]}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconTextRow} onPress={() => {}}>
            <View style={styles.iconBackground}>
              <Ionicons name="document-text" size={24} color={colors.primary[500]} />
            </View>
            <Text style={styles.termsLabel}>Privacy Policy</Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.neutral[600]}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAccepted(!accepted)}
        >
          <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
            {accepted && <Ionicons name="checkmark" size={18} color={colors.shades.white} />}
          </View>
          <Text style={styles.checkboxLabel}>
            I agree to Courimed's Terms & Conditions. <Text style={{ color: "red" }}>*</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.continueButton, !accepted && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!accepted}
        >
          <Text style={styles.continueButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for confirmation */}
      <Modal
        visible={alertVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{alertData.title}</Text>
            <Text style={styles.modalMessage}>{alertData.message}</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setAlertVisible(false)}
              >
                <Text style={styles.cancelButtonText}>No, cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={alertData.onConfirm}
              >
                <Text style={styles.confirmButtonText}>Yes, create it!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shades.white,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontFamily: "Nunito_700Bold",
    color: colors.neutral[900],
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[700],
    marginBottom: 20,
  },
  termsBox: {
    flex: 1,
    borderColor: colors.neutral[300],
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: colors.neutral[500],
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  checkboxLabel: {
    fontSize: 14,
    fontFamily: "Nunito_600SemiBold",
    color: colors.neutral[900],
    flexShrink: 1,
  },
  continueButton: {
    height: 50,
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  buttonDisabled: {
    backgroundColor: colors.neutral[300],
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    color: colors.shades.white,
  },
  iconTextRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  iconBackground: {
    backgroundColor: colors.neutral[100],
    borderRadius: 8,
    padding: 6,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  termsLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
    color: colors.neutral[800],
  },
  forwardIcon: {
    marginLeft: 8,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  backButtonIcon: {
    fontSize: 24,
    color: colors.neutral[800],
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  modalContainer: {
    backgroundColor: colors.shades.white,
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: "Nunito_700Bold",
    marginBottom: 8,
    color: colors.neutral[900],
  },
  modalMessage: {
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[800],
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 12,
  },
  cancelButton: {
    backgroundColor: colors.neutral[200],
  },
  confirmButton: {
    backgroundColor: colors.primary[500],
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
    color: colors.neutral[700],
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    color: colors.shades.white,
  },
});