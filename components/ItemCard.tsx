// import React, { useState } from "react";
// import { View, Text, Image, TouchableOpacity, Modal, FlatList } from "react-native";
// import { images } from "@/constants";
// import { router } from "expo-router";

// type Item = {
//   id: string;
//   name: string;
//   category: string;
//   minQty: number;
//   price: number;
//   units: string[];
//   unitPrices: number[];
//   information: [];
//   infoDescriptions: [];
//   images: [];
//   wholesaler: string;
// };

// type ItemCardProps = {
//   item: Item;
// };

// const ItemCard = ({ item }: ItemCardProps) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const hasMultipleOptions = item.units.length > 1;

//   const handleAdd = (unit: string, price: number) => {
//     console.log(`Added ${item.name} (${unit}) for ₹${price}`);
//     setModalVisible(false);
//   };

//   // Calculate discount percentage
//   const discount = Math.round((1 - item.unitPrices[0] / item.price) * 100);

//   return (
//     <View className="bg-white/70 rounded-2xl overflow-hidden w-[48%] m-1">
//       {/* Image and Add Button Overlay */}
//       <TouchableOpacity className="relative" onPress={()=> router.push('/item-info')}>
//         <Image
//           source={images.item}
//           className="w-full h-40 rounded-2xl"
//           resizeMode="cover"
//         />
//         <View className="absolute bottom-0 right-2">
//           <TouchableOpacity
//             className="bg-white p-2 rounded-full border border-green-600 w-24"
//             onPress={() =>
//               hasMultipleOptions
//                 ? setModalVisible(true)
//                 : handleAdd(item.units[0], item.unitPrices[0])
//             }
//           >
//             <Text className="text-green-600 font-semibold text-center">
//               ADD
//             </Text>
//           </TouchableOpacity>
//           {hasMultipleOptions && (
//             <View className="absolute -bottom-1.5 w-full">
//               <Text className="text-gray-500 text-xs text-center bg-white rounded-xl px-2 mx-auto">
//                 {item.units.length} options
//               </Text>
//             </View>
//           )}
//         </View>
//       </TouchableOpacity>

//       {/* Content */}
//       <TouchableOpacity className="px-2 py-3 flex-col" onPress={()=> router.push('/item-info')}>
//         {/* Weight */}
//         <Text className="text-gray-500 text-sm mb-1">{item.units[0]}</Text>

//           <Text
//             className="text-base font-psemibold text-gray-800 text-balance"
//             numberOfLines={2}
//             ellipsizeMode="tail"
//           >
//             {item.name.length > 40 ? `${item.name.substring(0, 40)}...` : item.name}
//           </Text>

//         {/* Pricing */}
//         <View className="flex-row items-baseline gap-1">
//           <Text className="text-sm text-gray-500">MRP</Text>
//           <Text className="text-md font-semibold text-gray-800">₹{item.unitPrices[0]}</Text>
//         </View>

//         {/* Delivery Time */}
//         <View className="flex-row items-center mb-2">
//           <Text className="text-gray-500 text-sm">Min Order : {item.minQty} Units</Text>
//         </View>
//       </TouchableOpacity>

