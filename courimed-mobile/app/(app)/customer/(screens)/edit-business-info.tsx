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
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from "@components/CustomAlert";
import BottomSheetPicker from "@components/BottomSheetPicker";
import locationData from "@data/locationData.json";

export default function EditBusinessInfo() {
  const router = useRouter();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const [originalInfo, setOriginalInfo] = useState<{
    selectedType: "pharmacy" | "hospital" | "laboratory" | null;
    businessCategory: string;
    businessName: string;
    locationAlias: string;
    countryName: string;
    stateName: string;
    lgaName: string;
    townName: string;
    streetAddress: string;
    postalCode: string;
  }>({
    selectedType: null,
    businessCategory: "",
    businessName: "",
    locationAlias: "",
    countryName: "Nigeria",
    stateName: "",
    lgaName: "",
    townName: "",
    streetAddress: "",
    postalCode: "",
  });

  const [selectedType, setSelectedType] = useState<
    "pharmacy" | "hospital" | "laboratory" | null
  >(originalInfo.selectedType);
  const [businessCategory, setBusinessCategory] = useState(
    originalInfo.businessCategory
  );
  const [businessName, setBusinessName] = useState(originalInfo.businessName);
  const [locationAlias, setLocationAlias] = useState(
    originalInfo.locationAlias
  );
  const [countryName, setCountryName] = useState(originalInfo.countryName);
  const [stateName, setStateName] = useState(originalInfo.stateName);
  const [lgaName, setLgaName] = useState(originalInfo.lgaName);
  const [townName, setTownName] = useState(originalInfo.townName);
  const [streetAddress, setStreetAddress] = useState(
    originalInfo.streetAddress
  );
  const [postalCode, setPostalCode] = useState(originalInfo.postalCode);

  const businessTypeOptions = [
    { label: "Pharmacy", value: "pharmacy" },
    { label: "Hospital", value: "hospital" },
    { label: "Laboratory", value: "laboratory" },
  ];

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

  const isUnchanged = (current: string, original: string) =>
    current === original;

  useEffect(() => {
    const fetchedBusinessInfo = {
      selectedType: "pharmacy" as "pharmacy" | "hospital" | "laboratory",
      businessCategory: "Community Retail Pharmacy",
      businessName: "FaithMed Pharmacy",
      locationAlias: "Lekki Branch",
      countryName: "Nigeria",
      stateName: "Lagos",
      lgaName: "Ikeja",
      townName: "Lekki",
      streetAddress: "123 Lekki Road",
      postalCode: "101001",
    };

    setOriginalInfo(fetchedBusinessInfo);
    setSelectedType(fetchedBusinessInfo.selectedType);
    setBusinessCategory(fetchedBusinessInfo.businessCategory);
    setBusinessName(fetchedBusinessInfo.businessName);
    setLocationAlias(fetchedBusinessInfo.locationAlias);
    setCountryName(fetchedBusinessInfo.countryName);
    setStateName(fetchedBusinessInfo.stateName);
    setLgaName(fetchedBusinessInfo.lgaName);
    setTownName(fetchedBusinessInfo.townName);
    setStreetAddress(fetchedBusinessInfo.streetAddress);
    setPostalCode(fetchedBusinessInfo.postalCode);
  }, []);

  const hasChanges = () => {
    return (
      selectedType !== originalInfo.selectedType ||
      businessCategory !== originalInfo.businessCategory ||
      businessName !== originalInfo.businessName ||
      locationAlias !== originalInfo.locationAlias ||
      countryName !== originalInfo.countryName ||
      stateName !== originalInfo.stateName ||
      lgaName !== originalInfo.lgaName ||
      townName !== originalInfo.townName ||
      streetAddress !== originalInfo.streetAddress ||
      postalCode !== originalInfo.postalCode
    );
  };

  const handleSave = async () => {
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
          <Ionicons name="arrow-back" size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <Text style={styles.title}>Edit Business Information</Text>

        <Text style={styles.sectionTitle}>Business Classification</Text>
        <Text style={styles.sectionSubtitle}>Select your business type.</Text>
        <View style={styles.inputGroup}>
          <BottomSheetPicker
            label="Business Type"
            value={selectedType ?? ""}
            options={businessTypeOptions.map((o) => o.value)}
            onSelect={(val) => {
              setSelectedType(val as "pharmacy" | "hospital" | "laboratory");
              setBusinessCategory("");
            }}
            valueStyle={{
              color: isUnchanged(
                selectedType ?? "",
                originalInfo.selectedType ?? ""
              )
                ? colors.neutral[400]
                : colors.neutral[900],
            }}
            required
          />
        </View>

        <Text style={styles.sectionTitle}>Business Information</Text>
        <Text style={styles.sectionSubtitle}>
          Edit your business category and official business name.
        </Text>

        <View>
          <View style={styles.inputGroup}>
            <BottomSheetPicker
              label="Business Category"
              value={businessCategory}
              options={selectedType ? businessCategories[selectedType] : []}
              onSelect={(val) => setBusinessCategory(val)}
              valueStyle={{
                color: isUnchanged(
                  businessCategory,
                  originalInfo.businessCategory
                )
                  ? colors.neutral[400]
                  : colors.neutral[900],
              }}
              required
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Business Name <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: isUnchanged(businessName, originalInfo.businessName)
                    ? colors.neutral[400]
                    : colors.neutral[900],
                },
              ]}
              placeholder="e.g. FaithMed Pharmacy"
              placeholderTextColor={colors.neutral[500]}
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>

          <Text style={styles.sectionTitle}>Business Address</Text>
          <Text style={styles.sectionSubtitle}>
            Edit your business address details below.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Location Alias <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: isUnchanged(locationAlias, originalInfo.locationAlias)
                    ? colors.neutral[400]
                    : colors.neutral[900],
                },
              ]}
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
                valueStyle={{
                  color: isUnchanged(countryName, originalInfo.countryName)
                    ? colors.neutral[400]
                    : colors.neutral[900],
                }}
                required
              />
            </View>
            <View style={{ flex: 1 }}>
              <BottomSheetPicker
                label="State"
                value={stateName}
                options={stateOptions}
                onSelect={(val) => setStateName(val)}
                valueStyle={{
                  color: isUnchanged(stateName, originalInfo.stateName)
                    ? colors.neutral[400]
                    : colors.neutral[900],
                }}
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
                valueStyle={{
                  color: isUnchanged(lgaName, originalInfo.lgaName)
                    ? colors.neutral[400]
                    : colors.neutral[900],
                }}
                required
              />
            </View>
            <View style={{ flex: 1 }}>
              <BottomSheetPicker
                label="Town/Area"
                value={townName}
                options={townOptions}
                onSelect={setTownName}
                valueStyle={{
                  color: isUnchanged(townName, originalInfo.townName)
                    ? colors.neutral[400]
                    : colors.neutral[900],
                }}
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
                style={[
                  styles.input,
                  {
                    color: isUnchanged(
                      streetAddress,
                      originalInfo.streetAddress
                    )
                      ? colors.neutral[400]
                      : colors.neutral[900],
                  },
                ]}
                placeholder="Enter street name"
                placeholderTextColor={colors.neutral[500]}
                value={streetAddress}
                onChangeText={setStreetAddress}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Postal Code (Optional)</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: isUnchanged(postalCode, originalInfo.postalCode)
                      ? colors.neutral[400]
                      : colors.neutral[900],
                  },
                ]}
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
    borderWidth: 1,
    borderColor: colors.neutral[500],
  },
  bottomContainer: {
    paddingBottom: 20,
  },
  saveButton: {
    width: "100%",
    height: 50,
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    color: colors.shades.white,
  },
});
