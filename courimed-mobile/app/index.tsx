import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { useRouter, Router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router: Router = useRouter();
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

    // const checkOnboarding = async () => {
    //   const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
    //   if (hasSeenOnboarding === null) {
        
    //     await AsyncStorage.setItem("hasSeenOnboarding", "true");
    //     setIsNewUser(true);
    //   } else {
        
    //     setIsNewUser(false);
    //   }
    // };

    // checkOnboarding();

  // // Navigate to onboarding or login after 5 seconds
  // const timer = setTimeout(() => {
  //   if (isNewUser) {
  //     router.replace("../onboarding");
  //   } else {
  //     router.replace("../(auth)/login");
  //   }
  // }, 5000);

  //   return () => clearTimeout(timer);
  // }, [router, isNewUser]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#dd5d05' }}>
      <Image
      source={require("../assets/images/courimed-icon-white.png")}
      style={{ width: "30%", height: undefined, aspectRatio: 1, resizeMode: 'contain' }}
      />
    </View>
  );
}