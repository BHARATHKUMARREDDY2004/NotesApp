import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import SearchInput from "@/components/SearchInput";

export default function Home() {
  return (
    <LinearGradient
      colors={['#FF7A00', '#FFEBD7']} // Adjust colors as per your gradient design
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }} // Start at the top
      end={{ x: 0, y: 0.3 }}   // End at the bottom
    >
      <SafeAreaView className="px-1 flex-1">
        <View>
          <View className="mx-1">
            <SearchInput />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
