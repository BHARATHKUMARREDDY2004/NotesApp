import React from 'react';
import { View, ScrollView } from 'react-native';
import ItemCard from '@/components/ItemCard';

const items = [
  {
    id: 'oil004',
    name: 'Nature Fresh Refined Oil',
    category: 'oil',
    minQty: 6,
    price: 190,
    units: ['1 liter', '5 liters'],
    unitPrices: [190.0, 900.0],
    information: ['Packaging Type'],
    infoDescriptions: ['Tin Can'],
    images: ['https://oil-photo7', 'https://oil-photo8'],
    wholesaler: 'Nature Fresh',
  },
  {
    id: 'oil005',
    name: 'Sundrop Lite Refined Oil',
    category: 'oil',
    minQty: 10,
    price: 210,
    units: ['1 liter'],
    unitPrices: [210.0],
    information: ['Shelf Life', 'Packaging Type', 'Storage Instructions'],
    infoDescriptions: ['4 Months', 'Plastic Pouch', 'Store in a cool, dry place'],
    images: ['https://oil-photo9', 'https://oil-photo10'],
    wholesaler: 'Sundrop',
  },
];

const ItemListScreen = () => {
  return (
    <ScrollView className="bg-gray-100 p-4">
      <View className="flex-row flex-wrap justify-between">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};

export default ItemListScreen;
