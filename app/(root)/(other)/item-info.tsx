// import React, { useState } from "react";
// import {
//   View,
//   SafeAreaView,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import { AntDesign } from "@expo/vector-icons";
// import Swiper from 'react-native-swiper';
// import { useStore } from "@/store"; // Import your Zustand store

// const ItemInfo = () => {
//   const { item } = useLocalSearchParams();
//   const itemData = JSON.parse(item as string);
//   const [selectedUnit, setSelectedUnit] = useState(itemData.units[0]);
//   const [selectedUnitPrice, setSelectedUnitPrice] = useState(itemData.unitPrices[0]);

//   const { addToCart } = useStore(); // Accessing addToCart from the store

//   const handleAdd = (unit: string, price: number) => {
//     addToCart({
//       id: itemData.id,
//       name: itemData.name,
//       unit,
//       quantity: 1,
//       price,
//       image: itemData.images[0],
//     });
//   };

//   console.log(selectedUnit, selectedUnitPrice);

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <ScrollView className="flex-1">
//         {/* Back Button */}
//         {/* <TouchableOpacity
//           className="absolute left-4 top-4 z-10 bg-white rounded-full p-2"
//           onPress={() => router.back()}
//         >
//           <AntDesign name="left" size={24} color="black" />
//         </TouchableOpacity> */}

//         {/* Product Images */}
//         <View className="h-96 bg-white relative">
//           <Swiper
//             loop={false}
//             dot={<View className="w-1 h-1 rounded-full bg-gray-300 mx-[.8px]" />}
//             activeDot={<View className="w-1.5 h-1.5 rounded-full bg-orange-500 mx-[1px]" />}
//             paginationStyle={{
//               bottom: 10,
//               right: 10,
//               left: undefined,
//               flexDirection: 'row',
//             }}
//           >
//             {itemData.images.map((image: string, index: number) => (
//               <View key={index} className="flex-1 justify-center items-center">
//                 <Image
//                   source={{ uri: image }}
//                   className="w-full h-full"
//                   resizeMode="contain"
//                 />
//               </View>
//             ))}
//           </Swiper>
//         </View>

//         {/* Product Info */}
//         <View className="p-4">
//           <Text className="text-xl font-semibold text-gray-800 mb-2">
//             {itemData.name}
//           </Text>

//           {/* Unit Selection */}
//           <Text className="text-md font-medium mb-4 text-gray-800">
//             Select Unit
//           </Text>
//           <View className="flex-row flex-wrap gap-4">
//             {itemData.units.map((unit: string, index: number) => {
//               const isSelected = selectedUnit === unit;
//               return (
//                 <TouchableOpacity
//                   key={unit}
//                   onPress={() => {setSelectedUnit(unit); setSelectedUnitPrice(itemData.unitPrices[index])}}
//                   className={`border-2 rounded-lg p-1 w-[90px] border-[0.8px] ${
//                     isSelected
//                       ? "border-orange-500 bg-orange-50"
//                       : "border-gray-100"
//                   }`}
//                 >
//                   <Text className="text-center text-md text-gray-800">
//                     {unit}
//                   </Text>
//                   <Text className="text-center text-md font-semibold text-gray-800">
//                     ₹{itemData.unitPrices[index]}
//                   </Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>

//           {/* Minimum Quantity */}
//           <View className="mt-6 p-4 bg-gray-50 rounded-lg">
//             <Text className="text-gray-600">
//               Minimum Order Quantity: {itemData.minQty} units
//             </Text>
//           </View>

//           {/* Product Information */}
//           <View className="mt-6">
//             <Text className="text-xl font-medium mb-4 text-gray-800">
//               Product Information
//             </Text>
//             {itemData.information.map((info: string, index: number) => (
//               <View
//                 key={info}
//                 className="flex-row justify-between py-3 border-b border-gray-200"
//               >
//                 <Text className="text-gray-600">{info}</Text>
//                 <Text className="text-gray-800">
//                   {itemData.infoDescriptions[index]}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       </ScrollView>

//       <View className="pb-[100px]" />
//     </SafeAreaView>
//   );
// };

// export default ItemInfo;

// import React, { useState } from "react";
// import {
//   View,
//   SafeAreaView,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import Swiper from "react-native-swiper";
// import { useStore } from "@/store"; // Import Zustand store
// import { LinearGradient } from "expo-linear-gradient";

