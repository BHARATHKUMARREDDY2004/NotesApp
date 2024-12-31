import React, { useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
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
      { name: "Vegetables & Fruits", image: "https://veg-Fru-photo",
        sub_categories: [
          {
            name: "Vegetables", image : "https://veg-Fru-photo"
          },
          {
            name: "Fruits", image : "https://veg-Fru-photo"
          },
        ]
       },
      { name: "Oil, Ghee & Masala", image: images.OilGheeMasala,
        sub_categories: [
          {
            name: "oil", image : "https://veg-Fru-photo"
          },
          {
            name: "ghee", image : "https://veg-Fru-photo"
          },
          {
            name: "Powdered Spices", image : "https://veg-Fru-photo"
          },
          {
            name: "Whole Spices", image : "https://veg-Fru-photo"
          },
          {
            name: "Salt, Sugar & Jaggery", image : "https://veg-Fru-photo"
          },
          {
            name: "oil", image : "https://veg-Fru-photo"
          },
          {
            name: "ghee", image : "https://veg-Fru-photo"
          },
          {
            name: "Powdered Spices", image : "https://veg-Fru-photo"
          },
          {
            name: "Whole Spices", image : "https://veg-Fru-photo"
          },
          {
            name: "Salt, Sugar & Jaggery", image : "https://veg-Fru-photo"
          },
          {
            name: "oil", image : "https://veg-Fru-photo"
          },
          {
            name: "ghee", image : "https://veg-Fru-photo"
          },
          {
            name: "Powdered Spices", image : "https://veg-Fru-photo"
          },
          {
            name: "Whole Spices", image : "https://veg-Fru-photo"
          },
          {
            name: "Salt, Sugar & Jaggery", image : "https://veg-Fru-photo"
          },

        ]
       },
      { name: "Dairy, Bread & Eggs", image: "https://photo",
        sub_categories: [
          {
            name: "Milk", image : "https://veg-Fru-photo"
          },
          {
            name: "Bread & Pav", image : "https://veg-Fru-photo"
          },
          {
            name: "Eggs", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Bakery & Biscuits", image: images.BakeryBiscuits,
        sub_categories: [
          {
            name: "Cookies", image : "https://veg-Fru-photo"
          },
          {
            name: "Biscuits", image : "https://veg-Fru-photo"
          },
          {
            name: "Cakes & Biscuits", image : "https://veg-Fru-photo"
          }
        ]
      },
      { name: "Dry Fruits & Cereals", image: images.DryfriutsCererals,
        sub_categories: [
          {
            name: "Dry Fruits", image : "https://veg-Fru-photo"
          },
          {
            name: "Corn Flacks & Kids Cereals", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Chicken, Meat & Fish", image: "https://photo",
        sub_categories: [
          {
            name: "Chicken", image : "https://veg-Fru-photo"
          },
          {
            name: "Meat", image : "https://veg-Fru-photo"
          },
          {
            name: "Fish", image : "https://veg-Fru-photo"
          }
        ]
       },
    ],
  },
  {
    title: "Snacks & Drinks",
    items: [
      { name: "Chips & Namkeen", image: "https://photo",
        sub_categories: [
          {
            name: "Chips", image : "https://veg-Fru-photo"
          },
          {
            name: "Namkeen", image : "https://veg-Fru-photo"
          },
          {
            name: "chips and wafers", image : "https://veg-Fru-photo"
          },
          {
            name: "nachos", image : "https://veg-Fru-photo"
          },
          {
            name: "healthy snacks", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Drinks & Juices", image: "https://photo",
        sub_categories: [
          {
            name: "Soft Drinks", image : "https://veg-Fru-photo"
          },
          {
            name: "Juices", image : "https://veg-Fru-photo"
          },
          {
            name: "Energy Drinks", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Tea, Coffee & Milk Drinks", image: "https://photo",
        sub_categories: [
          {
            name: "Tea", image : "https://veg-Fru-photo"
          },
          {
            name: "Coffee", image : "https://veg-Fru-photo"
          },
          {
            name: "Milk Drinks", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Instant Food", image: "https://photo",
        sub_categories: [
          {
            name: "Noodles", image : "https://veg-Fru-photo"
          },
          {
            name: "Pasta", image : "https://veg-Fru-photo"
          },
          {
            name: "Ready to Eat", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Sweets & Chocolates", image: "https://photo",
        sub_categories: [
          {
            name: "Sweets", image : "https://veg-Fru-photo"
          },
          {
            name: "Chocolates", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Ice Creams & More", image: "https://photo",
        sub_categories: [
          {
            name: "Ice Creams", image : "https://veg-Fru-photo"
          },
          {
            name: "Frozen Foods", image : "https://veg-Fru-photo"
          }
        ]
       },
    ],
  },
  {
    title: "Beauty & Personal Care",
    items: [
      { name: "Bath & Body", image: "https://photo",
        sub_categories: [
          {
            name: "Soaps", image : "https://veg-Fru-photo"
          },
          {
            name: "Shower Gels", image : "https://veg-Fru-photo"
          },
          {
            name: "oral care", image : "https://veg-Fru-photo"
          },
          {
            name: "Body Scrubs", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Hair", image: "https://photo",
        sub_categories: [
          {
            name: "shampoo", image : "https://veg-Fru-photo"
          },
          {
            name: "Conditioners", image : "https://veg-Fru-photo"
          },
          {
            name: "Hair Oils", image : "https://veg-Fru-photo"
          },
          {
            name: "Hair Colors", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Skin & Face", image: "https://photo",
        sub_categories: [
          {
            name: "Face Wash", image : "https://veg-Fru-photo"
          },
          {
            name: "Face Creams", image : "https://veg-Fru-photo"
          },
          {
            name: "Face Scrubs", image : "https://veg-Fru-photo"
          },
          {
            name: "handwash", image : "https://veg-Fru-photo"
          }
        ]
       },
    ],
  },
  {
    title: "Grocery & Kitchen",
    items: [
      { name: "Vegetables & Fruits", image: "https://veg-Fru-photo",
        sub_categories: [
          {
            name: "Vegetables", image : "https://veg-Fru-photo"
          },
          {
            name: "Fruits", image : "https://veg-Fru-photo"
          },
        ]
       },
      { name: "Oil, Ghee & Masala", image: images.OilGheeMasala,
        sub_categories: [
          {
            name: "oil", image : "https://veg-Fru-photo"
          },
          {
            name: "ghee", image : "https://veg-Fru-photo"
          },
          {
            name: "Powdered Spices", image : "https://veg-Fru-photo"
          },
          {
            name: "Whole Spices", image : "https://veg-Fru-photo"
          },
          {
            name: "Salt, Sugar & Jaggery", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Dairy, Bread & Eggs", image: "https://photo",
        sub_categories: [
          {
            name: "Milk", image : "https://veg-Fru-photo"
          },
          {
            name: "Bread & Pav", image : "https://veg-Fru-photo"
          },
          {
            name: "Eggs", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Bakery & Biscuits", image: images.BakeryBiscuits,
        sub_categories: [
          {
            name: "Cookies", image : "https://veg-Fru-photo"
          },
          {
            name: "Biscuits", image : "https://veg-Fru-photo"
          },
          {
            name: "Cakes & Biscuits", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Dry Fruits & Cereals", image: images.DryfriutsCererals,
        sub_categories: [
          {
            name: "Dry Fruits", image : "https://veg-Fru-photo"
          },
          {
            name: "Corn Flacks & Kids Cereals", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Chicken, Meat & Fish", image: "https://photo",
        sub_categories: [
          {
            name: "Chicken", image : "https://veg-Fru-photo"
          },
          {
            name: "Meat", image : "https://veg-Fru-photo"
          },
          {
            name: "Fish", image : "https://veg-Fru-photo"
          }
        ]
       },
    ],
  },
  {
    title: "Grocery & Kitchen",
    items: [
      { name: "Vegetables & Fruits", image: "https://veg-Fru-photo",
        sub_categories: [
          {
            name: "Vegetables", image : "https://veg-Fru-photo"
          },
          {
            name: "Fruits", image : "https://veg-Fru-photo"
          },
        ]
       },
      { name: "Oil, Ghee & Masala", image: images.OilGheeMasala,
        sub_categories: [
          {
            name: "oil", image : "https://veg-Fru-photo"
          },
          {
            name: "ghee", image : "https://veg-Fru-photo"
          },
          {
            name: "Powdered Spices", image : "https://veg-Fru-photo"
          },
          {
            name: "Whole Spices", image : "https://veg-Fru-photo"
          },
          {
            name: "Salt, Sugar & Jaggery", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Dairy, Bread & Eggs", image: "https://photo",
        sub_categories: [
          {
            name: "Milk", image : "https://veg-Fru-photo"
          },
          {
            name: "Bread & Pav", image : "https://veg-Fru-photo"
          },
          {
            name: "Eggs", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Bakery & Biscuits", image: images.BakeryBiscuits,
        sub_categories: [
          {
            name: "Cookies", image : "https://veg-Fru-photo"
          },
          {
            name: "Biscuits", image : "https://veg-Fru-photo"
          },
          {
            name: "Cakes & Biscuits", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Dry Fruits & Cereals", image: images.DryfriutsCererals,
        sub_categories: [
          {
            name: "Dry Fruits", image : "https://veg-Fru-photo"
          },
          {
            name: "Corn Flacks & Kids Cereals", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Chicken, Meat & Fish", image: "https://photo",
        sub_categories: [
          {
            name: "Chicken", image : "https://veg-Fru-photo"
          },
          {
            name: "Meat", image : "https://veg-Fru-photo"
          },
          {
            name: "Fish", image : "https://veg-Fru-photo"
          }
        ]
       },
    ],
  },
  {
    title: "Grocery & Kitchen",
    items: [
      { name: "Vegetables & Fruits", image: "https://veg-Fru-photo",
        sub_categories: [
          {
            name: "Vegetables", image : "https://veg-Fru-photo"
          },
          {
            name: "Fruits", image : "https://veg-Fru-photo"
          },
        ]
       },
      { name: "Oil, Ghee & Masala", image: images.OilGheeMasala,
        sub_categories: [
          {
            name: "oil", image : "https://veg-Fru-photo"
          },
          {
            name: "ghee", image : "https://veg-Fru-photo"
          },
          {
            name: "Powdered Spices", image : "https://veg-Fru-photo"
          },
          {
            name: "Whole Spices", image : "https://veg-Fru-photo"
          },
          {
            name: "Salt, Sugar & Jaggery", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Dairy, Bread & Eggs", image: "https://photo",
        sub_categories: [
          {
            name: "Milk", image : "https://veg-Fru-photo"
          },
          {
            name: "Bread & Pav", image : "https://veg-Fru-photo"
          },
          {
            name: "Eggs", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Bakery & Biscuits", image: images.BakeryBiscuits,
        sub_categories: [
          {
            name: "Cookies", image : "https://veg-Fru-photo"
          },
          {
            name: "Biscuits", image : "https://veg-Fru-photo"
          },
          {
            name: "Cakes & Biscuits", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Dry Fruits & Cereals", image: images.DryfriutsCererals,
        sub_categories: [
          {
            name: "Dry Fruits", image : "https://veg-Fru-photo"
          },
          {
            name: "Corn Flacks & Kids Cereals", image : "https://veg-Fru-photo"
          }
        ]
       },
      { name: "Chicken, Meat & Fish", image: "https://photo",
        sub_categories: [
          {
            name: "Chicken", image : "https://veg-Fru-photo"
          },
          {
            name: "Meat", image : "https://veg-Fru-photo"
          },
          {
            name: "Fish", image : "https://veg-Fru-photo"
          }
        ]
       },
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

  // useEffect(() => {
  //   clearLocationData()
  //   if (!userLocation) {
  //     toggleLocationModal();
  //   }
  // }, []);

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
