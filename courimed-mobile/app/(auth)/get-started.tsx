import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../constants/colors";
import { useState } from "react";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from "../components/CustomAlert";

export default function Signup() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("NG");
  const [country, setCountry] = useState<Country | null>(null);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const handleSignup = async () => {
    if (!phone || !email) {
      setAlertData({
        title: "Missing Info",
        message: "Phone and email are required.",
        onConfirm: () => setAlertVisible(false),
      });
      setAlertVisible(true);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      router.push({
        pathname: "/otp",
        params: {
          email: encodeURIComponent(email),
          phone: encodeURIComponent(phone),
        },
      });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.topContainer}>
          <Text style={styles.title}>Let’s get started</Text>
          <Text style={styles.subtitle}>
            Enter your mobile number and email address and we’ll send a 6-digit
            code to confirm it. SMS rates may apply.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile number</Text>
            <View style={styles.phoneRow}>
              <TouchableOpacity style={styles.countryWrapper}>
                <CountryPicker
                  countryCode={countryCode}
                  withFilter
                  withCallingCodeButton
                  withFlag
                  withCountryNameButton={false}
                  withCallingCode
                  onSelect={(country) => {
                    setCountryCode(country.cca2);
                    setCountry(country);
                  }}
                  containerButtonStyle={styles.countryPicker}
                />
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={colors.neutral[600]}
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>

              <TextInput
                style={styles.phoneInput}
                placeholder="e.g. 7012345678"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                placeholderTextColor={colors.neutral[400]}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. user@example.com"
              placeholderTextColor={colors.neutral[400]}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Referral code (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. REF123"
              placeholderTextColor={colors.neutral[400]}
              autoCapitalize="characters"
              value={referralCode}
              onChangeText={setReferralCode}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.continueButton} onPress={handleSignup}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        <CustomAlert
          isVisible={alertVisible}
          title={alertData.title}
          message={alertData.message}
          onConfirm={alertData.onConfirm}
        />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shades.white,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingVertical: 40,
  },
  topContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: "Nunito_700Bold",
    color: colors.neutral[900],
    marginBottom: 10,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[700],
    textAlign: "left",
    marginBottom: 30,
    paddingRight: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Nunito_600SemiBold",
    color: colors.neutral[900],
    marginBottom: 6,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[900],
    borderWidth: 1,
    borderColor: colors.neutral[500],
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral[500],
    paddingHorizontal: 10,
    height: 50,
    width: "100%",
  },
  countryPicker: {
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[900],
  },
  bottomContainer: {
    marginTop: 30,
  },
  continueButton: {
    width: "100%",
    height: 50,
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    color: colors.shades.white,
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
  countryWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },

  dropdownIcon: {
    marginLeft: -8,
  },
});