// const ItemInfo = () => {
//   const { item } = useLocalSearchParams();
//   const itemData = JSON.parse(item as string);
//   const [selectedUnit, setSelectedUnit] = useState(itemData.units[0]);
//   const [selectedUnitPrice, setSelectedUnitPrice] = useState(
//     itemData.unitPrices[0]
//   );

//   const { addToCart } = useStore(); // Accessing addToCart from the store

//   const handleAdd = () => {
//     addToCart({
//       id: itemData.id,
//       name: itemData.name,
//       unit: selectedUnit,
//       quantity: 1,
//       price: selectedUnitPrice,
//       image: itemData.images[0],
//     });
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <ScrollView className="flex-1">
//         {/* Product Images */}
//         <View className="h-96 bg-white relative">
//           <Swiper
//             loop={false}
//             dot={
//               <View className="w-1 h-1 rounded-full bg-gray-300 mx-[.8px]" />
//             }
//             activeDot={
//               <View className="w-1.5 h-1.5 rounded-full bg-orange-500 mx-[1px]" />
//             }
//             paginationStyle={{
//               bottom: 10,
//               right: 10,
//               left: undefined,
//               flexDirection: "row",
//             }}
//           >
//             {itemData.images.map((image: string, index: number) => (
//               <View key={index} className="flex-1 justify-center items-center">
//                 <Image
//                   source={{ uri: image }}
//                   className="w-full h-full"
//                   resizeMode="contain"
//                 />
//               </View>
//             ))}
//           </Swiper>
//         </View>

//         {/* Product Info */}
//         <View className="p-4">
//           <Text className="text-xl font-semibold text-gray-800 mb-2">
//             {itemData.name}
//           </Text>

//           {/* Minimum Quantity */}
//             <Text className="text-sm text-gray-600 mb-2 rounded-lg">
//               Minimum Order Quantity: {itemData.minQty} units
//             </Text>

//           {/* Unit Selection */}
//           <Text className="text-md font-medium mb-4 text-gray-800">
//             Select Unit
//           </Text>
//           <View className="flex-row flex-wrap gap-4">
//             {itemData.units.map((unit: string, index: number) => {
//               const isSelected = selectedUnit === unit;
//               return (
//                 <TouchableOpacity
//                   key={unit}
//                   onPress={() => {
//                     setSelectedUnit(unit);
//                     setSelectedUnitPrice(itemData.unitPrices[index]);
//                   }}
//                   className={`border-2 rounded-lg p-1 w-[90px] border-[0.8px] ${
//                     isSelected
//                       ? "border-orange-500 bg-orange-50"
//                       : "border-gray-100"
//                   }`}
//                 >
//                   <Text className="text-center text-md text-gray-800">
//                     {unit}
//                   </Text>
//                   <Text className="text-center text-md font-semibold text-gray-800">
//                     ₹{itemData.unitPrices[index]}
//                   </Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>
//         </View>
//       </ScrollView>

//       {/* Bottom Section */}
//       <View className="absolute bottom-0 left-0 right-0 bg-white shadow-md px-4 py-2 flex-row items-center justify-between">
//         <LinearGradient
//           colors={["#FFEBD7", "transparent"]} // Dark at the base, fades outward
//           start={{ x: 0, y: 1 }} // Starts at the bottom (near the section)
//           end={{ x: 0, y: 0.3 }} // Ends at the top (fading away)
//           style={{
//             position: "absolute",
//             top: -10, // Move above the section
//             left: 0,
//             right: 0,
//             height: 10, // Adjust the height to control the shadow distance
//           }}
//         />

//         <View>
//           <Text className="text-psemibold text-gray-800">{selectedUnit}</Text>
//           <Text className="text-sm text-gray-800 font-semibold">
//             MRP ₹{selectedUnitPrice}
//           </Text>
//           <Text className="text-xs text-gray-500">Inclusive of all taxes</Text>
//         </View>
//         <TouchableOpacity
//           onPress={handleAdd}
//           className="bg-green-500 py-3 px-6 rounded-lg"
//         >
//           <Text className="text-white font-psemibold">Add to cart</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ItemInfo;

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
import Swiper from "react-native-swiper";
import { useStore } from "@/store"; // Import Zustand store
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

