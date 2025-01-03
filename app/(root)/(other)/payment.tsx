import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment() {
  return (
    <SafeAreaView className="px-1 flex-1">
        <View>
            <Text>
                Payment
            </Text>
        </View>

      <View className="pb-[100px]"/>
    </SafeAreaView>
  );
}
