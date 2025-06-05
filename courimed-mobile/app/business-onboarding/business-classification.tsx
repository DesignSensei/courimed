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
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import CustomAlert from "../components/CustomAlert";
import BottomSheetPicker from "../components/BottomSheetPicker";
import locationData from "../data/locationData.json";

export default function BusinessClassification() {
  const router = useRouter();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const [selectedType, setSelectedType] = useState<
    "pharmacy" | "hospital" | "laboratory" | null
  >(null);
  const [businessCategory, setBusinessCategory] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [locationAlias, setLocationAlias] = useState("");
  const [countryName, setCountryName] = useState("Nigeria");
  const [stateName, setStateName] = useState("");
  const [lgaName, setLgaName] = useState("");
  const [townName, setTownName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const countryOptions = locationData.countries;
  const selectedCountry = countryName;
  const statesByCountry = locationData.statesByCountry as Record<
    string,
    string[]
  >;
  const stateOptions = statesByCountry[selectedCountry] || [];
  const lgasByState: Record<string, string[]> = locationData.lgasByState || {};
  const townsByLGA: Record<string, string[]> = locationData.townsByLGA || {};
  const lgaOptions = lgasByState[stateName] || [];
  const townOptions = townsByLGA[lgaName] || [];

  const businessCategories = {
    pharmacy: [
      "Community Retail Pharmacy",
      "Online Pharmacy",
      "Hospital Pharmacy",
      "Wholesale Pharmacy",
      "Pharmaceutical Distributor",
    ],
    hospital: [
      "General Hospital",
      "Specialist Hospital",
      "Eye Clinic",
      "Dental Clinic",
      "ENT Clinic",
      "Fertility Clinic",
      "Other Clinic",
    ],
    laboratory: ["Diagnostic Laboratory", "Research Laboratory"],
  };

  const handleContinue = async () => {
    if (
      !businessCategory ||
      !businessName ||
      !selectedType ||
      !locationAlias ||
      !countryName ||
      !stateName ||
      !lgaName ||
      !townName ||
      !streetAddress
    ) {
      setAlertData({
        title: "Missing Info",
        message: "Please select a business type and fill out the fields.",
        onConfirm: () => setAlertVisible(false),
      });
      setAlertVisible(true);
      return;
    }

    router.push("/business-onboarding/contact-person");
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
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Register your Business</Text>

        <Text style={styles.sectionTitle}>Business Classification</Text>
        <Text style={styles.sectionSubtitle}>Select your business type.</Text>
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedType === "pharmacy" && styles.activeTab,
            ]}
            onPress={() => {
              setSelectedType("pharmacy");
              setBusinessCategory("");
            }}
          >
            <FontAwesome5
              name="prescription-bottle-alt"
              size={18}
              color={
                selectedType === "pharmacy"
                  ? colors.shades.white
                  : colors.neutral[700]
              }
              style={styles.icon}
            />
            <Text
              style={[
                styles.tabText,
                selectedType === "pharmacy" && styles.activeTabText,
              ]}
            >
              Pharmacy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedType === "hospital" && styles.activeTab,
            ]}
            onPress={() => {
              setSelectedType("hospital");
              setBusinessCategory("");
            }}
          >
            <MaterialIcons
              name="local-hospital"
              size={18}
              color={
                selectedType === "hospital"
                  ? colors.shades.white
                  : colors.neutral[700]
              }
              style={styles.icon}
            />
            <Text
              style={[
                styles.tabText,
                selectedType === "hospital" && styles.activeTabText,
              ]}
            >
              Hospital
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedType === "laboratory" && styles.activeTab,
            ]}
            onPress={() => {
              setSelectedType("laboratory");
              setBusinessCategory("");
            }}
          >
            <Ionicons
              name="flask"
              size={18}
              color={
                selectedType === "laboratory"
                  ? colors.shades.white
                  : colors.neutral[700]
              }
              style={styles.icon}
            />
            <Text
              style={[
                styles.tabText,
                selectedType === "laboratory" && styles.activeTabText,
              ]}
            >
              Laboratory
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Business Information</Text>
        <Text style={styles.sectionSubtitle}>
          Enter your business category and official business name.
        </Text>

        <View>
          <View style={styles.inputGroup}>
            <BottomSheetPicker
              label="Business Category"
              value={businessCategory}
              options={selectedType ? businessCategories[selectedType] : []}
              onSelect={(val) => setBusinessCategory(val)}
              required
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Business Name <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. FaithMed Pharmacy"
              placeholderTextColor={colors.neutral[500]}
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>

          <Text style={styles.sectionTitle}>Business Address</Text>
          <Text style={styles.sectionSubtitle}>
            Provide your business address for pickups. Additional locations can
            be added later.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Location Alias <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter location alias. (e.g Lekki Branch or Head Office)"
              placeholderTextColor={colors.neutral[500]}
              value={locationAlias}
              onChangeText={setLocationAlias}
            />
          </View>

          <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
            <View style={{ flex: 1 }}>
              <BottomSheetPicker
                label="Country"
                value={countryName}
                options={countryOptions}
                onSelect={(val) => setCountryName(val)}
                required
              />
            </View>
            <View style={{ flex: 1 }}>
              <BottomSheetPicker
                label="State"
                value={stateName}
                options={stateOptions}
                onSelect={(val) => setStateName(val)}
                required
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
            <View style={{ flex: 1 }}>
              <BottomSheetPicker
                label="LGA"
                value={lgaName}
                options={lgaOptions}
                onSelect={setLgaName}
                required
              />
            </View>
            <View style={{ flex: 1 }}>
              <BottomSheetPicker
                label="Town/Area"
                value={townName}
                options={townOptions}
                onSelect={setTownName}
                required
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>
                Street Address <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter street name"
                placeholderTextColor={colors.neutral[500]}
                value={streetAddress}
                onChangeText={setStreetAddress}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>
                Postal Code (Optional)
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter postal code"
                placeholderTextColor={colors.neutral[500]}
                value={postalCode}
                onChangeText={setPostalCode}
                keyboardType="numeric"
              />
            </View>
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
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backIcon: {
    fontSize: 20,
    color: colors.neutral[800],
  },
  title: {
    fontSize: 28,
    fontFamily: "Nunito_700Bold",
    color: colors.neutral[900],
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[700],
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
    color: colors.neutral[900],
    marginTop: 24,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[700],
    marginBottom: 8,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: colors.shades.white,
  },
  activeTab: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  tabText: {
    fontSize: 14,
    fontFamily: "Nunito_600SemiBold",
    color: colors.neutral[700],
  },
  activeTabText: {
    color: colors.shades.white,
  },
  icon: {
    marginRight: 4,
  },
  inputGroup: {
    marginTop: 12,
  },
  label: {
    fontSize: 14,
    fontFamily: "Nunito_600SemiBold",
    color: colors.neutral[800],
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
  dropdownText: {
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[900],
  },
  placeholderText: {
    color: colors.neutral[500],
  },
  bottomContainer: {
    paddingBottom: 20,
  },
  continueButton: {
    width: "100%",
    height: 50,
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    color: colors.shades.white,
  },
  sheetTitle: {
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    color: colors.neutral[900],
    marginBottom: 12,
  },
  dropdownOption: {
    paddingVertical: 14,
    borderBottomColor: colors.neutral[200],
    borderBottomWidth: 1,
  },
  dropdownOptionText: {
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[900],
  },
  disabledDropdown: {
    borderColor: colors.neutral[500],
  },
});
