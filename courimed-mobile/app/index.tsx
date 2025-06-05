import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { useRouter, Router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors } from "./constants/colors"

export default function Index() {
  const router: Router = useRouter();
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.primary[500] }}>
        <Image
          source={require("../assets/images/courimed-icon-white.png")}
          style={{ width: "30%", height: undefined, aspectRatio: 1, resizeMode: "contain" }}
        />
      </View>
    </GestureHandlerRootView>
  );
}
