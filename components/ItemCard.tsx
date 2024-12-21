import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import { images } from "@/constants"

type Item = {
  id: string;
  name: string;
  category: string;
  minQty: number;
  price: number;
  units: string[];
  unitPrices: number[];
  images: string[];
};

type ItemCardProps = {
  item: Item;
};

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const hasMultipleOptions = item.units.length > 1;

  const handleAdd = (unit: string, price: number) => {
    console.log(`Added ${item.name} (${unit}) for ₹${price}`);
    setModalVisible(false);
  };

  // Calculate discount percentage
  const discount = Math.round((1 - item.unitPrices[0] / item.price) * 100);

  return (
    <View className="bg-white rounded-2xl overflow-hidden w-[48%]">
      {/* Image and Add Button Overlay */}
      <View className="relative">
        <Image
          source={images.item}
          className="w-[300px] h-[300px]"
          resizeMode="contain"
        />
        <TouchableOpacity
          className="absolute bottom-3 right-3 bg-white px-4 py-2 rounded-full border border-green-600"
          onPress={() => hasMultipleOptions ? setModalVisible(true) : handleAdd(item.units[0], item.unitPrices[0])}
        >
          <Text className="text-green-600 font-semibold">
            ADD
            {hasMultipleOptions && (
              <Text className="text-gray-500 text-xs ml-1">
                {' '}2 options
              </Text>
            )}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="p-3">
        {/* Weight */}
        <Text className="text-gray-500 text-sm mb-1">
          {item.units[0]}
        </Text>

        {/* Name */}
        <Text className="text-lg font-semibold mb-1">{item.name}</Text>

        {/* Delivery Time */}
        <View className="flex-row items-center mb-2">
          <Text className="text-gray-500 text-sm">9 MINS</Text>
        </View>

        {/* Pricing */}
        <View className="flex-row items-baseline gap-2">
          {discount > 0 && (
            <Text className="text-blue-600 font-medium">
              {discount}% OFF
            </Text>
          )}
          <Text className="text-xl font-bold">₹{item.unitPrices[0]}</Text>
          <Text className="text-gray-400 text-sm line-through">
            MRP ₹{item.price}
          </Text>
        </View>
      </View>

      {/* Modal for Multiple Options */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg w-4/5 p-4">
            <Text className="text-lg font-bold mb-3">{item.name}</Text>
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
              <Text className="text-center font-medium">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ItemCard;