import React from "react";
import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import SearchInput from "@/components/SearchInput";
import { images } from "@/constants";

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

// Delivery Header Section
const DeliveryHeader = () => {
  return (
    <>
      {/* Time and Location */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-gray-800 font-psemibold text-xl">
            dukka
            <Text className="text-orange-500 font-psemibold text-xl">On</Text>
          </Text>
          <Text className="text-gray-600 text-sm">
            Phagwara, Punjab, India{" "}
            <FontAwesome name="chevron-down" size={14} />
          </Text>
        </View>
        {/* Profile Icon */}
        <TouchableOpacity onPress={()=>{router.push("/(root)/(account)/profile")}} className="h-15 w-15">
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

// CategoryGrid Component
const CategoryGrid = ({ data }: any) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      numColumns={3}
      renderItem={({ item }) => (
        <View className="flex-1 items-center m-2">
          <View className="bg-white/40 rounded-xl">
            <Image
              source={item.image}
              className="w-[120px] h-[120px]"
              resizeMode="cover"
            />
          </View>
          <Text className="text-center mt-1 text-xs">{item.name}</Text>
        </View>
      )}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      showsVerticalScrollIndicator={false}
    />
  );
};

// Home Component
export default function Home() {
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
              <Text className="text-lg font-semibold mb-2">{item.title}</Text>
              <CategoryGrid data={item.items} />
            </View>
          )}
          ListHeaderComponent={
            <View className="mx-1 mb-3">
              {/* <SearchInput /> */}
              <DeliveryHeader />
            </View>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
