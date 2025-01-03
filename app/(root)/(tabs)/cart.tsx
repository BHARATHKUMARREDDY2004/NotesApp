// import React from 'react';
// import { SafeAreaView, ScrollView, View, Text } from 'react-native';
// import { useStore } from '@/store';
// import CartItem from '@/components/CartItem';
// import PaymentFooter from '@/components/PaymentFooter';

// export default function Cart() {
//   const cart = useStore((state) => state.cart);
//   const calculateCartTotal = useStore((state) => state.calculateCartTotal);
//   const clearCart = useStore((state) => state.clearCart);
//   const placeOrder = useStore((state) => state.placeOrder);

//   const handlePlaceOrder = () => {
//     // placeOrder();
//     // You might want to navigate to an order confirmation screen here
//     console.log('Order placed');
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-orange-100">
//       <ScrollView className="flex-1">
//         <View className="p-4">
//           <Text className="text-2xl font-bold mb-4">Your Cart</Text>
//           {cart.length > 0 ? (
//             cart.map((item) => (
//               <CartItem key={`${item.id}-${item.unit}`} item={item} />
//             ))
//           ) : (
//             <Text className="text-gray-500">Your cart is empty</Text>
//           )}
//         </View>
//         {cart.length > 0 && (
//         <PaymentFooter
//           totalPrice={calculateCartTotal()}
//           buttonTitle="Place Order"
//           onPress={handlePlaceOrder}
//         />
//       )}
//       <View className='pb-[100px]' />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }


import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {router} from 'expo-router';
import { useStore } from '@/store';
import CartItem from '@/components/CartItem';
import PaymentFooter from '@/components/PaymentFooter';
import EmptyState from '@/components/EmptyState';
import {images} from '@/constants';

export default function Cart() {
  const cart = useStore((state) => state.cart);
  const calculateCartTotal = useStore((state) => state.calculateCartTotal);
  const clearCart = useStore((state) => state.clearCart);
  const placeOrder = useStore((state) => state.placeOrder);

  const handlePlaceOrder = () => {
    // placeOrder(); // Uncomment this line if you want to integrate order placement
    console.log('Order placed');
  };

  const priceDetails = {
    itemCount: cart.length,
    MRP: calculateCartTotal(),
    discount: 0, // Assuming no direct discount is passed, might be fetched from your store
    deliveryFee: 50, // Example static value for delivery fee
    totalAmount: calculateCartTotal() + 50, // Assuming delivery fee is added here
  };

  return (
    <SafeAreaView className="flex-1 bg-orange-100">
      <ScrollView className="flex-1">
        <View className="p-2">
        <View className="flex-row items-center justify-between p-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-psemibold flex-1 ml-4">Your Cart</Text>
        </View>
          {cart.length > 0 ? (
            cart.map((item) => (
              <CartItem key={`${item.id}-${item.unit}`} item={item} />
            ))
          ) : (
            
            <EmptyState
            title="Your cart is empty"
            subtitle="Looks like you haven't added anything to your cart yet."
            image={images.emptycart}
          />
          )}
        </View>
        {cart.length > 0 && (
          <PaymentFooter
            priceDetails={priceDetails}
            buttonTitle="Place Order"
          />
        )}
        <View className='pb-[100px]' />
      </ScrollView>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
    </SafeAreaView>
  );
}