const ItemInfo = () => {
  const { item } = useLocalSearchParams();
  const itemData = JSON.parse(item as string);
  const [selectedUnit, setSelectedUnit] = useState(itemData.units[0]);
  const [selectedUnitPrice, setSelectedUnitPrice] = useState(
    itemData.unitPrices[0]
  );

  const { cart, addToCart, updateCartItemQuantity, removeFromCart } =
    useStore(); // Access cart and actions from store

  // Check if the selected unit is already in the cart
  const cartItem = cart.find(
    (cartItem) => cartItem.id === itemData.id && cartItem.unit === selectedUnit
  );

  const handleAdd = () => {
    addToCart({
      id: itemData.id,
      name: itemData.name,
      unit: selectedUnit,
      quantity: 1,
      price: selectedUnitPrice,
      image: itemData.images[0],
    });
  };

  const handleIncrement = () => {
    if (cartItem) {
      updateCartItemQuantity(itemData.id, selectedUnit, cartItem.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (cartItem && cartItem.quantity > 1) {
      updateCartItemQuantity(itemData.id, selectedUnit, cartItem.quantity - 1);
    } else {
      removeFromCart(itemData.id, selectedUnit);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Product Images */}
        <View className="h-96 bg-white relative">
          <Swiper
            loop={false}
            dot={
              <View className="w-1 h-1 rounded-full bg-gray-300 mx-[.8px]" />
            }
            activeDot={
              <View className="w-1.5 h-1.5 rounded-full bg-orange-500 mx-[1px]" />
            }
            paginationStyle={{
              bottom: 10,
              right: 10,
              left: undefined,
              flexDirection: "row",
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
          <Text className="text-xl font-psemibold text-gray-800 mb-2">
            {itemData.name}
          </Text>

          {/* Minimum Quantity */}
          <Text className="text-md font-pmedium text-gray-800 mb-2 rounded-lg">
            Minimum Order Quantity: {itemData.minQty} units
          </Text>

          {/* Unit Selection */}
          {itemData.units.length > 1 ? (
            <>
              <Text className="text-md font-pmedium mb-4 text-gray-800">
                Select Unit
              </Text>
              <View className="flex-row flex-wrap gap-4">
                {itemData.units.map((unit: string, index: number) => {
                  const isSelected = selectedUnit === unit;
                  return (
                    <TouchableOpacity
                      key={unit}
                      onPress={() => {
                        setSelectedUnit(unit);
                        setSelectedUnitPrice(itemData.unitPrices[index]);
                      }}
                      className={`border-2 rounded-lg p-1 w-[90px] border-[0.5px] ${
                        isSelected
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-100"
                      }`}
                    >
                      <Text className="text-center font-pregular text-gray-800">
                        {unit}
                      </Text>
                      <Text className="text-center text-md font-semibold text-gray-800">
                        ₹{itemData.unitPrices[index]}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          ) : (
            <View className="mb-4">
              <Text className="font-psemibold text-gray-800">
                {itemData.units[0]}
              </Text>
              <Text className="text-md font-psemibold text-gray-800">
                Price: ₹{itemData.unitPrices[0]}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View className="absolute bottom-0 left-0 right-0 bg-white shadow-md px-4 py-2 flex-row items-center justify-between">
        <LinearGradient
          colors={["#FFEBD7", "transparent"]} // Dark at the base, fades outward
          start={{ x: 0, y: 1 }} // Starts at the bottom (near the section)
          end={{ x: 0, y: 0.3 }} // Ends at the top (fading away)
          style={{
            position: "absolute",
            top: -10, // Move above the section
            left: 0,
            right: 0,
            height: 10, // Adjust the height to control the shadow distance
          }}
        />

        <View>
          <Text className="text-md font-pmedium text-gray-800">
            {selectedUnit}
          </Text>
          <View className="flex-row items-baseline gap-1">
          <Text className="text-md text-gray-800 font-pmedium">MRP</Text>
          <Text className="text-md font-semibold text-gray-800">
            ₹{selectedUnitPrice}
          </Text>
        </View>
          <Text className="text-xs text-gray-500 font-plight">Inclusive of all taxes</Text>
        </View>

        {/* Show Add to Cart or Increment/Decrement */}
        {cartItem ? (
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={handleDecrement}
              className="w-12 h-12 rounded-lg items-center justify-center bg-orange-200"
            >
              <Ionicons name="remove" size={24} color="#FF7A00" />
            </TouchableOpacity>
            <Text className="mx-3 text-2xl font-psemibold text-orange-500">
              {cartItem.quantity}
            </Text>
            <TouchableOpacity
              onPress={handleIncrement}
              className="w-12 h-12 rounded-lg items-center justify-center bg-orange-200"
            >
              <Ionicons name="add" size={24} color="#FF7A00" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleAdd}
            className="bg-orange py-4 px-6 rounded-lg"
          >
            <Text className="text-lg text-white font-psemibold">Add to cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ItemInfo;
