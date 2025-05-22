import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false, href: "/home" }} />
      
      <Tabs.Screen name="account" options={{ title: 'Account', headerShown: false, href: "/account" }} />
      
      <Tabs.Screen name="orders" options={{ title: 'Orders', headerShown: false, href: "/orders" }} />
    </Tabs>
  );
}