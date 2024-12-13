import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";

export default function Loan() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <SafeAreaView className="px-4 flex-1 bg-white pb-4">
      {/* Header */}
      <View className="flex flex-row justify-center items-center p-4">
        <Text className="text-xl font-semibold text-gray-800">dukaa</Text>
        <Text className="text-xl font-semibold text-orange-500">On</Text>
      </View>

      {/* Title Section */}
      <View>
        <Text className="text-2xl font-bold text-gray-900">Get instant loan</Text>
        <Text className="text-sm text-gray-500">
          ZERO processing fees & foreclosure charges
        </Text>
      </View>

      {/* Steps Section */}
      <ScrollView showsVerticalScrollIndicator={false} className="mt-10">
        {[
          { id: 1, icon: "search-dollar", text: "Check loan offer" },
          { id: 2, icon: "id-card", text: "Complete KYC" },
          { id: 3, icon: "money-check-alt", text: "Loan Disbursal" },
        ].map((step, index) => (
          <View key={step.id} className="flex-row items-start">
            {/* Icon and Connector */}
            <View className="items-center mr-4">
              <View className={`w-12 h-12 rounded-full border-2 ${
                index === 0 ? "border-orange-500 bg-orange-50" : "border-gray-200"
              } justify-center items-center`}>
                <FontAwesome5
                  name={step.icon}
                  size={24}
                  color={index === 0 ? "#FF7A00" : "#D1D5DB"}
                />
              </View>
              {index < 2 && (
                <View className="h-14 flex items-center justify-center">
                  <View className="w-[2px] h-full border-l-2 border-dashed border-gray-200" />
                </View>
              )}
            </View>
            {/* Step Text */}
            <Text
              className={`text-lg font-medium ${
                index === 0 ? "text-gray-900" : "text-gray-400"
              } mt-3`}
            >
              {step.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Terms and Agreement */}
      <View className="mt-4">
        {/* Checkbox */}
        <TouchableOpacity
          className="flex-row items-center mb-2"
          onPress={handleCheckboxToggle}
        >
          <View
            className={`w-6 h-6 border-2 items-center rounded mt-1 ${
              isChecked ? "bg-orange-500 border-orange-500" : "border-gray-400"
            } flex items-center justify-center`}
          >
            {isChecked && <FontAwesome5 name="check" size={14} color="#FFF" />}
          </View>
          <Text className="ml-2 text-sm text-gray-600 flex-1">
            By proceeding, I agree to the{" "}
            <Text className="text-blue-500">NBFC Cash Loan Privacy Policy</Text>{" "}
            &{" "}
            <Text className="text-blue-500">Terms of Use</Text>
          </Text>
        </TouchableOpacity>
        <Text className="text-sm text-gray-600 mt-2">
          I consent to dukkaOn requesting my credit information report from credit bureaus.{" "}
          <Text className="text-blue-500">Know more</Text>
        </Text>
      </View>

      {/* Bottom Button */}
      <View className="mt-6">
        <CustomButton
          title="Continue"
          onPress={() => {
            if (isChecked) {
              console.log("Proceeding to the next step...");
            } else {
              alert("Please accept the terms to proceed.");
            }
          }}
          className={`bg-orange-500 ${isChecked ? "" : "opacity-50"}`}
          textStyle="text-white"
          disabled={!isChecked}
        />
      </View>
    </SafeAreaView>
  );
}

