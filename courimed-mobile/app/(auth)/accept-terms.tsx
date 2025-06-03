import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { colors } from "../constants/colors";

export default function AcceptTerms() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const handleContinue = () => {
    if (accepted) {
      router.push("/login");
    }
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
        <Text style={styles.title}>Accept Terms & Privacy</Text>
        <Text style={styles.subtitle}>
          Please read and accept our Terms of Service and Privacy Policy to
          continue.
        </Text>

        <ScrollView style={styles.termsBox}>
          <TouchableOpacity
            style={styles.iconTextRow}
            onPress={() => {}}
          >
            <View style={styles.iconBackground}>
              <Ionicons
                name="document-text"
                size={24}
                color={colors.primary[500]}
              />
            </View>
            <Text style={styles.termsLabel}>Terms of Use</Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.neutral[600]}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconTextRow}
            onPress={() => {}}
          >
            <View style={styles.iconBackground}>
              <Ionicons
                name="document-text"
                size={24}
                color={colors.primary[500]}
              />
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
            {accepted && (
              <Ionicons
                name="checkmark"
                size={18}
                color={colors.shades.white}
              />
            )}
          </View>
          <Text style={styles.checkboxLabel}>
            I accept the Terms of Service and Privacy Policy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.continueButton, !accepted && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!accepted}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
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
  termsText: {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[800],
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
});
