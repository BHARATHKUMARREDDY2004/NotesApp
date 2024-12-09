import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import OTPModal from "@/components/OTPModal";
import SuccessModal from "@/components/SuccessModal";
import { useState } from "react";
import { Link, router } from "expo-router";

const SignUp = () => {
  const [phone, setPhone] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSignUp = () => {
    setShowOtpModal(true);
  };

  const handleVerifyOtp = (otp: string) => {
    console.log("Verifying OTP:", otp);
    setShowOtpModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccess = () => {
    setShowSuccessModal(false);
    router.push("/(root)/(tabs)/home");
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="relative">
        <Image 
          source={require("@/assets/images/onboarding1.png")}
          className="z-0 w-full h-[700px]"
          resizeMode="contain"
        />
      </View>

      <View className="px-5 pt-0 pb-6">
        <View className="mb-2">
          <Text className="text-2xl font-pbold text-gray-800 text-center">
            Sign Up or Sign In 
          </Text>
        </View>
        <InputField
          label=""
          icon="call-outline"
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <CustomButton
          title="Continue"
          bgVariant="primary"
          textVariant="primary"
          className="mt-5"
          onPress={handleSignUp}
        />
      </View>

      <OTPModal
        visible={showOtpModal}
        onVerify={handleVerifyOtp}
        onClose={() => setShowOtpModal(false)}
      />
      <SuccessModal
        visible={showSuccessModal}
        onClose={handleSuccess}
      />
    </ScrollView>
  );
};

export default SignUp;