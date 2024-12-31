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

interface StoreState {
  userLocation: LocationResult | null;
  searchResults: LocationResult[];
  isLocationModalVisible: boolean;
  data: typeof Data; // Add Data type
  setLocation: (location: LocationResult) => void;
  setSearchResults: (results: LocationResult[]) => void;
  toggleLocationModal: () => void;
}

type StoreCreator = (
  set: (fn: (state: StoreState) => void) => void,
  get: () => StoreState
) => StoreState;

const createStore: StoreCreator = (set) => ({
  userLocation: null,
  searchResults: [],
  isLocationModalVisible: false,
  data: Data, // Initialize with imported Data
  setLocation: (location: LocationResult) =>
    set(
      produce((state) => {
        state.userLocation = location;
      })
    ),
  setSearchResults: (results: LocationResult[]) =>
    set(
      produce((state) => {
        state.searchResults = results;
      })
    ),
  toggleLocationModal: () =>
    set(
      produce((state) => {
        state.isLocationModalVisible = !state.isLocationModalVisible;
      })
    ),
});

export const useStore = create<StoreState>()(
  persist(createStore, {
    name: 'dukaaon-user-location',
    storage: createJSONStorage(() => AsyncStorage),
    merge: true,
  })
);
