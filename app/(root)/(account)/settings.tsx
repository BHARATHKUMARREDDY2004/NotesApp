import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  return (
    <SafeAreaView className="px-1 flex-1">
        <View>
            <Text>
                Settings
            </Text>
        </View>
    </SafeAreaView>
  );
}
