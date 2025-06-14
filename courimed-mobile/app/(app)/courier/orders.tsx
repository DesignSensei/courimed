import { View, Text, StyleSheet } from "react-native";
import { colors } from "@constants/colors";

export default function Orders() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      <Text style={styles.subtitle}>You have no orders yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shades.white,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
    color: colors.neutral[900],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[600],
    textAlign: "center",
  },
});