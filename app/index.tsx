import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import type { Href } from "expo-router";

import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { currentUser, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  if (currentUser) {
    return <Redirect href={"/(notes)/notes" as Href} />;
  }

  return <Redirect href={"/(auth)/login" as Href} />;
};

export default Index;
