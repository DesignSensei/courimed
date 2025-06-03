import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { useRouter } from "expo-router";

export default function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    
    const timer = setTimeout(() => {
      router.replace("../(app)/customer");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#dd5d05' }}>
      <Image
      source={require("../../assets/images/courimed-icon-white.png")}
      style={{ width: "30%", height: undefined, aspectRatio: 1, resizeMode: 'contain' }}
      />
    </View>
  );
}