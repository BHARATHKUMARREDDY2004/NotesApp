import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal, FlatList } from "react-native";
import { images } from "@/constants";

type Item = {
  id: string;
  name: string;
  category: string;
  minQty: number;
  price: number;
  units: string[];
  unitPrices: number[];
  information: [];
  infoDescriptions: [];
  images: [];
  wholesaler: string;
};

type ItemCardProps = {
  item: Item;
};

const ItemCard = ({ item }: ItemCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const hasMultipleOptions = item.units.length > 1;

  const handleAdd = (unit: string, price: number) => {
    console.log(`Added ${item.name} (${unit}) for ₹${price}`);
    setModalVisible(false);
  };

  // Calculate discount percentage
  const discount = Math.round((1 - item.unitPrices[0] / item.price) * 100);

  return (
    <View className="bg-white/80 rounded-2xl overflow-hidden w-[48%] m-1">
      {/* Image and Add Button Overlay */}
      <View className="relative">
        <Image
          source={images.item}
          className="w-full h-40 rounded-2xl"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 right-2">
          <TouchableOpacity
            className="bg-white p-2 rounded-full border border-green-600 w-24"
            onPress={() =>
              hasMultipleOptions
                ? setModalVisible(true)
                : handleAdd(item.units[0], item.unitPrices[0])
            }
          >
            <Text className="text-green-600 font-semibold text-center">
              ADD
            </Text>
          </TouchableOpacity>
          {hasMultipleOptions && (
            <View className="absolute -bottom-1.5 w-full">
              <Text className="text-gray-500 text-xs text-center bg-white rounded-xl px-2 mx-auto">
                {item.units.length} options
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Content */}
      <View className="px-2 py-3 flex-col">
        {/* Weight */}
        <Text className="text-gray-500 text-sm mb-1">{item.units[0]}</Text>

          <Text
            className="text-base font-psemibold text-gray-800 text-balance"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.name.length > 40 ? `${item.name.substring(0, 40)}...` : item.name}
          </Text>

        {/* Pricing */}
        <View className="flex-row items-baseline gap-1">
          <Text className="text-sm text-gray-500">MRP</Text>
          <Text className="text-md font-psemibold text-gray-800">₹ {item.unitPrices[0]}</Text>
        </View>

        {/* Delivery Time */}
        <View className="flex-row items-center mb-2">
          <Text className="text-gray-500 text-sm">Min Order : {item.minQty} Units</Text>
        </View>
      </View>

      {/* Modal for Multiple Options */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg w-4/5 p-4">
            <Text className="text-lg font-pbold mb-3">{item.name}</Text>
            <FlatList
              data={item.units.map((unit, index) => ({
                key: unit,
                price: item.unitPrices[index],
              }))}
              renderItem={({ item: option }) => (
                <TouchableOpacity
                  className="py-3 px-4 border-b border-gray-200"
                  onPress={() => handleAdd(option.key, option.price)}
                >
                  <Text className="text-base">
                    {option.key} - ₹{option.price}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              className="mt-4 py-3 bg-gray-100 rounded-lg"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-center font-pmedium">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ItemCard;

