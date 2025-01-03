import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useStore } from "@/store";
import ItemCard from "@/components/ItemCard";
import SearchInput from "@/components/SearchInput";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Category() {
  const { category, sub_categories } = useLocalSearchParams();
  const data = useStore((state) => state.data);
  const parsedSubCategories = JSON.parse(sub_categories || "[]");

  // Add state for selected subcategory
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  // Filter products based on selected category or show all if none selected
  const categoryProducts = data.filter((product) =>
    selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : parsedSubCategories.some(
          (subCat) =>
            subCat.name.toLowerCase() === product.category.toLowerCase()
        )
  );

  return (
    <SafeAreaView className="flex-1 bg-orange-100 pt-10">
      {/* Header */}
      <View className="flex-col border-b border-gray-200/50">
        {isSearchVisible && (
          <View className="px-2">
            <SearchInput />
          </View>
        )}
        <View className="flex-row items-center justify-between px-4 py-3">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-psemibold flex-1 ml-4">{category}</Text>
          {!isSearchVisible && (
            <TouchableOpacity
              className="p-2"
              onPress={() => setIsSearchVisible(!isSearchVisible)}
            >
              <Ionicons name="search" size={24} color="#000" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className="flex-row flex-1">
        {/* Subcategories Sidebar */}
        <View className="w-[18%]">
          <ScrollView
            className="pt-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {parsedSubCategories.map((subCat, index) => (
              <TouchableOpacity
                key={index}
                className="items-center py-4 relative"
                onPress={() =>
                  setSelectedCategory(
                    selectedCategory === subCat.name ? null : subCat.name
                  )
                }
              >
                <Image
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png",
                  }}
                  className="w-12 h-12 rounded-full mb-1"
                />
                <Text className="text-xs text-gray-600 text-center px-1 text-balance">
                  {subCat.name}
                </Text>
                {/* Orange indicator bar for selected category */}
                {selectedCategory === subCat.name && (
                  <View className="absolute right-0 top-0 bottom-0 w-1 bg-orange-500 rounded-full" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <LinearGradient
            colors={["rgba(0,0,0,0.2)", "transparent"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: 4,
            }}
          />
        </View>

        {/* Products Grid */}
        <View className="flex-1">
          {categoryProducts.length === 0 ? (
            <View className="flex-1 items-center justify-center">
              <Text className="text-gray-500 text-lg font-pmedium">
                No products found.
              </Text>
              <Text className="text-gray-400 text-sm">
                Try selecting a different category.
              </Text>
            </View>
          ) : (
            <FlatList
              data={categoryProducts}
              renderItem={({ item }) => <ItemCard item={item} />}
              keyExtractor={(item) => item.id}
              numColumns={2}
              className="pt-4"
              contentContainerStyle={{ paddingBottom: 120 }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
    </SafeAreaView>
  );
}
