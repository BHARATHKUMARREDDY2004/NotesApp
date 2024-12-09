import { useState } from "react";
import { usePathname, router } from "expo-router";
import { View, TouchableOpacity, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SearchInputProps } from '@/types/type';

const SearchInput = ({ initialQuery = "" }: SearchInputProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = () => {
    const sanitizedQuery = query.trim(); // Remove leading/trailing spaces

    if (!sanitizedQuery) {
      Alert.alert(
        "Missing Query",
        "Please enter something to search for wholesalers or products."
      );
      return;
    }

    const encodedQuery = encodeURIComponent(sanitizedQuery); // Encode for safe navigation

    if (pathname.startsWith("/search")) {
      router.setParams({ query: encodedQuery }); // Update query in route params
    } else {
      router.push(`/search/${encodedQuery}`); // Navigate to the new route
    }
  };

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-14 px-4 bg-black-100 rounded-lg border-2 border-black-200 focus-within:border-primary">
      <TextInput
        className="flex-1 text-base text-fourth font-pregular"
        value={query}
        placeholder="Search a wholesaler or product"
        placeholderTextColor="#A9A9B3"
        onChangeText={(text) => setQuery(text)}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      <TouchableOpacity onPress={handleSearch} className="p-2">
        <Ionicons name="search" size={24} color="#FFC93C" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
