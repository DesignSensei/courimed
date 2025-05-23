import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { colors } from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import axios from 'axios';
import CustomAlert from '../components/CustomAlert';

export default function Login() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({ title: '', message: '', onConfirm: () => {} });

  const handleLogin = async () => {
    if (!email || !password) {
      setAlertData({
        title: 'Error',
        message: 'Please fill all fields',
        onConfirm: () => setAlertVisible(false),
      });
      setAlertVisible(true);
      return;
    }

    console.log('Login attempted with:', { email, password });

    try {
      const response = await axios.post('http://192.168.38.221:5000/api/auth/login', {
        email,
        password,
      });
      setAlertData({
        title: 'Success',
        message: 'Logged in successfully',
        onConfirm: () => {
          setAlertVisible(false);
          router.push('/loadingScreen');
        },
      });
      setAlertVisible(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log('Login Error:', error.message);
        console.log('Error Details:', error.response.data);
        setAlertData({
          title: 'Error',
          message: error.response.data.message || 'Invalid credentials',
          onConfirm: () => setAlertVisible(false),
        });
        setAlertVisible(true);
      } else {
        setAlertData({
          title: 'Error',
          message: 'Something went wrong',
          onConfirm: () => setAlertVisible(false),
        });
        setAlertVisible(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.icon}>
          <Image
            source={require("../../assets/images/courimed-logo-mix.png")}
            style={styles.iconImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Hi, Welcome! 👋</Text>

        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor={colors.neutral[500]}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
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

        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxWrapper}>
            <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
              <Ionicons
                name={isChecked ? "checkbox" : "square-outline"}
                size={20}
                color={colors.neutral[900]}
                style={{ opacity: isChecked ? 1 : 0.5 }}
              />
            </TouchableOpacity>
            <Text style={styles.checkboxText}>Remember me</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/forgot-password")}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{ uri: 'https://img.icons8.com/color/48/000000/facebook.png' }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signupText}>Don’t have an account? <Text style={styles.signupSignUpText}>Sign up</Text></Text>
        </TouchableOpacity>

        <CustomAlert
          isVisible={alertVisible}
          title={alertData.title}
          message={alertData.message}
          onConfirm={alertData.onConfirm}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shades.white,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  iconImage: {
    width: 160,
    height: 160,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Nunito_700Bold',
    color: colors.neutral[900],
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.neutral[900],
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    right: 20,
    top: 15,
    padding: 0,
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: colors.neutral[900],
    marginLeft: 8,
  },
  forgotText: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: colors.primary[500],
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    color: colors.shades.white,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.neutral[300],
  },
  orText: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: colors.neutral[500],
    marginHorizontal: 8,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    height: 50,
    backgroundColor: colors.neutral[100],
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  socialText: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: colors.neutral[900],
  },
  signupText: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: colors.primary[500],
  },
  signupSignUpText: {
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
    color: colors.primary[500],
  },
});