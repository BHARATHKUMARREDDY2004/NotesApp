import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const ProfileOption = ({ label, iconName, route }: any) => {
  const handlePress = () => {
    if (label === "logout") {
      // Replace current route with '/sign-up', clearing navigation stack
      router.replace("/(auth)/sign-up");
    } else {
      router.push(route); // Navigate normally for other options
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center justify-between p-2 rounded-2xl m-1 border-[.5px] border-tertiary"
    >
      <View className="flex-row items-center">
        <View className="mr-4 bg-gray-600/20 rounded-full p-1">
          <MaterialIcons name={iconName} size={24} color="rgb(75 85 99)" />
        </View>
        <Text className="text-black text-lg font-pmedium">{label}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="rgb(75 85 99)" />
    </TouchableOpacity>
  );
};

export default ProfileOption;
