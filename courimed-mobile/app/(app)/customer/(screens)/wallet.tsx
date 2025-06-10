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
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import CustomAlert from "@components/CustomAlert";

export default function Wallet() {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  return (
    <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={colors.neutral[900]} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Wallet</Text>
            <View style={styles.sideIcon} />
          </View>
          </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[100],
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 24,
  },
  headerText: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
    color: colors.neutral[900],
    textAlign: "center",
  },
  sideIcon: {
    width: 40,
    alignItems: "flex-start",
  },
})