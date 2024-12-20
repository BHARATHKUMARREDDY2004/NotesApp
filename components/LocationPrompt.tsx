import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Modal } from "react-native";
import * as Location from "expo-location";
import { useStore, LocationResult } from "@/store";
import { FontAwesome } from "@expo/vector-icons";

export default function LocationPrompt() {
  const [searchQuery, setSearchQuery] = useState("");
  const { setLocation, setSearchResults, searchResults, isLocationModalVisible, toggleLocationModal } = useStore();

  const requestLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync();
      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      const placeName = `${address[0]?.city || "Unknown City"}, ${
        address[0]?.region || "Unknown Region"
      }, ${address[0]?.country || "Unknown Country"}`;

      setLocation({ latitude: coords.latitude, longitude: coords.longitude, placeName });
      toggleLocationModal();
    } catch (error) {
      console.error("Error fetching location or address:", error);
      alert("Failed to fetch location. Please try again.");
    }
  };

  const handleSearch = async () => {
    try {
      const results = await Location.geocodeAsync(searchQuery);
      const formattedResults: LocationResult[] = await Promise.all(
        results.map(async (result) => {
          const address = await Location.reverseGeocodeAsync({
            latitude: result.latitude,
            longitude: result.longitude,
          });
          return {
            placeName: `${address[0]?.city || ""}, ${address[0]?.region || ""}, ${address[0]?.country || ""}`,
            latitude: result.latitude,
            longitude: result.longitude,
          };
        })
      );
      setSearchResults(formattedResults);
    } catch (error) {
      console.error("Error searching for locations:", error);
      alert("Failed to search for locations. Please try again.");
    }
  };

  const handleSelectLocation = (item: LocationResult) => {
    setLocation(item);
    toggleLocationModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isLocationModalVisible}
      onRequestClose={toggleLocationModal}
    >
      <View className="flex-1 bg-white p-4">
        <TouchableOpacity onPress={toggleLocationModal} className="self-end mb-4">
          <FontAwesome name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold mb-4">Set Your Location</Text>
        <TouchableOpacity
          onPress={requestLocation}
          className="bg-orange-500 px-4 py-2 rounded-md mb-4"
        >
          <Text className="text-white text-center">Use Current Location</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold mb-2">Or search for a location:</Text>
        <View className="flex-row mb-4">
          <TextInput
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2"
            placeholder="Enter city or village name"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            onPress={handleSearch}
            className="bg-orange-500 px-4 py-2 rounded-r-md"
          >
            <Text className="text-white">Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => `${item.latitude}-${item.longitude}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectLocation(item)}
              className="bg-gray-100 p-4 mb-2 rounded-md"
            >
              <Text>{item.placeName}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <Text className="text-center text-gray-500">No results found</Text>
          )}
        />
      </View>
    </Modal>
  );
}

