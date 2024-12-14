import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, TouchableOpacity, Image, Text } from "react-native";
import { images } from "@/constants";


import ProfileOption from "@/components/ProfileOption";

// Profile options data
const profileOptions = [
  { label: 'Personal Information', route: '/personal-info', iconName: 'person' },
  { label: 'Your Orders', route: '/orders', iconName: 'shopping-bag' },
  { label: 'About', route: '/about', iconName: 'info' },
//   { label: 'Send Feedback', route: '/feedback', iconName: 'feedback' },
  { label: 'Settings', route: '/settings', iconName: 'settings' },
  { label: 'logout', route: '/(auth)/sign-up', iconName: 'logout' },
];

const Profile = () => {

  return (
    <SafeAreaView className="bg-white h-full">
      {/* Loader Component */}
      {/* TODO: Loader Component */}

      {/* FlatList for Profile Options */}
      <FlatList
        data={profileOptions}
        keyExtractor={(item, index) => index.toString()}  // Use index as the key
        renderItem={({ item }) => (
          <ProfileOption
            label={item.label}
            route={item.route}
            iconName={item.iconName}
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center my-6 px-4">

            {/* User Avatar */}
            <View className="w-20 h-20 border border-secondary rounded-2xl flex justify-center items-center mt-10">
              <Image
                source={images.user}
                className="w-[90%] h-[90%] rounded-full"
                resizeMode="cover"
              />
            </View>

            <Text className="text-black text-lg text-center font-psemibold mt-4">Retailer Name</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
