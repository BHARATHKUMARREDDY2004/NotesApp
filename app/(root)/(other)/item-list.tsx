import React from 'react';
import { View, ScrollView } from 'react-native';
import ItemCard from '@/components/ItemCard';

const items = [
  {
    id: 'oil004',
    name: 'Nature Fresh Refined Oil',
    category: 'oil',
    minQty: 6,
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
    units: ['1 liter'],
    unitPrices: [210.0],
    information: ['Shelf Life', 'Packaging Type', 'Storage Instructions'],
    infoDescriptions: ['4 Months', 'Plastic Pouch', 'Store in a cool, dry place'],
    images: ['https://oil-photo9', 'https://oil-photo10'],
    wholesaler: 'Sundrop',
  },{
    id: "spice005",
    name: "Everest Meat Masala",
    category: "powdered spices",
    minQty: 10,
    units: ["100 grams", "200 grams"],
    unitPrices: [100.00, 190.00],
    information: ["Shelf Life", "Storage Instructions", "Disclaimer"],
    infoDescriptions: ["11 Months", "Store in an airtight container", "Contains blended spices"],
    images: ["https://spices-photo9", "https://spices-photo10"],
    wholesaler: "Everest"
  },
  {
    id: "soft001",
    name: "Coca-Cola Classic",
    category: "soft drinks",
    minQty: 12,
    units: ["300 ml", "500 ml", "1 liter"],
    unitPrices: [20.00, 35.00, 60.00],
    information: ["Shelf Life", "Packaging Type"],
    infoDescriptions: ["6 Months", "Plastic Bottle"],
    images: ["https://soft-drink-photo1", "https://soft-drink-photo2"],
    wholesaler: "Coca-Cola"
  },
  {
    id: "soft002",
    name: "Pepsi",
    category: "soft drinks",
    minQty: 10,
    units: ["250 ml", "500 ml", "1 liter"],
    unitPrices: [18.00, 32.00, 58.00],
    information: ["Shelf Life", "Storage Instructions"],
    infoDescriptions: ["9 Months", "Store in a cool, dry place"],
    images: ["https://soft-drink-photo3", "https://soft-drink-photo4"],
    wholesaler: "PepsiCo"
  },
  {
    id: "soft003",
    name: "Sprite",
    category: "soft drinks",
    minQty: 8,
    units: ["300 ml", "1.25 liters"],
    unitPrices: [22.00, 70.00],
    information: ["Shelf Life", "Packaging Type"],
    infoDescriptions: ["8 Months", "Plastic Bottle"],
    images: ["https://soft-drink-photo5", "https://soft-drink-photo6"],
    wholesaler: "Coca-Cola"
  },
  {
    id: "soft004",
    name: "Fanta",
    category: "soft drinks",
    minQty: 6,
    units: ["500 ml", "1.5 liters"],
    unitPrices: [25.00, 90.00],
    information: ["Shelf Life", "Flavor"],
    infoDescriptions: ["7 Months", "Orange"],
    images: ["https://soft-drink-photo7", "https://soft-drink-photo8"],
    wholesaler: "Coca-Cola"
  },
  {
    id: "soft005",
    name: "Thums Up",
    category: "soft drinks",
    minQty: 15,
    units: ["300 ml", "500 ml"],
    unitPrices: [20.00, 38.00],
    information: ["Shelf Life", "Carbonation Level"],
    infoDescriptions: ["6 Months", "High"],
    images: ["https://soft-drink-photo9", "https://soft-drink-photo10"],
    wholesaler: "Coca-Cola"
  },
  // Energy Drinks Category
  {
    id: "energy001",
    name: "Red Bull Energy Drink",
    category: "energy drinks",
    minQty: 24,
    units: ["250 ml"],
    unitPrices: [110.00],
    information: ["Shelf Life", "Caffeine Content"],
    infoDescriptions: ["12 Months", "80 mg per 250 ml"],
    images: ["https://energy-drink-photo1", "https://energy-drink-photo2"],
    wholesaler: "Red Bull"
  },
];

const ItemListScreen = () => {
  return (
    <ScrollView className="bg-gray-100 p-4">
      <View className="flex-row flex-wrap justify-start">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};

export default ItemListScreen;
