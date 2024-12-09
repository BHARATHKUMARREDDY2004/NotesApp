import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  // Function to handle navigation to the sign-up screen directly
  const handleNavigation = () => {
    router.replace("/sign-up"); // Directly navigate to the sign-up screen
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      {/* Skip Button */}
      <TouchableOpacity
        onPress={handleNavigation} // Directly navigate when Skip is pressed
        className="w-full flex justify-end items-end px-5"
      >
        <Text className="text-black text-md font-pbold">Skip</Text>
      </TouchableOpacity>

      {/* Swiper */}
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[24px] h-[6px] mx-1 bg-[#eaf6f6] rounded-full" /> // Update dot colors
        }
        activeDot={
          <View className="w-[24px] h-[6px] mx-1 bg-[#ff6f3c] rounded-full" /> // Update activeDot colors
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center">
            <Image
              source={item.image}
              className="w-full h-[550px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-8">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-md font-psemibold text-center text-gray-200 mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      {/* Button */}
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() => {
          if (isLastSlide) {
            handleNavigation(); // Navigate when on the last slide
          } else {
            swiperRef.current?.scrollBy(1); // Swipe to next slide
          }
        }}
        className="w-11/12 mt-5 mb-5"
      />
    </SafeAreaView>
  );
};

export default Onboarding;
