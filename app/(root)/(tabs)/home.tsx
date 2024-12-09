import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";

export default function Home() {
  return (
    <SafeAreaView className="px-1 flex-1">
        <View>
            <Text>
                Home
            </Text>
            <SearchInput />
        </View>
    </SafeAreaView>
  );
}
