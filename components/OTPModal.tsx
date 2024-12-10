import {
  View,
  Text,
  Modal,
  TextInput,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useState, useRef } from "react";
import CustomButton from "./CustomButton";
import { OTPModalProps } from "@/types/type";

export default function OTPModal({
  visible,
  onVerify,
  onClose,
}: OTPModalProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setIsIncorrect(false);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (value === "") {
      // If input is cleared, focus on the previous non-empty input
      for (let i = index - 1; i >= 0; i--) {
        if (newOtp[i] !== "") {
          inputRefs.current[i]?.focus();
          break;
        }
      }
    }
  };

  const handleFocus = (index: number) => {
    // Focus on the input box when it's tapped
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
      // Set cursor to the end of input
      setTimeout(() => {
        input.setSelection(otp[index].length, otp[index].length);
      }, 0);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "") {
      // If current input is empty, move to the previous non-empty input
      for (let i = index - 1; i >= 0; i--) {
        if (otp[i] !== "") {
          inputRefs.current[i]?.focus();
          break;
        }
      }
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      // Simulate OTP verification
      if (otpString === "123456") {
        // Replace with actual OTP verification logic
        onVerify(otpString);
      } else {
        setIsIncorrect(true);
      }
    }
  };

  const resetOTP = () => {
    setOtp(["", "", "", "", "", ""]);
    setIsIncorrect(false);
    inputRefs.current[0]?.focus();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />
      <SafeAreaView className="flex-1 bg-black/50">
        <View className="flex-1 justify-center items-center px-4">
          <View className="bg-white p-6 rounded-2xl w-full max-w-[350px]">
            <Text className="text-2xl font-pbold text-center mb-4">
              Enter Verification Code
            </Text>
            <Text className="text-gray-500 text-center mb-6">
              We've sent a verification code to your email
            </Text>

            <View className="flex-row justify-between mb-6">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  className={`w-12 h-12 border-2 ${
                    isIncorrect ? "border-red-500" : "border-gray-300"
                  } rounded-lg text-center text-xl font-pbold`}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={otp[index]}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onFocus={() => handleFocus(index)}
                  onSubmitEditing={index === 5 ? handleVerify : undefined}
                  selection={{
                    start: otp[index].length,
                    end: otp[index].length,
                  }}
                />
              ))}
            </View>

            {isIncorrect && (
              <Text className="text-red-500 text-center mb-4">
                Incorrect OTP. Please try again.
              </Text>
            )}

            <CustomButton
              title={isIncorrect ? "Try Again" : "Verify"}
              textStyle="text-white"
              onPress={isIncorrect ? resetOTP : handleVerify}
              className={`mb-4 ${isIncorrect ? "bg-danger" : "bg-orange"}`}
            />

            <Text className="text-gray-500 text-center">
              Didn't receive the code?{" "}
              <Text className="text-blue-500 font-psemibold" onPress={resetOTP}>
                Resend
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
