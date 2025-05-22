import { Text, View, Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';

export default function Onboarding1() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/onboarding-image-placeholder.png")}
        style={styles.backgroundImage}
      />

      <View style={styles.skipContainer}>
        <Button title="Skip" onPress={() => router.replace("../(auth)/login")} color="#dd5d05" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Swift and Reliable Delivery
        </Text>

        <Text style={styles.subtitle}>
          Whether its across town or across the country, we deliver your orders with speed and reliability you can count on
        </Text>

        <View style={styles.navigationContainer}>
          <View style={styles.placeholder} />

          <View style={styles.pagination}>
            <View style={styles.dotActive} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <TouchableOpacity
            style={[styles.arrowButton, styles.arrowButtonRight, styles.activeArrow]}
            onPress={() => router.push("/onboarding/2")}
          >
            <Ionicons name="arrow-forward" size={24} color={colors.shades.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[100],
  },

  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    top: -60,
  },

  textContainer: {
    backgroundColor: colors.neutral[100],
    padding: 20,
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
  },

  skipContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
  },

  title: {
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    color: colors.neutral[900],
    marginBottom: 24,
    marginTop: 16,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.neutral[500],
    textAlign: 'center',
    marginBottom: 56,
    paddingHorizontal: 16,
  },

  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 48,
    width: '100%',
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholder: {
    width: 56,
    height: 56,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.neutral[200],
    marginHorizontal: 5,
  },

  dotActive: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: colors.primary[500],
    marginHorizontal: 5,
  },

  arrowButton: {
    width: 56,
    height: 56,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrowButtonLeft: {
    left: 20,
  },

  arrowButtonRight: {
    right: 20,
  },

  activeArrow: {
    backgroundColor: colors.primary[500],
  },

  inactiveArrow: {
    opacity: 0.5,
  },
});