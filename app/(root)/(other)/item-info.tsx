import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Swiper from 'react-native-swiper';

const ItemInfo = () => {
  const { item } = useLocalSearchParams();
  const itemData = JSON.parse(item as string);
  const [selectedUnit, setSelectedUnit] = useState(itemData.units[0]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Back Button */}
        {/* <TouchableOpacity 
          className="absolute left-4 top-4 z-10 bg-white rounded-full p-2"
          onPress={() => router.back()}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity> */}

        {/* Product Images */}
        <View className="h-96 bg-white relative">
          <Swiper
            loop={false}
            dot={<View className="w-1 h-1 rounded-full bg-gray-300 mx-[.8px]" />}
            activeDot={<View className="w-1.5 h-1.5 rounded-full bg-orange-500 mx-[1px]" />}
            paginationStyle={{
              bottom: 10,
              right: 10,
              left: undefined,
              flexDirection: 'row',
            }}
          >
            {itemData.images.map((image: string, index: number) => (
              <View key={index} className="flex-1 justify-center items-center">
                <Image
                  source={{ uri: image }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
            ))}
          </Swiper>
        </View>

        {/* Product Info */}
        <View className="p-4">
          <Text className="text-xl font-semibold text-gray-800 mb-2">
            {itemData.name}
          </Text>

          {/* Unit Selection */}
          <Text className="text-md font-medium mb-4 text-gray-800">
            Select Unit
          </Text>
          <View className="flex-row flex-wrap gap-4">
            {itemData.units.map((unit: string, index: number) => {
              const isSelected = selectedUnit === unit;
              return (
                <TouchableOpacity
                  key={unit}
                  onPress={() => setSelectedUnit(unit)}
                  className={`border-2 rounded-lg p-1 w-[90px] ${
                    isSelected
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <Text className="text-center text-md">
                    {unit}
                  </Text>
                  <Text className="text-center text-md font-semibold">
                    ₹{itemData.unitPrices[index]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Minimum Quantity */}
          <View className="mt-6 p-4 bg-gray-50 rounded-lg">
            <Text className="text-gray-600">
              Minimum Order Quantity: {itemData.minQty} units
            </Text>
          </View>

          {/* Product Information */}
          <View className="mt-6">
            <Text className="text-xl font-medium mb-4 text-gray-800">
              Product Information
            </Text>
            {itemData.information.map((info: string, index: number) => (
              <View
                key={info}
                className="flex-row justify-between py-3 border-b border-gray-200"
              >
                <Text className="text-gray-600">{info}</Text>
                <Text className="text-gray-800">
                  {itemData.infoDescriptions[index]}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="pb-[100px]" />
    </SafeAreaView>
  );
};

export default ItemInfo;

