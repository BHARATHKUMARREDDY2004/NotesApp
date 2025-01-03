// import { create } from 'zustand';
// import { produce } from 'immer';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Data from '../data/data';

// export interface LocationResult {
//   placeName: string;
//   latitude: number;
//   longitude: number;
// }

// interface StoreState {
//   userLocation: LocationResult | null;
//   searchResults: LocationResult[];
//   isLocationModalVisible: boolean;
//   data: typeof Data; // Add Data type
//   setLocation: (location: LocationResult) => void;
//   setSearchResults: (results: LocationResult[]) => void;
//   toggleLocationModal: () => void;
// }

// type StoreCreator = (
//   set: (fn: (state: StoreState) => void) => void,
//   get: () => StoreState
// ) => StoreState;

// const createStore: StoreCreator = (set) => ({
//   userLocation: null,
//   searchResults: [],
//   isLocationModalVisible: false,
//   data: Data, // Initialize with imported Data
//   setLocation: (location: LocationResult) =>
//     set(
//       produce((state) => {
//         state.userLocation = location;
//       })
//     ),
//   setSearchResults: (results: LocationResult[]) =>
//     set(
//       produce((state) => {
//         state.searchResults = results;
//       })
//     ),
//   toggleLocationModal: () =>
//     set(
//       produce((state) => {
//         state.isLocationModalVisible = !state.isLocationModalVisible;
//       })
//     ),
// });

// export const useStore = create<StoreState>()(
//   persist(createStore, {
//     name: 'dukaaon-user-location',
//     storage: createJSONStorage(() => AsyncStorage),
//     merge: true,
//   })
// );


import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Data from '../data/data';

export interface LocationResult {
  placeName: string;
  latitude: number;
  longitude: number;
}

interface CartItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  image: any;
}

interface StoreState {
  userLocation: LocationResult | null;
  searchResults: LocationResult[];
  isLocationModalVisible: boolean;
  data: typeof Data;
  cart: CartItem[];
  favorites: string[];
  orderHistory: { date: string; items: CartItem[]; total: number }[];
  setLocation: (location: LocationResult) => void;
  setSearchResults: (results: LocationResult[]) => void;
  toggleLocationModal: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, unit: string) => void;
  updateCartItemQuantity: (id: string, unit: string, quantity: number) => void;
  clearCart: () => void;
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  placeOrder: () => void;
  calculateCartTotal: () => number;
}

const createStore = (set: any, get: any): StoreState => ({
  userLocation: null,
  searchResults: [],
  isLocationModalVisible: false,
  data: Data,
  cart: [],
  favorites: [],
  orderHistory: [],

  setLocation: (location: LocationResult) =>
    set(produce((state: StoreState) => {
      state.userLocation = location;
    })),

  setSearchResults: (results: LocationResult[]) =>
    set(produce((state: StoreState) => {
      state.searchResults = results;
    })),

  toggleLocationModal: () =>
    set(produce((state: StoreState) => {
      state.isLocationModalVisible = !state.isLocationModalVisible;
    })),

  addToCart: (item: CartItem) =>
    set(produce((state: StoreState) => {
      const existingItem = state.cart.find(
        cartItem => cartItem.id === item.id && cartItem.unit === item.unit
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cart.push(item);
      }
    })),

  removeFromCart: (id: string, unit: string) =>
    set(produce((state: StoreState) => {
      state.cart = state.cart.filter(item => !(item.id === id && item.unit === unit));
    })),

  updateCartItemQuantity: (id: string, unit: string, quantity: number) =>
    set(produce((state: StoreState) => {
      const item = state.cart.find(item => item.id === id && item.unit === unit);
      if (item) {
        item.quantity = quantity;
      }
    })),

  clearCart: () =>
    set(produce((state: StoreState) => {
      state.cart = [];
    })),

  addToFavorites: (id: string) =>
    set(produce((state: StoreState) => {
      if (!state.favorites.includes(id)) {
        state.favorites.push(id);
      }
    })),

  removeFromFavorites: (id: string) =>
    set(produce((state: StoreState) => {
      state.favorites = state.favorites.filter(favId => favId !== id);
    })),

  placeOrder: () =>
    set(produce((state: StoreState) => {
      const total = get().calculateCartTotal();
      state.orderHistory.unshift({
        date: new Date().toISOString(),
        items: [...state.cart],
        total
      });
      state.cart = [];
    })),

  calculateCartTotal: () => {
    const state = get();
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
});

export const useStore = create<StoreState>()(
  persist(createStore, {
    name: 'dukaan-store',
    storage: createJSONStorage(() => AsyncStorage),
    merge: true,
  })
);

