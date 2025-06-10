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
import { colors } from "@constants/colors";
import { useState, useEffect } from "react";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from "@components/CustomAlert";

export default function EditcontactInfo() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("NG");
  const [country, setCountry] = useState<Country | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const [originalInfo, setOriginalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const contactInfo = {
      firstName: "Zuke",
      lastName: "Obilo",
      email: "zuke@mybiz.com",
      phone: "7012345678",
      countryCode: "NG" as CountryCode,
    };

    setFirstName(contactInfo.firstName);
    setLastName(contactInfo.lastName);
    setEmail(contactInfo.email);
    setPhone(contactInfo.phone);
    setOriginalInfo({
      firstName: contactInfo.firstName,
      lastName: contactInfo.lastName,
      email: contactInfo.email,
      phone: contactInfo.phone,
    });
  }, []);

  const hasChanges = () => {
    return (
      firstName !== originalInfo.firstName ||
      lastName !== originalInfo.lastName ||
      email !== originalInfo.email ||
      phone !== originalInfo.phone
    );
  };

  const handleSave = async () => {
    if (!firstName || !lastName || !phone || !email) {
      setAlertData({
        title: "Missing Info",
        message: "First name, last name, phone, and email are required.",
        onConfirm: () => setAlertVisible(false),
      });
      setAlertVisible(true);
      return;
    }

    try {
      setAlertData({
        title: "Success",
        message: "Your info has been updated.",
        onConfirm: () => {
          setAlertVisible(false);
          router.back();
        },
      });
      setAlertVisible(true);
    } catch (error) {
      setAlertData({
        title: "Error",
        message: "Something went wrong. Please try again.",
        onConfirm: () => setAlertVisible(false),
      });
      setAlertVisible(true);
    }
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
          <Ionicons name="arrow-back" size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <View style={styles.topContainer}>
          <Text style={styles.title}>Edit Your Profile</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>First name</Text>
            <TextInput
              style={[
                styles.input,
                {
                  color:
                    firstName === originalInfo.firstName
                      ? colors.neutral[400]
                      : colors.neutral[900],
                },
              ]}
              placeholder="e.g. John"
              placeholderTextColor={colors.neutral[300]}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last name</Text>
            <TextInput
              style={[
                styles.input,
                {
                  color:
                    lastName === originalInfo.lastName
                      ? colors.neutral[400]
                      : colors.neutral[900],
                },
              ]}
              placeholder="e.g. Doe"
              placeholderTextColor={colors.neutral[300]}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={[
                styles.input,
                {
                  color:
                    email === originalInfo.email
                      ? colors.neutral[400]
                      : colors.neutral[900],
                },
              ]}
              placeholder="e.g. business@example.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={colors.neutral[300]}
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
                style={[
                  styles.phoneInput,
                  {
                    color:
                      phone === originalInfo.phone
                        ? colors.neutral[400]
                        : colors.neutral[900],
                  },
                ]}
                placeholder="e.g. 7012345678"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                placeholderTextColor={colors.neutral[300]}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.saveButton, { opacity: hasChanges() ? 1 : 0.5 }]}
          disabled={!hasChanges()}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
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
  countryWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
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
  saveButton: {
    width: "100%",
    height: 50,
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  saveButtonText: {
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
  dropdownIcon: {
    marginLeft: -8,
  },
});
