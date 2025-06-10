import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { colors } from "@constants/colors";

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
      initialRouteName="home"
      screenOptions={({ route }: { route: TabRoute }) => ({
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.neutral[500],
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.shades.white,
          borderTopWidth: 0.5,
          borderTopColor: colors.neutral[300],
          height: 72,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: "Nunito_600SemiBold",
        },
        tabBarIcon: ({ color, size, focused }: TabBarIconProps) => {
          let iconName = "";

          if (route.name === "home") {
            iconName = "home";
          } else if (route.name === "orders") {
            iconName = "file-text";
          } else if (route.name === "profile") {
            iconName = "user";
          }

          return <Feather name={iconName as any} size={20} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="orders" options={{ title: "Orders" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen
        name="(screens)"
        options={{ href: null, tabBarStyle: { display: "none" } }} />
    </Tabs>
  );
}
