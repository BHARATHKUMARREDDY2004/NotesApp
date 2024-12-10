import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";

const Search = () => {
  const { query } = useLocalSearchParams();

  return (
    <SafeAreaView className="bg-orange h-full">
      <FlatList
        data={[]} // Always empty
        keyExtractor={(item) => item} // This won't be used since data is empty
        renderItem={({ item }) => null} // No items will be rendered
        ListHeaderComponent={() => (
          <>
            <View className="flex my-2 px-2">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>

              <View className="my-4">
                <SearchInput initialQuery={query} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Food Items Found"
            subtitle="No food items posted yet"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
