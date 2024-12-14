import { View, Text, ScrollView } from "react-native";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import OTPModal from "@/components/OTPModal";
import SuccessModal from "@/components/SuccessModal";
import { useState } from "react";
import { router } from "expo-router";

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
    router.replace("/(root)/(tabs)/home");
  };

  return (
    <View className="flex-1 bg-orange-200">
      <View className="flex-1 flex-col justify-evenly">
      {/* Logo and Tagline */}
      <View className="items-center justify-center h-[65%]">
        <View className="flex flex-row items-center bg-black/30 rounded-2xl p-4 mb-4">
          <Text className="text-2xl font-pbold text-white">dukaa</Text>
          <Text className="text-2xl font-pbold text-orange">On</Text>
        </View>
        <Text className="text-xl font-pmedium text-gray-200 text-center">
          Keeping your bussiness going on ...
        </Text>
      </View>

      {/* Sign Up or Sign In */}
      <View className="w-full px-5 pt-0 pb-6">
        <View className="mb-2">
          <Text className="text-2xl font-pbold text-gray-600 text-center">
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
          textStyle="text-white"
          className="mt-5 bg-orange"
          onPress={handleSignUp}
        />
      </View>

      </View>

      <OTPModal
        visible={showOtpModal}
        onVerify={handleVerifyOtp}
        onClose={() => setShowOtpModal(false)}
      />
      <SuccessModal visible={showSuccessModal} onClose={handleSuccess} />
    </View>
  );
};

export default SignUp;