//       {/* Modal for Multiple Options */}
//       <Modal visible={modalVisible} transparent animationType="slide">
//         <View className="flex-1 justify-center items-center bg-black/50">
//           <View className="bg-white rounded-lg w-4/5 p-4">
//             <Text className="text-lg font-pbold mb-3">{item.name}</Text>
//             <FlatList
//               data={item.units.map((unit, index) => ({
//                 key: unit,
//                 price: item.unitPrices[index],
//               }))}
//               renderItem={({ item: option }) => (
//                 <TouchableOpacity
//                   className="py-3 px-4 border-b border-gray-200"
//                   onPress={() => handleAdd(option.key, option.price)}
//                 >
//                   <Text className="text-base">
//                     {option.key} - ₹{option.price}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             />
//             <TouchableOpacity
//               className="mt-4 py-3 bg-gray-100 rounded-lg"
//               onPress={() => setModalVisible(false)}
//             >
//               <Text className="text-center font-pmedium">Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default ItemCard;

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  StatusBar,
} from "react-native";
import { useStore } from "@/store"; // Import your Zustand store
import { router } from "expo-router";
import { images } from "@/constants";
import { Ionicons } from "@expo/vector-icons";

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

  const { cart, addToCart, removeFromCart, updateCartItemQuantity } =
    useStore(); // Access store actions and state

  const cartItems = cart.filter((cartItem) => cartItem.id === item.id);

  const totalQuantity = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.quantity,
    0
  );

  const findCartItem = (unit: string) =>
    cartItems.find((cartItem) => cartItem.unit === unit);

  const handleAdd = (unit: string, price: number) =>
    addToCart({
      id: item.id,
      name: item.name,
      unit,
      quantity: item.minQty,
      price,
      image: item.images[0],
    });

  const handleQuantityChange = (unit: string, delta: number) => {
    const cartItem = findCartItem(unit);
    if (cartItem) {
      const newQuantity = cartItem.quantity + delta;
      if (newQuantity > 0) {
        updateCartItemQuantity(item.id, unit, newQuantity);
      } else {
        removeFromCart(item.id, unit);
      }
    } else if (delta > 0) {
      handleAdd(unit, item.unitPrices[item.units.indexOf(unit)]);
    }
  };

  return (
    <View className="bg-white/70 rounded-2xl overflow-hidden w-[48%] m-1">
      <TouchableOpacity
        className="relative"
        onPress={() =>
          router.push({
            pathname: "/item-info",
            params: { item: JSON.stringify(item) },
          })
        }
      >
        <Image
          source={images.item}
          className="w-full h-40 rounded-2xl"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 right-0 pl-3 pt-3 rounded-2xl">
          {totalQuantity > 0 ? (
            <View className="flex-row items-center bg-orange-100 p-1 rounded-xl border border-orange">
              <TouchableOpacity
                onPress={() =>
                  item.units.length > 1
                    ? setModalVisible(true)
                    : handleQuantityChange(item.units[0], -1)
                }
                className="w-8 h-8 items-center justify-center"
              >
                <Ionicons name="remove" size={24} color="#FF7A00" />
              </TouchableOpacity>
              <Text className="mx-2 text-lg font-psemibold text-orange-500 text-center">
                {item.units.length > 1
                  ? totalQuantity
                  : cartItems[0]?.quantity || 0}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  item.units.length > 1
                    ? setModalVisible(true)
                    : handleQuantityChange(item.units[0], 1)
                }
                className="w-8 h-8 items-center justify-center"
              >
                <Ionicons name="add" size={24} color="#FF7A00" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              className="bg-orange-100 p-2 rounded-xl border border-orange w-24"
              onPress={() =>
                item.units.length > 1
                  ? setModalVisible(true)
                  : handleAdd(item.units[0], item.unitPrices[0])
              }
            >
              <Text className="text-orange font-semibold text-center">ADD</Text>
              {hasMultipleOptions && (
              <View className="absolute -bottom-1.5 right-3 bg-orange-100 rounded-xl">
                <Text className="text-gray-500 text-xs text-center rounded-xl px-2">
                  {item.units.length} options
                </Text>
              </View>
            )}
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      {/* Content */}
      <TouchableOpacity
        className="px-2 py-3 flex-col"
        onPress={() =>
          router.push({
            pathname: "/item-info",
            params: { item: JSON.stringify(item) },
          })
        }
      >
        <Text
          className="text-base font-psemibold text-gray-800 text-balance"
          numberOfLines={2}
        >
          {item.name.length > 40
            ? `${item.name.substring(0, 40)}...`
            : item.name}
        </Text>
        <View className="flex-row items-baseline gap-1">
          <Text className="text-sm text-gray-500 font-pregular">MRP</Text>
          <Text className="text-md font-semibold text-gray-800">
            ₹{item.unitPrices[0]}
          </Text>
        </View>
        <View className="flex-row items-center mb-2">
          <Text className="text-gray-500 text-sm font-pregular">
            Min Order: {item.minQty} Units
          </Text>
        </View>
      </TouchableOpacity>

      {/* Modal for Multiple Options */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0.5)"
          barStyle="light-content"
        />
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg w-4/5 p-4">
            <Text className="text-lg font-pbold mb-3 text-gray-800">{item.name}</Text>
            <FlatList
              data={item.units.map((unit, index) => ({
                key: unit,
                price: item.unitPrices[index],
              }))}
              renderItem={({ item: option }) => {
                const cartItem = findCartItem(option.key);

                return (
                  <View className="py-3 px-4 border-b border-gray-200 flex-row justify-between items-center">
                    <Text className="text-base font-pregular w-3/4">
                      {option.key} - ₹{option.price}
                    </Text>
                    <View className="w-1/4 items-center">
                      {cartItem ? (
                        <View className="flex-row items-center">
                          <TouchableOpacity
                            onPress={() =>
                              handleQuantityChange(option.key, -1)
                            }
                            className="w-8 h-8 rounded-lg items-center justify-center bg-orange-200"
                          >
                            <Ionicons name="remove" size={24} color="#FF7A00" />
                          </TouchableOpacity>
                          <Text className="mx-2 text-lg font-psemibold text-orange-500">
                            {cartItem.quantity}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              handleQuantityChange(option.key, 1)
                            }
                            className="w-8 h-8 rounded-lg items-center justify-center bg-orange-200"
                          >
                            <Ionicons name="add" size={24} color="#FF7A00" />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() => handleAdd(option.key, option.price)}
                          className="bg-orange py-1 px-4 rounded-lg"
                        >
                          <Text className="text-white font-psemibold">Add</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item) => item.key}
            />

            <TouchableOpacity
              className="mt-4 py-3 bg-orange-200 rounded-lg"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-center font-pmedium text-gray-800">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ItemCard;
