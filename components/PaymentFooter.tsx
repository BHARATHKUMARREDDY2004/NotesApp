import React from "react";
import { View, Text } from "react-native";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

export default function PaymentFooter({
  priceDetails,
  buttonTitle,
}: any) {
  return (
    <View className="p-4">
      {/* Price Details Section */}
      <View className="mb-2 bg-white/70 rounded-lg px-4 py-2">
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-800 font-pmedium">MRP ({priceDetails.itemCount} items):</Text>
          <Text className="text-gray-800">{priceDetails.MRP.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-800 font-pmedium">Product Discount:</Text>
          <Text className="text-green-400">- ₹{priceDetails.discount.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-800 font-pmedium">Delivery Fee:</Text>
          <Text className="text-gray-800">₹{priceDetails.deliveryFee.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-800 font-pmedium">Total Amount:</Text>
          <Text className="text-gray-800">₹{priceDetails.totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      {/* Continue Button */}
      <CustomButton
        title={buttonTitle}
        onPress={() => {
          router.push("/payment");
        }}
        textStyle="text-white"
        className="w-full bg-orange"
      />
    </View>
  );
}
