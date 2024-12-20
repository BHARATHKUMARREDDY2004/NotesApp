import React, { useEffect } from "react";
import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import SearchInput from "@/components/SearchInput";
import CategoryGrid from "@/components/CategoryGrid";
import { images } from "@/constants";
import { useStore } from "@/store";
import LocationPrompt from "@/components/LocationPrompt";
import AsyncStorage from "@react-native-async-storage/async-storage";


// Flattened data for rendering
const categoriesData = [
  {
    title: "Grocery & Kitchen",
    items: [
      { name: "Vegetables & Fruits", image: "https://veg-Fru-photo" },
      { name: "Oil, Ghee & Masala", image: images.OilGheeMasala },
      { name: "Dairy, Bread & Eggs", image: "https://photo" },
      { name: "Bakery & Biscuits", image: images.BakeryBiscuits },
      { name: "Dry Fruits & Cereals", image: images.DryfriutsCererals },
      { name: "Chicken, Meat & Fish", image: "https://photo" },
    ],
  },
  {
    title: "Snacks & Drinks",
    items: [
      { name: "Chips & Namkeen", image: "https://photo" },
      { name: "Drinks & Juices", image: "https://photo" },
      { name: "Tea, Coffee & Milk Drinks", image: "https://photo" },
      { name: "Instant Food", image: "https://photo" },
      { name: "Sweets & Chocolates", image: "https://photo" },
      { name: "Ice Creams & More", image: "https://photo" },
    ],
  },
  {
    title: "Beauty & Personal Care",
    items: [
      { name: "Bath & Body", image: "https://photo" },
      { name: "Hair", image: "https://photo" },
      { name: "Skin & Face", image: "https://photo" },
    ],
  },
  {
    title: "Grocery & Kitchen",
    items: [
      { name: "Vegetables & Fruits", image: "https://veg-Fru-photo" },
      { name: "Oil, Ghee & Masala", image: images.OilGheeMasala },
      { name: "Dairy, Bread & Eggs", image: "https://photo" },
      { name: "Bakery & Biscuits", image: images.BakeryBiscuits },
      { name: "Dry Fruits & Cereals", image: images.DryfriutsCererals },
      { name: "Chicken, Meat & Fish", image: "https://photo" },
    ],
  },
  {
    title: "Grocery & Kitchen",
    items: [
      { name: "Vegetables & Fruits", image: "https://veg-Fru-photo" },
      { name: "Oil, Ghee & Masala", image: images.OilGheeMasala },
      { name: "Dairy, Bread & Eggs", image: "https://photo" },
      { name: "Bakery & Biscuits", image: images.BakeryBiscuits },
      { name: "Dry Fruits & Cereals", image: images.DryfriutsCererals },
      { name: "Chicken, Meat & Fish", image: "https://photo" },
    ],
  },
  {
    title: "Grocery & Kitchen",
    items: [
      { name: "Vegetables & Fruits", image: "https://veg-Fru-photo" },
      { name: "Oil, Ghee & Masala", image: images.OilGheeMasala },
      { name: "Dairy, Bread & Eggs", image: "https://photo" },
      { name: "Bakery & Biscuits", image: images.BakeryBiscuits },
      { name: "Dry Fruits & Cereals", image: images.DryfriutsCererals },
      { name: "Chicken, Meat & Fish", image: "https://photo" },
    ],
  },
];

const DeliveryHeader = () => {
  const { userLocation, toggleLocationModal } = useStore();
  const placeName = userLocation?.placeName || "Select Location";

  return (
    <>
      {/* Time and Location */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={toggleLocationModal}>
          <View>
            <Text className="text-gray-800 font-psemibold text-xl">
              dukaa
              <Text className="text-orange-500 font-psemibold text-xl">On</Text>
            </Text>
            <Text className="text-gray-600 text-sm">
              {placeName}{" "}
              <FontAwesome name="chevron-down" size={14} />
            </Text>
          </View>
        </TouchableOpacity>
        {/* Profile Icon */}
        <TouchableOpacity
          onPress={() => {
            router.push("/(root)/(account)/profile");
          }}
          className="h-15 w-15"
        >
          <View className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-md">
            <FontAwesome name="user" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <SearchInput />
    </>
  );
};

// Home Component
export default function Home() {
  const { userLocation, toggleLocationModal } = useStore();
  const clearLocationData = async () => {
    try {
      await AsyncStorage.removeItem("dukaaon-user-location");
      console.log("Location data removed successfully!");
    } catch (error) {
      console.error("Failed to remove location data:", error);
    }
  };

  useEffect(() => {
    clearLocationData()
    if (!userLocation) {
      toggleLocationModal();
    }
  }, []);

  return (
    <LinearGradient
      colors={["#FFC281", "#FFEBD7"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.5 }}
    >
      <SafeAreaView className="px-1 flex-1">
        <FlatList
          data={categoriesData}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={({ item }) => (
            <View className="mb-4">
              <Text className="text-lg font-psemibold mb-2">{item.title}</Text>
              <CategoryGrid data={item.items} />
            </View>
          )}
          ListHeaderComponent={
            <View className="mx-1 mb-3">
              <DeliveryHeader />
            </View>
          }
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
      <LocationPrompt />
    </LinearGradient>
  );
}
