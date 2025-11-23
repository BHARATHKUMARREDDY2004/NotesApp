import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/context/AuthContext";

const LoginScreen = () => {
  const router = useRouter();
  const { login, isAuthLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!username.trim() || !pin) {
      setError("Enter both username and PIN.");
      return;
    }

    try {
      setIsSubmitting(true);
      await login(username, pin);
      router.replace("/(notes)/notes");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to login";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 py-8">

            <View className="items-center">
                <Text className="text-3xl font-pbold text-gray-900">Welcome back</Text>
                <Text className="mt-2 text-base text-gray-500">
                Login to view the notes..
                </Text>
            </View>

            <View className="mt-10 gap-6">
              <View>
                <Text className="text-sm font-psemibold text-gray-700">Username</Text>
                <TextInput
                  value={username}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="username123"
                  onChangeText={setUsername}
                  className="mt-2 rounded-2xl border border-gray-200 px-4 py-3 text-base text-gray-900"
                />
              </View>

              <View>
                <Text className="text-sm font-psemibold text-gray-700">PIN or Password</Text>
                <TextInput
                  value={pin}
                  secureTextEntry
                  placeholder="1234"
                  keyboardType="number-pad"
                  onChangeText={setPin}
                  className="mt-2 rounded-2xl border border-gray-200 px-4 py-3 text-base text-gray-900"
                />
              </View>
            </View>

            {error ? (
              <Text className="mt-4 text-sm text-red-500">{error}</Text>
            ) : null}

            <Pressable
              className="mt-6 items-center rounded-2xl bg-orange px-4 py-4"
              onPress={handleLogin}
              disabled={isSubmitting || isAuthLoading}
            >
              {isSubmitting || isAuthLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-base font-psemibold text-white">Login</Text>
              )}
            </Pressable>

            <View className="mt-8 items-center pt-10">
              <Text className="text-base text-gray-600">
                Not have an account?{" "}
                <Link href="/(auth)/sign-up" className="font-psemibold text-orange">
                  Sign up here
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
