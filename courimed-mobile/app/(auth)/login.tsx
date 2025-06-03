import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import CustomAlert from "../components/CustomAlert";

export default function Login() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const handleLogin = async () => {
    if (!email || !password) {
      setAlertData({
        title: "Error",
        message: "Please fill all fields",
        onConfirm: () => setAlertVisible(false),
      });
      setAlertVisible(true);
      return;
    }

    setAlertData({
      title: "Success",
      message: "Logged in successfully",
      onConfirm: () => {
        setAlertVisible(false);
        router.push("/loading-screen");
      },
    });
    setAlertVisible(true);
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
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Hi, Welcome! 👋</Text>
          <Text style={styles.subtitle}>
            Log in with your email and password to continue.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={colors.neutral[500]}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={colors.neutral[500]}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color={colors.neutral[500]}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxWrapper}>
              <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                <Ionicons
                  name={isChecked ? "checkbox" : "square-outline"}
                  size={20}
                  color={colors.neutral[900]}
                />
              </TouchableOpacity>
              <Text style={styles.checkboxText}>Remember me</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/forgot-password")}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 32 }}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{
                uri: "https://img.icons8.com/color/48/000000/google-logo.png",
              }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={20} color="#000" />
            <Text style={styles.socialText}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/get-started")}>
            <Text style={styles.signupText}>
              Don’t have an account?{" "}
              <Text style={styles.signupSignUpText}>Sign up</Text>
            </Text>
          </TouchableOpacity>

          <CustomAlert
            isVisible={alertVisible}
            title={alertData.title}
            message={alertData.message}
            onConfirm={alertData.onConfirm}
          />
        </View>
      </ScrollView>
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
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontFamily: "Nunito_700Bold",
    color: colors.neutral[900],
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[700],
    marginBottom: 30,
    paddingRight: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: "Nunito_600SemiBold",
    color: colors.neutral[800],
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 24,
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
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  iconButton: {
    position: "absolute",
    right: 20,
    top: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[900],
    marginLeft: 8,
  },
  forgotText: {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: colors.primary[500],
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    color: colors.shades.white,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.neutral[300],
  },
  orText: {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[500],
    marginHorizontal: 8,
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
  signupText: {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[600],
    textAlign: "center",
    marginTop: 24,
  },
  signupSignUpText: {
    color: colors.primary[500],
    fontFamily: "Nunito_600SemiBold",
    textDecorationLine: "underline",
  },
});
