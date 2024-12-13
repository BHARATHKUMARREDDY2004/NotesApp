import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";

const Search = () => {
  const { query } = useLocalSearchParams();

  return (
    <LinearGradient
      colors={["#FFC281", "#FFEBD7"]} // Adjust colors as per your gradient design
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }} // Start at the top
      end={{ x: 0, y: 0.5 }} // End at the bottom
    >
      <SafeAreaView className="bg-current h-full">
        <FlatList
          data={[]} // Always empty
          keyExtractor={(item) => item} // This won't be used since data is empty
          renderItem={({ item }) => null} // No items will be rendered
          ListHeaderComponent={() => (
            <>
              <View className="flex my-2 px-2">
                <View className="flex flex-row items-center">
                  <Text className="font-pmedium text-black-500 text-sm">
                    Search Results for
                  </Text>
                  <Text className="text-2xl font-psemibold text-white ml-2 backdrop-blur-xl">
                    {query}
                  </Text>
                </View>

                <View className="my-4">
                  <SearchInput initialQuery={query} />
                </View>
              </View>
            </>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Products Found"
              subtitle="Try searching for something else."
            />
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Search;
