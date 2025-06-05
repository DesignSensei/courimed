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
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from "../components/CustomAlert";
import BottomSheetPicker from "../components/BottomSheetPicker";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";

type Frequency = "Daily" | "Weekly" | "As Needed";

export default function ContactPerson() {
  const router = useRouter();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("NG");
  const [country, setCountry] = useState<Country | null>(null);
  const [deliveryFrequency, setDeliveryFrequency] = useState<Frequency | "">(
    ""
  );
  const [deliveryVolume, setDeliveryVolume] = useState("");
  const [paymentPreference, setPaymentPreference] = useState("");

  const frequencyOptions: Frequency[] = ["Daily", "Weekly", "As Needed"];

  const deliveryVolumeOptionsMap: Record<Frequency, string[]> = {
    Daily: [
      "Less than 5 deliveries per day",
      "5-10 deliveries per day",
      "More than 10 deliveries per day",
    ],
    Weekly: [
      "Less than 20 deliveries per week",
      "5-10 deliveries per week",
      "More than 10 deliveries per week",
    ],
    "As Needed": ["As needed (variable volume)"],
  };

  const handleContinue = async () => {
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !deliveryFrequency ||
      !deliveryVolume ||
      !paymentPreference
    ) {
      setAlertData({
        title: "Missing Info",
        message: "All fields are required to proceed.",
        onConfirm: () => setAlertVisible(false),
      });
      setAlertVisible(true);
      return;
    }

    setTimeout(() => {
      router.push({
        pathname: "/(auth)/accept-terms",
        params: {
          email: encodeURIComponent(email),
          phone: encodeURIComponent(phone),
          firstName: encodeURIComponent(firstName),
          lastName: encodeURIComponent(lastName),
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
          <Text style={styles.title}>Contact Person and Preferences</Text>
          <Text style={styles.subtitle}>
            Set your go-to person and the support you care about.
          </Text>

          <Text style={styles.sectionTitle}>Contact Person</Text>
          <Text style={styles.sectionSubtitle}>
            Provide the name and contact details of your primary liaison.
          </Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. John"
              placeholderTextColor={colors.neutral[400]}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Doe"
              placeholderTextColor={colors.neutral[400]}
              value={lastName}
              onChangeText={setLastName}
            />
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
            <Text style={styles.label}>Phone number</Text>
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

          <Text style={styles.sectionTitle}>Services Preferences</Text>
          <Text style={styles.sectionSubtitle}>
            Tell us how often and what volume of deliveries you expect, and your
            payment preference.
          </Text>
          <View style={styles.inputGroup}>
            <BottomSheetPicker
              label="Delivery Frequency"
              value={deliveryFrequency}
              options={frequencyOptions}
              onSelect={(val) => {
                setDeliveryFrequency(val as Frequency | "");
                setDeliveryVolume("");
              }}
              required
            />
          </View>

              <View style={styles.inputGroup}>
          <BottomSheetPicker
            label="Delivery Volume"
            value={deliveryVolume}
            options={
              deliveryFrequency
                ? deliveryVolumeOptionsMap[deliveryFrequency]
                : []
            }
            onSelect={setDeliveryVolume}
            required
          />
          </View>

          <View style={styles.inputGroup}>
            <BottomSheetPicker
              label="Payment Preference"
              value={paymentPreference}
              options={[
                "Pay-per-Delivery",
                "Wallet System",
                "Credit Invoicing",
              ]}
              onSelect={setPaymentPreference}
              required
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
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
    marginBottom: 8,
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
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
    color: colors.neutral[900],
    marginTop: 8,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[700],
    marginBottom: 16,
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
