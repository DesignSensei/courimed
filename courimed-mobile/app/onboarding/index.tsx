import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useRef, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "@constants/colors";

const { width: screenWidth } = Dimensions.get("window");

interface OnboardingItem {
  id: string;
  title: string;
  image: any;
}

const onboardingData: OnboardingItem[] = [
  {
    id: "1",
    title: "Swift and Reliable Delivery",
    image: require("@images/auth-2.png"),
  },
  {
    id: "2",
    title: "Precision in Every Package",
    image: require("@images/auth-1.png"),
  },
  {
    id: "3",
    title: "Built for Critical Moments",
    image: require("@images/auth-2.png"),
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % onboardingData.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }: { item: OnboardingItem }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.backgroundImage} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {onboardingData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onScrollToIndexFailed={() => {}}
        style={{ flexGrow: 0 }}
      />

      {renderDots()}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => router.push("../(auth)/get-started")}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.orLine} />
        </View>

        <TouchableOpacity style={styles.socialButton}>
          <Image source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }}
            style={styles.socialIcon}
            />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-apple" size={20} color="#000" />
          <Text style={styles.socialText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("../(auth)/login")}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={styles.loginLinkText}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shades.white,
  },
  slide: {
    width: screenWidth,
    alignItems: "center",
    backgroundColor: colors.shades.white,
    marginTop: 64,
  },
  backgroundImage: {
    width: "80%",
    height: screenWidth * 0.8,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
    color: colors.neutral[900],
    textAlign: "center",
    paddingHorizontal: 30,
    lineHeight: 32,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary[500],
    width: 24,
    borderRadius: 4,
  },
  inactiveDot: {
    backgroundColor: colors.neutral[300],
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  getStartedButton: {
    backgroundColor: colors.primary[500],
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  getStartedText: {
    color: colors.shades.white,
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.neutral[300],
  },
  orText: {
    color: colors.neutral[500],
    marginHorizontal: 15,
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.shades.white,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    width: "100%",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  socialText: {
    color: colors.neutral[900],
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Nunito_600SemiBold",
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  loginText: {
    color: colors.neutral[600],
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Nunito_400Regular",
  },
  loginLinkText: {
    color: colors.primary[500],
    fontFamily: "Nunito_600SemiBold",
    textDecorationLine: "underline",
  },
});