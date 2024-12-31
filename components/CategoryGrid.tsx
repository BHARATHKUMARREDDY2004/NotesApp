import React from "react";
import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";


const CategoryGrid = ({ data }: any) => {
    return (
      <FlatList
        data={data}
        keyExtractor={(category, index) => `${category.name}-${index}`}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() =>
            router.push({
              pathname: "/category",
              params: {
                category: item.name,
                sub_categories: JSON.stringify(item.sub_categories), // Pass sub_categories as a string
              },
            })
          } className="flex-1 items-center m-2">
          <View>
            <View className="bg-white/40 rounded-xl">
              <Image
                source={item.image}
                className="w-[120px] h-[120px]"
                resizeMode="cover"
              />
            </View>
            <Text className="text-center mt-1 text-xs font-pmedium">{item.name}</Text>
          </View>
          </TouchableOpacity>
        )}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  export default CategoryGrid;