import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Chat() {
  return (
    <SafeAreaView className="px-1 flex-1">
        <View>
            <Text>
                Chat
            </Text>
        </View>

      <View className="pb-[100px]"/>
    </SafeAreaView>
  );
}
