import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { colors } from "../../constants/colors";
import { useRouter } from "expo-router";
import { ScrollView, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const router = useRouter();
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_HORIZONTAL_PADDING = 20;
const CARD_MARGIN_RIGHT = 16;
// Keep original card width but adjust for centering
const CARD_WIDTH = SCREEN_WIDTH - CARD_HORIZONTAL_PADDING * 2;

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/customer/profile")}>
          <Image
            source={require("../../../assets/images/protonaut-2.png")}
            style={styles.avatar}
          />
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.greeting}>Hello Izu</Text>
          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={14}
              color={colors.neutral[600]}
            />
            <Text style={styles.locationText}>Oshodi, Lagos</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notification}>
          <Ionicons
            name="notifications-outline"
            size={20}
            color={colors.neutral[800]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.deliverySection}>
        <Text style={styles.sectionTitle}>
          Available Delivery Windows (Today)
        </Text>

        <ScrollView
          horizontal
          snapToInterval={CARD_WIDTH + CARD_MARGIN_RIGHT}
          snapToAlignment="center"
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: CARD_HORIZONTAL_PADDING,
          }}
        >
          {[...Array(5)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.deliveryCard,
                {
                  width: CARD_WIDTH,
                  marginRight: index === 4 ? 0 : CARD_MARGIN_RIGHT,
                },
              ]}
            >
              <Text style={styles.cardText}>Slot {index + 1}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shades.white,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  greeting: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
    color: colors.neutral[900],
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  locationText: {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[600],
    marginLeft: 4,
  },
  notification: {
    backgroundColor: colors.neutral[100],
    padding: 10,
    borderRadius: 24,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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
  deliverySection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    color: colors.neutral[900],
    marginBottom: 16,
  },
  deliveryCard: {
    backgroundColor: colors.neutral[200],
    padding: 20,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
    color: colors.neutral[900],
  },
});