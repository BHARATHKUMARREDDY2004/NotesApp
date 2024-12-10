import { useState } from "react";
import { usePathname, router } from "expo-router";
import { View, TouchableOpacity, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SearchInputProps } from "@/types/type";

const SearchInput = ({ initialQuery = "" }: SearchInputProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = () => {
    const sanitizedQuery = query.trim();

    if (!sanitizedQuery) {
      Alert.alert(
        "Missing Query",
        "Please enter something to search for wholesalers or products."
      );
      return;
    }

    const encodedQuery = encodeURIComponent(sanitizedQuery);

    if (pathname.startsWith("/search")) {
      router.setParams({ query: encodedQuery });
    } else {
      router.push(`/search/${encodedQuery}`);
    }
  };

  return (
    <View className="InputContainer flex flex-row items-center rounded-2xl shadow-md bg-white px-4 py-2">
      {/* Search Input */}
      <TextInput
        className="input flex-1 text-gray-700 text-lg font-pmedium"
        value={query}
        placeholder="Search"
        placeholderTextColor="#A9A9B3"
        onChangeText={(text) => setQuery(text)}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      {/* Search Icon */}
      <TouchableOpacity onPress={handleSearch} className="p-2 labelforsearch">
        <Ionicons name="search" size={20} color="#727272" />
      </TouchableOpacity>
      {/* Divider */}
      <View className="h-4/5 w-px bg-gray-200 mx-3" />
      {/* Mic Button */}
      <TouchableOpacity>
        <Ionicons name="mic" size={20} color="#FF7A00" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;


