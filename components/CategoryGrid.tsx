import React from "react";
import { Text, View, Image, FlatList } from "react-native";

const CategoryGrid = ({ data }: any) => {
    return (
      <FlatList
        data={data}
        keyExtractor={(category, index) => `${category.name}-${index}`}
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
            <Text className="text-center mt-1 text-xs font-pmedium">{item.name}</Text>
          </View>
        )}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  export default CategoryGrid;