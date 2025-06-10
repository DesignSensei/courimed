import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { colors } from "@constants/colors";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type FeatherIconNames = React.ComponentProps<typeof Feather>["name"];

type ProfileCardItemProps = {
  icon: FeatherIconNames;
  label: string;
  bgColor: string;
  onPress: () => void;
};

const ProfileCardItem = ({
  icon,
  label,
  bgColor,
  onPress,
}: ProfileCardItemProps) => (
  <TouchableOpacity style={styles.profileCard} onPress={onPress}>
    <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
      <Feather name={icon} size={20} color={colors.primary[500]} />
    </View>
    <Text style={styles.profileCardText}>{label}</Text>
    <Feather name="chevron-right" size={20} color={colors.neutral[900]} />
  </TouchableOpacity>
);

export default function Profile() {

  const router = useRouter();
  
  const handleLogout = () => {
    router.push("/login");
    console.log("Logged out");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.neutral[900]} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Customer Profile</Text>
        <View style={styles.sideIcon} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.editView}>
          <Image
            source={require("@assets/images/protonaut-2.png")}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.username}>Odili Nonso</Text>
            <Text style={styles.userEmail}>odilino****@gmail.com</Text>
          </View>

          <TouchableOpacity style={styles.editProfile} onPress={() => router.push("/customer/edit-profile")}>
            <Feather name="edit" size={20} color={colors.neutral[800]} />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Account Information</Text>
        </View>

        <View style={styles.cardGroup}>
          <ProfileCardItem
            icon="briefcase"
            label="Registration Papers"
            bgColor={colors.primary[100]}
            onPress={() => router.push("/customer/edit-business-info")}
          />
          <ProfileCardItem
            icon="credit-card"
            label="Wallet"
            bgColor={colors.primary[100]}
            onPress={() => router.push("/customer/wallet")}
          />
          <ProfileCardItem
            icon="settings"
            label="Account Settings"
            bgColor={colors.primary[100]}
            onPress={() => router.push("/")}
          />
          <ProfileCardItem
            icon="file-text"
            label="Compliance Docs"
            bgColor={colors.primary[100]}
            onPress={() => router.push("/")}
          />
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Settings</Text>
        </View>
        <View style={styles.cardGroup}>
          <ProfileCardItem
            icon="help-circle"
            label="Support & Help"
            bgColor={colors.primary[100]}
            onPress={() => router.push("/")}
          />
          <ProfileCardItem
            icon="log-out"
            label="Logout"
            bgColor={colors.primary[100]}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </View>
  );
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
  editView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    backgroundColor: colors.shades.white,
    padding: 20,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 1000,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
  },
  username: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
  },
  userEmail: {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[600],
  },
  editProfile: {
    flexDirection: "row",
    backgroundColor: colors.neutral[100],
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  editText: {
    fontSize: 14,
    fontFamily: "Nunito_700Bold",
    color: colors.neutral[900],
    marginLeft: 8,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitleText: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
    color: colors.neutral[900],
  },
  cardGroup: {
    gap: 12,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.shades.white,
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  profileCardText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
    color: colors.neutral[900],
  },
  iconBox: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});