import { View, Text, Modal, Image, StatusBar } from 'react-native'
import CustomButton from './CustomButton'
import { SuccessModalProps } from "@/types/type";
import { icons } from '@/constants'

export default function SuccessModal({ visible, onClose }: SuccessModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-2xl w-[90%] max-w-[350px] items-center">
          <View className="w-30 h-30 bg-green-500 rounded-full items-center justify-center mb-4">
          <Image 
              source={icons.check}
              className="w-[100px] h-[100px]"
            />
          </View>
          
          <Text className="text-2xl font-pbold text-center mb-2">
            Verified!
          </Text>
          
          <Text className="text-gray-500 text-center mb-6">
            You have successfully verified your account.
          </Text>

          <CustomButton
            title="Browse Home"
            textStyle='text-white'
            className="w-full bg-success-500"
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  )
}

