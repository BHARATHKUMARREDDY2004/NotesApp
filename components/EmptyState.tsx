import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "@/constants";
import CustomButton from "./CustomButton";

import { EmptyStateProps } from "@/types/type";

const EmptyState = ({ title, subtitle, image }: EmptyStateProps) => {
  return (
    <View className="flex justify-center items-center px-4 py-[20%]">
      <Image
        source={image || images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-md font-psemibold text-black-400">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-black-500 mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title="Back to Explore"
        onPress={() => router.back()}
        textStyle="text-white"
        className="w-full my-5 bg-orange"
      />
    </View>
  );
};

export default EmptyState;
