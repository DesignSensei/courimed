import { Tabs } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../constants/colors";

type TabRoute = {
  name: string;
};

type TabBarIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

export default function CustomerLayout() {
  return (
    <Tabs
      screenOptions={({ route }: { route: TabRoute }) => ({
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.neutral[500],
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.shades.white,
          borderTopWidth: 0.5,
          borderTopColor: colors.neutral[300],
          height: 64,
        },
        tabBarIcon: ({ color, size, focused }: TabBarIconProps) => {
          let iconName = "";

          if (route.name === "index") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "orders") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="orders" options={{ title: "Orders" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
