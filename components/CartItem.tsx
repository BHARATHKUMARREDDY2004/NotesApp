// import React from 'react';
// import { View, Text, Image, TouchableOpacity } from 'react-native';
// import { useStore } from '@/store';

// interface CartItemProps {
//   item: {
//     id: string;
//     name: string;
//     unit: string;
//     quantity: number;
//     price: number;
//     image: any;
//   };
// }

// export default function CartItem({ item }: CartItemProps) {
//   const updateCartItemQuantity = useStore((state) => state.updateCartItemQuantity);
//   const removeFromCart = useStore((state) => state.removeFromCart);

//   const handleIncrement = () => {
//     updateCartItemQuantity(item.id, item.unit, item.quantity + 1);
//   };

//   const handleDecrement = () => {
//     if (item.quantity > 1) {
//       updateCartItemQuantity(item.id, item.unit, item.quantity - 1);
//     } else {
//       removeFromCart(item.id, item.unit);
//     }
//   };

//   return (
//     <View className="flex-row items-center bg-white p-4 rounded-lg mb-4 shadow-sm">
//       <Image
//         source={item.image}
//         className="w-20 h-20 rounded-md mr-4"
//       />
//       <View className="flex-1">
//         <Text className="text-lg font-semibold">{item.name}</Text>
//         <Text className="text-gray-600">{item.unit}</Text>
//         <Text className="text-blue-600 font-bold mt-1">₹{item.price}</Text>
//       </View>
//       <View className="flex-row items-center">
//         <TouchableOpacity
//           onPress={handleDecrement}
//           className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
//         >
//           <Text className="text-xl font-bold">-</Text>
//         </TouchableOpacity>
//         <Text className="mx-3 text-lg">{item.quantity}</Text>
//         <TouchableOpacity
//           onPress={handleIncrement}
//           className="bg-blue-500 w-8 h-8 rounded-full items-center justify-center"
//         >
//           <Text className="text-xl font-bold text-white">+</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useStore } from '@/store';
import { images } from "@/constants";
import { Ionicons } from '@expo/vector-icons';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    unit: string;
    quantity: number;
    price: number;
    image: any;
  };
}

export default function CartItem({ item }: CartItemProps) {
  const updateCartItemQuantity = useStore((state) => state.updateCartItemQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const handleIncrement = () => {
    updateCartItemQuantity(item.id, item.unit, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateCartItemQuantity(item.id, item.unit, item.quantity - 1);
    } else {
      removeFromCart(item.id, item.unit);
    }
  };

  return (
    <View className="flex-row items-center bg-white/70 p-4 rounded-3xl mb-4">
      <Image
        source={images.item}
        className="w-28 h-28 rounded-2xl mr-4"
      />
      <View className="flex-1 space-y-1">
        <Text className="text-xl font-psemibold text-gray-600">{item.name}</Text>
        <Text className="text-gray-500 text-sm text-psemibold">{item.unit}</Text>
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-orange-500 font-bold text-lg">₹{item.price}</Text>
        </View>
      </View>
      <View className="absolute bottom-4 right-4 flex-row items-center rounded-xl px-2 py-1">
  <TouchableOpacity
    onPress={handleDecrement}
    className="w-8 h-8 rounded-lg items-center justify-center bg-orange-200"
  >
    <Ionicons name="remove" size={24} color="#FF7A00" />
  </TouchableOpacity>
  <Text className="mx-3 text-lg font-psemibold text-orange-500">{item.quantity}</Text>
  <TouchableOpacity
    onPress={handleIncrement}
    className="w-8 h-8 rounded-lg items-center justify-center bg-orange-200"
  >
    <Ionicons name="add" size={24} color="#FF7A00" />
  </TouchableOpacity>
</View>
    </View>
  );
}

